import axiosApiInstance from "../../helpers/axiosInstance/axiosApiInstance";
import {
  fetchRolesSuccess,
  fetchRolesPending,
  fetchRolesFailure,
} from "./actions";

// GET ALL GROUPS
export const fetchRoles = () => {
  return async (dispatch) => {
    dispatch(fetchRolesPending());
    try {
      let url = `/roles`;
      const { data } = await axiosApiInstance.get(url);
      dispatch(fetchRolesSuccess(data));
    } catch (error) {
      dispatch(fetchRolesFailure(error));
    }
  };
};
