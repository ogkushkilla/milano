import { createSlice } from '@reduxjs/toolkit';
import { sendOrder } from '../thunks/sendOrder';

const initialState = {
  status: 'idle',
  isOpen: false,
  isSuccess: false,
  orderId: '',
  data: {
    buyerName: '',
    buyerPhone: '',
    recipientName: '',
    recipientPhone: '',
    street: '',
    house: '',
    apartment: '',
    paymentOnline: 'true',
    deliveryDate: '',
    deliveryTime: '',
  },
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
      state.orderId = '';
    },
    clearOrder(state) {
      state.data = {
        buyerName: '',
        buyerPhone: '',
        recipientName: '',
        recipientPhone: '',
        street: '',
        house: '',
        apartment: '',
        paymentOnline: 'true',
        deliveryDate: '',
        deliveryTime: '',
      };
    },
    updateOrderData(state, action) {
      state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(sendOrder.pending, state => {
      state.status = 'loading';
      state.orderId = '';
    });
    builder.addCase(sendOrder.fulfilled, (state, action) => {
      state.status = 'success';
      state.orderId = action.payload.orderId;
    });
    builder.addCase(sendOrder.rejected, (state, action) => {
      state.status = 'failed';
      state.orderId = '';
      state.error = action.payload || action.error.message;
    });
  },
});

export const { openModal, closeModal, updateOrderData, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
