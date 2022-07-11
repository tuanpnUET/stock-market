import { all, takeLatest, call, put } from 'redux-saga/effects';
import request from 'api/request';
import AlertMessage from 'components/base/AlertMessage';
import { GET_USER_INFO, UserInfoData } from './types';
import { setUserInfo } from './actions';

interface typeUserInfoData {
    name?: string;
    email?: string;
    phone?: string;
    _id?: string;
}

function* getUserProfile() {
    try {
        // call api
        const res: typeUserInfoData = yield call(request.get, `profile`);
        // save to store
        yield put(setUserInfo(res as UserInfoData));
    } catch (e: any) {
        AlertMessage(e);
    }
}

export default function* todoSaga() {
    yield all([takeLatest(GET_USER_INFO, getUserProfile)]);
}
