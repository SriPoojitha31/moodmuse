import useJournalStore from '../store/journalStore';

export function useJournal() {
  const {
    entries,
    loading,
    addEntry,
    fetchEntries
  } = useJournalStore();

  return {
    entries,
    loading,
    addEntry,
    fetchEntries
  };
}

export default useJournal;
