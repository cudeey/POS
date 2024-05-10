import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "../../api/axiosInstance";
import axiosInstance from "../../api/axiosInstance";

export const getTables = createAsyncThunk("api/getTables", async () => {
  try {
    const response = await axiosInstace.get("/tables/getAllTables");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const createTable = createAsyncThunk(
  "api/createTable",
  async (createTable) => {
    try {
      const response = await axiosInstace.post(
        "/tables/createTable",
        createTable
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getTablesByTime = createAsyncThunk(
  "api/getTablesByTime",
  async ({ date, time }) => {
    try {
      const response = await axiosInstance.get(
        `/tables/freeTables/?date=${date}&time=${time}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const apiTablesSlice = createSlice({
  name: "apiTables",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTables.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTable.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getTablesByTime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTablesByTime.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(getTablesByTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiTablesSlice.reducer;
