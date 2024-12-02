// src/pages/Admin/components/SalesTable.tsx
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  TablePagination,
} from '@mui/material';

import { Sale } from '../../../interfaces/sale';
import { api } from '../../../providers/api';


const SalesTable: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Função para buscar as vendas do backend
  const fetchSales = async () => {
    try {
      const response = await api.get('sales/list');
      setSales(response.data);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    }
  };

  // Função para alterar a página atual
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
    setPage(0);
  };

  // Função para aprovar a venda e atualizar seu status no backend
  const handleApproveSale = async (saleId: string) => {
    try {
      await api.patch(`sales/${saleId}/approve`);
      alert('Venda aprovada com sucesso!');
      fetchSales(); // Atualizar a lista de vendas após aprovação
    } catch (error) {
      console.error('Erro ao aprovar a venda:', error);
      alert('Erro ao aprovar a venda.');
    }
  };

  const toSafePayment = (payment: 'in_sight' | 'in_installments') => {
    const methods = { 'in_sight': 'À vista', 'in_installments': 'Parcelado' }

    return methods[payment]
  }
  const toSafeStatus = (payment: 'pending' | 'paid') => {
    const methods = { 'pending': 'Pendente', 'paid': 'Pago' }

    return methods[payment]
  }

  // Carregar as vendas ao montar o componente
  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <TableContainer
      sx={{
        maxHeight: '950px', // Altura máxima fixa da tabela
        overflowY: 'auto', // Rolagem vertical ativada se necessário
        overflowX: 'hidden', // Evita rolagem horizontal indesejada
      }}
      component={Paper}>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
        <Typography variant="h6" sx={{
          color: '#5B1B64'
        }} gutterBottom>
          Listagem de Vendas
        </Typography>
      </Box>

      <Table aria-label="tabela de vendas">
        <TableHead>
          <TableRow>
            <TableCell>ID da Venda</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Quem retira</TableCell>
            <TableCell>Metodo de pagamento</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Produtos</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sales
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((sale) => (
              <TableRow key={sale._id}>
                <TableCell>{sale._id}</TableCell>
                <TableCell>{new Date(sale.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{sale.customerName}</TableCell>
                <TableCell>{sale.pickupName}</TableCell>
                <TableCell>{toSafePayment(sale.paymentMethod || 'in_sight')}</TableCell>
                <TableCell>{toSafeStatus(sale.status || 'pending')}</TableCell>
                <TableCell>
                  {sale.products.map((product) => (
                    <div key={product.productId}>
                      {product.productName} (Qtd: {product.quantity})
                    </div>
                  ))}
                </TableCell>
                <TableCell>{sale.total.toFixed(2)}</TableCell>
                <TableCell>
                  {sale.status === 'pending' ? (
                    <Button variant="contained" color="primary" onClick={() => handleApproveSale(sale._id)}>
                      Aprovar
                    </Button>
                  ) : (
                    <Button variant="contained" disabled>
                      {sale.status === 'paid' ? 'Pago' : 'Cancelado'}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        labelRowsPerPage="Linhas por página"
        component="div"
        count={sales.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default SalesTable;
