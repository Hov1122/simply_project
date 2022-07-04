import { createAction } from "@reduxjs/toolkit";

export const roleTypes = {
  // GET ALL GROUPS
  FETCH_ROLES_SUCCESS: "FETCH_ROLES_SUCCESS",
  FETCH_ROLES_PENDING: "FETCH_ROLES_PENDING",
  FETCH_ROLES_FAILURE: "FETCH_ROLES_FAILURE",
};

// GET ALL GROUPS
export const fetchRolesSuccess = createAction(roleTypes.FETCH_ROLES_SUCCESS);
export const fetchRolesPending = createAction(roleTypes.FETCH_ROLES_PENDING);
export const fetchRolesFailure = createAction(roleTypes.FETCH_ROLES_FAILURE);
