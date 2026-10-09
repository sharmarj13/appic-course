import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { join } from 'path';

// Import Routes
import coursesRouter from './routes/courses.routes.js';
import blogsRouter from './routes/blogs.routes.js';
import workshopsRouter from './routes/workshops.routes.js';
import inquiriesRouter from './routes/inquiries.routes.js';
import faqsRouter from './routes/faqs.routes.js';
import settingsRouter from './routes/settings.routes.js';
import analyticsRouter from './routes/analytics.routes.js';
import uploadRouter from './routes/upload.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploads
app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Appic Courses Express API',
  });
});

// API Routes
app.use('/api/courses', coursesRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/workshops', workshopsRouter);
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/admin/analytics', analyticsRouter);
app.use('/api/upload', uploadRouter);

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Appic Courses Backend Server running at http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
