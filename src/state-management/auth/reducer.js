import { createReducer } from "@reduxjs/toolkit";
import {
  loginSuccess,
  loginFailure,
  loginPending,
  logoutSuccess,
} from "./actions";

const initialState = {
  user: {},
  token: "",
  loading: false,
  error: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    // LOGIN
    .addCase(loginPending, (state) => {
      state.loading = true;
    })
    .addCase(
      loginSuccess,
      (
        state,
        {
          payload: {
            data: { data },
          },
        }
      ) => {
        state.user = data.user;
        state.token = data.accessToken;
        state.loading = false;
        state.error = null;
      }
    )
    .addCase(loginFailure, (state) => {
      state.loading = false;
      state.error = "Invalid email or password";
    })
    // LOGOUT
    .addCase(logoutSuccess, (state) => {
      state.user = {};
      state.token = "";
      state.loading = false;
      state.error = null;
    });
});

export default authReducer;
