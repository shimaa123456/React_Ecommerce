import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch users from an API
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/users'); 
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);

// Async thunk to fetch a specific user by ID from the API
export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message || 'Failed to fetch user');
      }
    }
  );

// Async thunk to add a user to the API
export const addUser = createAsyncThunk(
  'users/addUser',
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/users', newUser);
      return response.data; // Return the newly added user
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add user');
    }
  }
);

// Async thunk to edit a user in the API
export const editUser = createAsyncThunk(
  'users/editUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/users/${userData.id}`, userData);
      return response.data; // Return the updated user
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to edit user');
    }
  }
);

// Async thunk to delete a user from the API
export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId, { rejectWithValue }) => {
      try {
        await axios.delete(`http://localhost:5000/users/${userId}`);
        return userId; // Return the ID of the deleted user
      } catch (error) {
        return rejectWithValue(error.message || 'Failed to delete user');
      }
    }
  );

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
  
});

export default usersSlice.reducer;
