import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import goodsReducer from './slices/goodsSlice';
import filterReducer from './slices/filterSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    goods: goodsReducer,
    filter: filterReducer,
  },
});

export default store;
