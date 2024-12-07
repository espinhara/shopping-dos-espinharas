import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem, Avatar } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import logo from '../assets/images/logo.png'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Cart from './Cart';
import { User } from '../interfaces/user';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cartAnchorEl, setCartAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const isCartOpen = Boolean(cartAnchorEl);
  const items = useSelector((state: RootState) => state.cart.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const hasUser = localStorage.getItem('user')

  useEffect(() => {
    if (hasUser && !user) {
      console.log(JSON.parse(hasUser))
      setUser(JSON.parse(hasUser))
    }
  }, [hasUser, user])
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = (): void => {
    window.location.href = '/login'
  }

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    window.location.href = '/login'

  }

  const handleCartOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "#5B1B64" }} position="static">
      <Toolbar>
        {/* Logo */}
        <Typography
          onClick={() => window.location.href = '/'}
          variant="h6"
          noWrap
          component="div"
        >
          {/* Shopping dos Espinhara's */}
          <img
            style={{
              height: '45px', cursor: 'pointer',
            }}
            src={logo} alt="Logo" />
        </Typography>
        <div style={{ flexGrow: 1 }} />

        <div>
          <IconButton size="large" aria-label="mostrar itens no carrinho" onClick={handleCartOpen} color="inherit">
            <Badge badgeContent={itemCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <Cart
            anchorEl={cartAnchorEl}
            open={isCartOpen}
            onClose={handleCartClose}
          />
        </div>
        {/* Avatar e Menu */}
        <div>
          {user?.name ? (
            <>
              <IconButton
                size="large"
                edge="end"
                aria-label={user?.name ?? 'Usuário'}
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt={user?.name ?? 'Usuário'} src="/avatar.png" />
              </IconButton><Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Minha Conta</MenuItem>
                <MenuItem onClick={handleClose}>Favoritos</MenuItem>
                <MenuItem onClick={handleLogin}>Login</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <IconButton
                size="large"
                edge="end"
                aria-label={'Usuário'}
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt={'Usuário'} src="/avatar.png" />
              </IconButton><Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>Minha Conta</MenuItem>
                <MenuItem onClick={handleClose}>Favoritos</MenuItem> */}
                <MenuItem onClick={handleLogin}>Login</MenuItem>
                {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
              </Menu>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
