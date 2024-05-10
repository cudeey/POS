import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getSupplier = createAsyncThunk("api/getSupplier", async () => {
  try {
    const response = await axiosInstance.get("/suppliers/getAll");
    console.log("suppliers data", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const apiSupplierSlice = createSlice({
  name: "apiGetSuppliers",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(getSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSupplierSlice.reducer;
