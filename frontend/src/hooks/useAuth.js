import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

export function useAuth() {
  const {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    checkAuth
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout
  };
}

export default useAuth;
