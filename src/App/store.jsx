import { configureStore } from "@reduxjs/toolkit";
import displaySlice from "../feature/displaySlice";
export const reduxStore = configureStore({
  reducer: {
    display: displaySlice,
  },
});

export default reduxStore;
