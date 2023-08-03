import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import drugReducer from './drug_redux/reducers';
import loginReducer from './login_redux/reducers';

const rootReducer = combineReducers({loginReducer ,drugReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));