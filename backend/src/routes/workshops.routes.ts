import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

// GET /api/workshops
router.get('/', async (req, res) => {
  try {
    const workshops = await prisma.workshop.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(workshops);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch workshops' });
  }
});

// POST /api/workshops
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const workshop = await prisma.workshop.create({
      data: {
        title: body.title,
        topic: body.topic || '',
        category: body.category || 'Development',
        date: body.date || '',
        time: body.time || '',
        duration: body.duration || '90 Mins',
        instructorName: body.instructorName || '',
        instructorRole: body.instructorRole || '',
        instructorInitials: body.instructorInitials || '',
        seatsTotal: Number(body.seatsTotal) || 100,
        seatsRemaining: Number(body.seatsRemaining) || 100,
        keyTakeaways: body.keyTakeaways || [],
      },
    });
    res.status(201).json(workshop);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create workshop' });
  }
});

export default router;
