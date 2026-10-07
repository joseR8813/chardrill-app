import { state } from './state.js';
import { fetchSetMembers } from './api.js';

export function filteredCards() {
    if (state.currentFilter === 'all') return state.cards;
    if (state.currentFilter === 'custom') return state.cards.filter(c => !c.level);
    if (state.currentFilter.startsWith('tag:')) return state.tagFilterIds ? state.cards.filter(c => state.tagFilterIds.has(c.id)) : [];
    return state.cards.filter(c => c.level === state.currentFilter);
}

export async function restoreFilter() {
    // 1. read the saved value
    let saved = null;
    try { saved = localStorage.getItem('drillFilter'); } catch (err) { }
    if (!saved) return;

    if (saved.startsWith('tag:')) {
        const tagId = saved.slice(4);
        try {
            const members = await fetchSetMembers(tagId);
            state.tagFilterIds = new Set(members.map(c => c.id));
        } catch (err) {
            console.warn('restoreFilter: could not load saved set, showing all cards', err);
            state.tagFilterIds = null;
            return;
        }
    } else {
        state.tagFilterIds = null;
    }

    // 3. put the value into the dropdown
    const select = document.getElementById('level-filter');
    select.value = saved;

    // 4. did it take? if not, clean up and stay on 'all'
    if (select.value !== saved) {
        try { localStorage.removeItem('drillFilter'); } catch (err) { }
        state.tagFilterIds = null;
        select.value = 'all';
        return;
    }
    state.currentFilter = saved;
}