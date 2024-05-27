import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching pending registrations
export const fetchPendingRegistrations = createAsyncThunk(
  "fetchPendingRegistrations",
  async (authToken, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:9000/admin/pending-registrations",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveRegistration = createAsyncThunk(
  "approveRegistration",
  async ({ userId, authToken }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/admin/approve-registration?userId=${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for rejecting registration
export const rejectRegistration = createAsyncThunk(
  "pendingRegistrations/rejectRegistration",
  async ({ userId, authToken }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        "http://localhost:9000/admin/reject-registration",
        userId,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const pendingRegistrationSlice = createSlice({
  name: "pendingRegistration",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingRegistrations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPendingRegistrations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPendingRegistrations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(approveRegistration.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.userId
        );
        if (index !== -1) {
          state.items[index].approveStatus = "APPROVED";
        }
      })
      .addCase(rejectRegistration.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.userId
        );
        if (index !== -1) {
          state.items[index].approveStatus = "REJECTED";
        }
      });
  },
});

export default pendingRegistrationSlice.reducer;
