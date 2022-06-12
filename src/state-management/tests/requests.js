import axiosApiInstance from "../../helpers/axiosInstance/axiosApiInstance";
import { fetchTestsSuccess, fetchTestsPending, fetchTestsFailure, createTestSuccess, updateTestSuccess, deleteTestSuccess } from "./actions";

// GET ALL TESTS
export const fetchTestsRequest = () => {
    return async (dispatch) => {
        dispatch(fetchTestsPending());
        try {
            const { data } = await axiosApiInstance.get(`/tests`);
            dispatch(fetchTestsSuccess(data));
        } catch(error) {
            dispatch(fetchTestsFailure(error));
        }
    }
}

// CREATE TEST
export const createUserRequest = (payload) => {
    return async (dispatch) => {
        dispatch(fetchTestsPending());
        try {
            const { data } = await axiosApiInstance.post(`/tests`, payload);
            dispatch(createTestSuccess(data));
        } catch(error) {
            dispatch(fetchTestsFailure(error));
        }
    }
}

// UPDATE TEST
export const updateUserRequest = (payload) => {
    return async (dispatch) => {
        dispatch(fetchTestsPending());
        try {
            const { data } = await axiosApiInstance.put(`/tests`, payload);
            dispatch(updateTestSuccess(data));
        } catch(error) {
            dispatch(fetchTestsFailure(error));
        }
    }
}

// DELETE TEST
export const deletedUserRequest = (payload) => {
    return async (dispatch) => {
        dispatch(fetchTestsPending());
        try {
            const { data } = await axiosApiInstance.delete(`/tests`, payload);
            dispatch(deleteTestSuccess(data));
        } catch(error) {
            dispatch(fetchTestsFailure(error));
        }
    }
}