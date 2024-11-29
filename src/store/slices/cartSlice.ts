import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { CartItem, CartState } from '../../interfaces/cart';


const loadCartFromStorage = (): CartItem[] => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) as CartItem[] : [];
};
const loadTotalAmountFromStorage = (): number => {
  const cartString = localStorage.getItem('cart');
  const cart = cartString ? JSON.parse(cartString) as CartItem[] : [];
  let totalAmount = 0
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalAmount += item.price
    })
  }
  return totalAmount;
}

const initialState: CartState = {
  items: loadCartFromStorage(),
  totalAmount: loadTotalAmountFromStorage(),
  totalQuantity: loadCartFromStorage().length,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem && existingItem.quantity + 1 > existingItem.stock) {
        alert('Quantidade exede o estoque disponível!')
        return
      }
      if (newItem.quantity + 1 > newItem.stock) {
        alert('Quantidade exede o estoque disponível!')
        return
      }
      if (existingItem) {
        existingItem.quantity++;
        // existingItem.price += newItem.price;
      } else {
        state.items.push({
          ...newItem,
          stock: newItem.stock,
          quantity: 1,
        });
      }
      state.totalQuantity++;
      state.totalAmount += newItem.price;

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
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
    removeItemsFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(item => item.id !== id);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      localStorage.removeItem('cart');
    },
  },
});

export const { addItemToCart, updateItemQuantity, removeItemFromCart, removeItemsFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalAmount = (state: RootState) => state.cart.totalAmount;
export const selectCartTotalQuantity = (state: RootState) => state.cart.totalQuantity;

export default cartSlice.reducer;
