import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { login, loading } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setError('');
    try {
      await login(data);
      navigate('/');
    } catch (e) {
      setError(e.message || 'Login failed');
    }
  };

  return (
    <Box>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <LoginForm onSubmit={handleLogin} loading={loading} />
    </Box>
  );
};

export default Login;
