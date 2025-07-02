import { Avatar } from '@chakra-ui/avatar';
import { Badge } from '@chakra-ui/badge';
import { Button } from '@chakra-ui/button';
import { Box, Divider, Heading, HStack, VStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/system';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useMood } from '../hooks/useMood';

const Profile = () => {
  const { user } = useAuth(); // Assumes: { name, email, avatarUrl }
  const { moodStats } = useMood(); // Assumes: mood entries or aggregated stats

  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} bg={cardBg} borderRadius="lg" shadow="md">
      <VStack spacing={4} align="stretch">
        <HStack spacing={4}>
          <Avatar name={user?.name} src={user?.avatarUrl || ''} size="xl" />
          <Box>
            <Heading size="md">{user?.name || 'Anonymous'}</Heading>
            <Text color="gray.500">{user?.email}</Text>
          </Box>
        </HStack>

        <Divider />

        <Box>
          <Heading size="sm" mb={2} color={textColor}>Mood Summary</Heading>
          <HStack spacing={2} wrap="wrap">
            {moodStats?.map((stat) => (
              <Badge key={stat.mood} colorScheme="teal">
                {stat.mood}: {stat.count}
              </Badge>
            ))}
          </HStack>
        </Box>

        <Divider />

        <Box>
          <Heading size="sm" mb={2} color={textColor}>Account Actions</Heading>
          <HStack spacing={3}>
            <Button colorScheme="teal" variant="outline">
              Edit Profile
            </Button>
            <Button colorScheme="red" variant="ghost">
              Logout
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Profile;
