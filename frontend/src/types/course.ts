export type CourseCategory =
  | 'Development'
  | 'Design'
  | 'Data & AI'
  | 'Marketing'
  | 'Business';

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CurriculumLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'project' | 'reading' | 'lab';
  isPreview?: boolean;
}

export interface CurriculumModule {
  id: string;
  number: string;
  title: string;
  summary: string;
  duration: string;
  lessons: CurriculumLesson[];
}

export interface CourseInstructor {
  name: string;
  role: string;
  companyContext: string;
  bio: string;
  initials: string;
  experienceYears: number;
  studentsTaught: string;
}

export interface CourseReview {
  id: string;
  studentName: string;
  studentInitials: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  outcomeMetric: string;
}

export interface CourseFAQItem {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  totalHours: number;
  projectsCount: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  price: number;
  originalPrice: number;
  discountPercent: number;
  imageUrl?: string;
  visualAccent: 'blue' | 'indigo' | 'emerald' | 'amber' | 'violet' | 'cyan';
  instructor: CourseInstructor;
  whatYouWillLearn: string[];
  prerequisites: string[];
  curriculum: CurriculumModule[];
  reviews: CourseReview[];
  faqs: CourseFAQItem[];
  featured: boolean;
  updatedAt: string;
}

export interface Workshop {
  id: string;
  title: string;
  topic: string;
  category: CourseCategory;
  date: string;
  time: string;
  duration: string;
  instructorName: string;
  instructorRole: string;
  instructorInitials: string;
  seatsTotal: number;
  seatsRemaining: number;
  keyTakeaways: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  role: string;
  companyCategory: string;
  courseTitle: string;
  courseSlug: string;
  rating: number;
  quote: string;
  careerOutcome: string;
}
