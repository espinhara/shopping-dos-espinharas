import { CircularProgress } from "@mui/material";
import React from "react";
export const LoadingApp: React.FC = () => {
  return (
    <CircularProgress sx={{
      color: "#5B1B64",
      position: 'fixed', // Fixa o componente em relação à tela inteira
      top: '50%', // Move o componente 50% para baixo
      left: '50%', // Move o componente 50% para a direita
      transform: 'translate(-50%, -50%)', // Ajusta o ponto de ancoragem para o centro
    }} />);

}