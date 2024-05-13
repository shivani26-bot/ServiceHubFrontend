import { configureStore } from "@reduxjs/toolkit";
import displaySlice from "../feature/displaySlice";
import apiSlice from "../feature/apiSlice";
export const reduxStore = configureStore({
  reducer: {
    display: displaySlice, //companyregister data
    api: apiSlice,
  },
});

export default reduxStore;
