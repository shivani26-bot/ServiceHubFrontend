import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../constant";

export const fetchServiceDetails = createAsyncThunk(
  "fetchServiceDetails",
  async ({ serviceId, authToken }) => {
    // console.log("idauth", serviceId, authToken);
    const response = await axios.get(
      `${API_BASE_URL}/api/customer/service?serviceId=${serviceId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    // console.log("responsedata", response.data);
    return response.data;
  }
);

const serviceDetailByIdSlice = createSlice({
  name: "serviceDetail",
  initialState: {
    serviceDto: {},
    reviewDtoList: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServiceDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log("serviceDto", action.payload.serviceDto);
        // console.log("reviewDto", action.payload.reviewDtoList);
        state.serviceDto = action.payload.serviceDto;
        state.reviewDtoList = action.payload.reviewDtoList;
      })
      .addCase(fetchServiceDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = serviceDetailByIdSlice.actions;
export default serviceDetailByIdSlice.reducer;
