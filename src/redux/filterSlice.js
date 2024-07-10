import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    type: 'bouquets',
    minPrice: '',
    maxPrice: '',
    category: '',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { changeFilters } = filterSlice.actions;

export default filterSlice.reducer;
