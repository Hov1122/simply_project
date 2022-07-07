import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topStudents: [],
  users: [],
  userProfile: {},
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // GET ALL USERS
    fetchUsersSuccess: (state, { payload: { data } }) => {
      state.users = data.users;
      state.loading = false;
      state.error = null;
    },
    // GET USER BY ID
    fetchUserByIdSuccess: (state, { payload: { data } }) => {
      state.userProfile = data.user;
      state.loading = false;
      state.error = null;
    },
    // GET TOP 3 USERS
    fetchTopStudentsSuccess: (state, { payload: { data } }) => {
      state.topStudents = data;
      state.loading = false;
      state.error = null;
    },
    // CREATE USER
    createUserSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    // UPDATE USER
    updateUserSuccess: (
      state,
      {
        payload: {
          data: { data },
        },
      }
    ) => {
      state.users = state.users.map((user) => {
        if (user.id === data.updatedUser.id) {
          return data.updatedUser;
        }
        return user;
      });
      state.error = null;
    },
    // RECOVER USER PASSWORD
    recoverPasswordSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    // DELETE USER
    deleteUserSuccess: (state, { payload }) => {
      state.users = state.users.filter(
        (user) => user.id !== payload.deletedUser.id
      );
      state.loading = false;
      state.error = null;
    },
    // FETCH PENDING AND FAILURE
    fetchUsersPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersFailure: (state) => {
      state.loading = false;
      state.error = "Incorrect Password";
    },
  },
});

export const {
  fetchUsersSuccess,
  fetchUserByIdSuccess,
  fetchTopStudentsSuccess,
  createUserSuccess,
  updateUserSuccess,
  recoverPasswordSuccess,
  deleteUserSuccess,
  fetchUsersPending,
  fetchUsersFailure,
} = usersSlice.actions;

export default usersSlice.reducer;
