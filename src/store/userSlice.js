import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('users/getUser', async (id) => {
  const response = await axios.get(`https://reqres.in/api/users/${id}`);
  return response.data.data;
});

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await axios.get('https://reqres.in/api/users');
  return response.data.data;
});

export const editUser = createAsyncThunk('users/editUser', async ({ id, data }) => {
  const response = await axios.patch(`https://reqres.in/api/users/${id}`, data);
  return response.data;
});

const initialState = {
  users: [],
  user: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setLoading, setError, clearUser } = userSlice.actions;

export default userSlice.reducer;
