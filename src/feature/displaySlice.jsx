import { createSlice } from "@reduxjs/toolkit";

export const displaySlice = createSlice({
  name: "display",
  initialState: {
    name: "",
    email: "",
  },
  reducers: {
    companyRegister: (state, action) => {
      console.log("inside", action.payload);
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password= action.payload.password;
      state.confirmPassword= action.payload.password;
      state.address= action.payload.address;
      state.telephone=action.payload.telephone;
    },
  },
});

export const { companyRegister } = displaySlice.actions;
export default displaySlice.reducer;
