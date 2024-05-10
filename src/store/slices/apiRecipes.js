import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "../../api/axiosInstance";

export const fetchDataRecipes = createAsyncThunk(
  "api/fetchDataRecipes",
  async () => {
    try {
      const response = await axiosInstace.get("/recipes/recipe");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchDataRecipesCategory = createAsyncThunk(
  "api/fetchDataRecipesCategory ",
  async (category) => {
    try {
      const response = await axiosInstace.get(
        `/recipes/getRecipeByCategory/${category}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchDataRecipesSearch = createAsyncThunk(
  "api/fetchDataRecipesSearch",
  async (searchQuery) => {
    try {
      const response = await axiosInstace.get(
        `/recipes/searchRecipeByName?title=${searchQuery}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const createDataRecipes = createAsyncThunk(
  "api/createDataRecipes",
  async (createDataRecipes) => {
    try {
      const response = await axiosInstace.post(
        "/recipes/createRecipes",
        createDataRecipes,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("🚀 ~ file: apiRecipes.js:57 ~ response:", response);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateDataRecipes = createAsyncThunk(
  "api/updateDataRecipes",
  async ({ id, updatedData }) => {
    try {
      const response = await axiosInstace.put(
        `/recipes/updateRecipeWithAllData/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteDataRecipes = createAsyncThunk(
  "apiQuestion/deleteDataRecipes",
  async (itemId, thunkAPI) => {
    try {
      await axiosInstace.delete(`/recipes/deleteRecipe/${itemId}`);
      return itemId;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteDataQuantity = createAsyncThunk(
  "apiQuestion/deleteDataQuantity",
  async (itemId, thunkAPI) => {
    try {
      await axiosInstace.delete(`/quantity/deleteQuantity/${itemId}`);
      return itemId;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// export const deleteDataPhoto = createAsyncThunk(
//   "apiQuestion/deleteDataPhoto",
//   async (itemId, thunkAPI) => {
//     try {
//       await axiosInstace.delete(`/recipes/deleteRecipeVideo/${itemId}`);
//       return itemId;
//     } catch (error) {
//       throw new Error(error.response.data.message);
//     }
//   }
// );

export const deleteDataPhoto = createAsyncThunk(
  "apiQuestion/deleteDataPhoto",
  async ({ itemId, index }, thunkAPI) => {
    try {
      await axiosInstace.delete(
        `/recipes/deleteRecipeVideo/${itemId}/${index}`
      );
      return { itemId, index };
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const createDataPhoto = createAsyncThunk(
  "api/createDataPhoto",
  async (createDataPhoto) => {
    try {
      const response = await axiosInstace.post(
        "/recipes/insertPhoto",
        createDataPhoto
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const createDataVideo = createAsyncThunk(
  "api/createDataVideo",
  async (createDataVideo) => {
    try {
      const response = await axiosInstace.post(
        "/videos/upload",
        createDataVideo
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const apiRecipesSlice = createSlice({
  name: "apiRecipes",
  initialState: {
    data: {
      recipes: [],
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDataRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDataRecipesCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataRecipesCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDataRecipesCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createDataRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDataRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.data.recipes.push(action.payload);
      })
      .addCase(createDataRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDataRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDataRecipes.fulfilled, (state, action) => {
        const updatedData = action.payload;
        const index = state.data.recipes.findIndex(
          (item) => item.id === updatedData.id
        );
        if (index !== -1) {
          state.data.recipes[index] = updatedData;
        }
        state.loading = false;
      })
      .addCase(updateDataRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteDataRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDataRecipes.fulfilled, (state, action) => {
        const deletedItemId = action.payload;
        if (Array.isArray(state.data)) {
          state.data = state.data.filter((item) => item.id !== deletedItemId);
        }
        state.loading = false;
      })
      .addCase(deleteDataRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteDataQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDataQuantity.fulfilled, (state, action) => {
        const deletedItemId = action.payload;
        if (Array.isArray(state.data)) {
          state.data = state.data.filter((item) => item.id !== deletedItemId);
        }
        state.loading = false;
      })
      .addCase(deleteDataQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteDataPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDataPhoto.fulfilled, (state, action) => {
        const deletedItemId = action.payload;
        if (Array.isArray(state.data)) {
          state.data = state.data.filter((item) => item.id !== deletedItemId);
        }
        state.loading = false;
      })
      .addCase(deleteDataPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createDataPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDataPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createDataPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDataRecipesSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataRecipesSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDataRecipesSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createDataVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createDataVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDataVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      });
  },
});

export default apiRecipesSlice.reducer;
