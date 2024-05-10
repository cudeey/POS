import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const editReservation = createAsyncThunk(
  "api/editReservation",
  async ({ id, updatedData }) => {
    console.log("Updated Data:", updatedData);
    try {
      const response = await axiosInstance.put(
        `/reservations/updateReservation/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const editReservationSlice = createSlice({
  name: "apiEditReservation",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(editReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const getReservationEdit = (state) => state.apiEditReservation.data;
export default editReservationSlice.reducer;
