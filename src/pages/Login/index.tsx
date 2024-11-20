import React from 'react';
import { Formik, Form, } from 'formik';
import * as Yup from 'yup';
import { Box, Link, Typography, Container } from '@mui/material';
import { LoginValues } from '../../interfaces/login';
import LoginFields from './LoginFields';
import { useNavigate } from 'react-router-dom';
import { api } from '../../providers/api';

// Validação com Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória')
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = async (values: LoginValues) => {
    try {
      const response = await api.post(`auth/login`, values)

      if (response.status === 200) {
        const data = await response.data;
        console.log('Login bem-sucedido:', data);
        localStorage.setItem('token', data?.token)
        localStorage.setItem('user', JSON.stringify(data?.user))
        // Redirecionar ou salvar o token de autenticação
        if (data?.user && data?.user?.userType === 'admin') {
          navigate('/admin', {
            state: { userType: data.user.userType }
          })
          return
        }
        navigate('/')
      } else {
        console.error('Erro no login');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  const handleViewProducts = () => {
    navigate('/')
  }

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={values => { handleLogin(values) }}
        >
          <Form style={{ width: '100%', marginTop: '1rem' }}>
            <LoginFields />
          </Form>
        </Formik>
        <Box>
          <Link sx={{
            cursor: 'pointer'
          }} onClick={handleRegister}> Registre-se</Link> | <Link sx={{
            cursor: 'pointer'
          }} onClick={handleViewProducts}> Ver Produtos </Link>
        </Box>
      </Box>

    </Container>
  );
};

export default LoginPage;
