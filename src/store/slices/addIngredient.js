import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const createIngredient = createAsyncThunk(
  "api/createIngredient",
  async (requestData) => {
    console.log(requestData);
    const response = await axiosInstance.post(
      `/ingredients/createIngredient`,
      requestData
    );
    console.log(response);
    return { data: response.data };
  }
);

const apiIngredientSlice = createSlice({
  name: "apiIngredient",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createIngredient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIngredient.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload.data);
      })
      .addCase(createIngredient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default apiIngredientSlice.reducer;
