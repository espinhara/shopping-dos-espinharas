// src/components/Admin/ListUsers.tsx
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
  MenuItem,
  Select,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { User } from '../../../interfaces/user';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../providers/api';

const ListUsers: React.FC = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const fetchUsers = async () => {
    try {
      const response = await api.get('users/list');
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleFieldChange = (
    userId: string,
    fieldName: keyof User,
    value: any
  ) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, [fieldName]: value } : user
      )
    );
    setFilteredUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, [fieldName]: value } : user
      )
    );
  };

  const handleSaveUser = async (user: User) => {
    try {
      await api.put(`users/${user._id}`, user);
      alert('Usuário atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário.');
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user._id.toLowerCase().includes(term)
      )
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
        <Typography variant="h6" sx={{
          color: '#5B1B64'
        }} gutterBottom>
          Listagem de Usuários
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/user', { replace: true })}
        >
          Adicionar Usuário
        </Button>
      </Box>

      <Box padding={2}>
        <TextField
          fullWidth
          placeholder="Pesquisar usuário por nome, email ou ID"
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

      <Table aria-label="tabela de usuários">
        <TableHead>
          <TableRow>
            <TableCell>Ativo</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Switch
                    checked={user.isActive}
                    onChange={(e) =>
                      handleFieldChange(user._id, 'isActive', e.target.checked)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={user.name}
                    onChange={(e) =>
                      handleFieldChange(user._id, 'name', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={user.email}
                    onChange={(e) =>
                      handleFieldChange(user._id, 'email', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={user.userType}
                    onChange={(e) =>
                      handleFieldChange(user._id, 'userType', e.target.value)
                    }
                  >
                    <MenuItem value="client">Cliente</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveUser(user)}
                  >
                    Salvar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        labelRowsPerPage='Linhas por página'
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ListUsers;
