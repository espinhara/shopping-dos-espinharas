// src/components/Admin/CadastroUsuarios.tsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import { User } from '../../../interfaces/user';
const RegisterUsers: React.FC = () => {
  const [user, setUser] = useState<User>({
    email: '',
    _id: '',
    isActive: true,
    name: '',
    userType: 'client',
  });

  const handleFieldChange = (
    fieldName: keyof User,
    value: string | boolean
  ) => {
    let userChange = { [fieldName]: value }
    setUser((prev) => {
      return { ...prev, ...userChange };
    });
  };
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" sx={{
        color: '#5B1B64'
      }} gutterBottom>
        Cadastro de Usuários
      </Typography>
      <TextField label="Nome"
        onChange={(e) =>
          handleFieldChange('name', e.target.value)
        }
        fullWidth margin="normal" />
      <TextField label="Email"
        onChange={(e) =>
          handleFieldChange('email', e.target.value)
        }
        type='email'
        fullWidth margin="normal" />
      <TextField
        label="Senha"
        onChange={(e) =>
          handleFieldChange('password', e.target.value)
        }
        type="password"
        fullWidth
        margin="normal" />
      <Select
        label="Tipo de usuário"
        value={user?.userType}
        fullWidth
        onChange={(e) =>
          handleFieldChange('userType', e.target.value)
        }
      >
        <MenuItem value="client">Cliente</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Cadastrar
      </Button>
    </Box>
  );
};

export default RegisterUsers;
