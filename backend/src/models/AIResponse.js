import mongoose from 'mongoose';

const aiResponseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('AIResponse', aiResponseSchema); 