import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './auth/reducer';
import rootSaga from './sagas/rootSaga';

const rootReducer = combineReducers({
    auth: authReducer
})

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(sagaMiddleware),
    devTools: process.env.REACT_APP_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export default store;