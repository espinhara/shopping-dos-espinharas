import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../store/slices/cartSlice';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, imageUrl }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBuyNow = () => {
    navigate(`/product/${id}`);
  };
  const handleAddToCart = () => {
    dispatch(addItemToCart({
      id, name, price, imageUrl,
      quantity: 0
    }));
  };
  return (
    <Card sx={{
      height: 500,
    }}>
      {/* onerror="this.src='./assets/img/not-found.jpg'" */}
      <CardMedia component="img" height="300" image={imageUrl} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          R${price}
        </Typography>
        <Button sx={{
          marginRight: 2
        }} onClick={handleAddToCart} variant="contained" color="primary">
          Adicionar  <ShoppingCart/>
        </Button>
        <Button variant="contained" onClick={handleBuyNow} color="success">
          Comprar
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
