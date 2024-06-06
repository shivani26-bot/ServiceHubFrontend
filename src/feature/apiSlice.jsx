import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../constant";

export const postAdminData = createAsyncThunk(
  "postAdminData",
  async (adminData) => {
    const response = await fetch(`${API_BASE_URL}/admin/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(adminData),
    });
    // return response.json();
    const text = await response.text();

    return text;
  }
);

export const postCompanyData = createAsyncThunk(
  "postCompanyData",
  async (companyData) => {
    const response = await fetch(`${API_BASE_URL}/service-provider/sign-up`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(companyData),
    });
    // return response.json();
    const text = await response.text();

    return text;
  }
);

export const postCustomerData = createAsyncThunk(
  "postCustomerData",
  async (customerData) => {
    const response = await fetch(`${API_BASE_URL}/customer/sign-up`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    const text = await response.text();

    return text;
  }
);

export const verifyOTP = createAsyncThunk(
  "verifyOTP",
  async ({ email, otp }) => {
    const response = await fetch(
      `${API_BASE_URL}/verify-account?email=${email}&otp=${otp}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      }
    );

    const text = await response.text();

    return text;
  }
);

export const verifyServiceProviderOTP = createAsyncThunk(
  "verifyServiceProviderOTP",
  async ({ email, otp }) => {
    const response = await fetch(
      `${API_BASE_URL}/verify/serviceprovider?email=${email}&otp=${otp}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      }
    );
    const text = await response.text();

    return text;
  }
);

export const regenerateOTP = createAsyncThunk(
  "regenerateOTP",
  async (email) => {
    const response = await fetch(
      `${API_BASE_URL}/regenerate-otp?email=${email}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).catch((error) => console.error(error));
    return response.json();
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(verifyOTP.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(verifyOTP.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default apiSlice.reducer;
