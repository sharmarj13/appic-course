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

export interface TrainingFeature {
  id: string;
  title: string;
  description: string;
  badge?: string;
  iconName?: string;
}

export interface TrainingBatch {
  id: string;
  batchType: string;
  days: string;
  timing: string;
  mode: string;
  seatsStatus: string;
}

export interface TrainingOfferedData {
  overview?: string;
  highlights?: string[];
  features?: TrainingFeature[];
  batches?: TrainingBatch[];
  tools?: string[];
  deliverables?: string[];
}

export interface PlacementItem {
  id: string;
  name: string;
  role: string;
  company: string;
  package: string;
  avatarUrl?: string;
}

export interface ToolItem {
  name: string;
  letter?: string;
  color?: string;
}

export interface FutureScopeStat {
  value: string;
  label: string;
}

export interface FutureScopeData {
  title?: string;
  stats?: FutureScopeStat[];
}

export interface CertificateData {
  title?: string;
  subtitle?: string;
  shareableText?: string;
  highlights?: string[];
  certificateType?: string;
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
  trainers?: CourseInstructor[];
  whatYouWillLearn: string[];
  prerequisites: string[];
  curriculum: CurriculumModule[];
  reviews: CourseReview[];
  faqs: CourseFAQItem[];
  trainingOffered?: TrainingOfferedData;
  placements?: PlacementItem[];
  toolsCovered?: (string | ToolItem)[];
  futureScope?: FutureScopeData;
  certificateInfo?: CertificateData;
  programFeatures?: string[];
  courseType?: string;
  language?: string;
  brochureUrl?: string;
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
