import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';
import { Product } from '../interfaces/product';
import { Box, } from '@mui/material';
import SearchInput from './SearchInput';

interface ProductListProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  setLoading: (bool: boolean) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, setProducts, setLoading }) => {
  const [searchInput,] = useState<string>('');
  return (
    <Box>
      <SearchInput data={{
        searchInput,
      }} onSearch={function (list: Product[]): void { setProducts(list); }}
        setLoading={setLoading} />
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
    </Box>
  );
};

export default ProductList;
