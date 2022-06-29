import axiosApiInstance from "../../helpers/axiosInstance/axiosApiInstance";
import { createUserSuccess, deleteUserSuccess, fetchUsersFailure, fetchUsersPending, fetchUsersSuccess, updateUserSuccess } from "./actions";

// GET ALL USERS
export const fetchUsersRequest = () => {
    return async (dispatch) => {
        dispatch(fetchUsersPending());
        try {
            const { data } = await axiosApiInstance.get(`/users`);
            dispatch(fetchUsersSuccess(data));
        } catch(error) {
            dispatch(fetchUsersFailure(error));
        }
    }
}

// CREATE USER
export const createUserRequest = (payload) => {
    return async (dispatch) => {
        dispatch(fetchUsersPending());
        try {
            const { data } = await axiosApiInstance.post(`/users`, payload);
            dispatch(createUserSuccess(data));
        } catch(error) {
            dispatch(fetchUsersFailure(error));
        }
    }
}

// UPDATE USER
export const updateUserRequest = (payload) => {
    return async (dispatch) => {
        dispatch(fetchUsersPending());
        try {
            const data = await axiosApiInstance.put(`/users`, payload);
            console.log(data)
            dispatch(updateUserSuccess(data));
        } catch(error) {
            dispatch(fetchUsersFailure(error));
        }
    }
}

// DELETE USER
export const deletedUserRequest = (payload) => {
    return async (dispatch) => {
        dispatch(fetchUsersPending());
        try {
            const { data } = await axiosApiInstance.delete(`/users`, payload);
            dispatch(deleteUserSuccess(data));
        } catch(error) {
            dispatch(fetchUsersFailure(error));
        }
    }
}