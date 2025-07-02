import { create } from 'zustand';
import * as authService from '../services/auth';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  login: async (credentials) => {
    set({ loading: true });
    try {
      const user = await authService.login(credentials);
      set({ user, isAuthenticated: true, loading: false });
    } catch (e) {
      set({ loading: false });
      throw e;
    }
  },

  signup: async (data) => {
    set({ loading: true });
    try {
      const user = await authService.signup(data);
      set({ user, isAuthenticated: true, loading: false });
    } catch (e) {
      set({ loading: false });
      throw e;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const user = authService.checkAuth();
    set({ user, isAuthenticated: !!user });
  }
}));

export default useAuthStore;
