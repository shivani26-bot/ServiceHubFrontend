import { configureStore } from "@reduxjs/toolkit";
import displaySlice from "../feature/displaySlice";
import apiSlice from "../feature/apiSlice";
import authSlice from "../feature/authSlice";
import serviceSlice from "../feature/serviceSlice";

export const reduxStore = configureStore({
  reducer: {
    display: displaySlice, //companyregister data
    api: apiSlice,
    auth: authSlice,
    service: serviceSlice,
  },
});

export default reduxStore;
