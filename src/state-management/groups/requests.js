import axiosApiInstance from "../../helpers/axiosInstance/axiosApiInstance";
import {
  deleteGroupSuccess,
  fetchGroupsFailure,
  fetchGroupsPending,
  fetchGroupsSuccess,
  createGroupSuccess,
  fetchGroupUsersSuccess,
} from "./slice";

// GET ALL GROUPS
export const fetchGroupsRequest = () => {
  return async (dispatch) => {
    dispatch(fetchGroupsPending());
    try {
      const { data } = await axiosApiInstance.get(`/groups`);
      dispatch(fetchGroupsSuccess(data));
    } catch (error) {
      dispatch(fetchGroupsFailure(error));
    }
  };
};

// GET ALL USERS FOR GROUP
export const fetchGroupUsers = (payload) => {
  return async (dispatch) => {
    dispatch(fetchGroupsPending());
    try {
      const { data } = await axiosApiInstance.get(`/groups/${payload}/users`);
      dispatch(fetchGroupUsersSuccess(data));
    } catch (error) {
      dispatch(fetchGroupsFailure(error));
    }
  };
};

// CREATE GROUP
export const createGroupRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchGroupsPending());
    try {
      const { data } = await axiosApiInstance.post(`/groups`, payload);
      dispatch(createGroupSuccess(data));
    } catch (error) {
      dispatch(fetchGroupsFailure(error));
    }
  };
};

// DELETE GROUP
export const deleteGroupRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchGroupsPending());
    try {
      const { data } = await axiosApiInstance.delete(`/groups`, {
        data: payload,
      });
      dispatch(deleteGroupSuccess({ data, payload }));
    } catch (error) {
      dispatch(fetchGroupsFailure(error));
    }
  };
};
