import { createAction } from "@reduxjs/toolkit";

export const groupTypes = {
    // GET ALL GROUPS
    FETCH_GROUPS_SUCCESS: "FETCH_GROUPS_SUCCESS",

    // CREATE GROUP
    CREATE_GROUP_SUCCESS: "CREATE_GROUP_SUCCESS",

    // DELETE GROUP
    DELETE_GROUP_SUCCESS: "DELETE_GROUP_SUCCESS",

    // FETCH PENDING AND FAILURE
    FETCH_GROUPS_PENDING: "FETCH_GROUPS_PENDING",
    FETCH_GROUPS_FAILURE: "FETCH_GROUPS_FAILURE",

}

// GET ALL GROUPS
export const fetchGroupsSuccess = createAction(groupTypes.FETCH_GROUPS_SUCCESS);

// CREATE GROUP
export const createGroupSuccess = createAction(groupTypes.CREATE_GROUP_SUCCESS);

// DELETE GROUP
export const deleteGroupSuccess = createAction(groupTypes.DELETE_GROUP_SUCCESS);

// FETCH PENDING AND FAILURE
export const fetchGroupsPending = createAction(groupTypes.FETCH_GROUPS_PENDING);
export const fetchGroupsFailure = createAction(groupTypes.FETCH_GROUPS_FAILURE);