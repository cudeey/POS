import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getReservation = createAsyncThunk(
  "api/getReservation",
  async () => {
    try {
      const response = await axiosInstance.get("/reservations/getAll");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getReservationToday = createAsyncThunk(
  "api/getReservationToday",
  async () => {
    try {
      const response = await axiosInstance.get(
        "/reservations/todayReservations"
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getReservationById = createAsyncThunk(
  "api/getReservationById",
  async (reservationId) => {
    try {
      const response = await axiosInstance.get(
        `/reservations/getReservationById?id=${reservationId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getReservationByTable = createAsyncThunk(
  "api/getReservationByTable",
  async ({ table_id, date }) => {
    try {
      const response = await axiosInstance.get(
        `/reservations/getReservationBytableId?table_id=${table_id}&date=${date}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getReservationByShift = createAsyncThunk(
  "api/getReservationByShift",
  async (shiftId) => {
    try {
      const response = await axiosInstance.get(
        `/reservations/getReservationsByShift/${shiftId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getReservationsByDate = createAsyncThunk(
  "api/getReservationsByDate",
  async (date) => {
    try {
      const response = await axiosInstance.get(
        `/reservations/reservationsByDate/${date}`,
        {
          params: { date: date },
        }
      );
      console.log("date response", response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchDataReservationsSearch = createAsyncThunk(
  "api/fetchDataReservationsSearch",
  async (searchQuery) => {
    try {
      const response = await axiosInstance.get(
        `/reservations/searchReservationByName?name=${searchQuery}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const addStrike = createAsyncThunk(
  "api/addStrike",
  async (reservationId) => {
    try {
      const response = await axiosInstance.post(
        `/reservations/giveStrike/${reservationId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const addStar = createAsyncThunk(
  "api/addStar",
  async (reservationId) => {
    try {
      const response = await axiosInstance.post(
        `/reservations/addStars/${reservationId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const apiReservationSlice = createSlice({
  name: "apiGetReservation",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getReservationToday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReservationToday.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getReservationToday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getReservationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReservationById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(getReservationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getReservationByShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReservationByShift.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(getReservationByShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDataReservationsSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataReservationsSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDataReservationsSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStrike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStrike.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(addStrike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStar.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(addStar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getReservationByTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReservationByTable.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(getReservationByTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getReservationsByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReservationsByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload];
        console.log(state.data, "--------dateeeeee");
      })
      .addCase(getReservationsByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectShiftQuery = (state) => state.apiGetReservation.data;

export default apiReservationSlice.reducer;
