import { createReducer } from "@reduxjs/toolkit";
import {
  fetchScheduleSuccess,
  fetchGroupScheduleSuccess,
  fetchSchedulePending,
  fetchScheduleFailure,
  createScheduleSuccess,
  updateScheduleSuccess,
  deleteScheduleSuccess,
} from "./actions";

const initialState = {
  groupSchedules: [],
  schedules: [],
  loading: false,
  error: null,
};

const scheduleReducer = createReducer(initialState, (builder) => {
  builder
    // GET ALL SCHEDULES
    .addCase(fetchScheduleSuccess, (state, { payload }) => {
      state.schedules = payload.schedule;
      state.loading = false;
      state.error = null;
    })
    // GET CURRENT GROUP'S SCHEDULES
    .addCase(fetchGroupScheduleSuccess, (state, { payload }) => {
      state.groupSchedules = payload.data;
      state.loading = false;
      state.error = null;
    })
    // CREATE SCHEDULE
    .addCase(createScheduleSuccess, (state, { payload }) => {
      state.schedules.push(payload.createdSchedule);
      state.loading = false;
      state.error = null;
    })
    // UPDATE SCHEDULE
    .addCase(updateScheduleSuccess, (state, { payload }) => {
      state.schedules = state.schedules.map((schedule) => {
        if (schedule.id === payload.updatedSchedule.id) {
          return payload.updatedSchedule;
        }
        return schedule;
      });
    })
    // DELETE SCHEDULE
    .addCase(deleteScheduleSuccess, (state, { payload }) => {
      state.schedules = state.schedules.filter(
        (schedule) => schedule.id !== payload.deletedSchedule.id
      );
    })
    // FETCH PENDING AND FAILURE
    .addCase(fetchSchedulePending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchScheduleFailure, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
});

export default scheduleReducer;
