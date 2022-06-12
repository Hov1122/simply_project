import axiosApiInstance from "../../helpers/axiosInstance/axiosApiInstance";
import {
  deleteGroupSuccess,
  fetchGroupsFailure,
  fetchGroupsPending,
  fetchGroupsSuccess,
  createGroupSuccess,
} from "./actions";

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
      const { data } = await axiosApiInstance.delete(`/groups`, payload);
      dispatch(deleteGroupSuccess(data));
    } catch (error) {
      dispatch(fetchGroupsFailure(error));
    }
  };
};
