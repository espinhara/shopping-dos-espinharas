import React from 'react';

import ProductList from './components/ProductList';
import Header from './components/Header';

const products = [
  {
    id:Math.random(),
    name: 'Camiseta Básica',
    price: 29.99,
    imageUrl: 'https://imgs.search.brave.com/i-_3l5Kb3oEkPHLOaMS-GjyjQ8OhLSyIfXOxP-LbsZo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFMdEFvYk9Dbkwu/anBn',
  },
  {
    id:Math.random(),
    name: 'Calça Jeans',
    price: 79.99,
    imageUrl: 'https://imgs.search.brave.com/8nS4IkZmoAtT7qajdSSH8scQteD8DAqP7ett0xqzTUw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nbG9i/YWwuY2RuLm1hZ2F6/b3JkLmNvbS5ici9k/ZW5pbXplcm8vaW1n/LzIwMjQvMDMvcHJv/ZHV0by80Mzc1OC9k/ejIwNzMzLWNvbS1j/YWxjYS1qZWFucy1m/ZW1pbmluYS1za2lu/bnktaG90LXBhbnRz/LWNpZ2FycmV0ZS1j/b20tYWJlcnR1cmEt/bmEtYmFycmEtZnJl/bnRlLWNyb3AtMi5q/cGc_aW1zPWZpdC1p/bi80MDZ4NjA5L2Zp/bHRlcnM6ZmlsbCh3/aGl0ZSk',
  },
  {
    id:Math.random(),
    name: 'Camiseta Básica',
    price: 29.99,
    imageUrl: 'https://imgs.search.brave.com/i-_3l5Kb3oEkPHLOaMS-GjyjQ8OhLSyIfXOxP-LbsZo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFMdEFvYk9Dbkwu/anBn',
  },
  {
    id:Math.random(),
    name: 'Calça Jeans',
    price: 79.99,
    imageUrl: 'https://imgs.search.brave.com/8nS4IkZmoAtT7qajdSSH8scQteD8DAqP7ett0xqzTUw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nbG9i/YWwuY2RuLm1hZ2F6/b3JkLmNvbS5ici9k/ZW5pbXplcm8vaW1n/LzIwMjQvMDMvcHJv/ZHV0by80Mzc1OC9k/ejIwNzMzLWNvbS1j/YWxjYS1qZWFucy1m/ZW1pbmluYS1za2lu/bnktaG90LXBhbnRz/LWNpZ2FycmV0ZS1j/b20tYWJlcnR1cmEt/bmEtYmFycmEtZnJl/bnRlLWNyb3AtMi5q/cGc_aW1zPWZpdC1p/bi80MDZ4NjA5L2Zp/bHRlcnM6ZmlsbCh3/aGl0ZSk',
  },
  {
    id:Math.random(),
    name: 'Camiseta Básica',
    price: 29.99,
    imageUrl: 'https://imgs.search.brave.com/i-_3l5Kb3oEkPHLOaMS-GjyjQ8OhLSyIfXOxP-LbsZo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFMdEFvYk9Dbkwu/anBn',
  },
  {
    id:Math.random(),
    name: 'Calça Jeans',
    price: 79.99,
    imageUrl: 'https://imgs.search.brave.com/8nS4IkZmoAtT7qajdSSH8scQteD8DAqP7ett0xqzTUw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nbG9i/YWwuY2RuLm1hZ2F6/b3JkLmNvbS5ici9k/ZW5pbXplcm8vaW1n/LzIwMjQvMDMvcHJv/ZHV0by80Mzc1OC9k/ejIwNzMzLWNvbS1j/YWxjYS1qZWFucy1m/ZW1pbmluYS1za2lu/bnktaG90LXBhbnRz/LWNpZ2FycmV0ZS1j/b20tYWJlcnR1cmEt/bmEtYmFycmEtZnJl/bnRlLWNyb3AtMi5q/cGc_aW1zPWZpdC1p/bi80MDZ4NjA5L2Zp/bHRlcnM6ZmlsbCh3/aGl0ZSk',
  },
  {
    id:Math.random(),
    name: 'Camiseta Básica',
    price: 29.99,
    imageUrl: 'https://imgs.search.brave.com/i-_3l5Kb3oEkPHLOaMS-GjyjQ8OhLSyIfXOxP-LbsZo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFMdEFvYk9Dbkwu/anBn',
  },
  {
    id:Math.random(),
    name: 'Calça Jeans',
    price: 79.99,
    imageUrl: 'https://imgs.search.brave.com/8nS4IkZmoAtT7qajdSSH8scQteD8DAqP7ett0xqzTUw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nbG9i/YWwuY2RuLm1hZ2F6/b3JkLmNvbS5ici9k/ZW5pbXplcm8vaW1n/LzIwMjQvMDMvcHJv/ZHV0by80Mzc1OC9k/ejIwNzMzLWNvbS1j/YWxjYS1qZWFucy1m/ZW1pbmluYS1za2lu/bnktaG90LXBhbnRz/LWNpZ2FycmV0ZS1j/b20tYWJlcnR1cmEt/bmEtYmFycmEtZnJl/bnRlLWNyb3AtMi5q/cGc_aW1zPWZpdC1p/bi80MDZ4NjA5L2Zp/bHRlcnM6ZmlsbCh3/aGl0ZSk',
  },
  {
    id:Math.random(),
    name: 'Camiseta Básica',
    price: 29.99,
    imageUrl: 'https://imgs.search.brave.com/i-_3l5Kb3oEkPHLOaMS-GjyjQ8OhLSyIfXOxP-LbsZo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFMdEFvYk9Dbkwu/anBn',
  },
  {
    id:Math.random(),
    name: 'Calça Jeans',
    price: 79.99,
    imageUrl: 'https://imgs.search.brave.com/8nS4IkZmoAtT7qajdSSH8scQteD8DAqP7ett0xqzTUw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nbG9i/YWwuY2RuLm1hZ2F6/b3JkLmNvbS5ici9k/ZW5pbXplcm8vaW1n/LzIwMjQvMDMvcHJv/ZHV0by80Mzc1OC9k/ejIwNzMzLWNvbS1j/YWxjYS1qZWFucy1m/ZW1pbmluYS1za2lu/bnktaG90LXBhbnRz/LWNpZ2FycmV0ZS1j/b20tYWJlcnR1cmEt/bmEtYmFycmEtZnJl/bnRlLWNyb3AtMi5q/cGc_aW1zPWZpdC1p/bi80MDZ4NjA5L2Zp/bHRlcnM6ZmlsbCh3/aGl0ZSk',
  },
  {
    id:Math.random(),
    name: 'Camiseta Básica',
    price: 29.99,
    imageUrl: 'https://imgs.search.brave.com/i-_3l5Kb3oEkPHLOaMS-GjyjQ8OhLSyIfXOxP-LbsZo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFMdEFvYk9Dbkwu/anBn',
  },
  {
    id:Math.random(),
    name: 'Calça Jeans',
    price: 79.99,
    imageUrl: 'https://imgs.search.brave.com/8nS4IkZmoAtT7qajdSSH8scQteD8DAqP7ett0xqzTUw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nbG9i/YWwuY2RuLm1hZ2F6/b3JkLmNvbS5ici9k/ZW5pbXplcm8vaW1n/LzIwMjQvMDMvcHJv/ZHV0by80Mzc1OC9k/ejIwNzMzLWNvbS1j/YWxjYS1qZWFucy1m/ZW1pbmluYS1za2lu/bnktaG90LXBhbnRz/LWNpZ2FycmV0ZS1j/b20tYWJlcnR1cmEt/bmEtYmFycmEtZnJl/bnRlLWNyb3AtMi5q/cGc_aW1zPWZpdC1p/bi80MDZ4NjA5L2Zp/bHRlcnM6ZmlsbCh3/aGl0ZSk',
  },
  {
    id:Math.random(),
    name: 'Camiseta Básica',
    price: 29.99,
    imageUrl: 'https://imgs.search.brave.com/i-_3l5Kb3oEkPHLOaMS-GjyjQ8OhLSyIfXOxP-LbsZo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFMdEFvYk9Dbkwu/anBn',
  },
  {
    id:Math.random(),
    name: 'Calça Jeans',
    price: 79.99,
    imageUrl: 'https://imgs.search.brave.com/8nS4IkZmoAtT7qajdSSH8scQteD8DAqP7ett0xqzTUw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nbG9i/YWwuY2RuLm1hZ2F6/b3JkLmNvbS5ici9k/ZW5pbXplcm8vaW1n/LzIwMjQvMDMvcHJv/ZHV0by80Mzc1OC9k/ejIwNzMzLWNvbS1j/YWxjYS1qZWFucy1m/ZW1pbmluYS1za2lu/bnktaG90LXBhbnRz/LWNpZ2FycmV0ZS1j/b20tYWJlcnR1cmEt/bmEtYmFycmEtZnJl/bnRlLWNyb3AtMi5q/cGc_aW1zPWZpdC1p/bi80MDZ4NjA5L2Zp/bHRlcnM6ZmlsbCh3/aGl0ZSk',
  },
  {
    id:Math.random(),
    name: 'Camiseta Básica',
    price: 29.99,
    imageUrl: 'https://imgs.search.brave.com/i-_3l5Kb3oEkPHLOaMS-GjyjQ8OhLSyIfXOxP-LbsZo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFMdEFvYk9Dbkwu/anBn',
  },
  {
    id:Math.random(),
    name: 'Calça Jeans',
    price: 79.99,
    imageUrl: 'https://imgs.search.brave.com/8nS4IkZmoAtT7qajdSSH8scQteD8DAqP7ett0xqzTUw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nbG9i/YWwuY2RuLm1hZ2F6/b3JkLmNvbS5ici9k/ZW5pbXplcm8vaW1n/LzIwMjQvMDMvcHJv/ZHV0by80Mzc1OC9k/ejIwNzMzLWNvbS1j/YWxjYS1qZWFucy1m/ZW1pbmluYS1za2lu/bnktaG90LXBhbnRz/LWNpZ2FycmV0ZS1j/b20tYWJlcnR1cmEt/bmEtYmFycmEtZnJl/bnRlLWNyb3AtMi5q/cGc_aW1zPWZpdC1p/bi80MDZ4NjA5L2Zp/bHRlcnM6ZmlsbCh3/aGl0ZSk',
  },
  // Adicione mais produtos conforme necessário
];

const App: React.FC = () => {
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
