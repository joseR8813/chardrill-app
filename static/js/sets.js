import { escapeHtml } from './utils.js';
import { renderSenses } from './cardview.js';

export async function loadTags(){
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