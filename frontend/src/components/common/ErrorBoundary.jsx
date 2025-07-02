import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Heading } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/layout';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Use static colors
      const bg = '#f7fafc'; // light gray
      const text = '#2d3748'; // dark gray
      return (
        <Box minH="100vh" bg={bg} display="flex" justifyContent="center" alignItems="center" px={6}>
          <VStack spacing={4} textAlign="center">
            <Heading size="lg" color="red.500">Something went wrong</Heading>
            <Text color={text}>
              {this.state.error?.message || 'An unexpected error has occurred.'}
            </Text>
            <Button onClick={this.handleReload} colorScheme="teal">
              Refresh Page
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
