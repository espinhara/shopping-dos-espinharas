import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // outros reducers podem ser adicionados aqui
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
