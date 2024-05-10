import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { getShiftById } from "./getShift";

export const editShift = createAsyncThunk(
  "api/editShift",
  async ({ id, updatedData }) => {
    try {
      const response = await axiosInstance.put(
        `/shifts/updateshiftbyid/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const editShiftSlice = createSlice({
  name: "apiEditShift",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editShift.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(editShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getShiftById.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(getShiftById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getShiftById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const getShiftEdit = (state) => state.apiEditShift.data;
export default editShiftSlice.reducer;
