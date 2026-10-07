export const state = {
    cardByHz: new Map(), // hz -> card, for compound breakdowns
    tagFilterIds: null, // Set of card ids, only populated when currentFilter is 'tag:<id>'
    history: [], // [{date:'YYYY-MM-DD', correct:n, total:n}]
    currentFilter: 'all', // 'all' | 'L0'..'L5' | 'custom' | 'tag:<id>'
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