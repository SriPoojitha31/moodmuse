import { Badge } from '@chakra-ui/badge';
import { Button, IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input } from '@chakra-ui/input';
import { Box, Card, CardBody, CardHeader, Container, Flex, Grid, GridItem, Heading, HStack, InputGroup, VStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import { useColorModeValue, useToast } from '@chakra-ui/system';
import React, { useEffect, useState } from 'react';
import {
    FiBookOpen,
    FiEdit3,
    FiPlus,
    FiSearch,
    FiTrash2
} from 'react-icons/fi';

// Custom hooks
import { useJournal } from '../hooks/useJournal';

// Components
import LoadingSpinner from '../components/common/LoadingSpinner';
import JournalEntry from '../components/journal/JournalEntry';
import JournalForm from '../components/journal/JournalForm';
import JournalList from '../components/journal/JournalList';

const Journal = () => {
  const { 
    entries, 
    isLoading, 
    createEntry, 
    updateEntry, 
    deleteEntry,
    getEntries,
    journalStats 
  } = useJournal();
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filteredEntries, setFilteredEntries] = useState([]);

  // Colors
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  // Mood options for filtering
  const moodOptions = [
    { value: '', label: 'All Moods' },
    { value: 'happy', label: '😊 Happy' },
    { value: 'sad', label: '😢 Sad' },
    { value: 'anxious', label: '😰 Anxious' },
    { value: 'calm', label: '😌 Calm' },
    { value: 'excited', label: '🤗 Excited' },
    { value: 'angry', label: '😠 Angry' },
    { value: 'neutral', label: '😐 Neutral' }
  ];

  // Load entries on component mount
  useEffect(() => {
    getEntries();
  }, [getEntries]);

  // Filter and sort entries
  useEffect(() => {
    if (!entries) return;

    let filtered = entries.filter(entry => {
      const matchesSearch = entry.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entry.content?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMood = !selectedMood || entry.mood === selectedMood;
      return matchesSearch && matchesMood;
    });

    // Sort entries
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });

    setFilteredEntries(filtered);
  }, [entries, searchTerm, selectedMood, sortBy]);

  // Handle create entry
  const handleCreateEntry = async (entryData) => {
    try {
      await createEntry(entryData);
      toast({
        title: 'Entry created',
        description: 'Your journal entry has been saved successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to create entry. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle update entry
  const handleUpdateEntry = async (entryData) => {
    try {
      await updateEntry(selectedEntry.id, entryData);
      toast({
        title: 'Entry updated',
        description: 'Your journal entry has been updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
      setSelectedEntry(null);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update entry. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle delete entry
  const handleDeleteEntry = async (entryId) => {
    try {
      await deleteEntry(entryId);
      toast({
        title: 'Entry deleted',
        description: 'Your journal entry has been deleted.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      setSelectedEntry(null);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete entry. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle entry click
  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setIsEditing(false);
  };

  // Handle edit entry
  const handleEditEntry = (entry) => {
    setSelectedEntry(entry);
    setIsEditing(true);
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading your journal..." />;
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="7xl">
        {/* Header */}
        <VStack align="start" spacing={6} mb={8}>
          <Box>
            <Heading size="xl" mb={2}>
              Your Journal 📝
            </Heading>
            <Text color={textColor} fontSize="lg">
              Capture your thoughts, feelings, and daily reflections
            </Text>
          </Box>

          {/* Stats */}
          <HStack spacing={6}>
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl" fontWeight="bold">
                {journalStats?.totalEntries || 0}
              </Text>
              <Text fontSize="sm" color={textColor}>
                Total Entries
              </Text>
            </VStack>
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl" fontWeight="bold">
                {journalStats?.currentStreak || 0}
              </Text>
              <Text fontSize="sm" color={textColor}>
                Day Streak
              </Text>
            </VStack>
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl" fontWeight="bold">
                {journalStats?.thisWeekEntries || 0}
              </Text>
              <Text fontSize="sm" color={textColor}>
                This Week
              </Text>
            </VStack>
          </HStack>
        </VStack>

        {/* Controls */}
        <Card bg={cardBg} mb={6}>
          <CardBody>
            <Flex direction={{ base: 'column', md: 'row' }} gap={4} align="end">
              <Box flex={1}>
                <InputGroup position="relative">
                  <Box position="absolute" left="0" top="0" h="100%" display="flex" alignItems="center" pl={3}>
                    <FiSearch color="gray.300" />
                  </Box>
                  <Input pl="2.5rem"
                    type="text"
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Box>
              <Select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                maxW="200px"
              >
                {moodOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                maxW="150px"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title">Title</option>
              </Select>
              <Button
                leftIcon={<FiPlus />}
                colorScheme="brand"
                onClick={onOpen}
              >
                New Entry
              </Button>
            </Flex>
          </CardBody>
        </Card>

        {/* Main Content */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
          {/* Entries List */}
          <GridItem>
            <Card bg={cardBg} h="600px">
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md">
                    Entries ({filteredEntries.length})
                  </Heading>
                  <Badge colorScheme={filteredEntries.length > 0 ? 'green' : 'gray'}>
                    {filteredEntries.length === 0 ? 'No entries' : `${filteredEntries.length} found`}
                  </Badge>
                </Flex>
              </CardHeader>
              <CardBody p={0}>
                <JournalList
                  entries={filteredEntries}
                  selectedEntry={selectedEntry}
                  onEntryClick={handleEntryClick}
                  onEditEntry={handleEditEntry}
                  onDeleteEntry={handleDeleteEntry}
                />
              </CardBody>
            </Card>
          </GridItem>

          {/* Entry Detail/Form */}
          <GridItem>
            <Card bg={cardBg} h="600px">
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md">
                    {isEditing ? 'Edit Entry' : selectedEntry ? 'Entry Details' : 'Select an Entry'}
                  </Heading>
                  {selectedEntry && !isEditing && (
                    <HStack>
                      <IconButton
                        icon={<FiEdit3 />}
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                        aria-label="Edit entry"
                      />
                      <IconButton
                        icon={<FiTrash2 />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDeleteEntry(selectedEntry.id)}
                        aria-label="Delete entry"
                      />
                    </HStack>
                  )}
                </Flex>
              </CardHeader>
              <CardBody>
                {isEditing ? (
                  <JournalForm
                    entry={selectedEntry}
                    onSubmit={handleUpdateEntry}
                    onCancel={() => {
                      setIsEditing(false);
                      setSelectedEntry(null);
                    }}
                    isEditing={true}
                  />
                ) : selectedEntry ? (
                  <JournalEntry entry={selectedEntry} />
                ) : (
                  <VStack spacing={4} justify="center" h="full">
                    <FiBookOpen size={48} color="gray.300" />
                    <Text color={textColor} textAlign="center">
                      Select an entry to view details or create a new one
                    </Text>
                    <Button
                      leftIcon={<FiPlus />}
                      colorScheme="brand"
                      onClick={onOpen}
                    >
                      Write Your First Entry
                    </Button>
                  </VStack>
                )}
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        {/* New Entry Modal */}
        {isOpen && (
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.5)"
            zIndex={1000}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
          >
            <Card bg={cardBg} maxW="600px" w="full" maxH="80vh" overflow="auto">
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md">New Journal Entry</Heading>
                  <Button size="sm" variant="ghost" onClick={onClose}>
                    ✕
                  </Button>
                </Flex>
              </CardHeader>
              <CardBody>
                <JournalForm
                  onSubmit={handleCreateEntry}
                  onCancel={onClose}
                />
              </CardBody>
            </Card>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Journal;