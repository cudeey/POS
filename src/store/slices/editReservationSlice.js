import { createSlice } from "@reduxjs/toolkit";

const editReservationSlice = createSlice({
  name: "apiEdit",
  initialState: {},
  reducers: {
    openEditSection: (state, action) => {
      state[action.payload] = true;
    },
    closeEditSection: (state, action) => {
      state[action.payload] = false;
    },
  },
});

export const { openEditSection, closeEditSection } =
  editReservationSlice.actions;
export default editReservationSlice.reducer;
