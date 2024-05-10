import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getIngredients = createAsyncThunk(
  "api/getIngredients",
  async () => {
    try {
      const response = await axiosInstance.get("/ingredients/getAll");
      console.log("ingredients data", response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getIngredientById = createAsyncThunk(
  "api/getIngredientById",
  async (ingredientId) => {
    try {
      const response = await axiosInstance.get(
        `/ingredients/getIngredient/${ingredientId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);


export const editIngredient = createAsyncThunk(
  "api/editIngredient",
  async ({ id, updatedData }) => {
    try {
      const response = await axiosInstance.put(
        `/ingredients/updateIngredient/${id}`,
        updatedData
      );
      console.log("ingredient id", response.data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteIngredient = createAsyncThunk(
  "api/deleteIngredient",
  async (ingredientId) => {
    try {
      const response = await axiosInstance.delete(
        `/ingredients/deleteIngredient/${ingredientId}`
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const searchIngredients = createAsyncThunk(
  "api/searchIngredients",
  async ({ type, query }) => {
    try {
      const response = await axiosInstance.get(
        `/ingredients/search?type=${type}&query=${query}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);


const apiIngredientSlice = createSlice({
  name: "apiGetIngredients",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
          .addCase(deleteIngredient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editIngredient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editIngredient.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(editIngredient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteIngredient.fulfilled, (state, action) => {
        const deleteIngredientId = action.payload;
        state.data = state.data.filter((item) => item.id !== deleteIngredientId);
        state.loading = false;
      })
      .addCase(deleteIngredient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredientById.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(getIngredientById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getIngredientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(searchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiIngredientSlice.reducer;
