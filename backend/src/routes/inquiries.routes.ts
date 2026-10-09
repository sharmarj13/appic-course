import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { z } from 'zod';

const router = Router();

const InquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  courseId: z.string().optional(),
  courseName: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  status: z.string().default('NEW'),
});

// GET /api/inquiries
router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;
    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = { equals: String(status).toUpperCase() };
    }

    if (search && String(search).trim() !== '') {
      where.OR = [
        { name: { contains: String(search).trim(), mode: 'insensitive' } },
        { email: { contains: String(search).trim(), mode: 'insensitive' } },
        { message: { contains: String(search).trim(), mode: 'insensitive' } },
        { courseName: { contains: String(search).trim(), mode: 'insensitive' } },
      ];
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(inquiries);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch inquiries' });
  }
});

// POST /api/inquiries
router.post('/', async (req, res) => {
  try {
    const validated = InquirySchema.parse(req.body);

    const inquiry = await prisma.inquiry.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone || null,
        courseId: validated.courseId || null,
        courseName: validated.courseName || null,
        message: validated.message,
        status: validated.status || 'NEW',
      },
    });

    res.status(201).json(inquiry);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues[0]?.message || 'Validation error' });
    }
    res.status(500).json({ error: error.message || 'Failed to submit inquiry' });
  }
});

// PATCH /api/inquiries/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        ...(status && { status }),
      },
    });

    res.json(inquiry);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update inquiry' });
  }
});

// DELETE /api/inquiries/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.inquiry.delete({
      where: { id },
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete inquiry' });
  }
});

export default router;
