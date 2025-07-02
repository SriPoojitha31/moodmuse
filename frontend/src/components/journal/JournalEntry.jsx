import { Badge } from '@chakra-ui/badge';
import { Box } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';

const JournalEntry = ({ entry }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={3}>
      <Badge colorScheme="teal">{format(new Date(entry.date), 'PPpp')}</Badge>
      <Text mt={2}>{entry.text}</Text>
    </Box>
  );
};

export default JournalEntry;
