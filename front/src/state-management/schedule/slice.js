import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupSchedules: [],
  schedules: [],
  loading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    // GET ALL SCHEDULES
    fetchScheduleSuccess: (state, { payload }) => {
      state.schedules = payload.schedule;
      state.loading = false;
      state.error = null;
    },
    // GET CURRENT GROUP'S SCHEDULES
    fetchGroupScheduleSuccess: (state, { payload }) => {
      state.groupSchedules = payload.data;
      state.loading = false;
      state.error = null;
    },
    // CREATE SCHEDULE
    createScheduleSuccess: (state, { payload }) => {
      state.schedules.push(payload.createdSchedule);
      state.loading = false;
      state.error = null;
    },
    // UPDATE SCHEDULE
    updateScheduleSuccess: (state, { payload }) => {
      state.schedules = state.schedules.map((schedule) => {
        if (schedule.id === payload.updatedSchedule.id) {
          return payload.updatedSchedule;
        }
        return schedule;
      });
    },
    // DELETE SCHEDULE
    deleteScheduleSuccess: (state, { payload }) => {
      state.schedules = state.schedules.filter(
        (schedule) => schedule.id !== payload.deletedSchedule.id
      );
    },
    // FETCH PENDING AND FAILURE
    fetchSchedulePending: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchScheduleFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  fetchScheduleSuccess,
  fetchGroupScheduleSuccess,
  createScheduleSuccess,
  updateScheduleSuccess,
  deleteScheduleSuccess,
  fetchSchedulePending,
  fetchScheduleFailure,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
