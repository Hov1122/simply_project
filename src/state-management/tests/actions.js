import { createAction } from "@reduxjs/toolkit";

export const testTypes = {
  // GET ALL TESTS
  FETCH_TESTS_SUCCESS: "FETCH_TESTS_SUCCESS",

  // GET CURRENT USER'S TESTS
  FETCH_USER_TESTS_SUCCESS: "FETCH_USER_TESTS_SUCCESS",

  // SUBMIT TEST
  SUBMIT_TEST_SUCCESS: "SUBMIT_TEST_SUCCESS",

  // CREATE TEST
  CREATE_TEST_SUCCESS: "CREATE_TEST_SUCCESS",

  // UPDATE TEST
  UPDATE_TEST_SUCCESS: "UPDATE_TEST_SUCCESS",

  // DELETE TEST
  DELETE_TEST_SUCCESS: "DELETE_TEST_SUCCESS",

  // FETCH PENDING AND FAILURE
  FETCH_TESTS_PENDING: "FETCH_TESTS_PENDING",
  FETCH_TESTS_FAILURE: "FETCH_TESTS_FAILURE",
};

// GET ALL TESTS
export const fetchTestsSuccess = createAction(testTypes.FETCH_TESTS_SUCCESS);

// GET CURRENT USER'S TESTS
export const fetchUserTestsSuccess = createAction(
  testTypes.FETCH_USER_TESTS_SUCCESS
);

// SUBMIT TEST
export const submitTestSuccess = createAction(testTypes.SUBMIT_TEST_SUCCESS);

// CREATE TEST
export const createTestSuccess = createAction(testTypes.CREATE_TEST_SUCCESS);

// UPDATE TEST
export const updateTestSuccess = createAction(testTypes.UPDATE_TEST_SUCCESS);

// DELETE TEST
export const deleteTestSuccess = createAction(testTypes.DELETE_TEST_SUCCESS);

// FETCH PENDING AND FAILURE
export const fetchTestsPending = createAction(testTypes.FETCH_TESTS_PENDING);
export const fetchTestsFailure = createAction(testTypes.FETCH_TESTS_FAILURE);
