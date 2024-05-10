import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getShift = createAsyncThunk("api/getShift", async () => {
  try {
    const response = await axiosInstance.get("/shifts/getAll");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getShiftById = createAsyncThunk(
  "auth/getShiftById",
  async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/shifts/getShiftById?id=${userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const apiShiftSlice = createSlice({
  name: "apiGetShift",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShift.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(getShift.rejected, (state, action) => {
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

export default apiShiftSlice.reducer;
