export function fetchMoods() {
  const moods = JSON.parse(localStorage.getItem('moodEntries') || '[]');
  return Promise.resolve(moods);
}

export function addMood(mood, note = '') {
  const moods = JSON.parse(localStorage.getItem('moodEntries') || '[]');
  const newMood = { date: new Date().toISOString(), mood, note };
  const updated = [newMood, ...moods];
  localStorage.setItem('moodEntries', JSON.stringify(updated));
  return Promise.resolve(newMood);
}
