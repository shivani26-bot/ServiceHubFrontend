import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addBooking = createAsyncThunk(
  "addBooking",
  async ({ bookingData, authToken }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/customer/book-service",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addBookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default addBookingsSlice.reducer;
