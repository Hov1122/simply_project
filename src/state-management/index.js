import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth/reducer";
import groupsReducer from "./groups/reducer";
import testsReducer from "./tests/reducer";
import usersReducer from "./users/reducer";
import subjectsReducer from "./subjects/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  tests: testsReducer,
  groups: groupsReducer,
  subjects: subjectsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunkMiddleware),
  devTools: process.env.REACT_APP_ENV !== "production",
});

export default store;
