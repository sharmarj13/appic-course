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

// PUT /api/workshops/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const workshop = await prisma.workshop.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.topic !== undefined && { topic: body.topic }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.date !== undefined && { date: body.date }),
        ...(body.time !== undefined && { time: body.time }),
        ...(body.duration !== undefined && { duration: body.duration }),
        ...(body.instructorName !== undefined && { instructorName: body.instructorName }),
        ...(body.instructorRole !== undefined && { instructorRole: body.instructorRole }),
        ...(body.instructorInitials !== undefined && { instructorInitials: body.instructorInitials }),
        ...(body.seatsTotal !== undefined && { seatsTotal: Number(body.seatsTotal) }),
        ...(body.seatsRemaining !== undefined && { seatsRemaining: Number(body.seatsRemaining) }),
        ...(body.keyTakeaways !== undefined && { keyTakeaways: body.keyTakeaways }),
      },
    });
    res.json(workshop);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update workshop' });
  }
});

// DELETE /api/workshops/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.workshop.delete({ where: { id } });
    res.json({ success: true, message: 'Workshop deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete workshop' });
  }
});

export default router;

