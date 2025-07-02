import { Button } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, VStack } from '@chakra-ui/layout';
import React, { useState } from 'react';

const SignUpForm = ({ onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    onSubmit({ name, email, password });
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!error && !name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </FormControl>
          <FormControl isInvalid={!!error && !email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl isInvalid={!!error && !password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            colorScheme="brand"
            isLoading={loading}
            width="full"
            borderRadius="20px"
          >
            Sign Up
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default SignUpForm;
