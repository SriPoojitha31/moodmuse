import JournalEntry from '../models/JournalEntry.js';

export const getEntries = async (req, res, next) => {
  try {
    const entries = await JournalEntry.find({ user: req.user }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

export const addEntry = async (req, res, next) => {
  try {
    const { text } = req.body;
    const entry = await JournalEntry.create({ user: req.user, text });
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
}; 