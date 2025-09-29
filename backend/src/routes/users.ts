import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ error: 'Not found' });
    const { _id, passwordHash, ...safe } = user as any;
    return res.json({ id: _id, ...safe });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;


