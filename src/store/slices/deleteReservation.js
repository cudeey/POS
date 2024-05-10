import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const deleteReservation = createAsyncThunk(
  "api/deleteReservation",
  async (itemId) => {
    try {
      const response = await axiosInstance.delete(
        `/reservations/deleteReservation/${itemId}`
      );
      return itemId;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const apiDeleteReservationSlice = createSlice({
  name: "apiDeleteReservation",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        const deleteReservationId = action.payload;
        state.data = state.data.filter(
          (item) => item.id !== deleteReservationId
        );
        state.loading = false;
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiDeleteReservationSlice.reducer;
