// src/features/services/deleteServiceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../constant";

export const deleteService = createAsyncThunk(
  "deleteService",
  async ({ serviceId, authToken }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/serviceprovider/delete-service?serviceId=${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            // "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

const deleteServiceSlice = createSlice({
  name: "deleteService",
  initialState: {
    loading: false,
    error: null,
    successMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete service";
      });
  },
});

export default deleteServiceSlice.reducer;
