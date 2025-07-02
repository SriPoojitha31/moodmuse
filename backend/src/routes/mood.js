import express from 'express';
import { addMood, getMoods } from '../controllers/moodController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getMoods);
router.post('/', protect, addMood);

export default router; 