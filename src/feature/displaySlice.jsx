import { createSlice } from "@reduxjs/toolkit";

export const displaySlice = createSlice({
  name: "display",
  initialState: {
    customer: {
      firstname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    company: {
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phone: "",
    },
    login: {
      username: "",
      password: "",
    },
  },
  reducers: {
    companyRegister: (state, action) => {
      console.log("inside", action.payload);
      state.company.companyName = action.payload.companyName;
      state.company.email = action.payload.email;
      state.company.password = action.payload.password;
      state.company.confirmPassword = action.payload.confirmPassword;
      state.company.address = action.payload.address;
      state.company.phone = action.payload.phone;
    },
    customerRegister: (state, action) => {
      console.log("inside", action.payload);
      state.customer.firstname = action.payload.firstname;
      state.customer.email = action.payload.email;
      state.customer.password = action.payload.password;
      state.customer.confirmPassword = action.payload.confirmPassword;
      state.customer.phone = action.payload.phone;
    },
    login: (state, action) => {
      console.log("inside", action.payload);
      state.login.username = action.payload.username;
      state.login.password = action.payload.password;
    },
  },
});

export const { login } = displaySlice.actions;
export const { customerRegister } = displaySlice.actions;
export const { companyRegister } = displaySlice.actions;
export default displaySlice.reducer;
