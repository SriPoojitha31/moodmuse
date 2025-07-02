import { Badge } from '@chakra-ui/badge';
import { Box, VStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';

const MoodHistory = ({ moods }) => (
  <VStack align="stretch" spacing={3} mt={4}>
    {moods.length === 0 ? (
      <Text color="gray.500">No mood history yet.</Text>
    ) : (
      moods.map((m, idx) => (
        <Box key={idx} borderWidth="1px" borderRadius="md" p={3}>
          <Badge colorScheme="teal">{format(new Date(m.date), 'PPpp')}</Badge>
          <Text mt={1}><b>Mood:</b> {m.mood}</Text>
          {m.note && <Text color="gray.600">Note: {m.note}</Text>}
        </Box>
      ))
    )}
  </VStack>
);

export default MoodHistory;
