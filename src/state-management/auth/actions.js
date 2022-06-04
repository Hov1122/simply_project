import { createAction } from "@reduxjs/toolkit";

export const authTypes = {
    // LOGIN
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_PENDING: 'LOGIN_PENDING',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',

    // LOGOUT
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
}

// LOGIN ACTIONS
export const loginRequest = createAction(authTypes.LOGIN_REQUEST);
export const loginPending = createAction(authTypes.LOGIN_PENDING);
export const loginSuccess = createAction(authTypes.LOGIN_SUCCESS);
export const loginFailure = createAction(authTypes.LOGIN_FAILURE);

// LOGOUT ACTIONS
export const logoutRequest = createAction(authTypes.LOGOUT_REQUEST);
export const logoutSuccess = createAction(authTypes.LOGOUT_SUCCESS);

