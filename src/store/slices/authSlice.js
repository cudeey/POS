import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      localStorage.setItem("userId", response.data.user.id);
      console.log("Data Login", response);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const showUser = createAsyncThunk(
  "auth/showUser",
  async (_, { getState }) => {
    try {
      const { token } = getState().user;
      const response = await axiosInstance.get("/auth/getUserProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Get User Profile Data", response);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getUsers = createAsyncThunk("auth/getUsers", async () => {
  try {
    const response = await axiosInstance.get("/auth/getUsers");
    console.log("GET USERS", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const createInviteUser = createAsyncThunk(
  "auth/createInviteUser",
  async (createInviteUser) => {
    try {
      const response = await axiosInstance.post(
        "/auth/inviteUser",
        createInviteUser
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateInviteUser = createAsyncThunk(
  "auth/updateInviteUser",
  async ({ id, updatedData }) => {
    try {
      const response = await axiosInstance.put(
        `/auth/updateUser/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteInviteUser = createAsyncThunk(
  "auth/deleteInviteUser",
  async (itemId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/auth/deleteUser/${itemId}`);
      return itemId;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  "auth/getUserById",
  async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/auth/getUserById?id=${userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
});

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (credentials) => {
    try {
      const response = await axiosInstance.post(
        "/auth/createUser",
        credentials
      );
      const data = response.data;
      localStorage.setItem("token", data.token);

      return data.user;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = action.error.message;
        state.error = null;
        state.success = true;
      })
      .addCase(logoutUser, (state) => {
        state.user = null;
        state.token = null;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.user = action.error.message;
        state.error = null;
        state.success = true;
      })
      .addCase(showUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createInviteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInviteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createInviteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateInviteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInviteUser.fulfilled, (state, action) => {
        const updatedData = action.payload;
        const index = state.data.findIndex(
          (item) => item.id === updatedData.id
        );
        if (index !== -1) {
          state.data[index] = updatedData;
        }
        state.loading = false;
      })
      .addCase(updateInviteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteInviteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInviteUser.fulfilled, (state, action) => {
        const deletedItemId = action.payload;
        if (Array.isArray(state.data)) {
          state.data = state.data.filter((item) => item.id !== deletedItemId);
        }
        state.loading = false;
      })
      .addCase(deleteInviteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
