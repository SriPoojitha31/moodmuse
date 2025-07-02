import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { connectDB } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import aiRoutes from './routes/ai.js';
import authRoutes from './routes/auth.js';
import journalRoutes from './routes/journal.js';
import moodRoutes from './routes/mood.js';
import userRoutes from './routes/user.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/user', userRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 