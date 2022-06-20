import axiosApiInstance from "../../helpers/axiosInstance/axiosApiInstance";
import {
  createSubjectSuccess,
  fetchSubjectsFailure,
  fetchSubjectsPending,
  fetchSubjectsSuccess,
} from "./actions";

// GET ALL SUBJECTS
export const fetchSubjectsRequest = () => {
  return async (dispatch) => {
    dispatch(fetchSubjectsPending());
    try {
      const { data } = await axiosApiInstance.get(`/subjects`);
      dispatch(fetchSubjectsSuccess(data));
    } catch (error) {
      dispatch(fetchSubjectsFailure(error));
    }
  };
};

// CREATE SUBJECT
export const createSubjectRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchSubjectsPending());
    try {
      const { data } = await axiosApiInstance.post(`/users`, payload);
      dispatch(createSubjectSuccess(data));
    } catch (error) {
      dispatch(fetchSubjectsFailure(error));
    }
  };
};
