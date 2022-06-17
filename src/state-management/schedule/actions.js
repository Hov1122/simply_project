import { createAction } from "@reduxjs/toolkit";

export const scheduleTypes = {
  // GET ALL SCHEDULES
  FETCH_SCHEDULE_SUCCESS: "FETCH_SCHEDULE_SUCCESS",

  // GET CURRENT GROUP'S SCHEDULES
  FETCH_GROUP_SCHEDULE_SUCCESS: "FETCH_GROUP_SCHEDULE_SUCCESS",

  // CREATE SCHEDULE
  CREATE_SCHEDULE_SUCCESS: "CREATE_SCHEDULE_SUCCESS",

  // UPDATE SCHEDULE
  UPDATE_SCHEDULE_SUCCESS: "UPDATE_SCHEDULE_SUCCESS",

  // DELETE SCHEDULE
  DELETE_SCHEDULE_SUCCESS: "DELETE_SCHEDULE_SUCCESS",

  // FETCH PENDING AND FAILURE
  FETCH_SCHEDULE_PENDING: "FETCH_SCHEDULE_PENDING",
  FETCH_SCHEDULE_FAILURE: "FETCH_SCHEDULE_FAILURE",
};

// GET ALL SCHEDULES
export const fetchScheduleSuccess = createAction(scheduleTypes.FETCH_SCHEDULE_SUCCESS);

// GET CURRENT GROUP'S SCHEDULES
export const fetchGroupScheduleSuccess = createAction(
  scheduleTypes.FETCH_GROUP_SCHEDULE_SUCCESS
);

// CREATE SCHEDULE
export const createScheduleSuccess = createAction(scheduleTypes.CREATE_SCHEDULE_SUCCESS);

// UPDATE SCHEDULE
export const updateScheduleSuccess = createAction(scheduleTypes.UPDATE_SCHEDULE_SUCCESS);

// DELETE SCHEDULE
export const deleteScheduleSuccess = createAction(scheduleTypes.DELETE_SCHEDULE_SUCCESS);

// FETCH PENDING AND FAILURE
export const fetchSchedulePending = createAction(scheduleTypes.FETCH_SCHEDULE_PENDING);
export const fetchScheduleFailure = createAction(scheduleTypes.FETCH_SCHEDULE_FAILURE);
