import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch coupons from the API
export const fetchCoupons = createAsyncThunk(
  'coupons/fetchCoupons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:7000/coupons');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch coupons');
    }
  }
);

// Async thunk to fetch a specific coupon by ID from the API
export const fetchCouponById = createAsyncThunk(
  'coupons/fetchCouponById',
  async (couponId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:7000/coupons/${couponId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch coupon');
    }
  }
);

// Async thunk to add a coupon to the API
export const addCoupon = createAsyncThunk(
  'coupons/addCoupon',
  async (newCoupon, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:7000/coupons', newCoupon);
      return response.data; // Return the newly added coupon
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add coupon');
    }
  }
);

// Async thunk to edit a coupon in the API
export const editCoupon = createAsyncThunk(
  'coupons/editCoupon',
  async (couponData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:7000/coupons/${couponData.id}`, couponData);
      return response.data; // Return the updated coupon
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to edit coupon');
    }
  }
);

// Async thunk to delete a coupon from the API
export const deleteCoupon = createAsyncThunk(
  'coupons/deleteCoupon',
  async (couponId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:7000/coupons/${couponId}`);
      return couponId; // Return the ID of the deleted coupon
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete coupon');
    }
  }
);

const couponsSlice = createSlice({
  name: 'coupons',
  initialState: {
    coupons: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch coupons
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetch coupon by ID
      .addCase(fetchCouponById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCouponById.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon = action.payload;
      })
      .addCase(fetchCouponById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle add coupon
      .addCase(addCoupon.fulfilled, (state, action) => {
        state.coupons.push(action.payload);
      })
      .addCase(addCoupon.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Handle edit coupon
      .addCase(editCoupon.fulfilled, (state, action) => {
        const index = state.coupons.findIndex((coupon) => coupon.id === action.payload.id);
        if (index !== -1) {
          state.coupons[index] = action.payload;
        }
      })
      .addCase(editCoupon.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Handle delete coupon
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter((coupon) => coupon.id !== action.payload);
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default couponsSlice.reducer;
