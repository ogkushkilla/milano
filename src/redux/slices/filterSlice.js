import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    minPrice: '',
    maxPrice: '',
    category: '',
  },
  type: 'bouquets',
  title: 'Цветы',
  search: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilters: (state, action) => {
      state.filters = action.payload;
    },
    changeType: (state, action) => {
      state.type = action.payload;
      state.search = '';
    },
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
    changeCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    changeSearch: (state, action) => {
      state.type = '';
      state.search = action.payload;
    },
  },
});

export const { changeFilters, changeType, changeTitle, changeCategory, changeSearch } = filterSlice.actions;

export default filterSlice.reducer;
