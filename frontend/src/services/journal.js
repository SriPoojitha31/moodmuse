export function fetchEntries() {
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  return Promise.resolve(entries);
}

export function addEntry(text) {
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  const newEntry = { date: new Date().toISOString(), text };
  const updated = [newEntry, ...entries];
  localStorage.setItem('journalEntries', JSON.stringify(updated));
  return Promise.resolve(newEntry);
}
