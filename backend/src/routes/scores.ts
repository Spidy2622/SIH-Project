import { Router } from 'express';
import Score from '../models/Score';
import User from '../models/User';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { userId, score, gameType } = req.body as { userId: string; score: number; gameType: string };
    if (!userId || typeof score !== 'number') return res.status(400).json({ error: 'Missing fields' });

    // Get user name for the score record
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const s = await Score.create({ 
      userId, 
      name: user.name, 
      score, 
      level: 1 // Default level, can be enhanced later
    });

    // Update aggregate fields on user
    await User.findByIdAndUpdate(userId, { $inc: { totalScore: score, gamesPlayed: 1 } });

    return res.status(201).json(s);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/leaderboard', async (_req, res) => {
  try {
    const top = await Score.find().sort({ score: -1, date: -1 }).limit(50).lean();
    return res.json(top);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;


