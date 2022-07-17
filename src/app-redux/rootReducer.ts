/* eslint-disable object-shorthand */
import { combineReducers } from 'redux';
import languageReducer from './language/reducer';
import resource from './resource/reducer';
import watchList from './symbol/reducer';
import userInfo from './userInfo/reducer';

const symbolReducer = combineReducers({
    watchList: watchList,
});

const rootReducer = combineReducers({
    resource,
    userInfo,
    languageReducer,
    symbolReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
