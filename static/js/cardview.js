import { escapeHtml } from './utils.js';
import { state } from './state.js';

export function renderSenses(card, showZy = true) {
    const senses = (card.senses && card.senses.length)
        ? card.senses
        : [{ py: card.py, zy: card.zy, pos: card.pos, meaning: card.mn }];

    if (senses.length === 1) {
        const s = senses[0];
        return `${(showZy && s.zy) ? `<span class="zy">${escapeHtml(s.zy)}</span> · ` : ''}<span class="py">${escapeHtml(s.py)}</span> — ${escapeHtml(s.meaning)}`;
    }

    return senses.map((s, i) => `
    <div class="sense-row">
      <span class="sense-num">${i + 1}.</span>
      ${s.pos ? `<span class="pos">(${escapeHtml(s.pos)})</span> ` : ''}
      ${(showZy && s.zy) ? `<span class="zy">${escapeHtml(s.zy)}</span> · ` : ''}
      <span class="py">${escapeHtml(s.py)}</span> — ${escapeHtml(s.meaning)}
    </div>
  `).join('');
}

export function renderBreakdown(card) {
    const chars = [...card.hz];
    if (chars.length < 2) return '';

    const rows = chars.map(ch => {
        const root = state.cardByHz.get(ch);
        if (!root) {
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