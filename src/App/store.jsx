import { configureStore } from "@reduxjs/toolkit";
import displaySlice from "../feature/displaySlice";
import apiSlice from "../feature/apiSlice";
import authSlice from "../feature/authSlice";
import serviceSlice from "../feature/serviceSlice";
import getAllServicesSlice from "../feature/getAllServicesSlice";
import getCompanyServiceSlice from "../feature/getCompanyServiceSlice";
import deleteServiceSlice from "../feature/deleteServiceSlice";
export const reduxStore = configureStore({
  reducer: {
    display: displaySlice, //companyregister data
    api: apiSlice,
    auth: authSlice,
    services: serviceSlice,
    getServices: getAllServicesSlice,
    getCompanyServices: getCompanyServiceSlice,
    deleteService: deleteServiceSlice,
  },
});

export default reduxStore;
