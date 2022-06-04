import { call, put, takeLatest } from "redux-saga/effects";
import { authTypes, loginFailure, loginPending, logoutSuccess } from "../../auth/actions";
import logOutRequest from "../requests/logOutRequest";

function* logOutHandler({ payload }) {
    try {
        yield put(loginPending());
        yield call(logOutRequest, payload);

        yield put(logoutSuccess());
    } catch(error) {
        yield put(loginFailure(error));
    }
}

function* logOutWatcher() {
  yield takeLatest(authTypes.LOGOUT_REQUEST, logOutHandler);
}

export default logOutWatcher;