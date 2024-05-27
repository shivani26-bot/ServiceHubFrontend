// import { createSlice } from "@reduxjs/toolkit";

// export const displaySlice = createSlice({
//   name: "display",
//   initialState: {
//     admin: {
//       firstname: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phone: "",
//     },
//     customer: {
//       firstname: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phone: "",
//     },
//     company: {
//       companyName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       address: "",
//       phone: "",
//     },
//     login: {
//       username: "",
//       password: "",
//     },
//   },
//   reducers: {
//     adminRegister: (state, action) => {
//       console.log("inside", action.payload);
//       state.customer.firstname = action.payload.firstname;
//       state.customer.email = action.payload.email;
//       state.customer.password = action.payload.password;
//       state.customer.confirmPassword = action.payload.confirmPassword;
//       state.customer.phone = action.payload.phone;
//     },
//     companyRegister: (state, action) => {
//       console.log("inside", action.payload);
//       state.company.companyName = action.payload.companyName;
//       state.company.email = action.payload.email;
//       state.company.password = action.payload.password;
//       state.company.confirmPassword = action.payload.confirmPassword;
//       state.company.address = action.payload.address;
//       state.company.phone = action.payload.phone;
//     },
//     customerRegister: (state, action) => {
//       console.log("inside", action.payload);
//       state.customer.firstname = action.payload.firstname;
//       state.customer.email = action.payload.email;
//       state.customer.password = action.payload.password;
//       state.customer.confirmPassword = action.payload.confirmPassword;
//       state.customer.phone = action.payload.phone;
//     },
//     login: (state, action) => {
//       console.log("inside", action.payload);
//       state.login.username = action.payload.username;
//       state.login.password = action.payload.password;
//     },
//   },
// });

// export const { adminRegister } = displaySlice.actions;
// export const { login } = displaySlice.actions;
// export const { customerRegister } = displaySlice.actions;
// export const { companyRegister } = displaySlice.actions;
// export default displaySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const displaySlice = createSlice({
  name: "display",
  initialState: {
    admin: {
      firstname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
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
    adminRegister: (state, action) => {
      console.log("inside", action.payload);
      // Clear customer and company states
      state.customer = {
        firstname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      };
      state.company = {
        companyName: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: "",
      };
      // Set admin state
      state.admin.firstname = action.payload.firstname;
      state.admin.email = action.payload.email;
      state.admin.password = action.payload.password;
      state.admin.confirmPassword = action.payload.confirmPassword;
      state.admin.phone = action.payload.phone;
    },
    companyRegister: (state, action) => {
      console.log("inside", action.payload);
      // Clear admin and customer states
      state.admin = {
        firstname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      };
      state.customer = {
        firstname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      };
      // Set company state
      state.company.companyName = action.payload.companyName;
      state.company.email = action.payload.email;
      state.company.password = action.payload.password;
      state.company.confirmPassword = action.payload.confirmPassword;
      state.company.address = action.payload.address;
      state.company.phone = action.payload.phone;
    },
    customerRegister: (state, action) => {
      console.log("inside", action.payload);
      // Clear admin and company states
      state.admin = {
        firstname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      };
      state.company = {
        companyName: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: "",
      };
      // Set customer state
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

export const { adminRegister, companyRegister, customerRegister, login } =
  displaySlice.actions;
export default displaySlice.reducer;
