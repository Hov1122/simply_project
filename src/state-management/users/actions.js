import { createAction } from "@reduxjs/toolkit";

export const userTypes = {
    // GET ALL USERS
    FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",

    // CREATE USER
    CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",

    // UPDATE USER
    UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",

    // DELETE USER
    DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",

    // FETCH PENDING AND FAILURE
    FETCH_USERS_PENDING: "FETCH_USERS_PENDING",
    FETCH_USERS_FAILURE: "FETCH_USERS_FAILURE",

}

// GET ALL USERS
export const fetchUsersSuccess = createAction(userTypes.FETCH_USERS_SUCCESS);

// CREATE USER
export const createUserSuccess = createAction(userTypes.CREATE_USER_SUCCESS);

// UPDATE USER
export const updateUserSuccess = createAction(userTypes.UPDATE_USER_SUCCESS);

// DELETE USER
export const deleteUserSuccess = createAction(userTypes.DELETE_USER_SUCCESS);

// FETCH PENDING AND FAILURE
export const fetchUsersPending = createAction(userTypes.FETCH_USERS_PENDING);
export const fetchUsersFailure = createAction(userTypes.FETCH_USERS_FAILURE);
