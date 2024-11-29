import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, Typography, CssBaseline, Drawer, List, ListItem, IconButton, Avatar, MenuItem, Menu, Skeleton } from '@mui/material';
import Dashboard from './components/Dashboard';
import RegisterUsers from './Register/Users';
import Product from './components/Product';
import ListUsers from './Lists/Users';
import ProductList from './components/ProductsTable';
// import { RootState } from '../../store';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces/user';
// import { useSelector } from 'react-redux';
import SalesTable from './components/SalesTable';

const drawerWidth = 205;

const AdminPage: React.FC<{ userType?: string }> = ({ userType }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [cartAnchorEl, setCartAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
  // const isCartOpen = Boolean(cartAnchorEl);
  // const items = useSelector((state: RootState) => state.cart.items);
  // const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const hasUser = localStorage.getItem('user')
  const handleNewProduct = () => {
    setSelectedPage('Cadastro de Produtos')
  }
  const handleNewUser = () => {
    setSelectedPage('Cadastro de Usuários')
  }
  useEffect(() => {
    if (hasUser && !user) {
      setUser(JSON.parse(hasUser));
      setTimeout(() => {

        setIsLoading(false); // Assume que os dados foram carregados
      }, 1000)
    }
  }, [hasUser, user]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    navigate('/login');
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (user?.userType === 'client' || user?.userType === '') {
      navigate('/404', { replace: true });
    }
  }, [user, navigate]);

  const [selectedPage, setSelectedPage] = useState<string>(sessionStorage.getItem('selectedPage') || 'Dashboard');

  const handlePageChange = (page: string) => {
    setSelectedPage(page);
    sessionStorage.setItem('selectedPage', page);
  };

  useEffect(() => {
    const savedPage = sessionStorage.getItem('selectedPage');
    if (savedPage) {
      setSelectedPage(savedPage);
    }
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box>
          <Skeleton variant="rectangular" width="100%" height={400} />
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="40%" height={40} />
        </Box>
      );
    }

    switch (selectedPage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Cadastro de Usuários':
        return <RegisterUsers />;
      case 'Cadastro de Produtos':
        return <Product />;
      case 'Lista de Usuários':
        return <ListUsers onHandleNewUser={handleNewUser} />;
      case 'Lista de Produtos':
        return <ProductList onHandleNewProduct={handleNewProduct} />;
      case 'Lista de Vendas':
        return <SalesTable />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box sx={{ display: 'flex', }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar sx={{ backgroundColor: '#5B1B64', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            Painel de Administração
          </Typography>
          <div>
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
            </IconButton>
            <Menu
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
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar sx={{ backgroundColor: '#5B1B64' }}>
          <Typography variant="h6" noWrap component="div">
            <img src={logo} alt="Logo" style={{ height: '45px' }} />
          </Typography>
        </Toolbar>
        {isLoading ? (
          <List sx={{ backgroundColor: '#5B1B64', height: '100vh', color: 'white' }}>
            <Skeleton variant="rectangular" width="100%" height={20} />
            <Skeleton variant="rectangular" width="100%" height={20} />
            <Skeleton variant="text" width="100%" height={40} />
            <Skeleton variant="text" width="100%" height={40} />
            <Skeleton variant="text" width="100%" height={40} />
            <Skeleton variant="text" width="100%" height={40} />
          </List>
        ) : (

          <List sx={{ backgroundColor: '#5B1B64', height: '100vh', color: 'white' }}>
            {['Dashboard', 'Cadastro de Usuários', 'Cadastro de Produtos', 'Lista de Usuários', 'Lista de Produtos', 'Lista de Vendas'].map((text) => (
              <ListItem
                button
                key={text}
                onClick={() => handlePageChange(text)}
                sx={{
                  ':hover': {
                    animation: 1,
                    background: selectedPage !== text ? 'white' : '#5B1B64',
                    color: selectedPage !== text ? '#5B1B64' : 'white',
                  },
                  color: selectedPage === text ? '#5B1B64' : 'white',
                  backgroundColor: selectedPage === text ? 'white' : '#5B1B64',
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold!important' }}>
                  {text}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar sx={{ fontWeight: 'bold!important' }} />
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AdminPage;
