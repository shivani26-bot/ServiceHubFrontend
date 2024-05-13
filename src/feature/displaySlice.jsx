import { createSlice } from "@reduxjs/toolkit";

export const displaySlice = createSlice({
  name: "display",
  initialState: {
    customer: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      telephone: "",
    },
    company: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      telephone: "",
    },
    login: {
      email: "",
      password: "",
    },
  },
  reducers: {
    companyRegister: (state, action) => {
      console.log("inside", action.payload);
      state.company.name = action.payload.name;
      state.company.email = action.payload.email;
      state.company.password = action.payload.password;
      state.company.confirmPassword = action.payload.confirmPassword;
      state.company.address = action.payload.address;
      state.company.telephone = action.payload.telephone;
    },
    customerRegister: (state, action) => {
      console.log("inside", action.payload);
      state.customer.name = action.payload.name;
      state.customer.email = action.payload.email;
      state.customer.password = action.payload.password;
      state.customer.confirmPassword = action.payload.confirmPassword;
      state.customer.telephone = action.payload.telephone;
    },
    login: (state, action) => {
      console.log("inside", action.payload);
      state.login.email = action.payload.email;
      state.login.password = action.payload.password;
    },
  },
});

export const { login } = displaySlice.actions;
export const { customerRegister } = displaySlice.actions;
export const { companyRegister } = displaySlice.actions;
export default displaySlice.reducer;
