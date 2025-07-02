import { Box } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/layout';
import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const moodMap = {
  happy: 5,
  excited: 4,
  calm: 3,
  neutral: 2,
  sad: 1,
  anxious: 0,
  angry: -1
};

const MoodChart = ({ moods }) => {
  // Transform moods to chart data
  const data = moods.map(m => ({
    date: new Date(m.date).toLocaleDateString(),
    mood: moodMap[m.mood] ?? 2
  }));

  return (
    <Box w="full" p={4}>
      <Heading size="md" mb={4}>Mood Over Time</Heading>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[-1, 5]} ticks={[-1,0,1,2,3,4,5]} />
          <Tooltip />
          <Line type="monotone" dataKey="mood" stroke="#41B3A3" strokeWidth={3} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MoodChart;
