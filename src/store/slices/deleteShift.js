import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const deleteShift = createAsyncThunk(
  "api/deleteShift",
  async (shiftId) => {
    try {
      const response = await axiosInstance.delete(
        `/shifts/deleteShift/${shiftId}`
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const apiDeleteShiftSlice = createSlice({
  name: "apiDeleteShift",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteShift.fulfilled, (state, action) => {
        const deleteShiftId = action.payload;
        state.data = state.data.filter((item) => item.id !== deleteShiftId);
        state.loading = false;
      })
      .addCase(deleteShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiDeleteShiftSlice.reducer;
