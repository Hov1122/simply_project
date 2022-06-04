import { call, put, takeLatest } from "redux-saga/effects";
import { authTypes, loginFailure, loginPending, loginSuccess } from "../../auth/actions";
import loginRequest from "../requests/loginRequest";

function* loginHandler({ payload }) {
    try {
        yield put(loginPending());
        const { data } = yield call(loginRequest, payload);

        yield put(loginSuccess(data));
    } catch(error) {
        yield put(loginFailure(error));
    }
}

function* loginWatcher() {
  yield takeLatest(authTypes.LOGIN_REQUEST, loginHandler);
}

export default loginWatcher;