import { state, buildCardByHz } from './state.js';
import { escapeHtml } from './utils.js';
import { renderSenses } from './cardview.js';
import { renderPileCounts, buildQueueIfNeeded } from './drill.js';

// ---------- Manage tab ----------
export function renderCharList() {
    const el = document.getElementById('char-list');
    const allCards = state.cards;
    if (!allCards.length) {
        el.innerHTML = '<div class="empty-note">No characters in this set yet.</div>';
        return;
    }
    el.innerHTML = allCards.slice().reverse().map(c => `
      <div class="char-row">
        <div class="hz">${escapeHtml(c.hz)}</div>
        <div class="meta">${renderSenses(c)}</div>
        <div class="pile-tag ${c.pile}">${c.pile}</div>
        <button class="del" data-id="${c.id}" title="Remove">✕</button>
      </div>
    `).join('');
    el.querySelectorAll('.del').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = Number(btn.dataset.id);
            await fetch(`/api/cards/${id}`, { method: 'DELETE' });
            state.cards = state.cards.filter(c => c.id !== id);
            buildCardByHz();
            renderCharList(); renderPileCounts(); buildQueueIfNeeded();
        });
    });
}

document.getElementById('add-btn').addEventListener('click', async () => {
    const hz = document.querySelector('input[name=hz]').value.trim();
    const zy = document.querySelector('input[name=zy]').value.trim();
    const py = document.querySelector('input[name=py]').value.trim();
    const mn = document.querySelector('input[name=mn]').value.trim();
    if (!hz || !py || !mn) return;
    const res = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hz, zy, py, mn })
    });
    const newCard = await res.json();
    state.cards.push(newCard);
    buildCardByHz();

    document.querySelector('input[name=hz]').value = '';
    document.querySelector('input[name=zy]').value = '';
    document.querySelector('input[name=py]').value = '';
    document.querySelector('input[name=mn]').value = '';
    document.querySelector('input[name=hz]').focus();
    renderCharList(); renderPileCounts(); buildQueueIfNeeded();
});
