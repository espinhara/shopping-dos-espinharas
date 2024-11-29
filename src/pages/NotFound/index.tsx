// src/pages/NotFound.js
// import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #5B1B64; /* Azul */
  color: white; /* Amarelo */
  text-align: center;
`;

const Title = styled(Typography)`
  font-size: 10rem;
  margin: 0;
`;

const Subtitle = styled(Typography)`
  font-size: 2rem;
  margin: 0;
`;

const Description = styled(Typography)`
  font-size: 1.25rem;
  margin: 1rem 0;
`;

// const StyledButton = styled(Button)`
//   background-color: #df9c10; /* Amarelo */
//   color: #02617d; /* Azul */
//   font-size: 1.25rem;
//   font-weight: bold;
//   text-decoration: none;
//   border-radius: 5px;
//   margin-top: 2rem;

//   &:hover {
//     background-color: #df9c10; /* Amarelo mais escuro */
//   }
// `;


const NotFound = () => {
  return (
    <Container>
      <Title variant="h1">404</Title>
      <Subtitle variant="h2">Página não encontrada</Subtitle>
      <Description variant="body1">A página que você está procurando não existe.</Description>
      <Button component={Link} sx={{
        backgroundColor: '#df9c10',
        color: 'white',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        borderRadius: '5px',
        marginTop: '2rem',
      }} to="/" variant="contained">
        Voltar para a Home
      </Button>
    </Container>
  );
};

export default NotFound;
