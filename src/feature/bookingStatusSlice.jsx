import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../constant";

export const changeBookingStatus = createAsyncThunk(
  "changeBookingStatus",
  async ({ bookingId, customerId, status, authToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/serviceprovider/booking/${status}?bookingId=${bookingId}&customerId=${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return { bookingId, status, message: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookingStatusSlice = createSlice({
  name: "bookingStatus",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeBookingStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeBookingStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex(
          (booking) => booking.id === action.payload.bookingId
        );
        if (index !== -1) {
          state.items[index].bookingStatus =
            action.payload.status.toUpperCase();
        }
      })
      .addCase(changeBookingStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default bookingStatusSlice.reducer;
