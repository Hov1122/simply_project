import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // LOGIN
    loginPending: (state) => {
      state.loading = true;
    },

    loginSuccess: (
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
    },

    loginFailure: (state) => {
      state.loading = false;
      state.error = "Invalid email or password";
    },
    // LOGOUT
    logoutSuccess: (state) => {
      state.user = {};
      state.token = "";
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginPending, loginSuccess, loginFailure, logoutSuccess } =
  authSlice.actions;

export default authSlice.reducer;
