import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../const';

export const fetchGoods = createAsyncThunk('goods/fetchGoods', async params => {
  const searchParams = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/api/products${searchParams ? `?${searchParams}` : ''}`);

  return await response.json();
});
