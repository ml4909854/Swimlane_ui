import { legacy_createStore, combineReducers } from 'redux';
import lanesReducer from './reducers/lanesReducer';
import blocksReducer from './reducers/blocksReducer';
import filterReducer from './reducers/filterReducer';

const rootReducer = combineReducers({
    lanes: lanesReducer,
    blocks: blocksReducer,
    filter: filterReducer,
});

const store = legacy_createStore(rootReducer);

export default store;