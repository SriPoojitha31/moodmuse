import express from 'express';
import { getAIResponse } from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, getAIResponse);

export default router; 