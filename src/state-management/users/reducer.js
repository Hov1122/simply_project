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
    .addCase(fetchUsersSuccess, (state, { payload: { data } }) => {
      state.users = data.users;
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
    .addCase(updateUserSuccess, (state, { payload:{data:{data}} }) => {
      state.users = state.users.map((user) => {
        if (user.id === data.updatedUser.id) {
          return data.updatedUser;
        }
        return user;
      });
      state.error = null;
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
    .addCase(fetchUsersFailure, (state) => {
      state.loading = false;
      state.error = "Incorrect Password";
    });
});

export default usersReducer;
