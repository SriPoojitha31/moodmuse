import { getAIInsight } from '../services/aiService.js';

export const getAIResponse = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const response = await getAIInsight(prompt);
    res.json({ response });
  } catch (err) {
    next(err);
  }
}; 