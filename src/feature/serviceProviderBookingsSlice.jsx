import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch bookings for a service provider
export const fetchServiceProviderBookings = createAsyncThunk(
  "fetchServiceProviderBookings",
  async ({ serviceproviderId, authToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/serviceprovider/service-bookings?serviceproviderId=${serviceproviderId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

const serviceProviderBookingsSlice = createSlice({
  name: "serviceProviderBookings",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceProviderBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServiceProviderBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchServiceProviderBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default serviceProviderBookingsSlice.reducer;
