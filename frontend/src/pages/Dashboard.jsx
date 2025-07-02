import { Badge } from '@chakra-ui/badge';
import { Button } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { Box, Card, CardBody, CardHeader, Container, Flex, Grid, GridItem, Heading, HStack, VStack } from '@chakra-ui/layout';
import { Progress } from '@chakra-ui/progress';
import { Text } from '@chakra-ui/react';
import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';
import { useColorModeValue } from '@chakra-ui/system';
import React, { useEffect, useState } from 'react';
import {
    FiBookOpen,
    FiHeart,
    FiMessageCircle,
    FiTarget,
    FiTrendingUp
} from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

// Custom hooks
import { useAuth } from '../hooks/useAuth';
import { useJournal } from '../hooks/useJournal';
import { useMood } from '../hooks/useMood';

// Components
import LoadingSpinner from '../components/common/LoadingSpinner';
import MoodChart from '../components/mood/MoodChart';

const Dashboard = () => {
  const { user } = useAuth();
  const { recentMoods, moodStats, isLoading: moodLoading } = useMood();
  const { recentEntries, journalStats, isLoading: journalLoading } = useJournal();

  const [greeting, setGreeting] = useState('');
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  if (moodLoading || journalLoading) {
    return <LoadingSpinner />;
  }

  const quickStats = [
    {
      label: 'Current Streak',
      value: journalStats?.currentStreak || 0,
      unit: 'days',
      icon: FiTarget,
      color: 'green',
      trend: '+2 from last week'
    },
    {
      label: 'Journal Entries',
      value: journalStats?.totalEntries || 0,
      unit: 'total',
      icon: FiBookOpen,
      color: 'blue',
      trend: `${journalStats?.thisWeekEntries || 0} this week`
    },
    {
      label: 'Mood Score',
      value: moodStats?.averageScore || 0,
      unit: '/10',
      icon: FiHeart,
      color: 'pink',
      trend: moodStats?.trend || 'stable'
    },
    {
      label: 'AI Chats',
      value: 12,
      unit: 'total',
      icon: FiMessageCircle,
      color: 'purple',
      trend: '3 this week'
    }
  ];

  const todaysMood = recentMoods?.[0];
  const recentJournalEntries = recentEntries?.slice(0, 3) || [];

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="7xl">
        {/* Welcome Section */}
        <VStack align="start" spacing={6} mb={8}>
          <Box>
            <Heading size="xl" mb={2}>
              {greeting}, {user?.name || 'there'}! 👋
            </Heading>
            <Text color={textColor} fontSize="lg">
              How are you feeling today? Let's check in with your mental wellness journey.
            </Text>
          </Box>

          {/* Today's Mood Check */}
          {!todaysMood && (
            <Card bg={cardBg} w="full" borderLeft="4px" borderLeftColor="brand.400">
              <CardBody>
                <HStack justify="space-between">
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="semibold">Haven't logged your mood today</Text>
                    <Text color={textColor} fontSize="sm">
                      Take a moment to check in with yourself
                    </Text>
                  </VStack>
                  <Button 
                    as={RouterLink} 
                    to="/mood-tracker" 
                    colorScheme="brand"
                    leftIcon={<Icon as={FiHeart} />}
                  >
                    Log Mood
                  </Button>
                </HStack>
              </CardBody>
            </Card>
          )}
        </VStack>

        {/* Stats Grid */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
          {quickStats.map((stat, index) => (
            <GridItem key={index}>
              <Card bg={cardBg} h="full">
                <CardBody>
                  <Stat>
                    <Flex justify="space-between" align="center" mb={2}>
                      <StatLabel color={textColor}>{stat.label}</StatLabel>
                      <Icon as={stat.icon} color={`${stat.color}.400`} boxSize={5} />
                    </Flex>
                    <StatNumber fontSize="2xl" fontWeight="bold">
                      {stat.value}
                      <Text as="span" fontSize="sm" color={textColor} ml={1}>
                        {stat.unit}
                      </Text>
                    </StatNumber>
                    <StatHelpText color={textColor} fontSize="xs">
                      {stat.trend}
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>

        {/* Main Content Grid */}
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          {/* Left Column */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Mood Chart */}
              <Card bg={cardBg}>
                <CardHeader>
                  <Flex justify="space-between" align="center">
                    <Heading size="md">Mood Trends (Last 7 Days)</Heading>
                    <Button 
                      as={RouterLink} 
                      to="/mood-tracker"
                      size="sm" 
                      variant="ghost"
                      rightIcon={<Icon as={FiTrendingUp} />}
                    >
                      View All
                    </Button>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <MoodChart data={recentMoods} height={200} />
                </CardBody>
              </Card>

              {/* Recent Journal Entries */}
              <Card bg={cardBg}>
                <CardHeader>
                  <Flex justify="space-between" align="center">
                    <Heading size="md">Recent Journal Entries</Heading>
                    <Button 
                      as={RouterLink} 
                      to="/journal"
                      size="sm" 
                      variant="ghost"
                      rightIcon={<Icon as={FiBookOpen} />}
                    >
                      View All
                    </Button>
                  </Flex>
                </CardHeader>
                <CardBody>
                  {recentJournalEntries.length > 0 ? (
                    <VStack spacing={4} align="stretch">
                      {recentJournalEntries.map((entry, index) => (
                        <Box key={entry.id}>
                          <HStack justify="space-between" mb={2}>
                            <Text fontWeight="medium" noOfLines={1}>
                              {entry.title || 'Untitled Entry'}
                            </Text>
                            <Text fontSize="sm" color={textColor}>
                              {new Date(entry.createdAt).toLocaleDateString()}
                            </Text>
                          </HStack>
                          <Text color={textColor} fontSize="sm" noOfLines={2}>
                            {entry.content}
                          </Text>
                          {entry.mood && (
                            <Badge mt={2} colorScheme="brand" size="sm">
                              Mood: {entry.mood}
                            </Badge>
                          )}
                          {index < recentJournalEntries.length - 1 && <Divider mt={4} />}
                        </Box>
                      ))}
                    </VStack>
                  ) : (
                    <VStack spacing={4} py={8}>
                      <Icon as={FiBookOpen} boxSize={12} color="gray.300" />
                      <Text color={textColor} textAlign="center">
                        No journal entries yet. Start writing to track your thoughts and feelings.
                      </Text>
                      <Button as={RouterLink} to="/journal" colorScheme="brand">
                        Write First Entry
                      </Button>
                    </VStack>
                  )}
                </CardBody>
              </Card>
            </VStack>
          </GridItem>

          {/* Right Column */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Today's Mood */}
              {todaysMood && (
                <Card bg={cardBg}>
                  <CardHeader>
                    <Heading size="md">Today's Mood</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4}>
                      <Box textAlign="center">
                        <Text fontSize="3xl" mb={2}>
                          {todaysMood.emoji || '😊'}
                        </Text>
                        <Text fontWeight="semibold" fontSize="lg">
                          {todaysMood.mood}
                        </Text>
                        <Text color={textColor} fontSize="sm">
                          Intensity: {todaysMood.intensity}/10
                        </Text>
                      </Box>
                      <Progress 
                        value={todaysMood.intensity * 10} 
                        colorScheme="brand" 
                        size="lg" 
                        w="full"
                        rounded="md"
                      />
                      {todaysMood.notes && (
                        <Text color={textColor} fontSize="sm" textAlign="center">
                          "{todaysMood.notes}"
                        </Text>
                      )}
                    </VStack>
                  </CardBody>
                </Card>
              )}

              {/* Quick Actions */}
              <Card bg={cardBg}>
                <CardHeader>
                  <Heading size="md">Quick Actions</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={3}>
                    <Button 
                      as={RouterLink} 
                      to="/journal"
                      leftIcon={<Icon as={FiBookOpen} />}
                      w="full"
                      variant="outline"
                    >
                      New Journal Entry
                    </Button>
                    <Button 
                      as={RouterLink} 
                      to="/mood-tracker"
                      leftIcon={<Icon as={FiHeart} />}
                      w="full"
                      variant="outline"
                    >
                      Track Mood
                    </Button>
                    <Button 
                      as={RouterLink} 
                      to="/ai-companion"
                      leftIcon={<Icon as={FiMessageCircle} />}
                      w="full"
                      variant="outline"
                    >
                      Chat with AI
                    </Button>
                  </VStack>
                </CardBody>
              </Card>

              {/* Weekly Goals */}
              <Card bg={cardBg}>
                <CardHeader>
                  <Heading size="md">This Week's Goals</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Box>
                      <Flex justify="space-between" mb={1}>
                        <Text fontSize="sm">Journal 5 times</Text>
                        <Text fontSize="sm" color={textColor}>
                          {journalStats?.thisWeekEntries || 0}/5
                        </Text>
                      </Flex>
                      <Progress 
                        value={(journalStats?.thisWeekEntries || 0) * 20} 
                        colorScheme="green" 
                        size="sm"
                        rounded="md"
                      />
                    </Box>
                    <Box>
                      <Flex justify="space-between" mb={1}>
                        <Text fontSize="sm">Daily mood check</Text>
                        <Text fontSize="sm" color={textColor}>4/7</Text>
                      </Flex>
                      <Progress value={57} colorScheme="blue" size="sm" rounded="md" />
                    </Box>
                    <Box>
                      <Flex justify="space-between" mb={1}>
                        <Text fontSize="sm">AI conversations</Text>
                        <Text fontSize="sm" color={textColor}>2/3</Text>
                      </Flex>
                      <Progress value={67} colorScheme="purple" size="sm" rounded="md" />
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;