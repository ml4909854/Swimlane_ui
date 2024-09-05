const initialState = {
    searchTerm: '',
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER': {
            return {
                ...state,
                searchTerm: action.payload,
            };
        }
        default:
            return state;
    }
};

export default filterReducer;