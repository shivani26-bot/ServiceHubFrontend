import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useCookies } from "react-cookie";

// To store the returned auth token in a cookie and set the expiration time for that cookie, you'll need to move the logic for setting the cookie outside of the Redux action. This is because you cannot use React hooks (such as useCookies) directly in non-component functions or Redux actions. Instead, you should handle setting the cookie in a component where you dispatch the action.

export const postLogin = createAsyncThunk(
  "postLogin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/authenticate/login",
        {
          username,
          password,
        }
      );
      // const authTokenString = "{" + response.data.split("}{")[1];
      // const authTokenData = JSON.parse(authTokenString); // Assuming token is returned in the response
      // const authToken = authTokenData["Authorization Token is"];
      // console.log(authToken);

      const authTokenString = "{" + response.data.split("}{")[1];
      const authTokenData = JSON.parse(authTokenString); // Assuming token is returned in the response
      const authToken = authTokenData["Authorization Token is"];
      console.log("auth", authToken);

      const userIdString = response.data.split("}{")[0] + "}";
      const userData = JSON.parse(userIdString); //{role: 'SERVICEPROVIDER', userId: 3
      const userId = userData.userId;
      console.log("user", userId);
      console.log("response", response.data);

      return { authToken, userId, userData }; // Return auth token, user ID, and full user data
      // return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    // user: null,
    error: null,
    authToken: null,
    // userId: null,
    userId: null,
    userData: null, // Full user data
  },

  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        console.log("fullfilled", action.payload);
        state.loading = false;
        state.authToken = action.payload.authToken;
        state.userId = action.payload.userId;
        // state.user = action.payload;
        state.userData = action.payload.userData;
        state.error = null;
        // return {
        //   loading: false,
        //   authToken: action.payload.authToken,
        //   userId: action.payload.userId,
        //   userData: action.payload.userData,
        //   error: null,
        // };
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loading = false;
        // state.user = null;
        state.authToken = null;
        state.userId = null;
        state.userData = null;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
