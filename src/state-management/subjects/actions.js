import { createAction } from "@reduxjs/toolkit";

export const userTypes = {
  // GET ALL SUBJECTS
  FETCH_SUBJECTS_SUCCESS: "FETCH_SUBJECTS_SUCCESS",

  // CREATE SUBJECT
  CREATE_SUBJECT_SUCCESS: "CREATE_SUBJECT_SUCCESS",

  // FETCH PENDING AND FAILURE
  FETCH_SUBJECTS_PENDING: "FETCH_SUBJECTS_PENDING",
  FETCH_SUBJECTS_FAILURE: "FETCH_SUBJECTS_FAILURE",
};

// GET ALL SUBJECTS
export const fetchSubjectsSuccess = createAction(
  userTypes.FETCH_SUBJECTS_SUCCESS
);

// CREATE SUBJECT
export const createSubjectSuccess = createAction(
  userTypes.CREATE_SUBJECT_SUCCESS
);

// FETCH PENDING AND FAILURE
export const fetchSubjectsPending = createAction(
  userTypes.FETCH_SUBJECTS_PENDING
);
export const fetchSubjectsFailure = createAction(
  userTypes.FETCH_SUBJECTS_FAILURE
);
