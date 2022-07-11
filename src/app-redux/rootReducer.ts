import { combineReducers } from 'redux';
import languageReducer from './language/reducer';
import resource from './resource/reducer';
import userInfo from './userInfo/reducer';

const rootReducer = combineReducers({
    resource,
    userInfo,
    languageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
