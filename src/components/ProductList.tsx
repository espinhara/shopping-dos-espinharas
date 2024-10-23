import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
