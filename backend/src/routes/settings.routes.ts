import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

// GET /api/settings?key=...
router.get('/', async (req, res) => {
  try {
    const key = String(req.query.key || 'general_settings');
    const setting = await prisma.siteSetting.findUnique({
      where: { key },
    });
    res.json(setting?.data || null);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch settings' });
  }
});

// POST /api/settings
router.post('/', async (req, res) => {
  try {
    const { key, data } = req.body;
    if (!key) {
      return res.status(400).json({ error: 'Missing setting key' });
    }
    const updated = await prisma.siteSetting.upsert({
      where: { key },
      update: { data },
      create: { key, data },
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to save settings' });
  }
});

export default router;
