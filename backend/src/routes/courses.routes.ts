import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

function validateCourse(body: any) {
  if (!body.title || typeof body.title !== 'string' || body.title.trim().length === 0) {
    throw new Error('Title is required');
  }
  const price = Number(body.price) || 0;
  if (price < 0) {
    throw new Error('Price cannot be negative');
  }

  return {
    title: String(body.title).trim(),
    slug: body.slug ? String(body.slug).trim() : undefined,
    subtitle: String(body.subtitle || ''),
    shortDescription: String(body.shortDescription || ''),
    fullDescription: String(body.fullDescription || ''),
    category: String(body.category || 'Development'),
    level: String(body.level || 'Beginner'),
    duration: String(body.duration || '12 Weeks'),
    totalHours: Number(body.totalHours) || 0,
    projectsCount: Number(body.projectsCount) || 0,
    rating: Number(body.rating) || 5.0,
    reviewsCount: Number(body.reviewsCount) || 0,
    studentsCount: Number(body.studentsCount) || 0,
    price: price,
    originalPrice: Number(body.originalPrice) || price,
    discountPercent: Number(body.discountPercent) || 0,
    imageUrl: body.imageUrl || null,
    visualAccent: String(body.visualAccent || 'blue'),
    instructor: body.instructor || {},
    trainers: body.trainers || [],
    whatYouWillLearn: body.whatYouWillLearn || [],
    prerequisites: body.prerequisites || [],
    curriculum: body.curriculum || [],
    reviews: body.reviews || [],
    faqs: body.faqs || [],
    trainingOffered: body.trainingOffered || null,
    placements: body.placements || [],
    toolsCovered: body.toolsCovered || [],
    futureScope: body.futureScope || null,
    certificateInfo: body.certificateInfo || null,
    programFeatures: body.programFeatures || [],
    courseType: body.courseType || 'Self-Paced',
    language: body.language || 'English',
    brochureUrl: body.brochureUrl || null,
    featured: Boolean(body.featured),
  };
}

// GET /api/courses
router.get('/', async (req, res) => {
  try {
    const { category, level, search, featured } = req.query;
    const where: any = {};

    if (category && category !== 'All') {
      where.category = { equals: String(category), mode: 'insensitive' };
    }

    if (level && level !== 'All') {
      where.level = { equals: String(level), mode: 'insensitive' };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search && String(search).trim() !== '') {
      where.OR = [
        { title: { contains: String(search).trim(), mode: 'insensitive' } },
        { shortDescription: { contains: String(search).trim(), mode: 'insensitive' } },
        { category: { contains: String(search).trim(), mode: 'insensitive' } },
      ];
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });

    res.json(courses);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch courses' });
  }
});

// GET /api/courses/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch course' });
  }
});

// POST /api/courses
router.post('/', async (req, res) => {
  try {
    const validated = validateCourse(req.body);
    const slug =
      validated.slug ||
      validated.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const course = await prisma.course.create({
      data: {
        slug,
        title: validated.title,
        subtitle: validated.subtitle || '',
        shortDescription: validated.shortDescription,
        fullDescription: validated.fullDescription,
        category: validated.category,
        level: validated.level,
        duration: validated.duration,
        totalHours: validated.totalHours,
        projectsCount: validated.projectsCount,
        rating: validated.rating,
        reviewsCount: validated.reviewsCount,
        studentsCount: validated.studentsCount,
        price: validated.price,
        originalPrice: validated.originalPrice || validated.price,
        discountPercent: validated.discountPercent,
        imageUrl: validated.imageUrl || null,
        visualAccent: validated.visualAccent,
        instructor: validated.instructor || {},
        whatYouWillLearn: validated.whatYouWillLearn || [],
        prerequisites: validated.prerequisites || [],
        curriculum: validated.curriculum || [],
        reviews: validated.reviews || [],
        faqs: validated.faqs || [],
        trainingOffered: validated.trainingOffered || null,
        placements: validated.placements || [],
        toolsCovered: validated.toolsCovered || [],
        futureScope: validated.futureScope || null,
        certificateInfo: validated.certificateInfo || null,
        programFeatures: validated.programFeatures || [],
        courseType: validated.courseType || 'Self-Paced',
        language: validated.language || 'English',
        brochureUrl: validated.brochureUrl || null,
        featured: validated.featured,
      },
    });

    res.status(201).json(course);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to create course' });
  }
});

// PUT /api/courses/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const existing = await prisma.course.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const course = await prisma.course.update({
      where: { id: existing.id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.subtitle !== undefined && { subtitle: body.subtitle }),
        ...(body.shortDescription !== undefined && { shortDescription: body.shortDescription }),
        ...(body.fullDescription !== undefined && { fullDescription: body.fullDescription }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.level !== undefined && { level: body.level }),
        ...(body.duration !== undefined && { duration: body.duration }),
        ...(body.totalHours !== undefined && { totalHours: Number(body.totalHours) }),
        ...(body.projectsCount !== undefined && { projectsCount: Number(body.projectsCount) }),
        ...(body.rating !== undefined && { rating: Number(body.rating) }),
        ...(body.reviewsCount !== undefined && { reviewsCount: Number(body.reviewsCount) }),
        ...(body.studentsCount !== undefined && { studentsCount: Number(body.studentsCount) }),
        ...(body.price !== undefined && { price: Number(body.price) }),
        ...(body.originalPrice !== undefined && { originalPrice: Number(body.originalPrice) }),
        ...(body.discountPercent !== undefined && { discountPercent: Number(body.discountPercent) }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
        ...(body.visualAccent !== undefined && { visualAccent: body.visualAccent }),
        ...(body.instructor !== undefined && { instructor: body.instructor }),
        ...(body.whatYouWillLearn !== undefined && { whatYouWillLearn: body.whatYouWillLearn }),
        ...(body.prerequisites !== undefined && { prerequisites: body.prerequisites }),
        ...(body.curriculum !== undefined && { curriculum: body.curriculum }),
        ...(body.reviews !== undefined && { reviews: body.reviews }),
        ...(body.faqs !== undefined && { faqs: body.faqs }),
        ...(body.featured !== undefined && { featured: Boolean(body.featured) }),
      },
    });

    res.json(course);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update course' });
  }
});

// DELETE /api/courses/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.course.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Course not found' });
    }

    await prisma.course.delete({
      where: { id: existing.id },
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete course' });
  }
});

export default router;
