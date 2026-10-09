"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { COURSES } from '../data/courses';
import { BLOG_ARTICLES } from '../data/blogs';
import { WORKSHOPS } from '../data/workshops';
import { Course } from '../types/course';
import { BlogArticle } from '../types/blog';

export interface SiteSettings {
  siteName: string;
  logoText: string;
  logoUrl: string;
  supportEmail: string;
  admissionsEmail: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  hoursWeekdays: string;
  hoursWeekends: string;
  tagline: string;
  copyrightText: string;
}

export interface HomeFeature {
  id: string;
  title: string;
  description: string;
  bgGradient: string;
  iconName: string;
}

export interface HomeStage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
  layerLabel: string;
}

export interface HomeTestimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  initials: string;
  rating?: number;
  avatarUrl?: string;
  videoUrl?: string;
  videoThumbnail?: string;
}

export interface HomeWorkshops {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
}

export interface HomePillar {
  id: string;
  title: string;
  text: string;
  iconName: string;
}

export interface HomeCommunity {
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
  channelName: string;
  channelDesc: string;
  membersOnlineText: string;
  pillars: HomePillar[];
}

export interface HomeFeaturedCourses {
  eyebrow: string;
  title: string;
  titleItalic: string;
  description: string;
}

export interface HomeBlogPreview {
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
}

export interface HomeContent {
  hero: {
    badge: string;
    titleLine1: string;
    titleGradient: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  featuredCourses: HomeFeaturedCourses;
  whyAppic: {
    eyebrow: string;
    title: string;
    description: string;
    features: HomeFeature[];
  };
  journey: {
    eyebrow: string;
    title: string;
    description: string;
    stages: HomeStage[];
  };
  reviews: {
    eyebrow?: string;
    title?: string;
    titleGradient?: string;
    description?: string;
    videoSectionTitle?: string;
    statsTitle?: string;
    ratingScore: string;
    ratingSource: string;
    yearsExp: string;
    reviewsCount: string;
    partnersCount: string;
    studentsCount: string;
    testimonials: HomeTestimonial[];
  };
  workshops: HomeWorkshops;
  community: HomeCommunity;
  blogPreview: HomeBlogPreview;
  finalCta: {
    badge: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    diplomaText: string;
  };
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  topic: string;
  experienceLevel: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Resolved';
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface HelpArticle {
  id: string;
  category: string;
  title: string;
  answer: string;
}

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalContent {
  privacy: {
    lastUpdated: string;
    sections: LegalSection[];
  };
  terms: {
    lastUpdated: string;
    sections: LegalSection[];
  };
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Appic Skill',
  logoText: 'Appic Skill',
  logoUrl: '',
  supportEmail: 'support@appicskill.edu',
  admissionsEmail: 'admissions@appicskill.edu',
  phone: '+1 (415) 890-4320',
  whatsappNumber: '+91 9887354080',
  address: '548 Market Street, Suite 420, San Francisco, CA 94104',
  hoursWeekdays: 'Mon – Fri: 8:00 AM – 7:00 PM EST',
  hoursWeekends: 'Sat: 9:00 AM – 2:00 PM EST',
  tagline: 'Self-paced technical and professional programmes, live interactive workshops, and mentor-reviewed projects built to accelerate your career trajectory.',
  copyrightText: '© 2026 Appic Skill. All rights reserved.',
};

const DEFAULT_HOME: HomeContent = {
  hero: {
    badge: 'Excellence in Tech Education',
    titleLine1: 'Master Your Tools,',
    titleGradient: 'Shape the Future.',
    subtitle: 'Join over 50,000 professionals who have advanced their careers through our self-paced, expertly crafted tool skill courses.',
    ctaText: 'Start Learning Now',
    ctaLink: '/courses',
  },
  featuredCourses: {
    eyebrow: 'Featured Programmes',
    title: 'Learn skills that move your',
    titleItalic: 'career forward.',
    description: 'Choose practical, industry-focused programmes designed by senior practitioners. Build real portfolio systems and receive structured mentor feedback.',
  },
  whyAppic: {
    eyebrow: 'Why Appic Skill',
    title: 'Engineered for measurable skill mastery, not passive watching',
    description: 'We combine the flexibility of self-paced study with the accountability of live workshops, human code reviews, and career-ready project portfolios.',
    features: [
      {
        id: 'f1',
        title: '01. Industry-Focused Curriculum',
        description: 'Syllabi are updated quarterly around real hiring rubrics, production system architectures, and modern workflows.',
        bgGradient: 'bg-slate-900',
        iconName: 'Compass',
      },
      {
        id: 'f2',
        title: '02. Expert Trainers',
        description: 'Learn directly from principal architects, staff product designers, and analytics directors.',
        bgGradient: 'bg-gradient-to-br from-indigo-900 to-indigo-950',
        iconName: 'Users',
      },
      {
        id: 'f3',
        title: '03. Hands-On Projects',
        description: 'Move past passive video tutorials. Every module concludes with an applied production build.',
        bgGradient: 'bg-gradient-to-br from-purple-900 to-purple-950',
        iconName: 'Code2',
      },
      {
        id: 'f4',
        title: '04. Career Guidance',
        description: 'Receive structured portfolio critiques, architecture RFC defense practice, and technical interview preparation.',
        bgGradient: 'bg-gradient-to-br from-emerald-900 to-emerald-950',
        iconName: 'Briefcase',
      },
      {
        id: 'f5',
        title: '05. Live Workshops',
        description: 'Join weekly interactive sessions to debug architectures and ask questions live.',
        bgGradient: 'bg-gradient-to-br from-cyan-900 to-cyan-950',
        iconName: 'Video',
      },
      {
        id: 'f6',
        title: '06. Community Support',
        description: 'Collaborate in topic-specific study channels with ambitious peers and teaching fellows.',
        bgGradient: 'bg-gradient-to-br from-fuchsia-900 to-fuchsia-950',
        iconName: 'MessageSquare',
      },
    ],
  },
  journey: {
    eyebrow: 'Pedagogical Blueprint',
    title: 'A structured four-stage path from concept to career readiness',
    description: 'Every programme follows a deliberate progression designed to turn theoretical knowledge into verifiable portfolio proof.',
    stages: [
      {
        id: 's1',
        number: '01',
        title: 'Choose your programme',
        subtitle: 'Select a structured track aligned with your target role',
        description: 'Audit our transparent syllabi across Full Stack Engineering, UI/UX Design Systems, Applied AI, Data Analytics, or Growth Strategy.',
        deliverable: 'Personal Learning Roadmap & Environment Setup',
        layerLabel: '3D Stage 01 · Track Selection',
      },
      {
        id: 's2',
        number: '02',
        title: 'Learn from experts',
        subtitle: 'Master core mental models through concise HD lessons & live clinics',
        description: 'Study high-signal video modules without filler. Join weekly live interactive workshops to ask questions directly to faculty.',
        deliverable: 'Interactive Concept Labs & Annotated Reference Code',
        layerLabel: '3D Stage 02 · Faculty Labs',
      },
      {
        id: 's3',
        number: '03',
        title: 'Build real projects',
        subtitle: 'Ship production-grade systems and receive 1-on-1 mentor feedback',
        description: 'Apply every concept immediately by building 4 to 6 substantial projects. Submit your pull requests or Figma token libraries for review.',
        deliverable: 'Code-Reviewed GitHub Repositories & Case Studies',
        layerLabel: '3D Stage 03 · Production Builds',
      },
      {
        id: 's4',
        number: '04',
        title: 'Get career ready',
        subtitle: 'Defend your architecture and present a high-signal portfolio',
        description: 'Complete your capstone technical defense, refine your case study narratives, and earn a verifiable Appic Skill credential.',
        deliverable: 'Verified Certificate & Technical Interview Readiness',
        layerLabel: '3D Stage 04 · Diploma & Defense',
      },
    ],
  },
  reviews: {
    eyebrow: 'Success Stories',
    title: 'Hear from our',
    titleGradient: 'driven learners.',
    description: 'At Appic Skill, we focus on practical outcomes. Discover how our self-paced modules and expert reviews have transformed careers.',
    videoSectionTitle: 'Watch their journey',
    statsTitle: 'The numbers speak for themselves.',
    ratingScore: '4.8',
    ratingSource: 'Based on 41,000+ Google Reviews',
    yearsExp: '15+',
    reviewsCount: '41K+',
    partnersCount: '300+',
    studentsCount: '5L+',
    testimonials: [
      {
        id: 't1',
        name: 'Aarav Patel',
        role: 'Senior Full Stack Engineer',
        company: 'TechCorp',
        quote: 'The modular curriculum and mentor code reviews bridged the gap between basic coding tutorials and real enterprise production code.',
        initials: 'AP',
        rating: 5,
        videoUrl: 'https://cdn.iraskills.ai/wp-content/uploads/2025/01/4.mp4',
        videoThumbnail: '',
      },
      {
        id: 't2',
        name: 'Sneha Rao',
        role: 'Product Designer',
        company: 'FinTech Studio',
        quote: 'Creating real design token systems and defending them in live clinics completely transformed my interview confidence.',
        initials: 'SR',
        rating: 5,
        videoUrl: 'https://cdn.iraskills.ai/wp-content/uploads/2025/01/4.mp4',
        videoThumbnail: '',
      },
      {
        id: 't3',
        name: 'Dev Sharma',
        role: 'Data Scientist',
        company: 'Global Analytics',
        quote: 'Hands down the most rigorous project portfolio I have built. The instructors are staff-level practitioners who give honest critique.',
        initials: 'DS',
        rating: 5,
        videoUrl: 'https://cdn.iraskills.ai/wp-content/uploads/2025/01/4.mp4',
        videoThumbnail: '',
      },
    ],
  },
  workshops: {
    eyebrow: 'Interactive Cohort Clinics',
    title: 'Learn live. Ask questions. Build faster.',
    description: 'Supplement your self-paced modules with live interactive engineering, design, and analytics workshops led by our faculty.',
    note: 'All live workshops include interactive Q&A, downloadable starter repositories, and session recordings.',
  },
  community: {
    eyebrow: 'Peer & Mentor Network',
    title: 'You’re not learning alone.',
    description: 'Self-paced never means isolated. Connect with 50,000+ learners, practicing mentors, and alumni across our structured discussion channels and weekly review clinics.',
    buttonText: 'Join the Learner Community',
    channelName: '#architecture-and-portfolio-review',
    channelDesc: 'Active mentor & peer discussion thread',
    membersOnlineText: '142 Members Online',
    pillars: [
      {
        id: 'p1',
        iconName: 'GitPullRequest',
        title: 'Line-by-Line Code & Design Critiques',
        text: 'Share your GitHub pull requests or Figma token files for structured feedback from mentors and peers.',
      },
      {
        id: 'p2',
        iconName: 'MessageSquare',
        title: 'Topic-Specific Architecture Threads',
        text: 'Dedicated channels for Full Stack, UI/UX, Applied AI, SQL Analytics, and Career Interview Prep.',
      },
      {
        id: 'p3',
        iconName: 'Users',
        title: 'Weekly Peer Study & Accountability Groups',
        text: 'Join small cohort circles matched by time zone and target career track to stay consistent.',
      },
      {
        id: 'p4',
        iconName: 'Compass',
        title: 'Mock Interviews & Portfolio Defense',
        text: 'Practice explaining your system trade-offs and product case studies before real hiring loops.',
      },
    ],
  },
  blogPreview: {
    eyebrow: 'Editorial & Career Playbooks',
    title: 'Insights for your next career move',
    description: 'Practical essays, architectural deep-dives, and career guides written by our teaching faculty.',
    buttonText: 'View All Articles',
  },
  finalCta: {
    badge: 'Next Cohort & Self-Paced Access Open',
    title: 'Start building the skills your career needs next.',
    subtitle: 'Learn from experts, build practical skills and move closer to your career goals.',
    ctaText: 'Talk to Us',
    ctaLink: '/contact',
    diplomaText: 'Appic Skill Diploma · Cryptographically Verified',
  },
};

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'ASK-849201',
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    topic: 'Programme Advisory & Syllabus',
    experienceLevel: 'Junior Developer (1-2 yrs)',
    message: 'Interested in transitioning from Frontend React to Full Stack with Node & PostgreSQL. Looking for curriculum details and mentor support timings.',
    createdAt: '2026-10-08 10:15 AM',
    status: 'New',
  },
  {
    id: 'ASK-723145',
    fullName: 'Pooja Verma',
    email: 'pooja.verma@fintech.co',
    phone: '+91 98112 33445',
    topic: 'Enterprise & Team Training',
    experienceLevel: 'Engineering Manager / Lead',
    message: 'We want to upskill our 12-member engineering team on modern Next.js and Microservices architecture. Do you offer corporate invoices?',
    createdAt: '2026-10-07 04:30 PM',
    status: 'In Progress',
  },
  {
    id: 'ASK-612984',
    fullName: 'Amit Patel',
    email: 'amit.patel@gmail.com',
    phone: '+91 97234 56789',
    topic: '1-on-1 Career Consultation',
    experienceLevel: 'Non-Tech Career Switcher',
    message: 'I am coming from an operations background and want to switch to UI/UX Product Design. Would like to schedule a 15-minute diagnostic call.',
    createdAt: '2026-10-06 02:10 PM',
    status: 'Contacted',
  },
];

const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Admissions',
    question: 'Are there any prerequisites required before enrolling in Appic Skill programmes?',
    answer: 'Prerequisites depend on the specific track. Foundational Full Stack and Frontend tracks assume basic computer literacy. Specialized advanced tracks recommend familiarity with JavaScript/Python.',
  },
  {
    id: 'faq-2',
    category: 'Admissions',
    question: 'How do I know which programme track is best for my experience level?',
    answer: 'You can reach out directly via our Contact page or request a 15-minute diagnostic call with an academic advisor. We review your current background and recommend the right path.',
  },
  {
    id: 'faq-3',
    category: 'Curriculum & Projects',
    question: 'Are the projects based on realistic production architectures or simple tutorial apps?',
    answer: 'Every project in our curriculum is modeled after authentic engineering specifications from high-growth tech companies with database schemas, tests, and CI/CD pipelines.',
  },
  {
    id: 'faq-4',
    category: 'Curriculum & Projects',
    question: 'Do I get permanent access to course materials and future syllabus updates?',
    answer: 'Yes! Enrollment grants lifetime access to all recorded video modules, interactive quizzes, downloadable guides, and GitHub template repositories.',
  },
  {
    id: 'faq-5',
    category: 'Mentorship & Support',
    question: 'Who are the mentors and how do 1-on-1 feedback sessions work?',
    answer: 'Our mentors are practicing staff engineers and leads. When you submit milestones, mentors provide line-by-line async code reviews and scheduled 1-on-1 office hours.',
  },
  {
    id: 'faq-6',
    category: 'Fees & Billing',
    question: 'What is your refund policy if the programme does not meet my expectations?',
    answer: 'We maintain an unconditional 7-day money-back guarantee. If you feel the curriculum is not right for you, email support@appicskill.edu for a complete refund.',
  },
];

const DEFAULT_HELP: HelpArticle[] = [
  {
    id: 'help-1',
    category: 'Course Access',
    title: 'How do I access GitHub repositories and starter code for course projects?',
    answer: 'Once enrolled, access your course dashboard. In the "Resources" tab of each module, you will find direct links to private starter repositories and setup scripts.',
  },
  {
    id: 'help-2',
    category: 'Billing',
    title: 'What is the refund policy for self-paced and cohort programmes?',
    answer: 'We offer a 7-day no-questions-asked refund policy for all self-paced programmes starting from the initial enrollment date.',
  },
  {
    id: 'help-3',
    category: 'Live Mentorship',
    title: 'How do 1-on-1 mentor code reviews work?',
    answer: 'Submit your completed project pull request via the dashboard. An allocated staff engineer will review your architecture and deliver personalized feedback within 48 hours.',
  },
  {
    id: 'help-4',
    category: 'Certification',
    title: 'How are course completion certificates verified by employers?',
    answer: 'Every Appic Skill certificate includes a unique cryptographic verification hash and permanent public URL that recruiters can inspect directly.',
  },
];

const DEFAULT_LEGAL: LegalContent = {
  privacy: {
    lastUpdated: 'October 8, 2026',
    sections: [
      {
        id: 'p-1',
        number: '01',
        title: 'Information We Collect',
        paragraphs: [
          'When you create an account or request academic advising through Appic Skill, we collect necessary information to provide educational services.',
        ],
        bullets: [
          'Account Details: Full name, email address, password hash.',
          'Academic Progress: Completed lessons, code reviews, capstone evaluations.',
          'Technical Logs: IP address, device specs, platform security metrics.',
        ],
      },
      {
        id: 'p-2',
        number: '02',
        title: 'How We Use Your Information',
        paragraphs: [
          'We use collected information solely for educational and platform delivery purposes: delivering curricula, pairing you with mentors, sending updates, and maintaining verified certificate registries.',
        ],
      },
      {
        id: 'p-3',
        number: '03',
        title: 'Zero Data Selling & Security',
        paragraphs: [
          'We never sell, rent, or monetize your personal data to third parties. All traffic is encrypted with TLS 1.3 and database backups are secured with AES-256 encryption.',
        ],
      },
    ],
  },
  terms: {
    lastUpdated: 'October 8, 2026',
    sections: [
      {
        id: 't-1',
        number: '01',
        title: 'Acceptance of Agreement',
        paragraphs: [
          'By accessing Appic Skill, you agree to be bound by these terms. If you do not agree, you must not access the platform.',
        ],
      },
      {
        id: 't-2',
        number: '02',
        title: 'Intellectual Property & Student Code',
        paragraphs: [
          'Course materials and videos belong to Appic Skill. However, all source code and portfolio projects created by you remain 100% your own intellectual property.',
        ],
      },
      {
        id: 't-3',
        number: '03',
        title: '7-Day Refund Policy',
        paragraphs: [
          'We provide a full refund if requested within 7 calendar days of course purchase. Email support@appicskill.edu for immediate processing.',
        ],
      },
    ],
  },
};

interface SiteDataContextType {
  settings: SiteSettings;
  home: HomeContent;
  courses: Course[];
  blogs: BlogArticle[];
  inquiries: Inquiry[];
  faqs: FaqItem[];
  helpArticles: HelpArticle[];
  legal: LegalContent;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateHome: (newHome: Partial<HomeContent>) => void;
  // Course actions
  addCourse: (course: Course) => void;
  updateCourse: (id: string, updated: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  // Blog actions
  addBlog: (blog: BlogArticle) => void;
  updateBlog: (id: string, updated: Partial<BlogArticle>) => void;
  deleteBlog: (id: string) => void;
  // Inquiries actions
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => string;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  // FAQ actions
  addFaq: (faq: Omit<FaqItem, 'id'>) => void;
  updateFaq: (id: string, updated: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
  // Help actions
  addHelpArticle: (article: Omit<HelpArticle, 'id'>) => void;
  updateHelpArticle: (id: string, updated: Partial<HelpArticle>) => void;
  deleteHelpArticle: (id: string) => void;
  // Legal actions
  updateLegal: (type: 'privacy' | 'terms', content: any) => void;
  // Status
  isLoaded: boolean;
  // Reset
  resetAllData: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

const STORAGE_KEY = 'appic_skill_site_data_v1';

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [home, setHome] = useState<HomeContent>(DEFAULT_HOME);
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [blogs, setBlogs] = useState<BlogArticle[]>(BLOG_ARTICLES);
  const [inquiries, setInquiries] = useState<Inquiry[]>(DEFAULT_INQUIRIES);
  const [faqs, setFaqs] = useState<FaqItem[]>(DEFAULT_FAQS);
  const [helpArticles, setHelpArticles] = useState<HelpArticle[]>(DEFAULT_HELP);
  const [legal, setLegal] = useState<LegalContent>(DEFAULT_LEGAL);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.settings) setSettings(parsed.settings);
        if (parsed.home) {
          setHome({
            ...DEFAULT_HOME,
            ...parsed.home,
            hero: { ...DEFAULT_HOME.hero, ...(parsed.home.hero || {}) },
            featuredCourses: { ...DEFAULT_HOME.featuredCourses, ...(parsed.home.featuredCourses || {}) },
            whyAppic: { ...DEFAULT_HOME.whyAppic, ...(parsed.home.whyAppic || {}) },
            journey: { ...DEFAULT_HOME.journey, ...(parsed.home.journey || {}) },
            reviews: {
              ...DEFAULT_HOME.reviews,
              ...(parsed.home.reviews || {}),
              testimonials: (parsed.home.reviews?.testimonials && parsed.home.reviews.testimonials.length > 0)
                ? parsed.home.reviews.testimonials
                : DEFAULT_HOME.reviews.testimonials,
            },
            workshops: { ...DEFAULT_HOME.workshops, ...(parsed.home.workshops || {}) },
            community: { ...DEFAULT_HOME.community, ...(parsed.home.community || {}) },
            blogPreview: { ...DEFAULT_HOME.blogPreview, ...(parsed.home.blogPreview || {}) },
            finalCta: { ...DEFAULT_HOME.finalCta, ...(parsed.home.finalCta || {}) },
          });
        }
        if (parsed.courses) setCourses(parsed.courses);
        if (parsed.blogs) setBlogs(parsed.blogs);
        if (parsed.inquiries) setInquiries(parsed.inquiries);
        if (parsed.faqs) setFaqs(parsed.faqs);
        if (parsed.helpArticles) setHelpArticles(parsed.helpArticles);
        if (parsed.legal) setLegal(parsed.legal);
      }
    } catch (e) {
      console.error('Error loading stored site data', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage whenever data changes (after initial load)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const payload = {
        settings,
        home,
        courses,
        blogs,
        inquiries,
        faqs,
        helpArticles,
        legal,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Error saving site data', e);
    }
  }, [settings, home, courses, blogs, inquiries, faqs, helpArticles, legal, isLoaded]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateHome = (newHome: Partial<HomeContent>) => {
    setHome((prev) => ({ ...prev, ...newHome }));
  };

  const addCourse = (course: Course) => {
    setCourses((prev) => [course, ...prev]);
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const addBlog = (blog: BlogArticle) => {
    setBlogs((prev) => [blog, ...prev]);
  };

  const updateBlog = (id: string, updated: Partial<BlogArticle>) => {
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, ...updated } : b)));
  };

  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): string => {
    const id = `ASK-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newInquiry: Inquiry = {
      ...inquiry,
      id,
      createdAt: formattedDate,
      status: 'New',
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    return id;
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  const addFaq = (faq: Omit<FaqItem, 'id'>) => {
    const id = `faq-${Date.now()}`;
    setFaqs((prev) => [...prev, { ...faq, id }]);
  };

  const updateFaq = (id: string, updated: Partial<FaqItem>) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updated } : f)));
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const addHelpArticle = (article: Omit<HelpArticle, 'id'>) => {
    const id = `help-${Date.now()}`;
    setHelpArticles((prev) => [...prev, { ...article, id }]);
  };

  const updateHelpArticle = (id: string, updated: Partial<HelpArticle>) => {
    setHelpArticles((prev) => prev.map((h) => (h.id === id ? { ...h, ...updated } : h)));
  };

  const deleteHelpArticle = (id: string) => {
    setHelpArticles((prev) => prev.filter((h) => h.id !== id));
  };

  const updateLegal = (type: 'privacy' | 'terms', content: any) => {
    setLegal((prev) => ({
      ...prev,
      [type]: content,
    }));
  };

  const resetAllData = () => {
    setSettings(DEFAULT_SETTINGS);
    setHome(DEFAULT_HOME);
    setCourses(COURSES);
    setBlogs(BLOG_ARTICLES);
    setInquiries(DEFAULT_INQUIRIES);
    setFaqs(DEFAULT_FAQS);
    setHelpArticles(DEFAULT_HELP);
    setLegal(DEFAULT_LEGAL);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  return (
    <SiteDataContext.Provider
      value={{
        settings,
        home,
        courses,
        blogs,
        inquiries,
        faqs,
        helpArticles,
        legal,
        isLoaded,
        updateSettings,
        updateHome,
        addCourse,
        updateCourse,
        deleteCourse,
        addBlog,
        updateBlog,
        deleteBlog,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        addFaq,
        updateFaq,
        deleteFaq,
        addHelpArticle,
        updateHelpArticle,
        deleteHelpArticle,
        updateLegal,
        resetAllData,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
