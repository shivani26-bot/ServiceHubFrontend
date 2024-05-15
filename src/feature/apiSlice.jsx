import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postCompanyData = createAsyncThunk(
  "postCompanyData",
  async (companyData) => {
    const response = await fetch(
      "http://localhost:9000/service-provider/sign-up",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(companyData),
      }
    );
    return response.json();
  }
);

export const postCustomerData = createAsyncThunk(
  "postCustomerData",
  async (customerData) => {
    const response = await fetch("http://localhost:9000/customer/sign-up", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(customerData),
    });
    return response.json();
  }
);

export const postLoginData = createAsyncThunk(
  "postLoginData",
  async (loginData) => {
    const response = await fetch("http://localhost:9000/authenticate/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    return response.json();
  }
);

export const verifyOTP = createAsyncThunk(
  "verifyOTP",
  async ({ email, otp }) => {
    const response = await fetch(
      `http://localhost:9000/verify-account?email=${encodeURIComponent(
        email
      )}&otp=${encodeURIComponent(otp)}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      }
    );
    return response.json();
  }
);

export const regenerateOTP = createAsyncThunk(
  "regenerateOTP",
  async (email) => {
    const response = await fetch(
      `http://localhost:9000/regenerate-otp?email=${encodeURIComponent(email)}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(email),
      }
    ).catch((error) => console.error(error));
    return response.json();
  }
);

export const postService = createAsyncThunk(
  "postCompanyData",
  async (serviceData) => {
    const response = await fetch(
      "http://localhost:9000/api/serviceprovider/service",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(serviceData),
      }
    );
    return response.json();
  }
);

// export const fetchCompanyData = createAsyncThunk(
//   "fetchCompanyData",
//   async () => {
//     const response = await fetch("url");
//     return response.json();
//   }
// );

// export const fetchCustomerData = createAsyncThunk(
//   "fetchCustomerData",
//   async () => {
//     const response = await fetch("url");
//     return response.json();
//   }
// );

// export const fetchLoginData = createAsyncThunk("fetchLoginData", async () => {
//   const response = await fetch("url");
//   return response.json();
// });

const apiSlice = createSlice({
  name: "api",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  // to handle Pending, succesfull and fail case
  extraReducers: (builder) => {
    builder.addCase(postCompanyData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postCompanyData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(postCompanyData.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default apiSlice.reducer;
