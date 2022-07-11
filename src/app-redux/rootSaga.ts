/* eslint-disable import/prefer-default-export */
import { all, fork } from 'redux-saga/effects';
import todoSaga from './userInfo/saga';

export function* rootSaga() {
    yield all([fork(todoSaga)]);
}
