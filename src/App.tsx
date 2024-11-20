import React, { useEffect, useState } from 'react';

import ProductList from './components/ProductList';
import Header from './components/Header';
import { Product } from './interfaces/product';
import { api } from './providers/api';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // Função para buscar os produtos do backend
  const fetchProducts = async () => {
    try {
      const response = await api.get('products');
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
      <div style={{ margin: 10 }}>
        <h1>Produtos em Destaque</h1>
        <ProductList products={products} />

      </div>
    </div>
  );
}

export default App;
