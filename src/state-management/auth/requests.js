import axiosApiInstance from "../../helpers/axiosInstance/axiosApiInstance";
import { loginFailure, loginPending, loginSuccess, logoutSuccess } from "./actions";

export const loginRequest = (payload) => {
    return async (dispatch) => {
        dispatch(loginPending());
        try {
            const response = await axiosApiInstance.post(`/auth/login`, payload);
            dispatch(loginSuccess(response));
        } catch(error) {
            dispatch(loginFailure(error));
        }
    }
}

export const logoutRequest = () => {
    return async (dispatch) => {
        dispatch(loginPending());
        try {
            const response = await axiosApiInstance.get(`/auth/logout`);
            dispatch(logoutSuccess(response));
        } catch(error) {
            dispatch(loginFailure(error));
        }
    }
}