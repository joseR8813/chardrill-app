import { state } from './state.js';
import { escapeHtml, formatDuration, localDateKey } from './utils.js';

let todaysSessions = []; // raw rows from /api/sessions/today

export async function loadTodaysSessions() {
    try {
        const res = await fetch('/api/sessions/today');
        todaysSessions = await res.json();
    } catch (e) { todaysSessions = []; }
}

function groupSessionsBySet(sessions) {
    const groups = {};
    sessions.forEach(s => {
        if (!groups[s.set_key]) {
            groups[s.set_key] = { label: s.set_label, sessions: [] };
        }
        groups[s.set_key].sessions.push(s);
    });
    // most-recently-completed set first
    return Object.values(groups).sort((a, b) => {
        const aLast = a.sessions[a.sessions.length - 1].completed_at;
        const bLast = b.sessions[b.sessions.length - 1].completed_at;
        return bLast.localeCompare(aLast);
    });
}

// ---------- History tab ----------
export function renderHistory() {
    const root = document.getElementById('history-root');
    const last14 = [];
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
        const d = new Date(now); d.setDate(d.getDate() - i);
        const key = localDateKey(d);
        const entry = state.history.find(h => h.date === key);
        last14.push({ date: key, correct: entry ? entry.correct : 0, total: entry ? entry.total : 0 });
    }
    const max = Math.max(1, ...last14.map(d => d.total));
    const bars = last14.map(d => {
        const h = d.total ? Math.max(4, Math.round((d.total / max) * 100)) : 2;
        const lbl = d.date.slice(5).replace('-', '/');
        return `<div class="hist-bar-wrap"><div class="hist-bar" style="height:${h}px;" title="${d.correct}/${d.total}"></div><div class="hist-lbl">${lbl}</div></div>`;
    }).join('');

    const recentLog = state.history.slice().reverse().slice(0, 10).map(h => `
      <div class="row"><div class="d">${h.date}</div><div class="s">${h.correct}/${h.total} correct</div></div>
    `).join('') || '<div class="empty-note">No sessions logged yet.</div>';

    const groups = groupSessionsBySet(todaysSessions);
    const completedHtml = groups.length ? groups.map(g => `
      <div class="completed-group">
        <div class="completed-group-title">${escapeHtml(g.label)} — ${g.sessions.length} completion${g.sessions.length > 1 ? 's' : ''} today</div>
        <div class="completed-rows">
          ${g.sessions.map((s, i) => `
            <div class="completed-row">
              <span class="idx">${i + 1}.</span>
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
    document.getElementById('reset-hist-btn').addEventListener('click', async () => {
        if (!confirm('Clear all history? This cannot be undone.')) return;
        await fetch('/api/history/reset', { method: 'POST' });
        state.history = [];
        renderHistory();
    });
}
