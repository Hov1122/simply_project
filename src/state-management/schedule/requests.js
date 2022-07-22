import axiosApiInstance from "../../helpers/axiosInstance/axiosApiInstance";
import {
  fetchScheduleSuccess,
  fetchGroupScheduleSuccess,
  fetchSchedulePending,
  fetchScheduleFailure,
  createScheduleSuccess,
  updateScheduleSuccess,
  deleteScheduleSuccess,
} from "./slice";

// GET ALL SCHEDULES
export const fetchSchedulesRequest = () => {
  return async (dispatch) => {
    dispatch(fetchSchedulePending());
    try {
      const { data } = await axiosApiInstance.get(`/schedules`);
      dispatch(fetchScheduleSuccess(data));
    } catch (error) {
      dispatch(fetchScheduleFailure(error));
    }
  };
};

// GET CURRENT GROUP'S SCHEDULE
export const fetchGroupScheduleRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchSchedulePending());
    try {
      const { data } = await axiosApiInstance.get(
        `/schedules/group/` + payload
      );
      dispatch(fetchGroupScheduleSuccess(data));
    } catch (error) {
      dispatch(fetchScheduleFailure(error));
    }
  };
};

// CREATE SCHEDULE
export const createScheduleRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchSchedulePending());
    try {
      const { data } = await axiosApiInstance.post(`/schedules`, payload);
      dispatch(createScheduleSuccess(data));
    } catch (error) {
      dispatch(fetchScheduleFailure(error));
    }
  };
};

// UPDATE SCHEDULE
export const updateScheduleRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchSchedulePending());
    try {
      const { data } = await axiosApiInstance.put(`/schedules`, payload);
      dispatch(updateScheduleSuccess(data));
    } catch (error) {
      dispatch(fetchScheduleFailure(error));
    }
  };
};

// DELETE SCHEDULE
export const deletedScheduleRequest = (payload) => {
  return async (dispatch) => {
    dispatch(fetchSchedulePending());
    try {
      const { data } = await axiosApiInstance.delete(`/schedules`, payload);
      dispatch(deleteScheduleSuccess(data));
    } catch (error) {
      dispatch(fetchScheduleFailure(error));
    }
  };
};
