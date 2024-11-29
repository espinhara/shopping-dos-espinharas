// src/components/Cart.tsx
import React from 'react';
import { Menu, MenuItem, ListItemText, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ anchorEl, open, onClose }) => {
  const navigate = useNavigate()
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
            <MenuItem onClick={() => navigate('/cart')} key={item.id}>

              <ListItemText primary={item.name} secondary={`Quantidade: ${item.quantity}`} />
            </MenuItem>
          ))}
          <Divider />
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
