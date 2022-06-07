import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './auth/reducer';
import groupsReducer from './groups/reducer';
import usersReducer from './users/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    groups: groupsReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ serializableCheck: false }).concat(thunkMiddleware),
    devTools: process.env.REACT_APP_ENV !== 'production',
});

export default store;