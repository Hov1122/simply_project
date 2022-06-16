import { createReducer } from "@reduxjs/toolkit";
import {
  createSubjectSuccess,
  fetchSubjectsFailure,
  fetchSubjectsPending,
  fetchSubjectsSuccess,
} from "./actions";

const initialState = {
  subjects: [],
  loading: false,
  error: null,
};

const subjectsReducer = createReducer(initialState, (builder) => {
  builder
    // GET ALL USERS
    .addCase(fetchSubjectsSuccess, (state, { payload }) => {
      state.subjects = payload.data;
      state.loading = false;
      state.error = null;
    })
    // CREATE USER
    .addCase(createSubjectSuccess, (state, { payload }) => {
      state.subjects.push(payload.createdUser);
      state.loading = false;
      state.error = null;
    })
    // FETCH PENDING AND FAILURE
    .addCase(fetchSubjectsPending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSubjectsFailure, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
});

export default subjectsReducer;
