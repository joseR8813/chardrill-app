import { state, buildCardByHz } from './js/state.js';
import { loadTodaysSessions, renderHistory } from './js/history.js';
import { loadTags } from './js/sets.js';
import { filteredCards, restoreFilter } from './js/filter.js';
import { renderCharList } from './js/manage.js';
import {
  renderPileCounts, buildQueueIfNeeded, resetMasteredSet, renderDrill,
  startDrillSession, endDrillSession, updateSessionTimer
} from './js/drill.js';

async function loadAll() {
  try {
    const res = await fetch('/api/cards');
    state.cards = await res.json();
  } catch (e) { state.cards = []; }
  buildCardByHz();

  try {
    const res = await fetch('/api/history');
    state.history = await res.json();
  } catch (e) { state.history = []; }
  await loadTodaysSessions();
  await restoreFilter();
  await resetMasteredSet(filteredCards(), filteredCards().map(c => c.id));
  render();
}

// ---------- Tabs ----------
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const previousTab = document.querySelector('.tab.active')?.dataset.tab;

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('sec-' + tab.dataset.tab).classList.add('active');

    const newTab = tab.dataset.tab;
    try { localStorage.setItem('activeTab', newTab); } catch (err) { }

    if (previousTab === 'drill' && newTab !== 'drill') {
      endDrillSession();
    }
    if (newTab === 'drill') {
      startDrillSession();
    }
  });
});

function render() {
  renderPileCounts();
  renderCharList();
  buildQueueIfNeeded();
  renderDrill();
  renderHistory();
}
let savedTab = null;
try { savedTab = localStorage.getItem('activeTab'); } catch (err) { }

if (savedTab) {
  const tabEl = document.querySelector(`.tab[data-tab="${savedTab}"]`);
  if (tabEl) {
    tabEl.click();
  } else {
    try { localStorage.removeItem('activeTab'); } catch (err) { }
  }
}

if (document.querySelector('.tab.active')?.dataset.tab === 'drill') {
  startDrillSession();
}

loadTags().then(loadAll);
setInterval(updateSessionTimer, 1000);
