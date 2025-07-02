import MoodEntry from '../models/MoodEntry.js';

export const getMoods = async (req, res, next) => {
  try {
    const moods = await MoodEntry.find({ user: req.user }).sort({ date: -1 });
    res.json(moods);
  } catch (err) {
    next(err);
  }
};

export const addMood = async (req, res, next) => {
  try {
    const { mood, note } = req.body;
    const entry = await MoodEntry.create({ user: req.user, mood, note });
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
}; 