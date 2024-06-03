import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchServiceByName = createAsyncThunk(
  "searchServiceByName",
  async ({ name, authToken }, { rejectWithValue }) => {
    try {
      // console.log(name, authToken);
      const response = await axios.get(
        `http://localhost:9000/api/customer/search?name=${name}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchServiceByName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchServiceByName.fulfilled, (state, action) => {
        // console.log("results", action.payload);
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(searchServiceByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;
