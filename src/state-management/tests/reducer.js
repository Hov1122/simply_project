import { createReducer } from "@reduxjs/toolkit";
import {
  fetchTestsSuccess,
  fetchUserTestsSuccess,
  fetchTestsPending,
  fetchTestsFailure,
  createTestSuccess,
  updateTestSuccess,
  deleteTestSuccess,
} from "./actions";

const initialState = {
  userTests: [],
  tests: [],
  count: 0,
  loading: false,
  error: null,
};

const testsReducer = createReducer(initialState, (builder) => {
  builder
    // GET ALL TESTS
    .addCase(fetchTestsSuccess, (state, { payload }) => {
      state.tests = payload.tests;
      state.loading = false;
      state.error = null;
    })
    // GET CURRENT USER'S TESTS
    .addCase(
      fetchUserTestsSuccess,
      (
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
      }
    )
    // CREATE TEST
    .addCase(createTestSuccess, (state, { payload }) => {
      state.tests.push(payload.createdTest);
      state.loading = false;
      state.error = null;
    })
    // UPDATE TEST
    .addCase(updateTestSuccess, (state, { payload }) => {
      state.tests = state.tests.map((test) => {
        if (test.id === payload.updatedTest.id) {
          return payload.updatedTest;
        }
        return test;
      });
    })
    // DELETE TEST
    .addCase(deleteTestSuccess, (state, { payload }) => {
      state.tests = state.tests.filter(
        (test) => test.id !== payload.deletedTest.id
      );
    })
    // FETCH PENDING AND FAILURE
    .addCase(fetchTestsPending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchTestsFailure, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
});

export default testsReducer;
