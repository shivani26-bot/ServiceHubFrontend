import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../constant";

export const fetchCompanyServices = createAsyncThunk(
  "fetchCompanyServices",
  async ({ userId, authToken }, { rejectWithValue }) => {
    try {
      // console.log("userid authtoken", userId, authToken);
      const response = await axios.get(
        `${API_BASE_URL}/api/serviceprovider/all-services?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);

const getCompanyServiceSlice = createSlice({
  name: "getCompanyServices",
  initialState: {
    companyServices: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyServices.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("payload", action.payload);
        state.companyServices = action.payload;
      })
      .addCase(fetchCompanyServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch services";
      });
  },
});

export default getCompanyServiceSlice.reducer;
