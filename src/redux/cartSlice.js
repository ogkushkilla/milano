import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isOrderInProcess: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    processOrder(state) {
      state.isOrderInProcess = !state.isOrderInProcess;
    },
  },
});

export const { toggleCart } = cartSlice.actions;
export const { processOrder } = cartSlice.actions;
export default cartSlice.reducer;
