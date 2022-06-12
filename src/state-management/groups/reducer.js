import { createReducer } from "@reduxjs/toolkit";
import {
  fetchGroupsSuccess,
  fetchGroupsPending,
  fetchGroupsFailure,
  createGroupSuccess,
  deleteGroupSuccess,
} from "./actions";

const initialState = {
  groups: [],
  loading: false,
  error: null,
};

const groupsReducer = createReducer(initialState, (builder) => {
  builder
    // GET ALL GROUPS
    .addCase(fetchGroupsSuccess, (state, { payload }) => {
      state.groups = payload.groups;
      state.loading = false;
      state.error = null;
    })
    // CREATE GROUP
    .addCase(createGroupSuccess, (state, { payload }) => {
      state.groups.push(payload.createdGroup);
      state.loading = false;
      state.error = null;
    })
    // DELETE GROUP
    .addCase(deleteGroupSuccess, (state, { payload }) => {
      state.groups = state.groups.filter(
        (group) => group.id !== payload.deletedGroup.id
      );
    })
    // FETCH PENDING AND FAILURE
    .addCase(fetchGroupsPending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchGroupsFailure, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
});

export default groupsReducer;
