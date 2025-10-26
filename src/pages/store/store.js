import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./auth/SessionSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});
