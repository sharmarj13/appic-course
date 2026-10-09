import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

// GET /api/analytics
router.get('/', async (req, res) => {
  try {
    const [
      totalCourses,
      totalBlogs,
      totalWorkshops,
      totalInquiries,
      newInquiriesCount,
      recentInquiries,
      courses,
    ] = await Promise.all([
      prisma.course.count(),
      prisma.blogArticle.count(),
      prisma.workshop.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'NEW' } }),
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.course.findMany({
        select: {
          id: true,
          title: true,
          category: true,
          price: true,
          studentsCount: true,
          rating: true,
        },
      }),
    ]);

    const categoryCounts: Record<string, number> = {};
    let estimatedRevenue = 0;
    let totalStudents = 0;

    courses.forEach((c: any) => {
      categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
      estimatedRevenue += c.price * c.studentsCount;
      totalStudents += c.studentsCount;
    });

    res.json({
      metrics: {
        totalCourses,
        totalBlogs,
        totalWorkshops,
        totalInquiries,
        newInquiriesCount,
        totalStudents,
        estimatedRevenue,
      },
      categoryDistribution: categoryCounts,
      recentInquiries,
      popularCourses: courses.slice(0, 5),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to calculate analytics metrics' });
  }
});

export default router;
