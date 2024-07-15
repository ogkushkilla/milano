import { createSlice } from '@reduxjs/toolkit';
import { registerCart } from '../thunks/registerCart';
import { addItemToCart } from '../thunks/addItemToCart';
import { fetchCart } from '../thunks/fetchCart';

const initialState = {
  isOpen: false,
  items: [],
  status: 'idle',
  accessKey: null,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: builder => {
    builder.addCase(registerCart.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(registerCart.fulfilled, (state, action) => {
      state.status = 'success';
      state.accessKey = action.payload.accessKey;
    });
    builder.addCase(registerCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || action.error.message;
    });

    builder.addCase(fetchCart.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || action.error.message;
    });

    builder.addCase(addItemToCart.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || action.error.message;
    });
  },
});

export const { toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
