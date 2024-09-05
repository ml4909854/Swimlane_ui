const initialState = {
    blocks: {
        1: { id: 1, title: 'Block 1', description: 'Description of Block 1', history: [] },
        2: { id: 2, title: 'Block 2', description: 'Description of Block 1', history: [] },
        3: { id: 3, title: 'Block 3', description: 'Description of Block 1', history: [] },
    },
};

const blocksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_BLOCK': {
            const { id, data } = action.payload;

            return {
                ...state,
                blocks: {
                    ...state.blocks,
                    [id]: {
                        ...state.blocks[id],
                        ...data,
                        history: [...state.blocks[id].history, data.historyEntry]
                    },
                }
            };
        }
        default:
            return state;
    }
};

export default blocksReducer;