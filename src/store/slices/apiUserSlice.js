import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchAllUsers = createAsyncThunk("api/fetchAllUsers", async () => {
  const response = await axiosInstance.get("/auth/getUsers");
  return response.data;
});

export const fetchUserById = createAsyncThunk(
  "api/fetchUserById",
  async (id) => {
    const response = await axiosInstance.get(`/auth/getUserById/${id}`);
    return response.data;
  }
);

export const fetchUserByEmail = createAsyncThunk(
  "api/fetchUserByEmail",
  async (email) => {
    const response = await axiosInstance.get(`/auth/getUserByEmail/${email}`);
    return response.data;
  }
);

export const userLogin = createAsyncThunk(
  "api/userLogin",
  async (requestData) => {
    const response = await axiosInstance.post("/auth/login", requestData);
    return response.data;
  }
);

export const createUser = createAsyncThunk(
  "api/createUser",
  async (requestData) => {
    const response = await axiosInstance.post("/auth/createUser", requestData);
    return response.data;
  }
);

const apiUserSlice = createSlice({
  name: "api",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiUserSlice.reducer;
