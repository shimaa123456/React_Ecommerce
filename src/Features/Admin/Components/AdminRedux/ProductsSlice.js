import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch products from the API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/products');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

// Async thunk to fetch a specific product by ID from the API
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/products/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  }
);

// Async thunk to add a product to the API
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/products', newProduct);
      return response.data; // Return the newly added product
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add product');
    }
  }
);

// Async thunk to edit a product in the API
export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:4000/products/${productData.id}`, productData);
      return response.data; // Return the updated product
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to edit product');
    }
  }
);

// Async thunk to delete a product from the API
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:4000/products/${productId}`);
      return productId; // Return the ID of the deleted product
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete product');
    }
  }
);
export const updateProductStock = createAsyncThunk(
  'products/updateProductStock',
  async (updatedProduct, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:4000/products/${updatedProduct.id}`, updatedProduct);
      return response.data; // Return the updated product
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update product stock');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Handle edit product
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Handle delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Handle update product stock
    .addCase(updateProductStock.fulfilled, (state, action) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    })
    .addCase(updateProductStock.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default productsSlice.reducer;
