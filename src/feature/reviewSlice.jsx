import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../constant";

export const postReview = createAsyncThunk(
  "postReview",
  async (
    { review, rating, serviceId, bookId, userId, authToken },
    { rejectWithValue }
  ) => {
    try {
      // console.log(review, rating, serviceId, bookId, userId);
      const response = await axios.post(
        `${API_BASE_URL}/api/customer/review`,
        {
          review,
          rating,
          serviceId,
          bookId,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log("response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postReview.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default reviewSlice.reducer;
