import React from 'react';
import { Box, Typography, IconButton, Link } from '@mui/material';
import { Instagram, WhatsApp, LocationOn } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f7f7f7', // Cor de fundo clara
        padding: '16px 0', // Espaçamento interno
        textAlign: 'center', // Centraliza o conteúdo
        borderTop: '1px solid #ddd', // Linha superior sutil
      }}
    >
      {/* Nome da Empresa */}
      <Typography variant="h6" gutterBottom>
        Brechó da Neide
      </Typography>

      {/* Redes Sociais e Contato */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px', // Espaçamento entre os itens
          marginBottom: '8px',
        }}
      >
        {/* Instagram */}
        <Link
          href="https://www.instagram.com/seu_instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton>
            <Instagram sx={{ color: '#E4405F' }} />
          </IconButton>
        </Link>

        {/* WhatsApp */}
        <Link
          href="https://wa.me/5511999999999" // Altere para seu número
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton>
            <WhatsApp sx={{ color: '#25D366' }} />
          </IconButton>
        </Link>
      </Box>

      {/* Localização */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px', // Espaçamento entre o ícone e o texto
        }}
      >
        <LocationOn sx={{ color: '#555' }} />
        <Typography variant="body2">
          Rua Hildebrando Firmino Lino da Costa, 97 - Jandira, SP
        </Typography>
      </Box>

      {/* Direitos Autorais */}
      <Typography variant="body2" sx={{ marginTop: '16px', color: '#777' }}>
        © {new Date().getFullYear()} Brechó da Neide. Todos os direitos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
