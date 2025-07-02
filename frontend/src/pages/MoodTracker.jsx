import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import { Badge } from '@chakra-ui/badge';
import { Button } from '@chakra-ui/button';
import { Card, CardBody, CardHeader } from '@chakra-ui/card';
import { Box, Container, Divider, Flex, Grid, GridItem, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/layout';
import { Progress } from '@chakra-ui/progress';
import { Text } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import { useToast } from '@chakra-ui/system';
import React, { useEffect, useState } from 'react';
import {
    FiCalendar,
    FiHeart,
    FiStar,
    FiTarget,
    FiTrendingUp
} from 'react-icons/fi';

// Custom hooks
import { useMood } from '../hooks/useMood';

// Components
import LoadingSpinner from '../components/common/LoadingSpinner';
import MoodChart from '../components/mood/MoodChart';
import MoodHistory from '../components/mood/MoodHistory';
import MoodInsights from '../components/mood/MoodInsights';
import MoodSelector from '../components/mood/MoodSelector';

const MoodTracker = () => {
  const {
    moods,
    todaysMood,
    moodStats,
    weeklyMoods,
    monthlyMoods,
    isLoading,
    addMood,
    updateMood,
    getMoodHistory,
    getMoodInsights
  } = useMood();

  const toast = useToast();

  // State
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [isLoggingMood, setIsLoggingMood] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [insights, setInsights] = useState(null);

  // Load data on component mount
  useEffect(() => {
    getMoodHistory(selectedTimeRange);
    getMoodInsights().then(setInsights);
  }, [selectedTimeRange, getMoodHistory, getMoodInsights]);

  // Check if mood already logged today
  const hasMoodToday = todaysMood !== null;

  // Get chart data based on selected time range
  const getChartData = () => {
    switch (selectedTimeRange) {
      case 'week':
        return weeklyMoods || [];
      case 'month':
        return monthlyMoods || [];
      case 'year':
        return moods?.slice(-365) || [];
      default:
        return weeklyMoods || [];
    }
  };

  // Handle mood logging
  const handleMoodLog = async (moodData) => {
    setIsLoggingMood(true);
    try {
      if (hasMoodToday) {
        await updateMood(todaysMood.id, moodData);
        toast({
          title: 'Mood updated',
          description: 'Your mood for today has been updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await addMood(moodData);
        toast({
          title: 'Mood logged',
          description: 'Your mood has been recorded for today.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      setShowMoodSelector(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to log mood. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoggingMood(false);
    }
  };

  // Get mood streak
  const getCurrentStreak = () => {
    if (!moods || moods.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < moods.length; i++) {
      const moodDate = new Date(moods[moods.length - 1 - i].date);
      const daysDiff = Math.floor((today - moodDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading mood tracker..." />;
  }

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="7xl">
        {/* Header */}
        <VStack align="start" spacing={6} mb={8}>
          <Box>
            <Heading size="xl" mb={2}>
              Mood Tracker 💝
            </Heading>
            <Text fontSize="lg">
              Track your emotional journey and discover patterns in your mental wellness
            </Text>
          </Box>

          {/* Today's Mood Status */}
          {!hasMoodToday ? (
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Haven't logged your mood today!</AlertTitle>
                <AlertDescription>
                  Take a moment to check in with yourself and record how you're feeling.
                </AlertDescription>
              </Box>
              <Button
                ml="auto"
                colorScheme="brand"
                size="sm"
                onClick={() => setShowMoodSelector(true)}
              >
                Log Mood
              </Button>
            </Alert>
          ) : (
            <Card bg="white" borderLeft="4px" borderLeftColor="green.400">
              <CardBody>
                <HStack justify="space-between">
                  <HStack spacing={4}>
                    <Text fontSize="2xl">{todaysMood.emoji}</Text>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold">
                        Today's mood: {todaysMood.mood}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Intensity: {todaysMood.intensity}/10 • Logged at{' '}
                        {new Date(todaysMood.timestamp).toLocaleTimeString()}
                      </Text>
                    </VStack>
                  </HStack>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowMoodSelector(true)}
                  >
                    Update
                  </Button>
                </HStack>
              </CardBody>
            </Card>
          )}
        </VStack>

        {/* Stats Cards */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mb={8}>
          <Card bg="white">
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Current Streak</StatLabel>
                <StatNumber fontSize="2xl">
                  {getCurrentStreak()}
                  <Text as="span" fontSize="sm" color="gray.600" ml={1}>
                    days
                  </Text>
                </StatNumber>
                <StatHelpText color="gray.600">
                  <FiTarget style={{ display: 'inline', marginRight: '4px' }} />
                  Keep it up!
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="white">
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Average Mood</StatLabel>
                <StatNumber fontSize="2xl">
                  {moodStats?.averageScore?.toFixed(1) || '0.0'}
                  <Text as="span" fontSize="sm" color="gray.600" ml={1}>
                    /10
                  </Text>
                </StatNumber>
                <StatHelpText color="gray.600">
                  <FiTrendingUp style={{ display: 'inline', marginRight: '4px' }} />
                  {moodStats?.trend || 'No data'}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="white">
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Most Common</StatLabel>
                <StatNumber fontSize="lg">
                  {moodStats?.mostCommonMood ? (
                    <HStack spacing={2}>
                      <Text>{moodStats.mostCommonMoodEmoji}</Text>
                      <Text>{moodStats.mostCommonMood}</Text>
                    </HStack>
                  ) : (
                    'No data'
                  )}
                </StatNumber>
                <StatHelpText color="gray.600">
                  <FiStar style={{ display: 'inline', marginRight: '4px' }} />
                  This month
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="white">
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Total Entries</StatLabel>
                <StatNumber fontSize="2xl">
                  {moods?.length || 0}
                </StatNumber>
                <StatHelpText color="gray.600">
                  <FiCalendar style={{ display: 'inline', marginRight: '4px' }} />
                  All time
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Main Content */}
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          {/* Left Column - Charts and History */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Mood Chart */}
              <Card bg="white">
                <CardHeader>
                  <Flex justify="space-between" align="center">
                    <Heading size="md">Mood Trends</Heading>
                    <Select
                      value={selectedTimeRange}
                      onChange={(e) => setSelectedTimeRange(e.target.value)}
                      w="auto"
                      size="sm"
                    >
                      <option value="week">Last 7 days</option>
                      <option value="month">Last 30 days</option>
                      <option value="year">Last year</option>
                    </Select>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <MoodChart 
                    data={getChartData()} 
                    timeRange={selectedTimeRange}
                    height={300}
                  />
                </CardBody>
              </Card>

              {/* Mood History */}
              <Card bg="white">
                <CardHeader>
                  <Heading size="md">Recent History</Heading>
                </CardHeader>
                <CardBody p={0}>
                  <MoodHistory 
                    moods={moods?.slice(-10) || []}
                    onMoodClick={(mood) => console.log('Mood clicked:', mood)}
                  />
                </CardBody>
              </Card>
            </VStack>
          </GridItem>

          {/* Right Column - Insights and Quick Actions */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Quick Mood Log */}
              {!showMoodSelector && (
                <Card bg="white">
                  <CardHeader>
                    <Heading size="md">Quick Log</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4}>
                      <Text color="gray.600" textAlign="center">
                        {hasMoodToday 
                          ? 'Want to update your mood for today?'
                          : 'How are you feeling right now?'
                        }
                      </Text>
                      <Button
                        leftIcon={<FiHeart />}
                        colorScheme="brand"
                        w="full"
                        onClick={() => setShowMoodSelector(true)}
                      >
                        {hasMoodToday ? 'Update Mood' : 'Log Mood'}
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              )}

              {/* Mood Selector */}
              {showMoodSelector && (
                <Card bg="white">
                  <CardHeader>
                    <Flex justify="space-between" align="center">
                      <Heading size="md">
                        {hasMoodToday ? 'Update Your Mood' : 'Log Your Mood'}
                      </Heading>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowMoodSelector(false)}
                      >
                        ✕
                      </Button>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <MoodSelector
                      onMoodSelect={handleMoodLog}
                      isLoading={isLoggingMood}
                      currentMood={todaysMood}
                    />
                  </CardBody>
                </Card>
              )}

              {/* Mood Insights */}
              <Card bg="white">
                <CardHeader>
                  <Heading size="md">Insights</Heading>
                </CardHeader>
                <CardBody>
                  <MoodInsights insights={insights} />
                </CardBody>
              </Card>

              {/* Weekly Progress */}
              <Card bg="white">
                <CardHeader>
                  <Heading size="md">Weekly Progress</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Box>
                      <Flex justify="space-between" mb={2}>
                        <Text fontSize="sm">Mood Tracking</Text>
                        <Text fontSize="sm" color="gray.600">
                          {(weeklyMoods?.length || 0)}/7 days
                        </Text>
                      </Flex>
                      <Progress
                        value={((weeklyMoods?.length || 0) / 7) * 100}
                        colorScheme="green"
                        size="sm"
                        borderRadius="md"
                      />
                    </Box>
                    
                    <Divider />
                    
                    <VStack spacing={2} align="stretch">
                      <Text fontSize="sm" fontWeight="medium">This Week's Summary</Text>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">Best day:</Text>
                        <Badge colorScheme="green" size="sm">
                          {moodStats?.bestDayThisWeek || 'N/A'}
                        </Badge>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">Avg intensity:</Text>
                        <Text fontSize="sm" fontWeight="medium">
                          {moodStats?.weeklyAverage?.toFixed(1) || 'N/A'}/10
                        </Text>
                      </HStack>
                    </VStack>
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

export default MoodTracker;