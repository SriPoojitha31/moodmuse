import { Avatar } from '@chakra-ui/avatar';
import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, HStack, Spacer } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useColorModeValue as useColorModeValueSystem } from '@chakra-ui/system';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from './Sidebar';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const bg = useColorModeValueSystem('white', 'gray.800');

  return (
    <>
      <Flex
        as="nav"
        bg={bg}
        px={6}
        py={4}
        align="center"
        shadow="md"
        zIndex="banner"
        position="sticky"
        top={0}
      >
        <IconButton
          icon={<FiMenu />}
          variant="ghost"
          onClick={onToggle}
          mr={4}
          aria-label="Toggle sidebar"
        />

        <HStack spacing={6}>
          <Box fontWeight="bold" fontSize="lg" color="teal.500">
            MoodMuse
          </Box>
        </HStack>

        <Spacer />

        <HStack spacing={3}>
          <Menu>
            <MenuButton as={Avatar} name={user?.name} size="sm" cursor="pointer" />
            <MenuList>
              <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Sidebar toggle */}
      {isOpen && <Sidebar onClose={onToggle} />}
    </>
  );
};

export default Navbar;
