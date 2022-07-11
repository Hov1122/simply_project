import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userTests: [],
  testResults: {},
  currentTest: {},
  tests: [],
  count: 0,
  loading: false,
  error: null,
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    // GET ALL TESTS
    fetchTestsSuccess: (state, { payload }) => {
      state.tests = payload.tests;
      state.loading = false;
      state.error = null;
    },
    // GET TEST BY ID
    fetchTestByIdSuccess: (state, { payload: { data } }) => {
      state.currentTest = data;
      state.loading = false;
      state.error = null;
    },
    // GET CURRENT USER'S TESTS
    fetchUserTestsSuccess: (
      state,
      {
        payload: {
          data: { count, allTests },
        },
      }
    ) => {
      state.userTests = allTests;
      state.count = count._count;
      state.loading = false;
      state.error = null;
    },
    // TEST RESULTS
    fetchTestResultsSuccess: (state, { payload: { data } }) => {
      state.testResults = data;
      state.loading = false;
      state.error = null;
    },
    // CREATE TEST
    createTestSuccess: (state, { payload }) => {
      state.tests.push(payload.data.createdTest);
      state.userTests.push(payload.data.createdTest);
      state.loading = false;
      state.error = null;
    },
    // UPDATE TEST
    updateTestSuccess: (state, { payload }) => {
      state.tests = state.tests.map((test) => {
        if (test.id === payload.updatedTest.id) {
          return payload.updatedTest;
        }
        return test;
      });
    },
    // DELETE TEST
    deleteTestSuccess: (state, { payload }) => {
      state.tests = state.tests.filter(
        (test) => test.id !== payload.deletedTest.id
      );
    },
    // FETCH PENDING AND FAILURE
    fetchTestsPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTestsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  fetchTestsSuccess,
  fetchTestByIdSuccess,
  fetchUserTestsSuccess,
  fetchTestResultsSuccess,
  createTestSuccess,
  updateTestSuccess,
  deleteTestSuccess,
  fetchTestsPending,
  fetchTestsFailure,
} = testsSlice.actions;

export default testsSlice.reducer;
