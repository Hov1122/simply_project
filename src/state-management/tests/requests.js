import axiosApiInstance from "../../helpers/axiosInstance/axiosApiInstance";
import {
  fetchTestsSuccess,
  fetchTestsPending,
  fetchTestsFailure,
  createTestSuccess,
  updateTestSuccess,
  deleteTestSuccess,
  fetchUserTestsSuccess,
  fetchTestResultsSuccess,
  fetchTestByIdSuccess,
} from "./slice";

// GET ALL TESTS
export const fetchTestsRequest = () => {
  return async (dispatch) => {
    dispatch(fetchTestsPending());
    try {
      const { data } = await axiosApiInstance.get(`/tests`);
      dispatch(fetchTestsSuccess(data));
    } catch (error) {
      dispatch(fetchTestsFailure(error));
    }
  };
};

// GET TEST BY ID
export const fetchTestById = ({ id }) => {
  return async (dispatch) => {
    dispatch(fetchTestsPending());
    try {
      const { data } = await axiosApiInstance.get(`/tests/${id}`, { id });
      dispatch(fetchTestByIdSuccess(data));
    } catch (error) {
      dispatch(fetchTestsFailure(error));
    }
  };
};

// GET CURRENT USER'S TESTS
export const fetchUserTestsRequest = (payload) => {
  const { skip, isComplete, id, filterBy } = payload;
  let url = `/tests/usersAll?take=5`;

  skip ? (url += `&skip=${skip}`) : null;
  isComplete ? (url += `&isComplete=${isComplete}`) : null;

  if (filterBy && !filterBy["all"])
    url += `&subjectId=${filterBy["subjectId"]}`;

  return async (dispatch) => {
    dispatch(fetchTestsPending());
    try {
      const { data } = await axiosApiInstance.get(url, id);
      dispatch(fetchUserTestsSuccess(data));
    } catch (error) {
      dispatch(fetchTestsFailure(error));
    }
  };
};

// SUBMIT TEST REQUEST
export const submitTestRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchTestsPending());
    try {
      await axiosApiInstance.post(`/users/submitTest`, payload);
    } catch (error) {
      dispatch(fetchTestsFailure(error));
    }
  };
};

// FETCH TEST RESULTS
export const fetchTestResults = ({ userId, testId }) => {
  return async (dispatch) => {
    dispatch(fetchTestsPending());
    try {
      const { data } = await axiosApiInstance.get(
        `/users/testResults/${userId}/${testId}`
      );
      dispatch(fetchTestResultsSuccess(data));
    } catch (error) {
      dispatch(fetchTestsFailure(error));
    }
  };
};

// CREATE TEST
export const createTestRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchTestsPending());
    try {
      const { data } = await axiosApiInstance.post(`/tests`, payload);
      dispatch(createTestSuccess(data));
    } catch (error) {
      dispatch(fetchTestsFailure(error));
    }
  };
};

// UPDATE TEST
export const updateUserRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchTestsPending());
    try {
      const { data } = await axiosApiInstance.put(`/tests`, payload);
      dispatch(updateTestSuccess(data));
    } catch (error) {
      dispatch(fetchTestsFailure(error));
    }
  };
};

// DELETE TEST
export const deletedUserRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchTestsPending());
    try {
      const { data } = await axiosApiInstance.delete(`/tests`, payload);
      dispatch(deleteTestSuccess(data));
    } catch (error) {
      dispatch(fetchTestsFailure(error));
    }
  };
};
