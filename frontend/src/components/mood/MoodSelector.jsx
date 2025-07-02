import { Button } from '@chakra-ui/button';
import { HStack } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import React from 'react';

const moods = [
  { label: 'Happy', value: 'happy', emoji: '😄' },
  { label: 'Excited', value: 'excited', emoji: '🤩' },
  { label: 'Calm', value: 'calm', emoji: '😌' },
  { label: 'Neutral', value: 'neutral', emoji: '😐' },
  { label: 'Sad', value: 'sad', emoji: '😢' },
  { label: 'Anxious', value: 'anxious', emoji: '😰' },
  { label: 'Angry', value: 'angry', emoji: '😠' }
];

const MoodSelector = ({ onSelect }) => (
  <HStack spacing={3} mt={2}>
    {moods.map((m) => (
      <Tooltip key={m.value} label={m.label} placement="top">
        <Button
          onClick={() => onSelect(m.value)}
          variant="outline"
          borderRadius="full"
          fontSize="2xl"
        >
          {m.emoji}
        </Button>
      </Tooltip>
    ))}
  </HStack>
);

export default MoodSelector;
