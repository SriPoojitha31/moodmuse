import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { getAIInsight } from '../services/api';

export default function useAI() {
  const [response, setResponse] = useState('');
  const mutation = useMutation({
    mutationFn: getAIInsight,
    onSuccess: (data) => setResponse(data.insight),
    onError: () => setResponse('')
  });

  const getAIResponse = (entry) => {
    setResponse('');
    mutation.mutate(entry);
  };

  return {
    getAIResponse,
    isLoading: mutation.isLoading,
    response,
    error: mutation.error
  };
}
