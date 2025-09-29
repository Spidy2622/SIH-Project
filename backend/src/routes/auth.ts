import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { username, name, email, password } = req.body as { username?: string; name?: string; email: string; password: string };
    const userName = username || name;
    if (!userName || !email || !password) return res.status(400).json({ error: 'Missing fields' });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name: userName, email: email.toLowerCase(), passwordHash });
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      registrationDate: user.registrationDate,
      totalScore: user.totalScore,
      gamesPlayed: user.gamesPlayed,
      achievements: user.achievements
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      registrationDate: user.registrationDate,
      totalScore: user.totalScore,
      gamesPlayed: user.gamesPlayed,
      achievements: user.achievements
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;


