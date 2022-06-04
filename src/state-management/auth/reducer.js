import { createReducer } from "@reduxjs/toolkit";
import { loginSuccess, loginFailure, loginPending, logoutSuccess } from "./actions";

const initialState = {
    user: {},
    token: '',
    loading: false,
    error: null
}

const authReducer = createReducer(initialState, builder => {
    builder
        // LOGIN
        .addCase(loginPending, (state, { payload }) => {
            state.loading = true;
        })
        .addCase(loginSuccess, (state, { payload: { data } }) => {
            state.user = data.user;
            state.token = data.accessToken;
            state.loading = false;
            state.error = null;
        })
        .addCase(loginFailure, (state, { payload }) => {
            state.loading = false;
            state.error = 'Invalid email or password';
        })
        // LOGOUT
        .addCase(logoutSuccess, (state, { payload }) => {
            state.user = {};
            state.token = '';
            state.loading = false;
            state.error = null;
        })
})


export default authReducer;