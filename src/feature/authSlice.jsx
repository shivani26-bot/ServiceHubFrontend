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
      // console.log(authToken);
      const userId = response.data.userId;
      // console.log(userId);

      console.log(response.data);
      return response.data;
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
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
