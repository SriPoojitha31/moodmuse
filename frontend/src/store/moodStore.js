import { create } from 'zustand';
import * as moodService from '../services/mood';

const useMoodStore = create((set) => ({
  moods: [],
  loading: false,

  fetchMoods: async () => {
    set({ loading: true });
    const moods = await moodService.fetchMoods();
    set({ moods, loading: false });
  },

  addMood: async (mood, note = '') => {
    set({ loading: true });
    await moodService.addMood(mood, note);
    const moods = await moodService.fetchMoods();
    set({ moods, loading: false });
  }
}));

export default useMoodStore;
