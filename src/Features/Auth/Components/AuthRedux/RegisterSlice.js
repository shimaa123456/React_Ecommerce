import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (newUser, { rejectWithValue }) => {
    try {
      // Check if email is already used
      const response = await axios.get('http://localhost:5000/users');
      const users = response.data;
      const existingUser = users.find(user => user.email === newUser.email);

      if (existingUser) {
        throw new Error('Email is already taken.');
      }

      // Proceed with registration if email is unique
      const registerResponse = await axios.post('http://localhost:5000/users', newUser);
      return registerResponse.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
