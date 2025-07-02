import express from 'express';
import { addEntry, getEntries } from '../controllers/journalController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getEntries);
router.post('/', protect, addEntry);

export default router; 