import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { z } from 'zod';

const router = Router();

const BlogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().optional(),
  excerpt: z.string().min(10, 'Excerpt is required'),
  category: z.string().default('Career'),
  publishedAt: z.string().optional(),
  readingTime: z.string().default('5 min read'),
  featured: z.boolean().default(false),
  imageUrl: z.string().nullable().optional(),
  visualTheme: z.string().default('navy'),
  author: z.any().optional(),
  sections: z.any().optional(),
});

// GET /api/blogs
router.get('/', async (req, res) => {
  try {
    const { category, search, featured } = req.query;
    const where: any = {};

    if (category && category !== 'All') {
      where.category = { equals: String(category), mode: 'insensitive' };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search && String(search).trim() !== '') {
      where.OR = [
        { title: { contains: String(search).trim(), mode: 'insensitive' } },
        { excerpt: { contains: String(search).trim(), mode: 'insensitive' } },
        { category: { contains: String(search).trim(), mode: 'insensitive' } },
      ];
    }

    const blogs = await prisma.blogArticle.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });

    res.json(blogs);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch blogs' });
  }
});

// GET /api/blogs/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await prisma.blogArticle.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch blog' });
  }
});

// POST /api/blogs
router.post('/', async (req, res) => {
  try {
    const validated = BlogSchema.parse(req.body);
    const slug =
      validated.slug ||
      validated.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const blog = await prisma.blogArticle.create({
      data: {
        slug,
        title: validated.title,
        excerpt: validated.excerpt,
        category: validated.category,
        publishedAt:
          validated.publishedAt ||
          new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
        readingTime: validated.readingTime,
        featured: validated.featured,
        imageUrl: validated.imageUrl || null,
        visualTheme: validated.visualTheme,
        author: validated.author || {},
        sections: validated.sections || [],
      },
    });

    res.status(201).json(blog);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues[0]?.message || 'Validation error' });
    }
    res.status(500).json({ error: error.message || 'Failed to create blog' });
  }
});

// PUT /api/blogs/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const blog = await prisma.blogArticle.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.publishedAt !== undefined && { publishedAt: body.publishedAt }),
        ...(body.readingTime !== undefined && { readingTime: body.readingTime }),
        ...(body.featured !== undefined && { featured: Boolean(body.featured) }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
        ...(body.visualTheme !== undefined && { visualTheme: body.visualTheme }),
        ...(body.author !== undefined && { author: body.author }),
        ...(body.sections !== undefined && { sections: body.sections }),
      },
    });

    res.json(blog);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update blog' });
  }
});

// DELETE /api/blogs/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.blogArticle.delete({
      where: { id },
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete blog' });
  }
});

export default router;
