import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjects: [],
  loading: false,
  error: null,
};

const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    // GET ALL USERS
    fetchSubjectsSuccess: (state, { payload }) => {
      state.subjects = payload.data;
      state.loading = false;
      state.error = null;
    },
    // CREATE USER
    createSubjectSuccess: (state, { payload }) => {
      state.subjects.push(payload.createdUser);
      state.loading = false;
      state.error = null;
    },
    // FETCH PENDING AND FAILURE
    fetchSubjectsPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSubjectsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  fetchSubjectsSuccess,
  createSubjectSuccess,
  fetchSubjectsPending,
  fetchSubjectsFailure,
} = subjectsSlice.actions;

export default subjectsSlice.reducer;
