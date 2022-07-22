import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    // GET ALL GROUPS
    fetchRolesSuccess: (state, { payload: { data } }) => {
      state.roles = [...data];
      state.loading = false;
      state.error = null;
    },
    // FETCH PENDING AND FAILURE
    fetchRolesPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRolesFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { fetchRolesSuccess, fetchRolesPending, fetchRolesFailure } =
  rolesSlice.actions;

export default rolesSlice.reducer;
