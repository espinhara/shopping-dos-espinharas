import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Menu, MenuItem, Avatar } from '@mui/material';
import { ShoppingCart, Search } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import logo from '../assets/images/logo.png'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';
import { User } from '../interfaces/user';
const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cartAnchorEl, setCartAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null);
  // const isMenuOpen = Boolean(anchorEl);
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
    navigate('/login')
  }

  const handleLogout = (): void => {

    // Remove o token do armazenamento local (ou sessionStorage, dependendo da sua escolha)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    // Opcional: Redirecionar para a página de login
    navigate('/login');

  }

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  const handleCartOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  // const handleLogout = () => {
  //   // Implement logout logic here
  //   handleMenuClose();
  // };

  return (
    <AppBar sx={{ backgroundColor: "#5B1B64" }} position="static">
      <Toolbar>
        {/* Logo */}
        <Typography
          onClick={() => navigate('/')}
          variant="h6"
          noWrap
          component="div"
        >
          {/* Shopping dos Espinhara's */}
          <img
            style={{ height: '45px', cursor: 'pointer' }}
            src={logo} alt="Logo" />
        </Typography>

        <div style={{ flexGrow: 1 }} />
        {/* Barra de pesquisa */}
        <SearchBar>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </SearchBar>


        {/* Ícone do carrinho */}
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
