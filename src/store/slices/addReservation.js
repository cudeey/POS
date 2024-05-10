import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const createReservation = createAsyncThunk(
  "api/createReservation",
  async (requestData) => {
    console.log(requestData);
    const response = await axiosInstance.post(
      `/reservations/createReservation`,
      requestData
    );
    console.log(response);
    return { data: response.data };
  }
);

const apiReservationSlice = createSlice({
  name: "apiReservation",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiReservationSlice.reducer;
