import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, IconButton, List, ListItem, ListItemText, Modal, Paper, TextField, FormControl, FormLabel, RadioGroup, Select, MenuItem, FormControlLabel, Radio, ListItemAvatar, Avatar, Input, styled, InputBase, Grid } from '@mui/material';
import { RootState } from '../../store';
import { updateItemQuantity, removeItemFromCart, removeItemsFromCart } from '../../store/slices/cartSlice';
import { api } from '../../providers/api';
import { CartItem } from '../../interfaces/cart';
import { ArrowBack, RemoveShoppingCart, RemoveShoppingCartSharp, ShoppingCart, ShoppingCartCheckout, ShoppingCartOutlined, ShoppingCartRounded, ShoppingCartSharp } from '@mui/icons-material';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [openModal, setOpenModal] = useState(false);
  const [customerName, setCustomerName] = React.useState('');
  const [pickupName, setPickupName] = React.useState('');
  const [paymentMethod, setPaymentMethod] = useState<'in_sight' | 'in_installments'>('in_sight');
  const [installments, setInstallments] = useState(1);
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = paymentMethod === 'in_installments' ? subtotal : subtotal;
  const installmentValue = paymentMethod === 'in_installments' ? (total / installments).toFixed(2) : total;
  const toSafePayment = (payment: 'in_sight' | 'in_installments') => {
    const methods = { 'in_sight': 'à vista', 'in_installments': 'parcelado' }

    return methods[payment]
  }
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleIncrease = (itemId: string, quantity: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item && item.stock > item.quantity) {
      if (item.stock < quantity) {
        return alert('A quantidade excede o estoque disponível!: ' + quantity + '\n' + item.stock);
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

  const handlePurchase = async () => {
    if (!customerName || !pickupName) {
      alert("Por favor, preencha os dados do cliente e nome para retirada.");
      return;
    }

    const products = cartItems.map(item => ({
      productId: item.id,
      productName: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const subtotal = total; // Caso precise adicionar taxas, ajuste aqui

    try {
      const response = await api.post('sales/cart', {
        products,
        subtotal,
        total,
        paymentMethod, // Ajuste para selecionar outras formas
        installments,
        customerName,
        pickupName,
      });
      console.log(JSON.stringify(response))
      if (response.status === 201) {
        const whatsappNumber = "5511932337896";
        const generateCartMessage = (cartItems: CartItem[], customerName: string, pickupName: string, subtotal: number, total: number, installments: number, installmentValue: string | number, paymentMethod: 'in_sight' | 'in_installments') => {
          let productDetails = cartItems.map(item =>
            `- Produto: ${item.name}%0A  Quantidade: ${item.quantity}%0A  Preço unitário: R$${item.price.toFixed(2)}%0A`
          ).join("%0A");

          const message = `Olá, quero realizar a seguinte compra:%0A
          ${productDetails}%0A
          Subtotal: R$${subtotal.toFixed(2)}%0A
          Total: R$${total.toFixed(2)}%0A
          Parcelado em: ${installments}x de R$${Number(installmentValue).toFixed(2)}%0A
          Pagamento: ${toSafePayment(paymentMethod)}%0A
          Nome do cliente: ${customerName}%0A
          Nome para retirada: ${pickupName}`;

          return message;
        };
        const message = generateCartMessage(cartItems, customerName, pickupName, subtotal, total, installments, installmentValue, paymentMethod);
        alert("Compra realizada com sucesso!");
        localStorage.removeItem("cart");
        // Redireciona para o WhatsApp ou limpa o carrinho
        window.location.href = `https://wa.me/${whatsappNumber}?text=${message}`;
      }
    } catch (error) {
      console.error("Erro ao registrar a venda:", error);
      alert("Erro ao registrar a venda, tente novamente mais tarde.");
    }
  };
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    // color: 'inherit',
    // border: "2",
    '& .MuiInputBase-input': {
      // padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      // paddingLeft: `calc(1em + ${theme.spacing(0)})`,
      transition: theme.transitions.create('width'),
      // width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '2ch',
      },
    },
  }));
  return (
    <Grid
      container
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        // "@media (max-height: 100vh)": { height: "70vh" },
        height: "100vh",
        width: "100%",
        maxWidth: "800px",
        margin: "auto",
        padding: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: 0,
          marginBottom: 0,
          width: "100%",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={() => window.history.back()}
          sx={{
            marginRight: 1,
            color: "grey.700",
          }}
        >
          <ArrowBack />
        </IconButton>
        Carrinho
      </Typography>
      {cartItems.length === 0 ? (
        // Mensagem para carrinho vazio
        <>
          <Typography variant="h6" sx={{ textAlign: "center", marginTop: 0 }}>
            Seu carrinho está vazio! Adicione produtos para continuar.
          </Typography>
          <RemoveShoppingCart sx={{
            height: "20vh",
            width: "20vw"
          }} />
        </>
      ) : (
        <>
          <List sx={{
            width: "100%", overflowY: 'auto',
            height: "45vh",
            overflowX: 'auto',
          }}>
            {cartItems.map((item) => (

              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #ccc",
                  paddingY: 1,
                }}
              >
                <Grid container>

                  <Grid container>
                    <ListItemAvatar>
                      <Avatar src={item.imageUrl} alt={item.name} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={`Preço: R$${item.price.toFixed(2)} | Estoque: ${item.stock} | Quantidade: ${item.quantity}\nSubtotal: R$${(item.price * item.quantity).toFixed(2)}`} />

                  </Grid>
                  <Grid container spacing={2} sx={{ marginTop: 1 }}>
                    <Grid item xs={6} sm={6} textAlign="start">
                      <Button onClick={() => handleRemove(item.id)} color="error">
                        Remover
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Box display="flex" alignItems="center" justifyContent="flex-end">
                        <IconButton onClick={() => handleDecrease(item.id)}>-</IconButton>
                        <StyledInputBase
                          readOnly
                          value={item.quantity}
                          sx={{
                            width: 40,
                            textAlign: "center",
                            border: "1px solid #ccc",
                            borderRadius: 2,
                            padding: "5px",
                            marginX: 1,
                          }} />
                        <IconButton onClick={() => handleIncrease(item.id, item.quantity)}>+</IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          <div>

            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Total: R$ {totalAmount.toFixed(2)}
            </Typography><Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2, }}
              onClick={() => setOpenModal(true)}
              disabled={cartItems.length === 0}
            >
              Finalizar Compra
            </Button>
          </div>
        </>

      )}
      {/* Modal de Finalização */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper
          sx={{
            width: "90%",
            maxWidth: "500px",
            maxHeight: "100vh",
            overflowY: "auto",
            padding: 3,
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Finalizar Compra
          </Typography>
          <TextField
            fullWidth
            label="Nome do Cliente"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            label="Nome para Retirada"
            value={pickupName}
            onChange={(e) => setPickupName(e.target.value)}
            sx={{ my: 2 }}
          />
          <List
            sx={{
              overflowY: "auto",
              maxHeight: "20vh",
            }}
          >
            {cartItems.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantidade: ${item.quantity} | Subtotal: R$${(item.price * item.quantity).toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Total: R$ {totalAmount.toFixed(2)}
          </Typography>
          <FormControl component="fieldset" sx={{
            mt: 3,
          }}>
            <FormLabel component="legend">Método de Pagamento</FormLabel>
            <RadioGroup
              row
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as any)}
            >
              <FormControlLabel value="in_sight" control={<Radio />} label="À vista" />
              <FormControlLabel
                value="in_installments"
                control={<Radio />}
                label="Parcelado em até 3x sem juros"
              />
            </RadioGroup>
          </FormControl>

          {paymentMethod === "in_installments" && (
            <Box mt={2}>
              <FormControl fullWidth>
                <FormLabel>Escolha o número de parcelas</FormLabel>
                <Select
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                >
                  {[1, 2, 3].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}x de R${(total / num).toFixed(2)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handlePurchase}
          >
            Confirmar Compra
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ marginTop: 1, marginBottom: 1 }}
            onClick={() => setOpenModal(false)}
          >
            Cancelar
          </Button>
        </Paper>
      </Modal>
    </Grid>

  );
};

export default CartPage;
