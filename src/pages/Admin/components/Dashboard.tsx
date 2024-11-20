// src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,  // Adicione o PointElement
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { api } from '../../../providers/api';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend);


const Dashboard: React.FC = () => {
  const [loadingTotal, setLoadingTotal] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const options = {
    // maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Note o 'as const' aqui para especificar que é uma string literal
      },
      title: {
        display: true,
        text: 'Gráfico de Exemplo',
      },
    },
  };
  // Dados de exemplo para o gráfico de vendas por períodos
  const salesData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Vendas (R$)',
        data: [5000, 7000, 8000, 12000, 10000, 14000],
        backgroundColor: 'rgba(91, 27, 100, 0.2)',
        borderColor: '#5B1B64',
        borderWidth: 2,
        fill: true,
      },
    ],
  };
  const fetchTotalSale = async () => {
    const response = await api.get('sales/total')
    setTotal(response.data?.totalSales)
    setTotalProducts(response.data?.totalQuantityProducts)
    setLoadingTotal(false);
  }
  // Dados de exemplo para o gráfico de produtos mais vendidos e menos vendidos
  const productsData = {
    labels: ['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E'],
    datasets: [
      {
        label: 'Mais Vendidos',
        data: [200, 180, 150, 130, 110],
        backgroundColor: '#5B1B64',
      },
      {
        label: 'Menos Vendidos',
        data: [50, 60, 70, 80, 90],
        backgroundColor: '#8e8e8e',
      },
    ],
  };
  useEffect(() => {
    fetchTotalSale();
  })
  return (
    <Box>
      <Typography variant="h4" sx={{
        color: '#5B1B64'
      }} gutterBottom>
        Dashboard de Vendas
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Vendas Totais</Typography>
            <Typography sx={{ fontWeight: 'bold', color: "#5B1B64" }} variant="h5">R$ {total.toString().replaceAll('.', ',')}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Produtos Vendidos</Typography>
            <Typography sx={{ fontWeight: 'bold', color: "#5B1B64" }} variant="h5">{totalProducts}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Novos Clientes</Typography>
            <Typography sx={{ fontWeight: 'bold', color: "#5B1B64" }} variant="h5">50</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Vendas por Período
            </Typography>
            <Line data={salesData} options={options} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Produtos Mais e Menos Vendidos
            </Typography>
            <Bar data={productsData} options={options} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
