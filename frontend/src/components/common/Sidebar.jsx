import { Button } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { Box, VStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { useColorModeValue as useColorModeValueSystem } from '@chakra-ui/system';
import React from 'react';
import {
    FiBookOpen,
    FiHome,
    FiMessageCircle,
    FiSmile,
    FiUser
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', icon: FiHome, route: '/' },
  { label: 'Journal', icon: FiBookOpen, route: '/journal' },
  { label: 'Mood Tracker', icon: FiSmile, route: '/mood-tracker' },
  { label: 'AI Companion', icon: FiMessageCircle, route: '/ai-companion' },
  { label: 'Profile', icon: FiUser, route: '/profile' }
];

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const bg = useColorModeValueSystem('gray.50', 'gray.900');
  const border = useColorModeValueSystem('gray.200', 'gray.600');

  return (
    <Box
      pos="fixed"
      left={0}
      top={0}
      h="100vh"
      w="250px"
      bg={bg}
      borderRight="1px solid"
      borderColor={border}
      shadow="lg"
      zIndex="overlay"
      p={5}
    >
      <VStack align="start" spacing={4}>
        <Text fontSize="xl" fontWeight="bold" color="teal.500">
          Menu
        </Text>

        {navItems.map((item) => (
          <Button
            key={item.label}
            leftIcon={<Icon as={item.icon} />}
            variant="ghost"
            justifyContent="flex-start"
            w="full"
            onClick={() => {
              navigate(item.route);
              onClose(); // auto-close sidebar
            }}
          >
            {item.label}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
