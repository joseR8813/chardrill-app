import { escapeHtml, formatDuration, formatElapsed, localDateKey } from './js/utils.js';
  // pile: 'new' -> 'practice' -> 'mastered'
  // (Pile logic itself now lives server-side in /api/cards/<id>/grade - see app.py -
  //  this file just displays whatever pile/streak the server hands back.)
  const state = {
    cardByHz: new Map(), //hz -> for compound breakdowns
  };

  let cards = [];
  let history = []; // [{date:'YYYY-MM-DD', correct:n, total:n}]
  let queue = [];
  let audioPlayer = new Audio(); // shared <audio> element, reused across taps/cards
  let current = null;
  let sessionCorrect = 0, sessionTotal = 0;
  let attemptCorrect = 0, attemptMiss = 0;
  let sessionStartedAt = null; // ISO timestamp, set when a fresh queue is built for the current filter
  let revealed = false;
  let currentFilter = 'all'; // 'all' | 'L0'..'L5' | 'custom'
  let tagFilterIds = null; // Set of card ids, only populated when currentFilter is 'tag:<id>'
  let missedCards = new Map(); // card id -> miss count, this session only (Missed-Cards Tracking, Direction B)

  function buildCardByHz(){
  state.cardByHz = new Map();
  cards.forEach(c => {
    if(!state.cardByHz.has(c.hz)){
      state.cardByHz.set(c.hz, c);
    }
  });
}

  function filteredCards(){
    if(currentFilter === 'all') return cards;
    if(currentFilter === 'custom') return cards.filter(c => !c.level);
    if(currentFilter.startsWith('tag:')) return tagFilterIds ? cards.filter(c => tagFilterIds.has(c.id)) : [];
    return cards.filter(c => c.level === currentFilter);
  }

  async function restoreFilter(){
    // 1. read the saved value
    let saved = null;
    try{ saved = localStorage.getItem('drillFilter'); }catch(err){}
    if(!saved) return;

    if(saved.startsWith('tag:')){
      const tagId = saved.slice(4);
      try{
        const res = await fetch(`/api/tags/${tagId}/cards`);
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const members = await res.json();
        tagFilterIds = new Set(members.map(c=>c.id));
      }catch(err){
        console.warn('restoreFilter: could not load saved set, showing all cards', err);
        tagFilterIds = null;
        return;
      }
    } else {
      tagFilterIds = null;
    }

    // 3. put the value into the dropdown
    const select = document.getElementById('level-filter');
    select.value = saved;

    // 4. did it take? if not, clean up and stay on 'all'
    if(select.value !== saved){
      try{ localStorage.removeItem('drillFilter'); }catch(err){}
      tagFilterIds = null;
      select.value = 'all';
      return;
    }
    currentFilter = saved;
  }

  async function loadAll(){
  try{
    const res = await fetch('/api/cards');
    cards = await res.json();
  }catch(e){ cards = []; }
  buildCardByHz();

  try{
    const res = await fetch('/api/history');
    history = await res.json();
  }catch(e){ history = []; }
  await loadTodaysSessions();
  await restoreFilter(); 
  await resetMasteredSet(filteredCards(), filteredCards().map(c => c.id));
  render();
}

  async function loadTags(){
    try{
      const res = await fetch('/api/tags');
      const tags = await res.json();

      const select = document.getElementById('tag-select');
      select.innerHTML = '<option value="">Select a set…</option>' +
        tags.map(t => `<option value="${t.id}">${escapeHtml(t.name)} (${t.card_count})</option>`).join('') +
        '<option value="__new__">+ Create new set…</option>';

      const levelFilter = document.getElementById('level-filter');
      levelFilter.querySelectorAll('.tag-option').forEach(opt => opt.remove());
      tags.forEach(t=>{
        const opt = document.createElement('option');
        opt.value = `tag:${t.id}`;
        opt.textContent = `${t.name} (${t.card_count})`;
        opt.className = 'tag-option';
        levelFilter.appendChild(opt);
      });
    }catch(e){ /* leave dropdowns as-is on failure */ }
  }

  let currentTagId = null;

  document.getElementById('tag-select').addEventListener('change', async (e)=>{
    const value = e.target.value;

    if(value === '__new__'){
      const name = prompt('Name your new set:');
      if(!name || !name.trim()){
        e.target.value = currentTagId || '';
        return;
      }
      const res = await fetch('/api/tags', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: name.trim()})
      });
      if(!res.ok){
        const err = await res.json();
        alert(err.error || 'Could not create set.');
        e.target.value = currentTagId || '';
        return;
      }
      const newTag = await res.json();
      await loadTags();
      e.target.value = newTag.id;
      openSet(newTag.id, newTag.name);
      return;
    }

    if(!value){
      currentTagId = null;
      document.getElementById('tag-count').textContent = '';
      document.getElementById('set-label').textContent = '';
      document.getElementById('set-members').innerHTML = '';
      document.getElementById('search-results').innerHTML = '';
      return;
    }

    const label = e.target.selectedOptions[0].textContent;
    const name = label.replace(/\s*\(\d+\)$/, '');
    openSet(Number(value), name);
  });

  async function openSet(tagId, tagName){
    currentTagId = tagId;
    document.getElementById('set-label').textContent = `In "${tagName}"`;
    await loadSetMembers();
  }

  function renderSenses(card, showZy = true){
    const senses = (card.senses && card.senses.length)
      ? card.senses
      : [{py: card.py, zy: card.zy, pos: card.pos, meaning: card.mn}];

    if(senses.length === 1){
      const s = senses[0];
      return `${(showZy && s.zy) ? `<span class="zy">${escapeHtml(s.zy)}</span> · ` : ''}<span class="py">${escapeHtml(s.py)}</span> — ${escapeHtml(s.meaning)}`;
  }

  return senses.map((s, i) => `
    <div class="sense-row">
      <span class="sense-num">${i+1}.</span>
      ${s.pos ? `<span class="pos">(${escapeHtml(s.pos)})</span> ` : ''}
      ${(showZy && s.zy) ? `<span class="zy">${escapeHtml(s.zy)}</span> · ` : ''}
      <span class="py">${escapeHtml(s.py)}</span> — ${escapeHtml(s.meaning)}
    </div>
  `).join('');
  }

  function renderBreakdown(card){
    const chars = [...card.hz];
    if(chars.length < 2) return '';

    const rows = chars.map(ch => {
      const root = state.cardByHz.get(ch);
      if(!root){
        return `
          <div class="breakdown-row">
            <span class="breakdown-hz">${escapeHtml(ch)}</span>
            <span class="breakdown-missing">not in library</span>
          </div>`;
      }
      return `
        <div class="breakdown-row">
          <span class="breakdown-hz">${escapeHtml(root.hz)}</span>
          <div class="breakdown-meta">${renderSenses(root)}</div>
        </div>`;
    }).join('');

    return `
      <div class="breakdown">
        <div class="breakdown-label">Built from</div>
        ${rows}
      </div>`;
  }

  async function loadSetMembers(){
    if(!currentTagId) return;
    const res = await fetch(`/api/tags/${currentTagId}/cards`);
    const members = await res.json();
    document.getElementById('tag-count').textContent = `${members.length} cards`;

    const el = document.getElementById('set-members');
    if(!members.length){
      el.innerHTML = '<div class="empty-note">No cards in this set yet. Search above to add some.</div>';
    } else {
      el.innerHTML = members.map(c => `
        <div class="char-row">
          <div class="hz">${escapeHtml(c.hz)}</div>
          <div class="meta">${renderSenses(c)}</div>
          <button class="del" data-id="${c.id}" title="Remove from set">✕</button>
        </div>
      `).join('');
      el.querySelectorAll('.del').forEach(btn=>{
        btn.addEventListener('click', async ()=>{
          const id = Number(btn.dataset.id);
          await fetch(`/api/cards/${id}/tags/${currentTagId}`, {method:'DELETE'});
          await loadSetMembers();
          await loadTags();
          const q = document.getElementById('card-search').value.trim();
          if(q) runSearch(q);
        });
      });
    }
  }

  let searchTimer = null;
  document.getElementById('card-search').addEventListener('input', (e)=>{
    clearTimeout(searchTimer);
    const q = e.target.value.trim();
    if(!q){ document.getElementById('search-results').innerHTML = ''; return; }
    searchTimer = setTimeout(()=>runSearch(q), 300);
  });

  async function runSearch(q){
    const res = await fetch(`/api/cards/search?q=${encodeURIComponent(q)}`);
    const results = await res.json();
    const el = document.getElementById('search-results');

    if(!results.length){
      el.innerHTML = '<div class="empty-note">No matches.</div>';
      return;
    }

    let memberIds = new Set();
    if(currentTagId){
      const memberRes = await fetch(`/api/tags/${currentTagId}/cards`);
      const members = await memberRes.json();
      memberIds = new Set(members.map(c=>c.id));
    }

    el.innerHTML = results.map(c => {
      const inSet = memberIds.has(c.id);
      return `
        <div class="char-row">
          <div class="hz">${escapeHtml(c.hz)}</div>
          <div class="meta">${renderSenses(c)}</div>
          <button class="add-btn ${inSet ? 'already' : ''}" data-id="${c.id}" ${inSet ? 'disabled' : ''}>${inSet ? 'Already in set' : '+ Add'}</button>
        </div>
      `;
    }).join('');

    el.querySelectorAll('.add-btn:not(.already)').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        if(!currentTagId){ alert('Select or create a set first.'); return; }
        const id = Number(btn.dataset.id);
        await fetch(`/api/cards/${id}/tags`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({tag_id: currentTagId})
        });
        await loadSetMembers();
        await loadTags();
        runSearch(document.getElementById('card-search').value.trim());
      });
    });
  }

  function counts(){
    const set = filteredCards();
    return {
      new: set.filter(c=>c.pile==='new').length,
      practice: set.filter(c=>c.pile==='practice').length,
      mastered: set.filter(c=>c.pile==='mastered').length,
    };
  }

  function renderPileCounts(){
    const c = counts();
    document.getElementById('count-new').textContent = c.new;
    document.getElementById('count-practice').textContent = c.practice;
    document.getElementById('count-mastered').textContent = c.mastered;
  }

  // ---------- Manage tab ----------
  function renderCharList(){
    const el = document.getElementById('char-list');
    const set = cards;
    if(!set.length){
      el.innerHTML = '<div class="empty-note">No characters in this set yet.</div>';
      return;
    }
    el.innerHTML = set.slice().reverse().map(c => `
      <div class="char-row">
        <div class="hz">${escapeHtml(c.hz)}</div>
        <div class="meta">${renderSenses(c)}</div>
        <div class="pile-tag ${c.pile}">${c.pile}</div>
        <button class="del" data-id="${c.id}" title="Remove">✕</button>
      </div>
    `).join('');
    el.querySelectorAll('.del').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        const id = Number(btn.dataset.id);
        await fetch(`/api/cards/${id}`, { method: 'DELETE' });
        cards = cards.filter(c=>c.id !== id);
        buildCardByHz();
        renderCharList(); renderPileCounts(); buildQueueIfNeeded();
      });
    });
  }

  document.getElementById('add-btn').addEventListener('click', async ()=>{
    const hz = document.querySelector('input[name=hz]').value.trim();
    const zy = document.querySelector('input[name=zy]').value.trim();
    const py = document.querySelector('input[name=py]').value.trim();
    const mn = document.querySelector('input[name=mn]').value.trim();
    if(!hz || !py || !mn) return;
    const res = await fetch('/api/cards', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({hz, zy, py, mn})
    });
    const newCard = await res.json();
    cards.push(newCard);
    buildCardByHz();
    
    document.querySelector('input[name=hz]').value='';
    document.querySelector('input[name=zy]').value='';
    document.querySelector('input[name=py]').value='';
    document.querySelector('input[name=mn]').value='';
    document.querySelector('input[name=hz]').focus();
    renderCharList(); renderPileCounts(); buildQueueIfNeeded();
  });

  // ---------- Drill tab ----------
  function pileWeight(pile){
    // mastered cards are excluded from the drill pool entirely (0) - once you know
    // it, it stays out of rotation until the whole set is reset back to new.
    if(pile==='new') return 3;
    if(pile==='practice') return 3;
    return 0;
  }

  function getSetLabel(){
  const select = document.getElementById('level-filter');
  return select.selectedOptions[0]?.textContent || currentFilter;
  }

  function buildQueue(){
    let pool = [];
    filteredCards().forEach(c=>{
      const w = pileWeight(c.pile);
      for(let i=0;i<w;i++) pool.push(c.id);
    });
    // shuffle
    for(let i=pool.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [pool[i],pool[j]]=[pool[j],pool[i]];
    }
    queue = pool;
  }

  function buildQueueIfNeeded(){
    if(!queue.length) buildQueue();
  }

  function nextCard(){
    if(!filteredCards().length) return null;
    if(!queue.length) buildQueue();
    if(!queue.length) return null;
    const id = queue.pop();
    return cards.find(c=>c.id===id) || null;
  }

  async function completeSession(set){
    try{
      await fetch('/api/sessions', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          set_key: currentFilter,
          set_label: getSetLabel(),
          started_at: sessionStartedAt,
          completed_at: new Date().toISOString(),
          correct_count: attemptCorrect,
          miss_count: attemptMiss
        })
      });
    }catch(e){ /* a failed log shouldn't block anything */ }
    await loadTodaysSessions();
    renderHistory();
  }

  async function resetMasteredSet(set, idsOverride){
    // Default: only send back cards that were actually missed this session
    // (Missed-Cards Tracking, Direction B) - clean cards stay mastered.
    // idsOverride lets a caller force a full reset instead (used for the
    // "arrived at an already-fully-mastered set, nothing graded" case).
    const ids = idsOverride || set.filter(c => missedCards.has(c.id)).map(c => c.id);
    const res = await fetch('/api/cards/reset', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ids})
    });
    const updated = await res.json();
    updated.forEach(u => {
      const c = cards.find(c=>c.id===u.id);
      if(c){ c.pile = u.pile; c.streak = u.streak; }
    });
    queue = [];
    current = null;
    renderPileCounts();
    renderCharList();
    renderDrill();
  }

  function renderDrill(){
    const root = document.getElementById('drill-root');
    const set = filteredCards();
    if(!set.length){
      root.innerHTML = '<div class="drill-empty">No characters in this set yet. Add some in the Characters tab, or pick a different set above.</div>';
      return;
    }
    if(!current){
      if(!queue.length && set.every(c=>c.pile==='mastered')){
        const gradedThisSession = (attemptCorrect + attemptMiss) > 0;

        if(!gradedThisSession){
          // Nothing was drilled this round (e.g. landing on a set that was
          // already fully mastered) - nothing to report, so skip the
          // completion screen and just reset everything like before.
          root.innerHTML = '<div class="drill-empty">Set fully mastered — starting over…</div>';
          resetMasteredSet(set, set.map(c=>c.id));
          return;
        }

        if(sessionStartedAt){
          completeSession(set); // logging only now - piles aren't touched until Continue
        }
        renderCompletionScreen(set);
        return;
      }
      current = nextCard();
      revealed = false;
    }
    if(!current){
      root.innerHTML = '<div class="drill-empty">All caught up for now.</div>';
      return;
    }
    const primaryZy = (current.senses && current.senses[0]) ? current.senses[0].zy : current.zy;
    const primaryPy = (current.senses && current.senses[0]) ? current.senses[0].py : current.py;
    const primaryAudio = (current.senses && current.senses[0]) ? current.senses[0].audio_url : null;
    root.innerHTML = `
      <div class="drill-stage">
        <div class="pile-indicator pile-tag ${current.pile}">${current.pile}</div>
        <div class="streak">${sessionCorrect}/${sessionTotal} today</div>
        <div class="flash-char-row">
          <div class="flash-char">${escapeHtml(current.hz)}</div>
          ${primaryAudio ? `<button class="play-audio-btn" id="play-audio-btn" type="button" title="Play pronunciation">🔊</button>` : ''}
          ${primaryZy ? `
            <div class="flash-zy-wrap" tabindex="0">
              <div class="flash-zy">${escapeHtml(primaryZy)}</div>
              ${(!revealed && primaryPy) ? `<div class="zy-pinyin-peek">${escapeHtml(primaryPy)}</div>` : ''}
            </div>
          ` : ''}
        </div>
        <div class="flash-answer" id="answer-area">
           ${revealed ? renderSenses(current, false) + renderBreakdown(current) : ''}
        </div>
        ${revealed ? `
          <div class="grade-row">
            <button class="miss" id="btn-miss">Didn't know it</button>
            <button class="hit" id="btn-hit">Knew it</button>
          </div>
        ` : `<div class="tap-hint" id="reveal-btn" style="cursor:pointer;text-decoration:underline;">Tap to reveal</div>`}
      </div>
    `;
    if(primaryAudio){
      document.getElementById('play-audio-btn').addEventListener('click', ()=>{
        audioPlayer.src = primaryAudio;
        audioPlayer.currentTime = 0;
        audioPlayer.play();
      });
    }
    if(!revealed){
      document.getElementById('reveal-btn').addEventListener('click', ()=>{
        revealed = true; renderDrill();
      });
    } else {
      document.getElementById('btn-hit').addEventListener('click', ()=>grade(true));
      document.getElementById('btn-miss').addEventListener('click', ()=>grade(false));
    }
  }

  // Missed-Cards Tracking (Direction B): shown once a filtered set finishes,
  // in place of the old instant silent reset. Reuses .drill-stage plus the
  // .round-summary and .char-list/.char-row classes already in style.css.
  function renderCompletionScreen(set){
    const root = document.getElementById('drill-root');

    const missedRows = Array.from(missedCards.entries()).map(([id, count]) => {
      const card = cards.find(c => c.id === id);
      const hz = card ? card.hz : '?';
      return `
        <div class="char-row">
          <div class="hz">${escapeHtml(hz)}</div>
          <div class="meta">missed ${count}×</div>
        </div>
      `;
    }).join('');

    root.innerHTML = `
      <div class="drill-stage">
        <div class="round-summary">
          <div class="big">${attemptCorrect}/${attemptCorrect + attemptMiss}</div>
          <div>correct this round</div>
        </div>
        <div class="set-section-label">Missed this round</div>
        <div class="char-list">
          ${missedRows || '<div class="empty-note">Perfect round — nothing missed!</div>'}
        </div>
        <button id="continue-btn">Continue</button>
      </div>
    `;

    document.getElementById('continue-btn').addEventListener('click', async ()=>{
      const idsToReset = set.filter(c => missedCards.has(c.id)).map(c => c.id);
      endDrillSession();
      startDrillSession();
      await resetMasteredSet(set, idsToReset);
    });
  }

  async function grade(correct){
    sessionTotal++;
    if(correct) sessionCorrect++;
    if(correct) attemptCorrect++; else attemptMiss++;

    const c = current;
    if(!correct){
      missedCards.set(c.id, (missedCards.get(c.id) || 0) + 1);
    }
    const res = await fetch(`/api/cards/${c.id}/grade`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({correct, set_key: currentFilter})
    });
    const result = await res.json();

    // Apply the server's pile/streak decision (see grade_card() in app.py) back onto
    // the local card object - same fields, same shape as before, just server-sourced now.
    c.pile = result.card.pile;
    c.streak = result.card.streak;

    // If this card just moved to a 0-weight pile (e.g. mastered), scrub any
    // leftover duplicate copies of its id out of the queue - otherwise a card
    // enqueued multiple times at its old weight can still surface later even
    // after it's no longer supposed to be in rotation.
    if(pileWeight(c.pile) === 0){
      queue = queue.filter(id => id !== c.id);
    }

    // Update local history to match the server's upserted "today" row.
    let today = history.find(h=>h.date===result.today.date);
    if(!today){ history.push(result.today); }
    else{ today.correct = result.today.correct; today.total = result.today.total; }

    current = null;
    renderPileCounts();
    renderDrill();
    renderHistory();
  }

  let todaysSessions = []; // raw rows from /api/sessions/today

  async function loadTodaysSessions(){
    try{
      const res = await fetch('/api/sessions/today');
      todaysSessions = await res.json();
    }catch(e){ todaysSessions = []; }
  }

  function groupSessionsBySet(sessions){
    const groups = {};
    sessions.forEach(s=>{
      if(!groups[s.set_key]){
        groups[s.set_key] = { label: s.set_label, sessions: [] };
      }
      groups[s.set_key].sessions.push(s);
    });
    // most-recently-completed set first
    return Object.values(groups).sort((a,b)=>{
      const aLast = a.sessions[a.sessions.length-1].completed_at;
      const bLast = b.sessions[b.sessions.length-1].completed_at;
      return bLast.localeCompare(aLast);
    });
  }

  function updateSessionTimer(){
    const el = document.getElementById('session-timer');
    if(!el) return; // element not in DOM yet (shouldn't normally happen, but safe)

    if(!sessionStartedAt){
      el.textContent = '';
      return;
    }

    const elapsedMs = Date.now() - new Date(sessionStartedAt).getTime();
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    el.textContent = formatElapsed(elapsedSeconds);
  }

  function startDrillSession(){
    if(!sessionStartedAt){
      sessionStartedAt = new Date().toISOString();
      attemptCorrect = 0;
      attemptMiss = 0;
      missedCards = new Map();
    }
  }

  function endDrillSession(){
    sessionStartedAt = null;
    attemptCorrect = 0;
    attemptMiss = 0;
    missedCards = new Map();
    current = null;
    queue = [];
  }

  // ---------- History tab ----------
  function renderHistory(){
    const root = document.getElementById('history-root');
    const last14 = [];
    const now = new Date();
    for(let i=13;i>=0;i--){
      const d = new Date(now); d.setDate(d.getDate()-i);
      const key = localDateKey(d);
      const entry = history.find(h=>h.date===key);
      last14.push({date:key, correct: entry?entry.correct:0, total: entry?entry.total:0});
    }
    const max = Math.max(1, ...last14.map(d=>d.total));
    const bars = last14.map(d=>{
      const h = d.total ? Math.max(4, Math.round((d.total/max)*100)) : 2;
      const lbl = d.date.slice(5).replace('-','/');
      return `<div class="hist-bar-wrap"><div class="hist-bar" style="height:${h}px;" title="${d.correct}/${d.total}"></div><div class="hist-lbl">${lbl}</div></div>`;
    }).join('');

    const recentLog = history.slice().reverse().slice(0,10).map(h=>`
      <div class="row"><div class="d">${h.date}</div><div class="s">${h.correct}/${h.total} correct</div></div>
    `).join('') || '<div class="empty-note">No sessions logged yet.</div>';

    const groups = groupSessionsBySet(todaysSessions);
    const completedHtml = groups.length ? groups.map(g => `
      <div class="completed-group">
        <div class="completed-group-title">${escapeHtml(g.label)} — ${g.sessions.length} completion${g.sessions.length>1?'s':''} today</div>
        <div class="completed-rows">
          ${g.sessions.map((s,i)=>`
            <div class="completed-row">
              <span class="idx">${i+1}.</span>
              <span class="dur">${formatDuration(s.duration_seconds)}</span>
              <span class="hit">${s.correct_count} correct</span>
              <span class="miss">${s.miss_count} missed</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('') : '<div class="empty-note">No completed sets today.</div>';

    root.innerHTML = `
      <div class="hist-chart">
        <div class="hist-bars">${bars}</div>
      </div>
      <div class="hist-log">${recentLog}</div>
      <button class="clear-btn" id="reset-hist-btn">Reset history</button>
      <div class="completed-section">
        <div class="completed-heading">Completed today</div>
        ${completedHtml}
      </div>
    `;
    document.getElementById('reset-hist-btn').addEventListener('click', async ()=>{
      if(!confirm('Clear all history? This cannot be undone.')) return;
      await fetch('/api/history/reset', { method: 'POST' });
      history = [];
      renderHistory();
    });
  }

   // ---------- Set filter ----------
  document.getElementById('level-filter').addEventListener('change', async (e)=>{
    currentFilter = e.target.value;
    try{ localStorage.setItem('drillFilter', currentFilter); }catch(err){}
    endDrillSession();
    startDrillSession();
    revealed = false;

    if(currentFilter.startsWith('tag:')){
      const tagId = currentFilter.slice(4);
      const res = await fetch(`/api/tags/${tagId}/cards`);
      const members = await res.json();
      tagFilterIds = new Set(members.map(c=>c.id));
    } else {
      tagFilterIds = null;
    }

    await resetMasteredSet(filteredCards(), filteredCards().map(c => c.id));
    
  });

  // ---------- Tabs ----------
  document.querySelectorAll('.tab').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      const previousTab = document.querySelector('.tab.active')?.dataset.tab;

      document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('section').forEach(s=>s.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('sec-'+tab.dataset.tab).classList.add('active');

      const newTab = tab.dataset.tab;
      try{ localStorage.setItem('activeTab', newTab); }catch(err){}

      if(previousTab === 'drill' && newTab !== 'drill'){
        endDrillSession();
      }
      if(newTab === 'drill'){
        startDrillSession();
      }
    });
  });

  function render(){
    renderPileCounts();
    renderCharList();
    buildQueueIfNeeded();
    renderDrill();
    renderHistory();
  }
  let savedTab = null;
  try{ savedTab = localStorage.getItem('activeTab'); }catch(err){}

  if(savedTab){
    const tabEl = document.querySelector(`.tab[data-tab="${savedTab}"]`);
    if(tabEl){
      tabEl.click();
    } else {
      try{ localStorage.removeItem('activeTab'); }catch(err){}
    }
  }
  
  if(document.querySelector('.tab.active')?.dataset.tab === 'drill'){
    startDrillSession();
  }

  loadTags().then(loadAll);
  setInterval(updateSessionTimer, 1000);
