import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filteredRecipe: 1,
  },
  reducers: {
    setFilteredRecipe: (state, action) => {
      state.filteredRecipe = action.payload;
    },
  },
});

export const { setFilteredRecipe } = filterSlice.actions;
export const selectFilteredRecipe = (state) => state.filter.filteredRecipe;
export default filterSlice.reducer;
