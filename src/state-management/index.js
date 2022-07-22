import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth/slice";
import groupsReducer from "./groups/slice";
import testsReducer from "./tests/slice";
import usersReducer from "./users/slice";
import subjectsReducer from "./subjects/slice";
import scheduleReducer from "./schedule/slice";
import chatsReducer from "./chat/slice";
import rolesReducer from "./role/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  tests: testsReducer,
  groups: groupsReducer,
  subjects: subjectsReducer,
  schedules: scheduleReducer,
  chats: chatsReducer,
  roles: rolesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunkMiddleware),
  devTools: process.env.REACT_APP_ENV !== "production",
});

export default store;
