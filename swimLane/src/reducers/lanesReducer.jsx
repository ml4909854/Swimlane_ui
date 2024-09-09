const initialState = {
  lanes: {
      'To Do': [],
      'In Progress': [],
      'Done': [],
  },
};

const lanesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVE_BLOCK': {
      const { blockId, sourceLane, destinationLane } = action.payload;

      return {
          ...state,
          lanes: {
              ...state.lanes,
              [sourceLane]: state.lanes[sourceLane].filter(id => id !== blockId),
              [destinationLane]: [...state.lanes[destinationLane], blockId],
          },
      };
  }
      case 'ADD_TO_LANE': {
          const { blockId, lane } = action.payload;
          return {
              ...state,
              lanes: {
                  ...state.lanes,
                  [lane]: [...state.lanes[lane], blockId],
              },
          };
      }
      default:
          return state;
  }
};

export default lanesReducer;
