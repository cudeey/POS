import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const createSupplier = createAsyncThunk(
  "api/createSupplier",
  async (requestData) => {
    console.log(requestData);
    const response = await axiosInstance.post(
      `/suppliers/createSupplier`,
      requestData
    );
    console.log(response);
    return { data: response.data };
  }
);

const apiSupplierSlice = createSlice({
  name: "apiSupplier",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSupplierSlice.reducer;
