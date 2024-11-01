import React, { useEffect, useState } from 'react';

import ProductList from './components/ProductList';
import Header from './components/Header';
import axios from 'axios';
import { Product } from './interfaces/product';
const base_url = 'http://localhost:5000'

const App: React.FC = () => {
   // Função para buscar os produtos do backend
   
  const [products, setProducts] = useState<Product[]>([]);
   const fetchProducts = async () => {
    try {
      const response = await axios.get(base_url +'/api/products');
      setProducts(response.data);
      // setFilteredProducts(response.data); // Inicializa a lista filtrada
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Carregar os produtos ao montar o componente
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div style={{
      
    }} className="App">
      <Header />
      <div style={{ margin: 10}}>
      <h1>Produtos em Destaque</h1>
      <ProductList products={products} />

      </div>
    </div>
  );
}

export default App;
