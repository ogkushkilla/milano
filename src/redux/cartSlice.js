import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../const';

export const registerCart = createAsyncThunk('cart/registerCart', async () => {
  const response = await fetch(`${API_URL}/api/cart/register`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Не удалось зарегистрировать корзину');

  return response.json();
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await fetch(`${API_URL}/api/cart`, {
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Не удалось получить данные корзины');

  return response.json();
});

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ productId, quantity }) => {
  const response = await fetch(`${API_URL}/api/cart/items`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) throw new Error('Не удалось отправить товар в корзину');

  return response.json();
});

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
      state.error = action.error.message;
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
      state.error = action.error.message;
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
      state.error = action.error.message;
    });
  },
});

export const { toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
