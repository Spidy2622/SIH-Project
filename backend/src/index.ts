import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth';
import scoresRouter from './routes/scores';
import usersRouter from './routes/users';

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

const mongoUrl = process.env.MONGODB_URI || '';

// MongoDB connection with caching for serverless
let cachedConnection: typeof mongoose | null = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!mongoUrl) {
    throw new Error('MONGODB_URI not set');
  }

  try {
    cachedConnection = await mongoose.connect(mongoUrl, { 
      dbName: process.env.MONGO_DB_NAME || 'User_db',
      bufferCommands: false,
      maxPoolSize: 1
    } as any);
    console.log('Connected to MongoDB');
    return cachedConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Routes
app.get('/api/health', async (_req, res) => {
  try {
    await connectToDatabase();
    res.json({ ok: true, status: 'Connected to database' });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Database connection failed' });
  }
});

app.use('/api/auth', async (req, res, next) => {
  await connectToDatabase();
  authRouter(req, res, next);
});

app.use('/api/scores', async (req, res, next) => {
  await connectToDatabase();
  scoresRouter(req, res, next);
});

app.use('/api/users', async (req, res, next) => {
  await connectToDatabase();
  usersRouter(req, res, next);
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT ? Number(process.env.PORT) : 5000;
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
}

// Export for Vercel
export default app;


