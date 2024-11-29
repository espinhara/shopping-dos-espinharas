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
// import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend);


const Dashboard: React.FC = () => {
  // const navigate = useNavigate();
  // const [loadingTotal, setLoadingTotal] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalClients, setTotalClients] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0);
  const [lastSixMonthSales, setSixMothSales] = useState<[{ month: string, totalSales: number }]>([{ month: "", totalSales: 0 }])
  // const [productsPerSale, setProductsPerSale] = useState<[
  // { productName: string, totalQuantity: number, totalRevenue: number }]>([{ productName: '', totalQuantity: 0, totalRevenue: 0 }
  // ])
  const [topProducts, setTopProducts] = useState<[{ productName: string, totalQuantity: number, totalRevenue: number }]>([{ productName: '', totalQuantity: 0, totalRevenue: 0 }])
  const [leastProducts, setLeastProducts] = useState<[{ productName: string, totalQuantity: number, totalRevenue: number }]>([{ productName: '', totalQuantity: 0, totalRevenue: 0 }])
  const fetchCountUsers = async () => {
    const count = await (await api.get('users/count')).data
    setTotalClients(count as unknown as number)
  }

  const options = (text: string) => ({
    // maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Note o 'as const' aqui para especificar que é uma string literal
      },
      title: {
        display: true,
        text,
      },
    },
  });
  // Dados de exemplo para o gráfico de vendas por períodos
  const salesData = {
    labels: lastSixMonthSales.reverse().map(e => { return e.month }),
    datasets: [
      {
        label: 'Vendas (R$)',
        data: lastSixMonthSales.map(e => { return e.totalSales }),
        backgroundColor: 'rgba(91, 27, 100, 0.2)',
        borderColor: '#5B1B64',
        borderWidth: 2,
        fill: true,
      },
    ],
  };
  const fetchTotalSale = async () => {
    try {
      const response = await api.get('sales/total')
      setTotal(response.data?.totalSales)
      setTotalProducts(response.data?.totalQuantityProducts)
      // setLoadingTotal(false);
    } catch (error) {
      window.location.href = '/404';
    }
  }
  const fetchSalesLastSixMonths = async () => {
    try {
      const response = await api.get('sales/last-six-months')
      setSixMothSales(response.data?.lastSixMonths);

    } catch (error) {
      // navigate('/404')
      console.log(error)
    }
  }

  // const fetchProductsPerSale = async () => {
  //   const response = await api.get('sales/products-per-sales');
  //   setProductsPerSale(response.data);
  // }
  const fetchProductsTopLeastPerSale = async () => {
    const response = await api.get('sales/top-least-products');
    setLeastProducts(response.data.leastSold);
    setTopProducts(response.data.mostSold);
  }

  // Dados de exemplo para o gráfico de produtos mais vendidos e menos vendidos
  const productsData = {
    labels: [...topProducts.map(e => e.productName.substring(0, 10).padEnd(13, '.')),],
    datasets: [
      {
        label: 'Mais Vendidos',
        data: topProducts.map(e => e.totalQuantity),
        backgroundColor: '#5B1B64',
        borderWidth: 1,
      },
    ],
  };
  const productsLeastData = {
    labels: leastProducts.map(e => e.productName.substring(0, 10).padEnd(13, '.')).reverse(),
    datasets: [
      {
        label: 'Menos Vendidos',
        data: leastProducts.map(e => e.totalQuantity).reverse(),
        backgroundColor: '#5B1B64',
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    fetchTotalSale();
    fetchCountUsers();
    fetchSalesLastSixMonths();
    // fetchProductsPerSale();
    fetchProductsTopLeastPerSale();
  }, [])
  return (
    <Box>
      <Typography variant="h4" sx={{
        color: '#5B1B64',
        fontWeight: 'bold',
      }} gutterBottom>
        Dashboard de Vendas
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{
          borderColor: "#5B1B64"
        }} sm={6} md={4}>
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
            <Typography sx={{ fontWeight: 'bold', color: "#5B1B64" }} variant="h5">{totalClients}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} >
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Produtos Mais Vendidos</Typography>
            <Bar data={productsData} options={options("Top 5 dos mais vendidos")} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} >
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Produtos Menos Vendidos</Typography>
            <Bar data={productsLeastData} options={options("Top 5 dos menos vendidos")} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Vendas por Período
            </Typography>
            <Line data={salesData} options={options("Últimos 6 meses")} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
