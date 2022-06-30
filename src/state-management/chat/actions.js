import { createAction } from "@reduxjs/toolkit";

export const groupTypes = {
  // GET ALL GROUPS
  FETCH_GROUP_MESSAGES_SUCCESS: "FETCH_GROUP_MESSAGES_SUCCESS",
  FETCH_GROUP_MESSAGES_PENDING: "FETCH_GROUP_MESSAGES_PENDING",
  FETCH_GROUP_MESSAGES_FAILURE: "FETCH_GROUP_MESSAGES_FAILURE",

  ADD_USER_MESSAGE: "ADD_USER_MESSAGE",
};

// GET ALL GROUPS
export const fetchGroupsMessagesSuccess = createAction(
  groupTypes.FETCH_GROUP_MESSAGES_SUCCESS
);
export const fetchGroupsMessagesPending = createAction(
  groupTypes.FETCH_GROUP_MESSAGES_PENDING
);
export const fetchGroupsMessagesFailure = createAction(
  groupTypes.FETCH_GROUP_MESSAGES_FAILURE
);
export const addUserMessage = createAction(groupTypes.ADD_USER_MESSAGE);
