import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const users = response.data;

      // Find the user with matching credentials
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        throw new Error('Invalid email or password!');
      }

      // Store the user data in sessionStorage
      sessionStorage.setItem('user', JSON.stringify(user));

      return user; // Return user data if login is successful
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching user data');
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    error: null,
    status: 'idle', 
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
