import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const addShift = createAsyncThunk(
  "api/createShift",
  async (requestData) => {
    console.log("eraa", requestData);
    const response = await axiosInstance.post(
      `/shifts/createShift`,
      requestData
    );
    console.log("era", response);
    return { data: response.data };
  }
);

const apiReservationSlice = createSlice({
  name: "apiShift",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addShift.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiReservationSlice.reducer;
