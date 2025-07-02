import { Button } from '@chakra-ui/button';
import { Box, Heading, VStack } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import React, { useState } from 'react';

const JournalForm = ({ onSubmit }) => {
  const [entry, setEntry] = useState('');

  const handleSubmit = () => {
    if (entry.trim()) {
      onSubmit(entry);
      setEntry('');
    }
  };

  return (
    <Box w="100%" p={4}>
      <Heading size="md" mb={4}>New Journal Entry</Heading>
      <VStack spacing={3} align="start">
        <Textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="How are you feeling today?"
          size="md"
          resize="vertical"
        />
        <Button colorScheme="teal" onClick={handleSubmit}>
          Submit Entry
        </Button>
      </VStack>
    </Box>
  );
};

export default JournalForm;
