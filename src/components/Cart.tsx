// src/components/Cart.tsx
import React from 'react';
import { Menu, MenuItem, ListItemText, Divider, ListItemAvatar, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
interface CartProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ anchorEl, open, onClose }) => {
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <Menu
      id="cart-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: '25ch',
        },
      }}
    >
      {items.length > 0 ? (
        <>
          {items.map(item => (
            <><MenuItem onClick={() => window.location.href = '/cart'} key={item.id}>
              <ListItemText primary={item.name.substring(0, 14).padEnd(17, ".")} secondary={`Quantidade: ${item.quantity}`} />
              <ListItemAvatar>
                <Avatar src={item.imageUrl}></Avatar>
              </ListItemAvatar>
            </MenuItem><Divider /></>
          ))}
        </>
      ) : (
        <MenuItem>
          <ListItemText primary="Seu carrinho está vazio :/" />
        </MenuItem>
      )}
    </Menu>
  );
};

export default Cart;
