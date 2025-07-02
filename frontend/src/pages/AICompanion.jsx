import { Button } from '@chakra-ui/button';
import { Box, Heading, VStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import { Textarea } from '@chakra-ui/textarea';
import React, { useState } from 'react';
import useAI from '../hooks/useAI';

const AICompanion = () => {
  const { getAIResponse, isLoading, response } = useAI();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  const handleSend = () => {
    if (!input.trim()) return;
    setHistory([...history, { sender: 'user', text: input }]);
    getAIResponse(input);
    setInput('');
  };

  React.useEffect(() => {
    if (response) {
      setHistory((h) => [...h, { sender: 'ai', text: response }]);
    }
  }, [response]);

  return (
    <Box maxW="2xl" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
      <Heading size="lg" mb={4}>AI Companion</Heading>
      <VStack align="stretch" spacing={3} mb={4} minH="200px">
        {history.length === 0 && <Text color="gray.500">Start a conversation with your AI companion.</Text>}
        {history.map((msg, idx) => (
          <Box key={idx} alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'} bg={msg.sender === 'user' ? 'teal.100' : 'gray.100'} px={4} py={2} borderRadius="md">
            <Text>{msg.text}</Text>
          </Box>
        ))}
        {isLoading && <Spinner alignSelf="flex-start" />}
      </VStack>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        mb={2}
      />
      <Button colorScheme="teal" onClick={handleSend} isDisabled={isLoading || !input.trim()}>
        Send
      </Button>
    </Box>
  );
};

export default AICompanion;