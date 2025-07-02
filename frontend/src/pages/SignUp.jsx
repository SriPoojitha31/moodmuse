import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/auth/SignUpForm';
import { useAuth } from '../hooks/useAuth';

const SignUp = () => {
  const { signup, loading } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    setError('');
    try {
      await signup(data);
      navigate('/');
    } catch (e) {
      setError(e.message || 'Sign up failed');
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
      <SignUpForm onSubmit={handleSignUp} loading={loading} />
    </Box>
  );
};

export default SignUp;
