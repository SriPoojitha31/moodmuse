import { Heading, VStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import React from 'react';
import JournalEntry from './JournalEntry';

const JournalList = ({ entries }) => {
  return (
    <VStack spacing={4} align="stretch" mt={6}>
      <Heading size="md">Previous Entries</Heading>
      {entries.length === 0 ? (
        <Text color="gray.500">No journal entries yet.</Text>
      ) : (
        entries.map((entry, idx) => <JournalEntry key={idx} entry={entry} />)
      )}
    </VStack>
  );
};

export default JournalList;
