import { all } from 'redux-saga/effects'
import loginWatcher from './watchers/loginWatcher';

function* rootSaga() {
    yield all([
        loginWatcher()
    ])
}

export default rootSaga;