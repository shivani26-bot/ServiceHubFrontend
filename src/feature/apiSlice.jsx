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

// export const postLoginData = createAsyncThunk(
//   "postLoginData",
//   async (loginData) => {
//     const response = await fetch("http://localhost:9000/authenticate/login", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(loginData),
//     });

//     console.log(response);
//     return response.json();
// when incorrect username and password
// const text = await response.text();
// console.log("Response from backend:", text); // Log the response payload

// return text;

// when correct username and password entered
// const data = await response.json();
// console.log("Response from backend:", data); // Log the response payload
// return data;

// const contentType = response.headers.get("content-type");
// console.log(contentType);
// if (contentType && contentType.includes("application/json")) {
//   // If the response is JSON, parse and return it
//   return response.json();
// } else {
//   // If the response is plain text, return it as is
//   return response.text();
// }
//   }
// );

export const verifyOTP = createAsyncThunk(
  "verifyOTP",
  async ({ email, otp }) => {
    console.log(email, otp);
    const response = await fetch(
      `http://localhost:9000/verify-account?email=${email}&otp=${otp}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      }
    );

    // return response.json();
    // const data = await response.json();
    // const jsonString = JSON.stringify(data);
    // console.log("Response from backend:", jsonString); // Log the response payload
    // return jsonString;
    const text = await response.text();
    console.log("Response from backend:", text); // Log the response payload

    return text;
  }
);

export const regenerateOTP = createAsyncThunk(
  "regenerateOTP",
  async (email) => {
    const response = await fetch(
      `http://localhost:9000/regenerate-otp?email=${email}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        // body: JSON.stringify(email),
      }
    ).catch((error) => console.error(error));
    return response.json();
  }
);

// export const postService = createAsyncThunk(
//   "postCompanyData",
//   async (serviceData) => {
//     const response = await fetch(
//       "http://localhost:9000/api/serviceprovider/service",
//       {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(serviceData),
//       }
//     );
//     return response.json();
//   }
// );

const apiSlice = createSlice({
  name: "api",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  // to handle Pending, succesfull and fail case
  extraReducers: (builder) => {
    // builder.addCase(postLoginData.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(postLoginData.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.data = action.payload;
    // });
    // builder.addCase(postLoginData.rejected, (state, action) => {
    //   console.log("Error", action.payload);
    //   state.isError = true;
    // });
    builder.addCase(verifyOTP.pending, (state, action) => {
      console.log("", action.payload);
      state.isLoading = true;
    });
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      console.log("fullfilled", action.payload);
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(verifyOTP.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default apiSlice.reducer;
