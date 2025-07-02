import { Box } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Text } from '@chakra-ui/react';
import React from 'react';

const AIResponse = ({ isLoading, response }) => {
  return (
    <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
      <Heading size="sm" mb={2}>AI Insight</Heading>
      {isLoading ? (
        <Spinner />
      ) : (
        <Text>{response || 'No response yet.'}</Text>
      )}
    </Box>
  );
};

export default AIResponse;
