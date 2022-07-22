import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  loading: false,
  hasMore: true,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // GET ALL GROUPS
    fetchGroupsMessagesSuccess: (state, { payload: { data, initialise } }) => {
      state.hasMore = data.length !== 0;

      if (initialise) state.messages = [...data];
      else state.messages = [...data, ...state.messages];
      state.loading = false;
      state.error = null;
    },
    // FETCH PENDING AND FAILURE
    fetchGroupsMessagesPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGroupsMessagesFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    addUserMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  fetchGroupsMessagesSuccess,
  fetchGroupsMessagesPending,
  fetchGroupsMessagesFailure,
  addUserMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
