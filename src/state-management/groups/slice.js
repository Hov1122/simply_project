import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  groupUsers: {},
  loading: false,
  error: null,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    // GET ALL GROUPS
    fetchGroupsSuccess: (state, { payload: { data } }) => {
      state.groups = data.groups;
      state.loading = false;
      state.error = null;
    },
    // GET ALL GROUP USERS
    fetchGroupUsersSuccess: (state, { payload: { data } }) => {
      state.groupUsers[data.id] = data.users;
      state.loading = false;
      state.error = null;
    },
    // CREATE GROUP
    createGroupSuccess: (state, { payload }) => {
      state.groups.push(payload.data.createdGroup);
      state.loading = false;
      state.error = null;
    },
    // DELETE GROUP
    deleteGroupSuccess: (state, { payload }) => {
      state.groups = state.groups.filter(
        (group) => !payload.payload.ids.some((id) => id === group.id)
      );
      state.loading = false;
      state.error = null;
    },
    // FETCH PENDING AND FAILURE
    fetchGroupsPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGroupsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  fetchGroupsSuccess,
  fetchGroupUsersSuccess,
  createGroupSuccess,
  deleteGroupSuccess,
  fetchGroupsPending,
  fetchGroupsFailure,
} = groupsSlice.actions;

export default groupsSlice.reducer;
