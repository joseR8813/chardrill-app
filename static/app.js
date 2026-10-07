import { escapeHtml, formatElapsed } from './js/utils.js';
import { state, buildCardByHz } from './js/state.js';
import { renderSenses, renderBreakdown } from './js/cardview.js';
import { loadTodaysSessions, renderHistory } from './js/history.js';
import { loadTags } from './js/sets.js';
import { filteredCards, restoreFilter } from './js/filter.js';
import { renderCharList } from './js/manage.js';
  // pile: 'new' -> 'practice' -> 'mastered'
  // (Pile logic itself now lives server-side in /api/cards/<id>/grade - see app.py -
  //  this file just displays whatever pile/streak the server hands back.)

  let queue = [];
  let audioPlayer = new Audio(); // shared <audio> element, reused across taps/cards
  let current = null;
  let sessionCorrect = 0, sessionTotal = 0;
  let attemptCorrect = 0, attemptMiss = 0;
  let sessionStartedAt = null; // ISO timestamp, set when a fresh queue is built for the current filter
  let revealed = false;
  let missedCards = new Map(); // card id -> miss count, this session only (Missed-Cards Tracking, Direction B)

  async function loadAll(){
  try{
    const res = await fetch('/api/cards');
    state.cards = await res.json();
  }catch(e){ state.cards = []; }
  buildCardByHz();

  try{
    const res = await fetch('/api/history');
    state.history = await res.json();
  }catch(e){ state.history = []; }
  await loadTodaysSessions();
  await restoreFilter(); 
  await resetMasteredSet(filteredCards(), filteredCards().map(c => c.id));
  render();
}

  function counts(){
    const set = filteredCards();
    return {
      new: set.filter(c=>c.pile==='new').length,
      practice: set.filter(c=>c.pile==='practice').length,
      mastered: set.filter(c=>c.pile==='mastered').length,
    };
  }

  export function renderPileCounts(){
    const c = counts();
    document.getElementById('count-new').textContent = c.new;
    document.getElementById('count-practice').textContent = c.practice;
    document.getElementById('count-mastered').textContent = c.mastered;
  }

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
  return select.selectedOptions[0]?.textContent || state.currentFilter;
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

  export function buildQueueIfNeeded(){
    if(!queue.length) buildQueue();
  }

  function nextCard(){
    if(!filteredCards().length) return null;
    if(!queue.length) buildQueue();
    if(!queue.length) return null;
    const id = queue.pop();
    return state.cards.find(c=>c.id===id) || null;
  }

  async function completeSession(set){
    try{
      await fetch('/api/sessions', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          set_key: state.currentFilter,
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
      const c = state.cards.find(c=>c.id===u.id);
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
      const card = state.cards.find(c => c.id === id);
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
      body: JSON.stringify({correct, set_key: state.currentFilter})
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
    let today = state.history.find(h=>h.date===result.today.date);
    if(!today){ state.history.push(result.today); }
    else{ today.correct = result.today.correct; today.total = result.today.total; }

    current = null;
    renderPileCounts();
    renderDrill();
    renderHistory();
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

   // ---------- Set filter ----------
  document.getElementById('level-filter').addEventListener('change', async (e)=>{
    state.currentFilter = e.target.value;
    try{ localStorage.setItem('drillFilter', state.currentFilter); }catch(err){}
    endDrillSession();
    startDrillSession();
    revealed = false;

    if(state.currentFilter.startsWith('tag:')){
      const tagId = state.currentFilter.slice(4);
      const res = await fetch(`/api/tags/${tagId}/cards`);
      const members = await res.json();
      state.tagFilterIds = new Set(members.map(c=>c.id));
    } else {
      state.tagFilterIds = null;
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
