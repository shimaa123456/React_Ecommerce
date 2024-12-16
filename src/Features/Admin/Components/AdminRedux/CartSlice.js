import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch cart for a user
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/cart?userId=${userId}`);
      return response.data[0] || { userId, products: [] };  // Return empty cart if no cart exists
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch cart');
    }
  }
);

// Async thunk to add product to cart
export const addToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ userId, product }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/cart?userId=${userId}`);
      let cart = response.data[0];

      if (!cart) {
        cart = { userId, products: [product] };
        const createResponse = await axios.post('http://localhost:8000/cart', cart);
        return createResponse.data;
      } else {
        const existingProduct = cart.products.find((p) => p.id === product.id);
        if (existingProduct) {
          existingProduct.quantity += product.quantity;
        } else {
          cart.products.push(product);
        }
        const updateResponse = await axios.put(`http://localhost:8000/cart/${cart.id}`, cart);
        return updateResponse.data;
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add item to cart');
    }
  }
);

// Async thunk to update product quantity in cart
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ userId, productId, newQuantity }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/cart?userId=${userId}`);
      let cart = response.data[0];
      if (!cart) throw new Error('Cart not found.');

      if (newQuantity === 0) {
        cart.products = cart.products.filter((p) => p.id !== productId);
      } else {
        const product = cart.products.find((p) => p.id === productId);
        if (product) {
          product.quantity = newQuantity;
        }
      }

      const updateResponse = await axios.put(`http://localhost:8000/cart/${cart.id}`, cart);
      return updateResponse.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update item quantity');
    }
  }
);

// Async thunk to clear user's cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/cart?userId=${userId}`);
      const cart = response.data[0];

      if (cart) {
        await axios.delete(`http://localhost:8000/cart/${cart.id}`); 
      }
      return { userId }; // Return user ID to clear local cart state
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to clear cart');
    }
  }
);



const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setTotalAmount: (state) => {
      state.totalAmount = state.items.reduce((acc, product) => acc + product.price * product.quantity, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        const cart = action.payload;
        state.items = cart.products || []; // Set cart items
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const updatedCart = action.payload;
        const userCartIndex = state.items.findIndex((cart) => cart.userId === updatedCart.userId);

        if (userCartIndex !== -1) {
          state.items[userCartIndex] = updatedCart;
        } else {
          state.items.push(updatedCart);
        }
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updatedCart = action.payload;
        const userCartIndex = state.items.findIndex((cart) => cart.userId === updatedCart.userId);

        if (userCartIndex !== -1) {
          state.items[userCartIndex] = updatedCart;
        }
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = []; 
        state.loading = false;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTotalAmount } = cartSlice.actions;
export default cartSlice.reducer;
