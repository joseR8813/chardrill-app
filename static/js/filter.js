import { state } from './state.js';
import { fetchSetMembers, fetchMissedToday } from './api.js';

export function filteredCards() {
    if (state.currentFilter === 'all') return state.cards;
    if (state.currentFilter === 'custom') return state.cards.filter(c => !c.level);
    if (state.currentFilter.startsWith('tag:') || state.currentFilter === 'missed:today') return state.filterIds ? state.cards.filter(c => state.filterIds.has(c.id)) : [];
    return state.cards.filter(c => c.level === state.currentFilter);
}

// Card ids for filters that need a server lookup ('tag:<id>', 'missed:today').
// Returns null for filters filteredCards() handles on its own (all, levels, custom).
// Throws if the fetch fails, so callers decide how to handle that.
export async function loadFilterIds(filter) {
    if (filter.startsWith('tag:')) {
        const members = await fetchSetMembers(filter.slice(4));
        return new Set(members.map(c => c.id));
    }
    if (filter === 'missed:today') {
        const members = await fetchMissedToday();
        return new Set(members.map(c => c.id));
    }
    return null;
}

export async function restoreFilter() {
    // 1. read the saved value
    let saved = null;
    try { saved = localStorage.getItem('drillFilter'); } catch (err) { }
    if (!saved) return;

    try {
        state.filterIds = await loadFilterIds(saved);
    } catch (err) {
        console.warn('restoreFilter: could not load saved set, showing all cards', err);
        state.filterIds = null;
        return;
    }

    // 3. put the value into the dropdown
    const select = document.getElementById('level-filter');
    select.value = saved;

    // 4. did it take? if not, clean up and stay on 'all'
    if (select.value !== saved) {
        try { localStorage.removeItem('drillFilter'); } catch (err) { }
        state.filterIds = null;
        select.value = 'all';
        return;
    }
    state.currentFilter = saved;
}