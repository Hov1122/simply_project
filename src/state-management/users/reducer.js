import { createReducer } from "@reduxjs/toolkit";
import {
  fetchUsersSuccess,
  fetchUsersPending,
  fetchUsersFailure,
  createUserSuccess,
  updateUserSuccess,
  deleteUserSuccess,
} from "./actions";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const usersReducer = createReducer(initialState, (builder) => {
  builder
    // GET ALL USERS
    .addCase(fetchUsersSuccess, (state, { payload }) => {
      state.users = payload.users;
      state.loading = false;
      state.error = null;
    })
    // CREATE USER
    .addCase(createUserSuccess, (state, { payload }) => {
      state.users.push(payload.createdUser);
      state.loading = false;
      state.error = null;
    })
    // UPDATE USER
    .addCase(updateUserSuccess, (state, { payload }) => {
      state.users = state.users.map((user) => {
        if (user.id === payload.updatedUser.id) {
          return payload.updatedUser;
        }
        return user;
      });
    })
    // DELETE USER
    .addCase(deleteUserSuccess, (state, { payload }) => {
      state.users = state.users.filter(
        (user) => user.id !== payload.deletedUser.id
      );
    })
    // FETCH PENDING AND FAILURE
    .addCase(fetchUsersPending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUsersFailure, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
});

export default usersReducer;
