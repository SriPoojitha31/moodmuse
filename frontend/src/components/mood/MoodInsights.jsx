import { Box, Heading } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import React from 'react';

const moodLabels = {
  happy: 'Happy',
  excited: 'Excited',
  calm: 'Calm',
  neutral: 'Neutral',
  sad: 'Sad',
  anxious: 'Anxious',
  angry: 'Angry'
};

const MoodInsights = ({ moods }) => {
  if (!moods || moods.length === 0) {
    return <Text color="gray.500">No mood data for insights.</Text>;
  }

  // Calculate most frequent mood
  const freq = moods.reduce((acc, m) => {
    acc[m.mood] = (acc[m.mood] || 0) + 1;
    return acc;
  }, {});
  const mostFrequent = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" mt={4}>
      <Heading size="sm" mb={2}>Mood Insights</Heading>
      <Text>Most frequent mood: <b>{moodLabels[mostFrequent]}</b></Text>
      <Text>Total entries: {moods.length}</Text>
    </Box>
  );
};

export default MoodInsights;
