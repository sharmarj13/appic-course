import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { z } from 'zod';

const router = Router();

const FaqSchema = z.object({
  category: z.string().default('General'),
  question: z.string().min(5, 'Question must be at least 5 characters'),
  answer: z.string().min(10, 'Answer must be at least 10 characters'),
  order: z.coerce.number().default(0),
});

// GET /api/faqs
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const where: any = {};
    if (category && category !== 'All') {
      where.category = { equals: String(category), mode: 'insensitive' };
    }

    const faqs = await prisma.faq.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    res.json(faqs);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch FAQs' });
  }
});

// POST /api/faqs
router.post('/', async (req, res) => {
  try {
    const validated = FaqSchema.parse(req.body);
    const faq = await prisma.faq.create({
      data: validated,
    });
    res.status(201).json(faq);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues[0]?.message || 'Validation error' });
    }
    res.status(500).json({ error: error.message || 'Failed to create FAQ' });
  }
});

// PUT /api/faqs/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const faq = await prisma.faq.update({
      where: { id },
      data: {
        ...(body.category && { category: body.category }),
        ...(body.question && { question: body.question }),
        ...(body.answer && { answer: body.answer }),
        ...(body.order !== undefined && { order: Number(body.order) }),
      },
    });
    res.json(faq);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update FAQ' });
  }
});

// DELETE /api/faqs/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.faq.delete({
      where: { id },
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete FAQ' });
  }
});

export default router;
