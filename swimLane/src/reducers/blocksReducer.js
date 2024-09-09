// reducers/blocksReducer.js
const initialState = {
  blocks: {},
};

const blocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BLOCK':
      return {
        ...state,
        blocks: {
          ...state.blocks,
          [action.payload.id]: {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            history: [],  // Initialize history as an empty array
          },
        },
      };
    case 'HISTORY_BLOCK': {
      const { id, data } = action.payload;

      return {
        ...state,
        blocks: {
          ...state.blocks,
          [id]: {
            ...state.blocks[id],
            history: [...(state.blocks[id].history || []), data.historyEntry]
          },
        }
      };
    }
    case 'UPDATE_BLOCK':
      return {
        ...state,
        blocks: {
          ...state.blocks,
          [action.payload.id]: {
            ...state.blocks[action.payload.id],
            title: action.payload.title,
            description: action.payload.description,
          },
        },
      };
    case 'DELETE_BLOCK':
      const { [action.payload]: deletedBlock, ...remainingBlocks } = state.blocks;
      return {
        ...state,
        blocks: remainingBlocks,
      };
    default:
      return state;
  }
};

export default blocksReducer;
