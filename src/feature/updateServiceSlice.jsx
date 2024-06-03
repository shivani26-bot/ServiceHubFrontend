import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const updateServiceDetails = createAsyncThunk(
  "updateServiceDetails",
  async ({ serviceId, authToken, updatedServiceData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(updatedServiceData).forEach(([key, value]) => {
        if (key !== "img" && key !== "imageUrl") {
          formData.append(key, value);
        }
      });

      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      const response = await axios.put(
        `http://localhost:9000/api/serviceprovider/serviceUpdate?serviceId=${serviceId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const updateServiceSlice = createSlice({
  name: "updateService",
  initialState: {
    service: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateServiceDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServiceDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
      })
      .addCase(updateServiceDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default updateServiceSlice.reducer;
