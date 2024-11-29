// src/pages/Admin/components/ProductTable.tsx
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  TextField,
  Button,
  Box,
  Typography,
  TablePagination,
  InputAdornment,
} from '@mui/material';

// import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Product } from '../../../interfaces/product';
import { api } from '../../../providers/api';
import { IProductsTable } from '../../../interfaces/productsTable';

const ProductsTable: React.FC<IProductsTable> = ({ onHandleNewProduct }) => {
  // const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState(0); // Página atual
  const [rowsPerPage, setRowsPerPage] = useState(10); // Quantidade de registros por página

  const handleNewProduct = () => {
    onHandleNewProduct()
  }
  // Função para buscar os produtos do backend
  const fetchProducts = async () => {
    try {
      const response = await api.get('products/list');
      setProducts(response.data);
      setFilteredProducts(response.data); // Inicializa a lista filtrada
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Função para lidar com as atualizações de um campo do produto
  const handleFieldChange = (
    productId: string,
    fieldName: keyof Product,
    value: any
  ) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, [fieldName]: value } : product
      )
    );
    setFilteredProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, [fieldName]: value } : product
      )
    )
  };

  // Função para salvar as alterações de um produto no backend
  const handleSaveProduct = async (product: Product) => {
    try {
      await api.put(`products/${product._id}`, product);
      alert('Produto atualizado com sucesso!');
    } catch (error) {
      window.location.reload();
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto.');
    }
  };
  // Função para salvar as alterações de um produto no backend
  const handleDeleteProduct = async (product: Product) => {
    try {
      await api.delete(`products/${product._id}`);
      alert('Produto deletado com sucesso!');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      alert('Erro ao deletar produto.');
    }
  };

  //Função para alterar a página atual
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // Função para alterar a quantidade de registros por página
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reinicia para a primeira página
  };

  // Função de pesquisa
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product._id.toLowerCase().includes(term)
      )
    );
  };

  // Carregar os produtos ao montar o componente
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
        <Typography variant="h6" sx={{
          color: '#5B1B64'
        }} gutterBottom>
          Listagem de Produtos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleNewProduct()}
        >
          Adicionar Produto
        </Button>
      </Box>

      {/* Barra de pesquisa */}
      <Box padding={2}>
        <TextField
          fullWidth
          placeholder="Pesquisar produto por nome, descrição ou ID"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Table aria-label="tabela de produtos">
        <TableHead>
          <TableRow>
            <TableCell>Ativo</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Quantidade em Estoque</TableCell>
            <TableCell>Imagens</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Switch
                    checked={product.isActive}
                    onChange={(e) =>
                      handleFieldChange(product._id, 'isActive', e.target.checked)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={product.name}
                    onChange={(e) =>
                      handleFieldChange(product._id, 'name', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={product.description}
                    onChange={(e) =>
                      handleFieldChange(product._id, 'description', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      handleFieldChange(product._id, 'price', parseFloat(e.target.value))
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleFieldChange(product._id, 'quantity', parseInt(e.target.value, 10))
                    }
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    {product.imageUrls.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={product.name}
                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '4px' }}
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSaveProduct(product)}
                    >
                      Salvar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteProduct(product)}
                    >
                      Excluir
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        labelRowsPerPage='Linhas por página'
        component="div"
        count={filteredProducts.length} // Total de produtos
        page={page} // Página atual
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage} // Quantidade de registros por página
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>


  );
};

export default ProductsTable;
