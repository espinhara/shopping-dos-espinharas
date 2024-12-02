import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, IconButton, List, ListItem, ListItemText, Modal, Paper, TextField, FormControl, FormLabel, RadioGroup, Select, MenuItem, FormControlLabel, Radio } from '@mui/material';
import { RootState } from '../../store';
import { updateItemQuantity, removeItemFromCart, removeItemsFromCart } from '../../store/slices/cartSlice';
import { api } from '../../providers/api';
import { CartItem } from '../../interfaces/cart';
import { ArrowBack } from '@mui/icons-material';

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

  return (
    <Box sx={{ height: "100%", "@media (max-height: 100vh)": { height: "120vh" }, padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        <IconButton
          aria-label="close"
          onClick={() => window.history.back()}
          sx={{
            // position: 'absolute',
            color: 'grey.500',

          }}
        >
          <ArrowBack />
        </IconButton>
        Carrinho
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid #ccc',
            }}
          >
            <ListItemText
              primary={item.name}
              secondary={`Preço: R$${item.price.toFixed(2)} | Estoque: ${item.stock} | Quantidade: ${item.quantity}\n SubTotal R$${(
                item.price * item.quantity
              ).toFixed(2)}`}
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
        {totalAmount.toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={() => setOpenModal(true)}
        disabled={cartItems.length === 0}
      >
        Finalizar Compra
      </Button>

      {/* Modal de Finalização */}
      <Modal open={openModal}
        onClose={() => setOpenModal(false)}>
        <Paper
          sx={{
            maxWidth: '400px',
            maxHeight: '600px',
            padding: 3,
            margin: 'auto',
            marginTop: '10%',
            overflowY: 'auto', // Rolagem vertical ativada se necessário
            overflowX: 'hidden', // Evita rolagem horizontal indesejada
            position: 'relative',
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
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantidade: ${item.quantity} | SubTotal: R$${(item.price * item.quantity).toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Total: R${totalAmount.toFixed(2)}
          </Typography>
          <FormControl component="fieldset" sx={{ mt: 3 }}>
            <FormLabel component="legend">Método de Pagamento</FormLabel>
            <RadioGroup
              row
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as any)}
            >
              <FormControlLabel value="in_sight" control={<Radio />} label="À vista" />
              <FormControlLabel value="in_installments" control={<Radio />} label="Parcelado em até 3x sem juros" />
            </RadioGroup>
          </FormControl>

          {paymentMethod === 'in_installments' && (
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
              <Typography variant="body2" sx={{ mt: 2 }}>
                Valor da Parcela: R${installmentValue}
              </Typography>
            </Box>
          )}
          <Typography variant="subtitle1">
            Valor por Parcela: R${(totalAmount / installments).toFixed(2)}
          </Typography>
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
            sx={{ marginTop: 1 }}
            onClick={() => setOpenModal(false)}
          >
            Cancelar
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
};

export default CartPage;
