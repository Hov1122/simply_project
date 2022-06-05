import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './auth/reducer';
import groupsReducer from './groups/reducer';
import tokenMiddleware from './middleware/tokenMiddleware';
import rootSaga from './sagas/rootSaga';
import usersReducer from './users/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    groups: groupsReducer
})

const sagaMiddleware = createSagaMiddleware();


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(tokenMiddleware, sagaMiddleware),
    devTools: process.env.REACT_APP_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export default store;