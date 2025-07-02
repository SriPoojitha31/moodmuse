import useMoodStore from '../store/moodStore';

export function useMood() {
  const {
    moods,
    loading,
    addMood,
    fetchMoods
  } = useMoodStore();

  return {
    moods,
    loading,
    addMood,
    fetchMoods
  };
}

export default useMood;
