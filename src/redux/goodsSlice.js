import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../const';

export const fetchGoods = createAsyncThunk('goods/fetchGoods', async params => {
  const searchParams = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/api/products${searchParams ? `?${searchParams}` : ''}`);

  return await response.json();
});

const initialState = {
  items: [],
  status: 'idle',
  type: 'bouquets',
  error: null,
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    changeParams: (state, action) => {
      state.type = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGoods.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { changeParams } = goodsSlice.actions;

export default goodsSlice.reducer;
