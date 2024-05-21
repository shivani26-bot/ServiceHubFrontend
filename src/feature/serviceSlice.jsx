import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postService = createAsyncThunk(
  "postService",
  async (
    { serviceName, companyName, description, price, img, userId, authToken },
    { rejectWithValue }
  ) => {
    try {
      console.log(
        serviceName,
        companyName,
        description,
        price,
        img,
        userId,
        authToken
      );
      const formData = new FormData();
      formData.append("serviceName", serviceName);
      formData.append("companyName", companyName);
      formData.append("description", description);
      formData.append("price", price);
      // formData.append("imageUrl", imageUrl);
      formData.append("img", img);

      console.log("form", formData);
      const response = await axios.post(
        `http://localhost:9000/api/serviceprovider/service?userId=${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
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
// export const postService = createAsyncThunk(
//   "postService",
//   async (
//     { serviceName, companyName, description, price, img, userId, authToken },
//     { rejectWithValue }
//   ) => {
//     try {
//       // Create a FormData object to handle the file upload
//       const formData = new FormData();
//       formData.append("serviceName", serviceName);
//       formData.append("companyName", companyName);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("img", img); // Appending the file directly
//       formData.append("userId", userId);
//       console.log("formdata", formData);
//       const response = await axios.post(
//         `http://localhost:9000/api/serviceprovider/service/${userId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             "Content-Type": "multipart/form-data", // Important for file uploads
//           },
//         }
//       );
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : "Network Error"
//       );
//     }
//   }
// );

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    service: null,
    // items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postService.fulfilled, (state, action) => {
        console.log("service", action.payload);
        state.status = "succeeded";
        state.service = action.payload;
        // state.items.push(action.payload);
      })
      .addCase(postService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default serviceSlice.reducer;
