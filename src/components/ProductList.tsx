import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';
import { Product } from '../interfaces/product';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Grid container spacing={4} mb={8}>
      {products.map((product) => (
        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard
            id={product._id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrls[0]} quantity={product.quantity} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
