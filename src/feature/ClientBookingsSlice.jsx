import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch reservations action
export const fetchClientBookings = createAsyncThunk(
  "fetchClientBookings",
  async ({ userId, authToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/customer/my-bookings?customerId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
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

const ClientBookingsSlice = createSlice({
  name: "reservations",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientBookings.fulfilled, (state, action) => {
        console.log("bookings", action.payload);
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchClientBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ClientBookingsSlice.reducer;
