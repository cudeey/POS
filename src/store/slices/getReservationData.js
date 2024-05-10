// reservationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
// Async thunk for fetching reservations
export const getReservation = createAsyncThunk(
  "reservation/getReservation",
  async () => {
    try {
      const response = await axiosInstance.get("/reservations/getAll");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Reservation slice
const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    reservationAllData: [],
    status: "idle", // loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReservation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getReservation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reservationAllData = action.payload;
      })
      .addCase(getReservation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const selectReservationAllData = (state) =>
  state.reservation.reservationAllData;
export default reservationSlice.reducer;
