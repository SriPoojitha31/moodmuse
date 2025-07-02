import { ChakraProvider, extendTheme } from '@chakra-ui/system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Pages
import AICompanion from './pages/AICompanion';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Login from './pages/Login';
import MoodTracker from './pages/MoodTracker';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navbar from './components/common/Navbar';

// Styles
import './styles/globals.css';

// Custom theme for mental wellness
const theme = extendTheme({
  colors: {
    brand: {
      50: '#E8F4FD',
      100: '#B8E6B8',
      200: '#A8D8EA',
      300: '#7FCDCD',
      400: '#41B3A3',
      500: '#3A7CA8',
      600: '#2F6690',
      700: '#16537E',
      800: '#0E4B99',
      900: '#2A5470',
    },
    mood: {
      happy: '#FFD93D',
      excited: '#FF6B6B',
      calm: '#4ECDC4',
      sad: '#A8E6CF',
      anxious: '#FFB347',
      angry: '#FF8E8E',
      neutral: '#D3D3D3'
    }
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
      variants: {
        mood: {
          borderRadius: '20px',
          padding: '12px 24px',
          fontWeight: '500',
        }
      }
    }
  }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Router>
            <div className="App">
              <Navbar />
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                
                {/* Protected Routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/journal" element={
                  <ProtectedRoute>
                    <Journal />
                  </ProtectedRoute>
                } />
                <Route path="/mood-tracker" element={
                  <ProtectedRoute>
                    <MoodTracker />
                  </ProtectedRoute>
                } />
                <Route path="/ai-companion" element={
                  <ProtectedRoute>
                    <AICompanion />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </Router>
        </ChakraProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;