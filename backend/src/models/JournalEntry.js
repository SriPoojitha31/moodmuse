import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('JournalEntry', journalEntrySchema); 