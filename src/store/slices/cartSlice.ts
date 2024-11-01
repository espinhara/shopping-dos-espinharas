import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      state.totalQuantity++;
      if (existingItem) {
        existingItem.quantity++;
        existingItem.price += newItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }
      state.totalAmount += newItem.price;
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price / existingItem.quantity;

        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.price -= existingItem.price / (existingItem.quantity + 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalAmount = (state: RootState) => state.cart.totalAmount;
export const selectCartTotalQuantity = (state: RootState) => state.cart.totalQuantity;

export default cartSlice.reducer;
