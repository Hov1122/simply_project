import { createReducer } from "@reduxjs/toolkit";
import {
  fetchRolesSuccess,
  fetchRolesPending,
  fetchRolesFailure,
} from "./actions";

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

const rolesReducer = createReducer(initialState, (builder) => {
  builder
    // GET ALL GROUPS
    .addCase(fetchRolesSuccess, (state, { payload: { data } }) => {
      state.roles = [...data];
      state.loading = false;
      state.error = null;
    })
    // FETCH PENDING AND FAILURE
    .addCase(fetchRolesPending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchRolesFailure, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
});

export default rolesReducer;
