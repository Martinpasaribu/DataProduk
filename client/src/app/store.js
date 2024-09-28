import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import productSlice from '../features/productSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productSlice,

  },
});
