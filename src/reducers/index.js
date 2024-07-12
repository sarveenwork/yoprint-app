import { combineReducers } from 'redux';
import filesReducer from './files.reducer';

const allReducers = combineReducers({
    files: filesReducer,

});

const rootReducer = (state, action) => {
    return allReducers(state, action);
}

export default rootReducer;