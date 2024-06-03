import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching services

export const fetchAllServices = createAsyncThunk(
  "fetchAllServices",
  async ({ authToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/customer/services",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);
// Create the services slice
const getAllServicesSlice = createSlice({
  name: "getAllServices",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAllServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default getAllServicesSlice.reducer;
