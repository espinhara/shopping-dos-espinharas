import { CircularProgress } from "@mui/material";
import logo from '../assets/logo.svg'
import React from "react";
export const LoadingApp: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed', // Fixa o componente em relação à tela inteira
        top: '50%', // Move o componente 50% para baixo
        left: '50%', // Move o componente 50% para a direita
        transform: 'translate(-50%, -50%)', // Ajusta o ponto de ancoragem para o centro
        display: 'flex', // Ativa o flexbox
        flexDirection: 'column', // Alinha os elementos verticalmente
        alignItems: 'center', // Centraliza os elementos horizontalmente
      }}
    >
      {/* Shopping dos Espinhara's */}
      <img
        style={{ height: '200px', marginBottom: '26px' }} // Espaçamento entre imagem e spinner
        src={logo}
        alt="Logo"
      />
      <CircularProgress
        sx={{
          height: "50px",
          color: '#5B1B64',
        }}
      />
    </div>
  );

}