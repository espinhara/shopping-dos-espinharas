import React, { useEffect, useState } from 'react';

import ProductList from './components/ProductList';
import { Product } from './interfaces/product';
import { api } from './providers/api';
import { LoadingApp } from './components/Loading';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  // Função para buscar os produtos do backend
  const fetchProducts = async () => {
    try {
      const response = await api.get('products');
      setProducts(response.data);
      setLoading(false);
      // setFilteredProducts(response.data); // Inicializa a lista filtrada
    } catch (error) {
      setLoading(false);
      console.error('Erro ao buscar produtos:', error);
    }
  };
  // Carregar os produtos ao montar o componente
  useEffect(() => {
    fetchProducts();
  }, []);
  if (loading) return <LoadingApp />;
  return (
    <div style={{

    }} className="App">
      <div style={{ margin: 10 }}>
        <h1>Produtos em Destaque</h1>
        <ProductList products={products} />

      </div>
    </div>
  );
}

export default App;
