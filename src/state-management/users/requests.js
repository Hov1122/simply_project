import axiosApiInstance from "../../helpers/axiosInstance/axiosApiInstance";
import {
  fetchTopStudentsSuccess,
  createUserSuccess,
  deleteUserSuccess,
  fetchUsersFailure,
  fetchUsersPending,
  fetchUsersSuccess,
  updateUserSuccess,
  fetchUserByIdSuccess,
  recoverPasswordSuccess,
  resetPasswordSuccess,
  fetchOnlineUsersSuccess,
} from "./slice";

// GET USERS
export const fetchUsersRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchUsersPending());
    try {
      if (!payload?.search?.length) {
        dispatch(fetchUsersSuccess({ data: { users: [] } }));
        return;
      }
      let url = `/users/?`;
      payload?.search && (url += `search=${payload.search}`);
      const { data } = await axiosApiInstance.get(url);
      dispatch(fetchUsersSuccess(data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.response.data.message));
    }
  };
};

// GET USER BY ID
export const getUserByIdRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchUsersPending());
    try {
      const { data } = await axiosApiInstance.get(`/users/${payload}`);
      dispatch(fetchUserByIdSuccess(data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.response.data.message));
    }
  };
};

// GET ALL ONLINE USERS
export const getAllOnlineUsersRequest = () => {
  return async (dispatch) => {
    dispatch(fetchUsersPending());
    try {
      const { data } = await axiosApiInstance.get(`/users/onlineUsers`);
      dispatch(fetchOnlineUsersSuccess(data.data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.response.data.message));
    }
  };
};

// FILTER TOP 3 USERS
export const getTopStudentsRequest = () => {
  return async (dispatch) => {
    dispatch(fetchUsersPending());
    try {
      const { data } = await axiosApiInstance.get(`/users/topUsers`);
      dispatch(fetchTopStudentsSuccess(data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.response.data.message));
    }
  };
};

// CREATE USER
export const createUserRequest = (payload, setSubmitting) => {
  return async (dispatch) => {
    dispatch(fetchUsersPending());
    try {
      const { data } = await axiosApiInstance.post(`/users`, payload);

      dispatch(createUserSuccess(data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.response.data.message));
    } finally {
      setTimeout(() => setSubmitting(false), 1000);
    }
  };
};

// UPDATE USER
export const updateUserRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchUsersPending());
    try {
      const data = await axiosApiInstance.put(`/users`, payload);
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.response.data.message));
    }
  };
};

// RECOVER USER PASSWORD
export const recoverPasswordRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchUsersPending());
    try {
      await axiosApiInstance.get(`/users/forgotPassword?email=${payload}`);
      dispatch(recoverPasswordSuccess());
    } catch (error) {
      dispatch(fetchUsersFailure(error.response.data.message));
    }
  };
};

// RESET USER PASSWORD
export const resetPasswordRequest = ({ userId, recovery_token, password }) => {
  return async (dispatch) => {
    dispatch(fetchUsersPending());
    try {
      await axiosApiInstance.put(
        `/users/resetPassword/${userId}/${recovery_token}`,
        { password }
      );
      dispatch(resetPasswordSuccess());
    } catch (error) {
      dispatch(fetchUsersFailure(error.response.data.message));
    }
  };
};

// DELETE USER
export const deletedUserRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchUsersPending());
    try {
      const { data } = await axiosApiInstance.delete(`/users`, {
        data: payload,
      });
      dispatch(deleteUserSuccess({ data, payload }));
    } catch (error) {
      dispatch(fetchUsersFailure(error.response.data.message));
    }
  };
};
