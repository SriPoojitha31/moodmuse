import { create } from 'zustand';
import * as journalService from '../services/journal';

const useJournalStore = create((set) => ({
  entries: [],
  loading: false,

  fetchEntries: async () => {
    set({ loading: true });
    const entries = await journalService.fetchEntries();
    set({ entries, loading: false });
  },

  addEntry: async (text) => {
    set({ loading: true });
    await journalService.addEntry(text);
    const entries = await journalService.fetchEntries();
    set({ entries, loading: false });
  }
}));

export default useJournalStore;
