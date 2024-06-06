import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../constant";

export const postLogin = createAsyncThunk(
  "postLogin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/authenticate/login`, {
        username,
        password,
      });

      const authTokenString = "{" + response.data.split("}{")[1];
      const authTokenData = JSON.parse(authTokenString); // Assuming token is returned in the response
      const authToken = authTokenData["Authorization Token is"];

      const userIdString = response.data.split("}{")[0] + "}";
      const userData = JSON.parse(userIdString); //{role: 'SERVICEPROVIDER', userId: 3
      const userId = userData.userId;

      return { authToken, userId, userData }; // Return auth token, user ID, and full user data
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
    error: null,
    authToken: null,
    userId: null,
    userData: null,
  },
  reducers: {
    logout: (state) => {
      state.authToken = null;
      state.userId = null;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.authToken = action.payload.authToken;
        state.userId = action.payload.userId;
        state.userData = action.payload.userData;
        state.error = null;
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loading = false;

        state.authToken = null;
        state.userId = null;
        state.userData = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
