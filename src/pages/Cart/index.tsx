import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { RootState } from '../../store';
import { updateItemQuantity, removeItemFromCart, removeItemsFromCart } from '../../store/slices/cartSlice'; // Atualizar de acordo com sua implementação

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleIncrease = (itemId: string, quantity: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item && item.stock > item.quantity) {
      if (item.stock < quantity) {
        return alert('A quantidade execede o estoque disponível!: ' + quantity + '\n' + item.stock);
      }
      dispatch(updateItemQuantity({ id: itemId, quantity: item.quantity + 1 }));
    } else {
      alert('Quantidade excede o estoque disponível!');
    }
  };

  const handleDecrease = (itemId: string) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateItemQuantity({ id: itemId, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItemFromCart(itemId));
    }
  };

  const handleRemove = (itemId: string) => {
    dispatch(removeItemsFromCart(itemId));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Carrinho
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc' }}>
            <ListItemText
              primary={item.name}
              secondary={`Preço: R$${item.price.toFixed(2)} | Estoque: ${item.stock} | Quantidade: ${item.quantity}\n SubTotal R$${(item.price * item.quantity).toFixed(2)}`}
            />
            <Box>
              <IconButton onClick={() => handleDecrease(item.id)}>-</IconButton>
              <IconButton onClick={() => handleIncrease(item.id, item.quantity)}>+</IconButton>
              <Button onClick={() => handleRemove(item.id)} color="error">
                Remover
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Total: R$
        {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
      </Typography>
    </Box>
  );
};

export default CartPage;
