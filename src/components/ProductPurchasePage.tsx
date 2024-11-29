// frontend/src/pages/ProductPurchasePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  CardMedia,
  Paper,
  CircularProgress,
  IconButton,
  Divider,
  Modal,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import { addItemToCart } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { ArrowBack, ArrowForward, Close, ShoppingCart } from '@mui/icons-material';
import { Product } from '../interfaces/product';
import Header from './Header';
import { api } from '../providers/api';

const ProductPurchasePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [selectedImageOver, setSelectedImageOver] = useState<string | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState<'in_sight' | 'in_installments'>('in_sight');
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Quantidade selecionada
  const [installments, setInstallments] = useState(1); // Número de parcelas
  const [customerName, setCustomerName] = useState('');
  const [pickupName, setPickupName] = useState('');
  const [errors, setErrors] = useState({ name: '', pickup: '' });
  const dispatch = useDispatch();

  const subtotal = product ? product.price * quantity : 0;
  const total = paymentMethod === 'in_installments' ? subtotal : subtotal;
  const installmentValue = paymentMethod === 'in_installments' ? (total / installments).toFixed(2) : total;
  const toSafePayment = (payment: 'in_sight' | 'in_installments') => {
    const methods = { 'in_sight': 'à vista', 'in_installments': 'parcelado' }

    return methods[payment]
  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      let stock = product.quantity - quantity
      if (stock > 0) {
        dispatch(addItemToCart({
          id: product._id, name: product.name, price: product.price, imageUrl: product.imageUrls[0], quantity,
          stock: stock,
        }));
        return;
      }
    }
    alert('Produto fora do estoque!')
  };

  const handleBack = () => {
    const ind = product?.imageUrls.findIndex((f) => f === selectedImage) ?? 0
    // alert(ind)
    if (product?.imageUrls?.length && ind - 1 >= 0) {
      setSelectedImage(product?.imageUrls[ind - 1])
    }

    if (product?.imageUrls?.length && ind - 1 < 0) {
      setSelectedImage(product?.imageUrls[product?.imageUrls?.length - 1])
    }
  }
  const handleForward = () => {
    const ind = product?.imageUrls.findIndex((f) => f === selectedImage) ?? 0
    // alert(ind)
    if (product?.imageUrls?.length && ind < product?.imageUrls?.length - 1) {
      setSelectedImage(product?.imageUrls[ind + 1])
    }

    if (product?.imageUrls?.length && ind + 1 > product?.imageUrls?.length - 1) {
      setSelectedImage(product?.imageUrls[0])
    }
  }

  const handleClose = () => {
    setOpenImageModal(false);
    setSelectedImage(undefined);
  }
  if (loading) return <CircularProgress />;

  if (!product) return <Typography>Produto não encontrado</Typography>;

  const handleBuyNow = () => setOpenModal(true);

  const validateFields = () => {
    const newErrors = { name: '', pickup: '' };
    if (!customerName) newErrors.name = 'O nome é obrigatório.';
    if (!pickupName) newErrors.pickup = 'O nome de quem vai retirar é obrigatório.';
    setErrors(newErrors);
    return !newErrors.name && !newErrors.pickup;
  };
  const handleImageHover = (image: string) => {
    setSelectedImageOver(image);
  };
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setOpenImageModal(true);
  };

  const handleConfirmPurchase = async () => {
    if (!validateFields()) return;

    const whatsappNumber = "5511932337896";
    const message = `Olá, quero comprar o produto: ${product?.name}%0AQuantidade: ${quantity}%0APreço unitário: R$${product?.price}%0ASubtotal: R$${subtotal.toFixed(2)}%0ATotal: R$${total}%0AParcelado em: ${installments}x de R$${installmentValue}%0APagamento: ${toSafePayment(paymentMethod)}%0ANome do cliente: ${customerName}%0ANome para retirada: ${pickupName}`;

    // Salvar venda no banco
    try {
      await api.post(`sales?timestamp=${new Date().getTime()}`, {
        products: [
          {
            productId: product?._id,
            productName: product?.name,
            price: product?.price,
            quantity,
          }
        ],
        subtotal,
        total,
        paymentMethod,
        installments,
        customerName,
        pickupName,
      }).then((res) => {
        if (res.data.status === 201) {
          // Enviar para WhatsApp
          window.location.href = `https://wa.me/${whatsappNumber}?text=${message}`;
        }
      });
    } catch (error) {
      console.error("Erro ao registrar a venda:", error);
      alert('Erro ao registrar a venda, tente novamente mais tarde :/')
    }

    setOpenModal(false);
  };
  // if(openImageModal){
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      handleForward();
    } else if (event.key === 'ArrowLeft') {
      handleBack();
      return
    }
  };

  return (
    <>
      <Header />
      <Paper sx={{ padding: 4, height: 'auto', marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {/* Carrossel de imagens */}
            <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
              {product.imageUrls.map((image, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={image}
                  onMouseEnter={() => handleImageHover(image)}
                  onMouseOut={() => setSelectedImageOver(undefined)}
                  onClick={() => handleImageClick(image)}
                  alt={product.name}
                  sx={{ width: '150px', height: '150px', borderRadius: 2 }}
                />
              ))}
            </Box>
            {/* Imagem destacada */}
            {selectedImageOver && (
              <Box mt={2}>
                <CardMedia
                  component="img"
                  image={selectedImageOver}
                  alt={product.name}
                  sx={{ width: '100%', maxWidth: '370px', height: 'auto', borderRadius: 2 }}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>{product.name}</Typography>
            <Typography variant="body1" color="textSecondary" paragraph>{product.description}</Typography>
            <Typography variant="h5" color="primary">R${product.price}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Quantidade disponível: {product.quantity}
            </Typography>

            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={handleAddToCart} startIcon={<ShoppingCart />}>
                Adicionar ao carrinho
              </Button>
              <Button sx={{ ml: 2 }} variant="contained" color="success" onClick={handleBuyNow}>
                Comprar agora
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* Modal de Pagamento */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Paper sx={{ maxWidth: 400, margin: 'auto', padding: 4, mt: 8 }}>
            <Typography variant="h6" gutterBottom>
              Confirmação de Compra
            </Typography>
            <Divider sx={{ my: 2 }} />
            <TextField
              label="Nome do Cliente"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              error={Boolean(errors.name)}
              helperText={errors.name}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Nome para Retirada"
              value={pickupName}
              onChange={(e) => setPickupName(e.target.value)}
              error={Boolean(errors.pickup)}
              helperText={errors.pickup}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Quantidade"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              inputProps={{ min: 1, max: product?.quantity }}
              fullWidth
              sx={{ mt: 2 }}
            />
            <Typography variant="body2" sx={{ mt: 2 }}>Subtotal: R${subtotal.toFixed(2)}</Typography>
            <Typography variant="body2">Total: R${total.toFixed(2)}</Typography>

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

            <Box mt={3}>
              <Button variant="contained" color="primary" onClick={handleConfirmPurchase}>
                Confirmar e Pagar
              </Button>
            </Box>
          </Paper>
        </Modal>
        {/* Modal de Imagem em Tela Cheia */}
      </Paper>
      <Modal open={openImageModal} onClose={handleClose}>
        <Paper onKeyDown={handleKeyPress} sx={{ maxWidth: '100%', height: '100%', justifyItems: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center', margin: 'auto', padding: 4, mt: 0 }}>
          <IconButton
            aria-label="close"
            onClick={() => setOpenImageModal(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'grey.500',
            }}
          >
            <Close />
          </IconButton>
          <IconButton
            aria-label="close"
            onClick={handleForward}
            sx={{
              position: 'absolute',
              top: "50%",
              right: 8,
              color: 'grey.500',
            }}
          >
            <ArrowForward />
          </IconButton>
          <IconButton
            aria-label="close"
            onClick={handleBack}
            sx={{
              position: 'absolute',
              top: "50%",
              left: 8,
              color: 'grey.500',
            }}
          >
            <ArrowBack />
          </IconButton>
          <CardMedia
            component="img"
            image={selectedImage}
            alt={product.name}
            sx={{ width: '30%', height: 'auto', alignItems: 'center', alignContent: 'center', borderRadius: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', mt: 2 }}>
            {product.imageUrls.map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                image={image}
                alt={product.name}
                onClick={() => setSelectedImage(image)}
                sx={{
                  width: '60px',
                  height: '60px',
                  cursor: 'pointer',
                  border: selectedImage === image ? '2px solid #5B1B64' : '2px solid transparent',
                  borderRadius: 2,
                }}
              />
            ))}
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default ProductPurchasePage;
