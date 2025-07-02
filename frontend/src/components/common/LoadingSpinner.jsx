import { Box } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Text } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/system';
import { keyframes } from '@emotion/react'; // ✅ CORRECT
import React from 'react';

// Custom animation for breathing effect
const breathe = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;

const LoadingSpinner = ({ 
  size = 'xl', 
  text = 'Loading...', 
  fullScreen = false,
  color = 'brand.500',
  showText = true,
  variant = 'default'
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const overlayBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.8)');

  // Different spinner variants
  const renderSpinner = () => {
    switch (variant) {
      case 'pulse':
        return (
          <Box
            w="40px"
            h="40px"
            bg={color}
            borderRadius="50%"
            animation={`${breathe} 2s ease-in-out infinite`}
          />
        );
      
      case 'dots':
        return (
          <Flex gap={2}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                w="8px"
                h="8px"
                bg={color}
                borderRadius="50%"
                animation={`${breathe} 1.4s ease-in-out infinite`}
                style={{
                  animationDelay: `${i * 0.16}s`
                }}
              />
            ))}
          </Flex>
        );
      
      case 'mood':
        return (
          <Text 
            fontSize="3xl"
            animation={`${breathe} 2s ease-in-out infinite`}
          >
            🧠
          </Text>
        );
      
      default:
        return (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color={color}
            size={size}
          />
        );
    }
  };

  const content = (
    <VStack spacing={4} align="center">
      {renderSpinner()}
      {showText && (
        <Text 
          color={textColor} 
          fontSize="md" 
          fontWeight="medium"
          textAlign="center"
        >
          {text}
        </Text>
      )}
    </VStack>
  );

  if (fullScreen) {
    return (
      <Flex
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={overlayBg}
        zIndex={9999}
        align="center"
        justify="center"
        backdropFilter="blur(2px)"
      >
        <Box
          bg={bgColor}
          p={8}
          borderRadius="xl"
          boxShadow="xl"
          textAlign="center"
        >
          {content}
        </Box>
      </Flex>
    );
  }

  return (
    <Flex
      align="center"
      justify="center"
      p={8}
      w="full"
      h="200px"
    >
      {content}
    </Flex>
  );
};

// Specific loading components for different contexts
export const PageLoader = ({ text = "Loading page..." }) => (
  <LoadingSpinner 
    fullScreen 
    text={text}
    variant="default"
    size="xl"
  />
);

export const ContentLoader = ({ text = "Loading content..." }) => (
  <LoadingSpinner 
    text={text}
    variant="pulse"
    showText={true}
  />
);

export const ButtonLoader = ({ size = "sm" }) => (
  <Spinner
    thickness="2px"
    speed="0.65s"
    emptyColor="gray.200"
    color="white"
    size={size}
  />
);

export const MoodLoader = () => (
  <LoadingSpinner 
    text="Analyzing your mood..."
    variant="mood"
    showText={true}
  />
);

export const AILoader = () => (
  <LoadingSpinner 
    text="AI is thinking..."
    variant="dots"
    showText={true}
  />
);

export const DataLoader = ({ text = "Fetching data..." }) => (
  <Box p={4} textAlign="center">
    <LoadingSpinner 
      text={text}
      variant="default"
      size="lg"
      showText={true}
    />
  </Box>
);

export default LoadingSpinner;