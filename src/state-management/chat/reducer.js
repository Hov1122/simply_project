import { createReducer } from "@reduxjs/toolkit";
import {
  fetchGroupsMessagesSuccess,
  fetchGroupsMessagesPending,
  fetchGroupsMessagesFailure,
  addUserMessage,
} from "./actions";

const initialState = {
  messages: [],
  loading: false,
  hasMore: true,
  error: null,
};

const chatsReducer = createReducer(initialState, (builder) => {
  builder
    // GET ALL GROUPS
    .addCase(
      fetchGroupsMessagesSuccess,
      (state, { payload: { data, initialise } }) => {
        state.hasMore = data.length !== 0;

        if (initialise) state.messages = [...data];
        else state.messages = [...data, ...state.messages];
        state.loading = false;
        state.error = null;
      }
    )
    // FETCH PENDING AND FAILURE
    .addCase(fetchGroupsMessagesPending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchGroupsMessagesFailure, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    })
    .addCase(addUserMessage, (state, { payload }) => {
      state.messages = [...state.messages, payload];
      state.loading = false;
      state.error = payload;
    });
});

export default chatsReducer;
