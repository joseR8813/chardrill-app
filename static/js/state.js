export const state = {
    cardByHz: new Map(), // hz -> card, for compound breakdowns
    filterIds: null, // Set of card ids, populated when currentFilter is 'tag:<id>' or 'missed:today'
    history: [], // [{date:'YYYY-MM-DD', correct:n, total:n}]
    currentFilter: 'all', // 'all' | 'L0'..'L5' | 'custom' | 'tag:<id>' | 'missed:today'
    cards: [], // every card from /api/cards
};

export function buildCardByHz() {
    state.cardByHz = new Map();
    state.cards.forEach(c => {
        if (!state.cardByHz.has(c.hz)) {
            state.cardByHz.set(c.hz, c);
        }
    });
}