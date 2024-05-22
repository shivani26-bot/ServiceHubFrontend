import { configureStore } from "@reduxjs/toolkit";
import displaySlice from "../feature/displaySlice";
import apiSlice from "../feature/apiSlice";
import authSlice from "../feature/authSlice";
import serviceSlice from "../feature/serviceSlice";
import getAllServicesSlice from "../feature/getAllServicesSlice";
import getCompanyServiceSlice from "../feature/getCompanyServiceSlice";
import deleteServiceSlice from "../feature/deleteServiceSlice";
import updateServiceSlice from "../feature/updateServiceSlice";
import searchSlice from "../feature/searchSlice";
export const reduxStore = configureStore({
  reducer: {
    display: displaySlice, //companyregister data
    api: apiSlice,
    auth: authSlice,
    services: serviceSlice,
    getAllServices: getAllServicesSlice,
    getCompanyServices: getCompanyServiceSlice,
    deleteService: deleteServiceSlice,
    updateService: updateServiceSlice,
    search: searchSlice,
  },
});

export default reduxStore;
