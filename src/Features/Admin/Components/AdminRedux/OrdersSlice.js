import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch orders from the API
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/orders');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch orders');
    }
  }
);

// Async thunk to fetch a specific order by ID from the API
export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch order');
    }
  }
);

// Async thunk to add a new order to the API
export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (newOrder, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/orders', newOrder);
      return response.data; // Return the newly added order
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add order');
    }
  }
);

// Async thunk to edit an existing order in the API
export const editOrder = createAsyncThunk(
  'orders/editOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:3000/orders/${orderData.id}`, orderData);
      return response.data; // Return the updated order
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to edit order');
    }
  }
);

// Async thunk to delete an order from the API
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/orders/${orderId}`);
      return orderId; // Return the ID of the deleted order
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete order');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle add order
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Handle edit order
      .addCase(editOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex((order) => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(editOrder.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Handle delete order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;