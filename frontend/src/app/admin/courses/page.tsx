"use client";
import React, { useState, useRef } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  ExternalLink,
  GraduationCap,
  Star,
  Clock,
  BookOpen,
  DollarSign,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Link as LinkIcon,
  Copy,
  Laptop,
  Calendar,
  Award,
  MessageSquare,
  CheckCircle2,
  ListChecks,
  Layers,
  Send,
  Briefcase,
  Building,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useSiteData } from '../../../context/SiteDataContext';
import {
  Course,
  CourseCategory,
  CourseLevel,
  TrainingFeature,
  TrainingBatch,
  TrainingOfferedData,
  CourseReview,
  PlacementItem,
  ToolItem,
  FutureScopeData,
  CertificateData
} from '../../../types/course';
import { formatCurrency } from '../../../lib/utils';

// Presets for 1-click image selection
import fullstackImg from '../../../assets/images/course_fullstack_dev_1791367137460.jpg';
import uiuxImg from '../../../assets/images/course_uiux_design_1791367148988.jpg';
import dataAiImg from '../../../assets/images/course_data_ai_1791367159844.jpg';
import hero3d from '../../../assets/images/hero_3d_workspace_1791369131544.jpg';
import certCrestImg from '../../../assets/images/visual_3d_certificate_crest_1791369163747.jpg';

const IMAGE_PRESETS = [
  { label: 'Full Stack 3D', url: fullstackImg.src },
  { label: 'UI/UX Design 3D', url: uiuxImg.src },
  { label: 'Data & AI 3D', url: dataAiImg.src },
  { label: 'Workspace 3D', url: hero3d.src },
  { label: 'Diploma Crest 3D', url: certCrestImg.src },
];

export default function AdminCoursesPage() {
  const { courses, addCourse, updateCourse, deleteCourse } = useSiteData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [copiedSlugId, setCopiedSlugId] = useState<string | null>(null);
  const [userCustomizedSlug, setUserCustomizedSlug] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState<
    'general' | 'placements' | 'tools' | 'scope' | 'training' | 'reviews'
  >('general');
  const [newToolInput, setNewToolInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State for Create / Edit
  const [formCourse, setFormCourse] = useState<Partial<Course>>({
    title: '',
    slug: '',
    subtitle: '',
    shortDescription: '',
    fullDescription: '',
    category: 'Development',
    level: 'Beginner',
    courseType: 'Self-Paced',
    language: 'English',
    brochureUrl: '',
    price: 199,
    originalPrice: 299,
    duration: '8 Weeks',
    totalHours: 40,
    imageUrl: '',
    instructor: {
      name: 'Senior Mentor',
      role: 'Staff Architect',
      companyContext: 'Industry Practice Leader',
      initials: 'SM',
      bio: 'Industry staff engineer and curriculum architect.',
      experienceYears: 12,
      studentsTaught: '5,000+',
    },
    rating: 4.9,
    studentsCount: 1200,
    projectsCount: 4,
    whatYouWillLearn: ['Applied Skills', 'Production Architecture'],
    curriculum: [],
    placements: [],
    toolsCovered: [],
    futureScope: { title: '', stats: [] },
    certificateInfo: { title: '', shareableText: '', highlights: [], certificateType: 'ADVANCE CERTIFICATION' },
    programFeatures: [],
  });

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-_]/g, '')
      .replace(/-+/g, '-');
  };

  const openCreateModal = () => {
    setFormCourse({
      id: `course-${Date.now()}`,
      title: '',
      slug: '',
      subtitle: '',
      shortDescription: '',
      fullDescription: '',
      category: 'Development',
      level: 'Beginner',
      courseType: 'Self-Paced',
      language: 'English',
      brochureUrl: '',
      price: 199,
      originalPrice: 299,
      duration: '8 Weeks',
      totalHours: 40,
      imageUrl: fullstackImg.src,
      instructor: {
        name: 'Senior Lead',
        role: 'Principal Engineer',
        companyContext: 'Engineering Fellow',
        initials: 'SL',
        bio: 'Over 12 years building cloud and web systems.',
        experienceYears: 10,
        studentsTaught: '3,200+',
      },
      rating: 4.9,
      studentsCount: 850,
      projectsCount: 4,
      whatYouWillLearn: ['Applied Skills', 'System Design'],
      curriculum: [
        {
          id: 'm1',
          number: '01',
          title: 'Module 01: Core Architecture & Setup',
          summary: 'Foundational mental models and environment setup.',
          duration: '6h 30m',
          lessons: [
            { id: 'l1', title: 'Introduction & Mental Models', duration: '45m', type: 'video' },
            { id: 'l2', title: 'Development Toolchain', duration: '60m', type: 'reading' },
            { id: 'l3', title: 'First Milestone Build', duration: '90m', type: 'project' },
          ],
        },
      ],
      placements: [
        { id: `p-${Date.now()}-1`, name: 'Rahul Sharma', role: 'Full Stack Engineer', company: 'Google', package: '40 LAKHS' },
        { id: `p-${Date.now()}-2`, name: 'Priya Patel', role: 'Frontend Engineer', company: 'Amazon', package: '25 LAKHS' },
        { id: `p-${Date.now()}-3`, name: 'Amit Singh', role: 'Software Engineer', company: 'Microsoft', package: '18.5 LAKHS' },
        { id: `p-${Date.now()}-4`, name: 'Neha Gupta', role: 'Cloud Platform Engineer', company: 'Meta', package: '45 LAKHS' },
      ],
      toolsCovered: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      futureScope: {
        title: '',
        stats: [
          { value: '50,000+', label: 'Active Job Openings' },
          { value: '1,20,000+', label: 'New Roles by 2027' },
          { value: '32% YoY', label: 'Industry Market Growth' },
          { value: 'Top 3', label: 'Most In-Demand Skills' },
        ],
      },
      certificateInfo: {
        title: '',
        shareableText: 'Shareable on LinkedIn, Twitter & More',
        certificateType: 'ADVANCE CERTIFICATION',
        highlights: [
          'The certification validates your skills and serves as a powerful testament to your industry readiness.',
          'Upon completion, present the verified credential to potential employers to fast-track hiring.',
        ],
      },
      programFeatures: [
        'Hours of Practical Training',
        '100% Placement & Interview Support',
        'ISO 9001:2015 Certified Academy',
        'Industry Recognized Certificate',
      ],
      trainingOffered: {
        overview: '',
        highlights: [],
        features: [],
        batches: [],
        deliverables: [],
      },
      reviews: [],
    });
    setUserCustomizedSlug(false);
    setModalActiveTab('general');
    setIsCreating(true);
    setEditingCourse(null);
  };

  const openEditModal = (c: Course) => {
    setFormCourse({
      ...c,
      courseType: c.courseType || 'Self-Paced',
      language: c.language || 'English',
      brochureUrl: c.brochureUrl || '',
      placements: c.placements && c.placements.length > 0
        ? JSON.parse(JSON.stringify(c.placements))
        : [
            { id: `p-${Date.now()}-1`, name: 'Rahul Sharma', role: 'Technical Lead', company: 'Google', package: '40 LAKHS' },
            { id: `p-${Date.now()}-2`, name: 'Priya Patel', role: 'Engineer', company: 'Amazon', package: '25 LAKHS' },
            { id: `p-${Date.now()}-3`, name: 'Amit Singh', role: 'Product Specialist', company: 'Microsoft', package: '18.5 LAKHS' },
            { id: `p-${Date.now()}-4`, name: 'Neha Gupta', role: 'Systems Engineer', company: 'Meta', package: '45 LAKHS' },
          ],
      toolsCovered: c.toolsCovered && c.toolsCovered.length > 0
        ? JSON.parse(JSON.stringify(c.toolsCovered))
        : ['TypeScript', 'React & Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
      futureScope: c.futureScope ? JSON.parse(JSON.stringify(c.futureScope)) : {
        title: '',
        stats: [
          { value: '50,000+', label: 'Active Job Openings' },
          { value: '1,20,000+', label: 'New Roles by 2027' },
          { value: '32% YoY', label: 'Industry Market Growth' },
          { value: 'Top 3', label: 'Most In-Demand Skills' },
        ],
      },
      certificateInfo: c.certificateInfo ? JSON.parse(JSON.stringify(c.certificateInfo)) : {
        title: '',
        shareableText: 'Shareable on LinkedIn, Twitter & More',
        certificateType: 'ADVANCE CERTIFICATION',
        highlights: [
          'The certification validates your skills and serves as a powerful testament to your industry readiness.',
          'Upon completion, present the verified credential to potential employers to fast-track hiring.',
        ],
      },
      programFeatures: c.programFeatures && c.programFeatures.length > 0 ? [...c.programFeatures] : [
        `${c.totalHours || 40} Hours of Practical Training`,
        '100% Placement & Interview Support',
        'ISO 9001:2015 Certified Academy',
        'Industry Recognized Certificate',
      ],
      trainingOffered: c.trainingOffered
        ? JSON.parse(JSON.stringify(c.trainingOffered))
        : {
            overview: '',
            highlights: [],
            features: [],
            batches: [],
            deliverables: [],
          },
      reviews: c.reviews ? JSON.parse(JSON.stringify(c.reviews)) : [],
    });
    setModalActiveTab('general');
    setUserCustomizedSlug(true);
    setEditingCourse(c);
    setIsCreating(false);
  };

  // --- Dynamic Placements Handlers ---
  const handleAddPlacement = () => {
    setFormCourse((prev) => ({
      ...prev,
      placements: [
        ...(prev.placements || []),
        {
          id: `p-${Date.now()}`,
          name: '',
          role: '',
          company: '',
          package: '',
          avatarUrl: '',
        },
      ],
    }));
  };

  const handleRemovePlacement = (idx: number) => {
    setFormCourse((prev) => ({
      ...prev,
      placements: (prev.placements || []).filter((_, i) => i !== idx),
    }));
  };

  const handlePlacementChange = (idx: number, field: keyof PlacementItem, val: string) => {
    setFormCourse((prev) => {
      const updated = [...(prev.placements || [])];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, placements: updated };
    });
  };

  const handleLoadSamplePlacements = () => {
    const samples: PlacementItem[] = [
      { id: `p-${Date.now()}-1`, name: 'Rahul Sharma', role: 'Full Stack Engineer', company: 'Google', package: '40 LAKHS' },
      { id: `p-${Date.now()}-2`, name: 'Priya Patel', role: 'Frontend Engineer', company: 'Amazon', package: '25 LAKHS' },
      { id: `p-${Date.now()}-3`, name: 'Amit Singh', role: 'Product Designer', company: 'Microsoft', package: '18.5 LAKHS' },
      { id: `p-${Date.now()}-4`, name: 'Neha Gupta', role: 'Cloud Platform Engineer', company: 'Meta', package: '45 LAKHS' },
    ];
    setFormCourse((prev) => ({ ...prev, placements: samples }));
  };

  // --- Dynamic Tools Handlers ---
  const handleAddTool = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setFormCourse((prev) => {
      const current = prev.toolsCovered || [];
      const exists = current.some((t) => (typeof t === 'string' ? t.toLowerCase() === trimmed.toLowerCase() : t.name.toLowerCase() === trimmed.toLowerCase()));
      if (exists) return prev;
      return { ...prev, toolsCovered: [...current, trimmed] };
    });
    setNewToolInput('');
  };

  const handleRemoveTool = (idx: number) => {
    setFormCourse((prev) => ({
      ...prev,
      toolsCovered: (prev.toolsCovered || []).filter((_, i) => i !== idx),
    }));
  };

  const handleLoadCategoryTools = (cat?: string) => {
    const category = cat || formCourse.category || 'Development';
    let defaults: string[] = ['TypeScript', 'React & Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'Git'];
    if (category === 'Design') {
      defaults = ['Figma', 'FigJam', 'Adobe XD', 'Protopie', 'Miro', 'Spline 3D'];
    } else if (category === 'Data & AI') {
      defaults = ['Python', 'SQL', 'PowerBI', 'PyTorch', 'Excel', 'Pandas', 'Scikit-Learn'];
    } else if (category === 'Marketing') {
      defaults = ['Google Analytics', 'SEMrush', 'Meta Ads', 'Canva', 'HubSpot', 'Ahrefs'];
    }
    setFormCourse((prev) => ({ ...prev, toolsCovered: defaults }));
  };

  // --- Dynamic Future Scope & Certificate Handlers ---
  const handleFutureScopeTitleChange = (val: string) => {
    setFormCourse((prev) => ({
      ...prev,
      futureScope: {
        ...(prev.futureScope || {}),
        title: val,
      },
    }));
  };

  const handleFutureScopeStatChange = (idx: number, field: 'value' | 'label', val: string) => {
    setFormCourse((prev) => {
      const defaultStats = [
        { value: '50,000+', label: 'Active Job Openings' },
        { value: '1,20,000+', label: 'New Roles by 2027' },
        { value: '32% YoY', label: 'Industry Market Growth' },
        { value: 'Top 3', label: 'Most In-Demand Skills' },
      ];
      const stats = prev.futureScope?.stats && prev.futureScope.stats.length === 4
        ? [...prev.futureScope.stats]
        : defaultStats;
      stats[idx] = { ...stats[idx], [field]: val };
      return {
        ...prev,
        futureScope: {
          ...(prev.futureScope || {}),
          stats,
        },
      };
    });
  };

  const handleCertificateTitleChange = (val: string) => {
    setFormCourse((prev) => ({
      ...prev,
      certificateInfo: {
        ...(prev.certificateInfo || {}),
        title: val,
      },
    }));
  };

  const handleCertificateBadgeChange = (val: string) => {
    setFormCourse((prev) => ({
      ...prev,
      certificateInfo: {
        ...(prev.certificateInfo || {}),
        shareableText: val,
      },
    }));
  };

  const handleCertificateTypeChange = (val: string) => {
    setFormCourse((prev) => ({
      ...prev,
      certificateInfo: {
        ...(prev.certificateInfo || {}),
        certificateType: val,
      },
    }));
  };

  const handleAddCertificateHighlight = () => {
    setFormCourse((prev) => {
      const current = prev.certificateInfo?.highlights || [];
      return {
        ...prev,
        certificateInfo: {
          ...(prev.certificateInfo || {}),
          highlights: [...current, 'New certificate recognition highlight'],
        },
      };
    });
  };

  const handleRemoveCertificateHighlight = (idx: number) => {
    setFormCourse((prev) => {
      const current = (prev.certificateInfo?.highlights || []).filter((_, i) => i !== idx);
      return {
        ...prev,
        certificateInfo: {
          ...(prev.certificateInfo || {}),
          highlights: current,
        },
      };
    });
  };

  const handleCertificateHighlightChange = (idx: number, val: string) => {
    setFormCourse((prev) => {
      const current = [...(prev.certificateInfo?.highlights || [])];
      current[idx] = val;
      return {
        ...prev,
        certificateInfo: {
          ...(prev.certificateInfo || {}),
          highlights: current,
        },
      };
    });
  };

  // --- Dynamic Program Features (Sticky Sidebar) Handlers ---
  const handleAddProgramFeature = () => {
    setFormCourse((prev) => ({
      ...prev,
      programFeatures: [...(prev.programFeatures || []), 'New program highlight / guarantee'],
    }));
  };

  const handleRemoveProgramFeature = (idx: number) => {
    setFormCourse((prev) => ({
      ...prev,
      programFeatures: (prev.programFeatures || []).filter((_, i) => i !== idx),
    }));
  };

  const handleProgramFeatureChange = (idx: number, val: string) => {
    setFormCourse((prev) => {
      const updated = [...(prev.programFeatures || [])];
      updated[idx] = val;
      return { ...prev, programFeatures: updated };
    });
  };

  // Training Overview handler
  const handleTrainingOverviewChange = (val: string) => {
    setFormCourse((prev) => ({
      ...prev,
      trainingOffered: {
        ...(prev.trainingOffered || {}),
        overview: val,
      },
    }));
  };

  // Highlights handlers
  const handleAddHighlight = () => {
    setFormCourse((prev) => {
      const current = prev.trainingOffered?.highlights || [];
      return {
        ...prev,
        trainingOffered: {
          ...(prev.trainingOffered || {}),
          highlights: [...current, 'New training highlight / benefit'],
        },
      };
    });
  };

  const handleHighlightChange = (index: number, val: string) => {
    setFormCourse((prev) => {
      const current = [...(prev.trainingOffered?.highlights || [])];
      current[index] = val;
      return {
        ...prev,
        trainingOffered: {
          ...(prev.trainingOffered || {}),
          highlights: current,
        },
      };
    });
  };

  const handleRemoveHighlight = (index: number) => {
    setFormCourse((prev) => {
      const current = (prev.trainingOffered?.highlights || []).filter((_, idx) => idx !== index);
      return {
        ...prev,
        trainingOffered: {
          ...(prev.trainingOffered || {}),
          highlights: current,
        },
      };
    });
  };

  // Feature Cards handlers
  const handleAddFeature = () => {
    setFormCourse((prev) => {
      const current = prev.trainingOffered?.features || [];
      const newFeat: TrainingFeature = {
        id: `feat-${Date.now()}`,
        title: 'New Training Mode / Feature',
        description: 'Provide details about how this training is delivered.',
        badge: 'Interactive',
      };
      return {
        ...prev,
        trainingOffered: {
          ...(prev.trainingOffered || {}),
          features: [...current, newFeat],
        },
      };
    });
  };

  const handleFeatureChange = (index: number, field: keyof TrainingFeature, val: string) => {
    setFormCourse((prev) => {
      const current = [...(prev.trainingOffered?.features || [])];
      current[index] = { ...current[index], [field]: val };
      return {
        ...prev,
        trainingOffered: {
          ...(prev.trainingOffered || {}),
          features: current,
        },
      };
    });
  };

  const handleRemoveFeature = (index: number) => {
    setFormCourse((prev) => {
      const current = (prev.trainingOffered?.features || []).filter((_, idx) => idx !== index);
      return {
        ...prev,
        trainingOffered: {
          ...(prev.trainingOffered || {}),
          features: current,
        },
      };
    });
  };

  // Batches handlers
  const handleAddBatch = () => {
    setFormCourse((prev) => {
      const current = prev.trainingOffered?.batches || [];
      const newBatch: TrainingBatch = {
        id: `batch-${Date.now()}`,
        batchType: 'New Batch Option',
        days: 'Mon – Thu',
        timing: '7:30 PM – 9:30 PM IST',
        mode: 'Live Online',
        seatsStatus: 'Admissions Open',
      };
      return {
        ...prev,
        trainingOffered: {
          ...(prev.trainingOffered || {}),
          batches: [...current, newBatch],
        },
      };
    });
  };

  const handleBatchChange = (index: number, field: keyof TrainingBatch, val: string) => {
    setFormCourse((prev) => {
      const current = [...(prev.trainingOffered?.batches || [])];
      current[index] = { ...current[index], [field]: val };
      return {
        ...prev,
        trainingOffered: {
          ...(prev.trainingOffered || {}),
          batches: current,
        },
      };
    });
  };

  const handleRemoveBatch = (index: number) => {
    setFormCourse((prev) => {
      const current = (prev.trainingOffered?.batches || []).filter((_, idx) => idx !== index);
      return {
        ...prev,
        trainingOffered: {
          ...(prev.trainingOffered || {}),
          batches: current,
        },
      };
    });
  };

  // Deliverables handlers
  const handleAddDeliverable = () => {
    setFormCourse((prev) => {
      const current = prev.trainingOffered?.deliverables || [];
      return {
        ...prev,
        trainingOffered: {
          ...(prev.trainingOffered || {}),
          deliverables: [...current, 'New deliverable / outcome'],
        },
      };
    });
  };

  const handleDeliverableChange = (index: number, val: string) => {
    setFormCourse((prev) => {
      const current = [...(prev.trainingOffered?.deliverables || [])];
      current[index] = val;
      return {
        ...prev,
        trainingOffered: {
          ...(prev.trainingOffered || {}),
          deliverables: current,
        },
      };
    });
  };

  const handleRemoveDeliverable = (index: number) => {
    setFormCourse((prev) => {
      const current = (prev.trainingOffered?.deliverables || []).filter((_, idx) => idx !== index);
      return {
        ...prev,
        trainingOffered: {
          ...(prev.trainingOffered || {}),
          deliverables: current,
        },
      };
    });
  };

  // Reviews handlers
  const handleAddReview = () => {
    setFormCourse((prev) => {
      const current = prev.reviews || [];
      const newRev: CourseReview = {
        id: `rev-${Date.now()}`,
        studentName: 'New Student',
        studentInitials: 'NS',
        role: 'Placed Engineer',
        rating: 5,
        date: 'October 2026',
        comment: 'Great training program with practical projects and helpful mentors.',
        outcomeMetric: 'Placed at Top Tech',
      };
      return {
        ...prev,
        reviews: [newRev, ...current],
        reviewsCount: (prev.reviewsCount || current.length) + 1,
      };
    });
  };

  const handleReviewChange = (index: number, field: keyof CourseReview, val: any) => {
    setFormCourse((prev) => {
      const current = [...(prev.reviews || [])];
      current[index] = { ...current[index], [field]: val };
      if (field === 'studentName') {
        const initials = String(val)
          .trim()
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
        current[index].studentInitials = initials || 'ST';
      }
      return {
        ...prev,
        reviews: current,
      };
    });
  };

  const handleRemoveReview = (index: number) => {
    setFormCourse((prev) => {
      const current = (prev.reviews || []).filter((_, idx) => idx !== index);
      return {
        ...prev,
        reviews: current,
        reviewsCount: Math.max(0, (prev.reviewsCount || current.length + 1) - 1),
      };
    });
  };

  const handleTitleChange = (val: string) => {
    if (!userCustomizedSlug && isCreating) {
      setFormCourse((prev) => ({
        ...prev,
        title: val,
        slug: slugify(val),
      }));
    } else {
      setFormCourse((prev) => ({ ...prev, title: val }));
    }
  };

  const handleSlugChange = (val: string) => {
    setUserCustomizedSlug(true);
    // Convert spaces to hyphens on the fly for URL safety
    const formatted = val
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-_]/g, '');
    setFormCourse((prev) => ({ ...prev, slug: formatted }));
  };

  const handleGenerateSlugFromTitle = () => {
    if (formCourse.title) {
      const generated = slugify(formCourse.title);
      setFormCourse((prev) => ({ ...prev, slug: generated }));
      setUserCustomizedSlug(true);
    }
  };

  const handleCopyCourseUrl = (slug: string, id: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const fullUrl = `${origin}/courses/${slug}`;
    navigator.clipboard?.writeText(fullUrl).catch(() => {});
    setCopiedSlugId(id);
    setTimeout(() => setCopiedSlugId(null), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormCourse((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCourse.title || !formCourse.title.trim()) {
      alert('Course title is required');
      return;
    }

    // Exact slug set by admin or generated from title
    const finalSlug = formCourse.slug?.trim()
      ? slugify(formCourse.slug)
      : slugify(formCourse.title);

    const coursePayload: Course = {
      ...(formCourse as Course),
      id: editingCourse ? editingCourse.id : `course-${Date.now()}`,
      slug: finalSlug,
      price: Number(formCourse.price) || 199,
      originalPrice: Number(formCourse.originalPrice) || 299,
      totalHours: Number(formCourse.totalHours) || 30,
      studentsCount: Number(formCourse.studentsCount) || 500,
      rating: Number(formCourse.rating) || 4.8,
      projectsCount: Number(formCourse.projectsCount) || 4,
      discountPercent: Math.round(
        (((Number(formCourse.originalPrice) || 299) - (Number(formCourse.price) || 199)) /
          (Number(formCourse.originalPrice) || 299)) *
          100
      ),
      visualAccent: formCourse.visualAccent || 'blue',
      reviews: formCourse.reviews || [],
      faqs: formCourse.faqs || [],
      prerequisites: formCourse.prerequisites || ['Basic computer literacy'],
      featured: formCourse.featured ?? true,
      updatedAt: 'October 2026',
    };

    if (editingCourse) {
      updateCourse(editingCourse.id, coursePayload);
    } else {
      addCourse(coursePayload);
    }

    setIsCreating(false);
    setEditingCourse(null);
  };

  const filteredCourses = courses.filter((c) => {
    if (!c) return false;
    const matchesCategory =
      selectedCategory === 'All' || c.category === selectedCategory;
    const title = c.title || '';
    const subtitle = c.subtitle || '';
    const slug = c.slug || '';
    const instructorName = (c.instructor as any)?.name || '';

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/90">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Curriculum & Catalog
            </span>
            <span className="text-slate-400 text-xs font-medium">• Live Sync with /courses</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Course Catalog Management ({courses.length})
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Add new courses, set custom page URLs, edit pricing, upload images, update instructors, and manage public offerings.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-sm shadow-blue-500/25 border border-blue-500/40 transition-all cursor-pointer w-fit"
        >
          <Plus className="h-4 w-4 text-blue-100" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course title, mentor, or URL slug..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['All', 'Development', 'Design', 'Data & AI', 'Marketing', 'Business'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/90 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3.5 px-6">Programme & URL</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Level</th>
                <th className="py-3.5 px-4">Pricing</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Instructor</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No courses match your query.
                  </td>
                </tr>
              ) : (
                filteredCourses.map((course) => {
                  const isCopied = copiedSlugId === course.id;
                  return (
                    <tr key={course.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="py-4 px-6 max-w-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs overflow-hidden">
                            {course.imageUrl ? (
                              <img src={course.imageUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <GraduationCap className="h-6 w-6" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                              {course.title}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 truncate">
                                /courses/{course.slug}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyCourseUrl(course.slug, course.id)}
                                title="Copy public page URL"
                                className="text-xs text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                              >
                                {isCopied ? (
                                  <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                                    <Check className="w-3 h-3" /> Copied
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-0.5">
                                    <Copy className="w-3 h-3" /> Copy URL
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                          {course.category}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap text-slate-700 font-medium">
                        {course.level}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900">
                          {formatCurrency(course.price)}
                        </div>
                        <div className="text-xs text-slate-400 line-through">
                          {formatCurrency(course.originalPrice)}
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap text-slate-500 text-xs">
                        {course.duration} ({course.totalHours}h)
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap text-slate-700 font-medium">
                        {course.instructor.name}
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`/courses/${course.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View on public site"
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                          <button
                            type="button"
                            onClick={() => openEditModal(course)}
                            title="Edit course & URL"
                            className="p-2 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(course.id)}
                            title="Delete course"
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <h3 className="text-base font-bold text-slate-900">Delete Course?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Are you sure you want to remove this course? Its details page and catalog listing will be deleted immediately.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteCourse(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-xs"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Course Modal */}
      {(isCreating || editingCourse) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono text-blue-600 uppercase font-bold">
                  {isCreating ? 'Catalog Creation' : 'Course Editing'}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  {isCreating ? 'Add New Course' : `Edit: ${editingCourse?.title}`}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingCourse(null);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
              <button
                type="button"
                onClick={() => setModalActiveTab('general')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  modalActiveTab === 'general'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>General & Details</span>
              </button>

              <button
                type="button"
                onClick={() => setModalActiveTab('placements')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  modalActiveTab === 'placements'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Top Placements</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ml-1 font-bold ${
                  modalActiveTab === 'placements' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {formCourse.placements?.length || 0}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setModalActiveTab('tools')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  modalActiveTab === 'tools'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tools Covered</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ml-1 font-bold ${
                  modalActiveTab === 'tools' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {formCourse.toolsCovered?.length || 0}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setModalActiveTab('scope')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  modalActiveTab === 'scope'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Future Scope & Certificate</span>
              </button>

              <button
                type="button"
                onClick={() => setModalActiveTab('training')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  modalActiveTab === 'training'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Training Offered</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ml-1 font-bold ${
                  modalActiveTab === 'training' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {(formCourse.trainingOffered?.batches?.length || 0) + (formCourse.trainingOffered?.highlights?.length || 0)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setModalActiveTab('reviews')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  modalActiveTab === 'reviews'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Star className="w-3.5 h-3.5" />
                <span>Reviews & Ratings</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ml-1 font-bold ${
                  modalActiveTab === 'reviews' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {formCourse.reviews?.length || 0}
                </span>
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-6">
              {/* TAB 1: GENERAL & PRICING */}
              {modalActiveTab === 'general' && (
                <div className="space-y-6">
                  {/* Custom Details Page URL (Slug) Card */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <LinkIcon className="w-4 h-4 text-blue-600" />
                        <span>Custom Details Page URL Slug *</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleGenerateSlugFromTitle}
                        className="text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Auto-generate from Title</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-slate-500 bg-white px-3 py-2.5 rounded-xl border border-slate-200 select-none">
                        /courses/
                      </span>
                      <input
                        type="text"
                        required
                        value={formCourse.slug || ''}
                        onChange={(e) => handleSlugChange(e.target.value)}
                        placeholder="e.g. full-stack-web-development"
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-mono font-bold text-blue-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                      <p>
                        Live Preview:{' '}
                        <span className="font-mono font-bold text-blue-700">
                          /courses/{formCourse.slug || 'custom-url-slug'}
                        </span>
                      </p>
                      <p className="text-slate-500 hidden sm:block">
                        This exact URL will be used for the public course details page.
                      </p>
                    </div>
                  </div>

                  {/* Image Manager Section */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-blue-600" />
                        <span>Course Cover Image</span>
                      </label>
                      <span className="text-xs text-slate-500">Live Preview & Presets</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      {/* Live Thumbnail Preview */}
                      <div className="relative w-36 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        {formCourse.imageUrl ? (
                          <img
                            src={formCourse.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-400 text-xs">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Actions: Upload & Presets */}
                      <div className="flex-1 space-y-2 w-full">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={formCourse.imageUrl || ''}
                            onChange={(e) => setFormCourse({ ...formCourse, imageUrl: e.target.value })}
                            placeholder="Paste image URL (https://...)"
                            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none font-mono"
                          />

                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>

                        {/* Quick 1-Click Presets */}
                        <div>
                          <p className="text-xs text-slate-500 mb-1 font-medium">Or Pick from 3D Asset Presets:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {IMAGE_PRESETS.map((p) => (
                              <button
                                key={p.label}
                                type="button"
                                onClick={() => setFormCourse({ ...formCourse, imageUrl: p.url })}
                                className="px-3 py-1 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                              >
                                {p.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Basic Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formCourse.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Full Stack Web Development"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Subtitle / High-Concept Hook
                      </label>
                      <input
                        type="text"
                        value={formCourse.subtitle}
                        onChange={(e) => setFormCourse({ ...formCourse, subtitle: e.target.value })}
                        placeholder="Master React, Node, PostgreSQL and Cloud Deployments"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Categorization & Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={formCourse.category}
                        onChange={(e) =>
                          setFormCourse({ ...formCourse, category: e.target.value as CourseCategory })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer"
                      >
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Data & AI">Data & AI</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Business">Business</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Level
                      </label>
                      <select
                        value={formCourse.level}
                        onChange={(e) =>
                          setFormCourse({ ...formCourse, level: e.target.value as CourseLevel })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Duration (e.g. 10 Weeks)
                      </label>
                      <input
                        type="text"
                        value={formCourse.duration}
                        onChange={(e) => setFormCourse({ ...formCourse, duration: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Pricing & Hours */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        value={formCourse.price}
                        onChange={(e) => setFormCourse({ ...formCourse, price: Number(e.target.value) })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Original Price (₹)
                      </label>
                      <input
                        type="number"
                        value={formCourse.originalPrice}
                        onChange={(e) =>
                          setFormCourse({ ...formCourse, originalPrice: Number(e.target.value) })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Total Hours
                      </label>
                      <input
                        type="number"
                        value={formCourse.totalHours}
                        onChange={(e) =>
                          setFormCourse({ ...formCourse, totalHours: Number(e.target.value) })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Short Overview Description
                    </label>
                    <textarea
                      rows={2}
                      value={formCourse.shortDescription}
                      onChange={(e) => setFormCourse({ ...formCourse, shortDescription: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Instructor Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Instructor Name
                      </label>
                      <input
                        type="text"
                        value={formCourse.instructor?.name}
                        onChange={(e) =>
                          setFormCourse({
                            ...formCourse,
                            instructor: { ...formCourse.instructor!, name: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Instructor Role
                      </label>
                      <input
                        type="text"
                        value={formCourse.instructor?.role}
                        onChange={(e) =>
                          setFormCourse({
                            ...formCourse,
                            instructor: { ...formCourse.instructor!, role: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Delivery Mode, Language & Brochure Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Delivery Mode / Course Type
                      </label>
                      <select
                        value={formCourse.courseType || 'Self-Paced'}
                        onChange={(e) => setFormCourse({ ...formCourse, courseType: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer"
                      >
                        <option value="Self-Paced">Self-Paced (Pre-recorded + Mentor support)</option>
                        <option value="Live Interactive">Live Interactive (Online Batches)</option>
                        <option value="Hybrid">Hybrid (Online + Classroom Labs)</option>
                        <option value="Bootcamp">Full-Time Intensive Bootcamp</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Primary Language
                      </label>
                      <input
                        type="text"
                        value={formCourse.language || 'English'}
                        onChange={(e) => setFormCourse({ ...formCourse, language: e.target.value })}
                        placeholder="e.g. English / Hindi & English"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Brochure PDF / External URL
                      </label>
                      <input
                        type="text"
                        value={formCourse.brochureUrl || ''}
                        onChange={(e) => setFormCourse({ ...formCourse, brochureUrl: e.target.value })}
                        placeholder="https://... or WhatsApp"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Program Features (Sidebar Checklist) */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          <span>Sidebar Program Features Checklist</span>
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Bullet points shown in the right-hand sticky sidebar above the Enroll button.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddProgramFeature}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Item</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {formCourse.programFeatures?.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) => handleProgramFeatureChange(idx, e.target.value)}
                            placeholder="e.g. 100% Placement Assistance"
                            className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveProgramFeature(idx)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PLACEMENTS MANAGER */}
              {modalActiveTab === 'placements' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span>Top Placements & Alumni Hiring</span>
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Configure alumni displayed in the &quot;Our Students Placed In Top Companies&quot; section on the public course page.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleLoadSamplePlacements}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
                      >
                        Load Samples
                      </button>
                      <button
                        type="button"
                        onClick={handleAddPlacement}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Placement</span>
                      </button>
                    </div>
                  </div>

                  {(!formCourse.placements || formCourse.placements.length === 0) ? (
                    <div className="text-center py-10 border border-dashed border-slate-200 rounded-2xl p-6 space-y-3">
                      <Award className="w-10 h-10 text-slate-300 mx-auto" />
                      <p className="text-xs text-slate-500 font-medium">No placements added yet for this course.</p>
                      <button
                        type="button"
                        onClick={handleLoadSamplePlacements}
                        className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 cursor-pointer"
                      >
                        Populate Sample Placements
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formCourse.placements.map((p, idx) => (
                        <div key={p.id || idx} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3 relative hover:border-blue-200 transition-all">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                              Placement #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemovePlacement(idx)}
                              className="text-slate-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                              title="Remove placement"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                Student Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={p.name}
                                onChange={(e) => handlePlacementChange(idx, 'name', e.target.value)}
                                placeholder="e.g. Rahul Sharma"
                                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                Hiring Company *
                              </label>
                              <input
                                type="text"
                                required
                                value={p.company}
                                onChange={(e) => handlePlacementChange(idx, 'company', e.target.value)}
                                placeholder="e.g. Google / Microsoft"
                                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                Role / Job Title *
                              </label>
                              <input
                                type="text"
                                required
                                value={p.role}
                                onChange={(e) => handlePlacementChange(idx, 'role', e.target.value)}
                                placeholder="e.g. Software Engineer"
                                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                CTC Package *
                              </label>
                              <input
                                type="text"
                                required
                                value={p.package}
                                onChange={(e) => handlePlacementChange(idx, 'package', e.target.value)}
                                placeholder="e.g. 40 LAKHS / 18 LPA"
                                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-extrabold text-blue-700 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">
                              Avatar Image URL (Optional)
                            </label>
                            <input
                              type="text"
                              value={p.avatarUrl || ''}
                              onChange={(e) => handlePlacementChange(idx, 'avatarUrl', e.target.value)}
                              placeholder="https://... or leave blank for initials"
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: TOOLS COVERED MANAGER */}
              {modalActiveTab === 'tools' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span>Tools & Technologies Covered</span>
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Tools showcased on the public course details page with stylized badges and icons.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleLoadCategoryTools()}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
                    >
                      Load Preset for {formCourse.category}
                    </button>
                  </div>

                  {/* Add Tool Input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newToolInput}
                      onChange={(e) => setNewToolInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTool(newToolInput);
                        }
                      }}
                      placeholder="Enter tool name (e.g. React, PostgreSQL, Docker, Figma) and press Enter..."
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTool(newToolInput)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Tool</span>
                    </button>
                  </div>

                  {/* Tools List & Chips */}
                  <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Active Tools ({formCourse.toolsCovered?.length || 0})
                    </h5>
                    {(!formCourse.toolsCovered || formCourse.toolsCovered.length === 0) ? (
                      <p className="text-xs text-slate-400 italic py-4 text-center">
                        No tools added yet. Type a tool name above or click &quot;Load Preset&quot;.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2.5 pt-1">
                        {formCourse.toolsCovered.map((tool, idx) => {
                          const toolName = typeof tool === 'string' ? tool : tool.name;
                          return (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs"
                            >
                              <span>{toolName}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveTool(idx)}
                                className="text-slate-400 hover:text-red-600 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: FUTURE SCOPE & CERTIFICATE MANAGER */}
              {modalActiveTab === 'scope' && (
                <div className="space-y-6">
                  {/* Future Scope Section */}
                  <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-blue-600" />
                        <span>Future Scope & Career Stats Banner</span>
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Custom title and 4 dynamic metric cards displayed in the dark blue full-width banner.
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Section Title (leave blank to auto-use course title)
                      </label>
                      <input
                        type="text"
                        value={formCourse.futureScope?.title || ''}
                        onChange={(e) => handleFutureScopeTitleChange(e.target.value)}
                        placeholder={`e.g. Future Scope in ${formCourse.title || 'this Domain'}`}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 block">
                        4 Career Metric Cards
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[0, 1, 2, 3].map((idx) => {
                          const stat = (formCourse.futureScope?.stats && formCourse.futureScope.stats[idx]) || {
                            value: idx === 0 ? '50,000+' : idx === 1 ? '1,20,000+' : idx === 2 ? '32% YoY' : 'Top 3',
                            label: idx === 0 ? 'Active Job Openings' : idx === 1 ? 'New Roles by 2027' : idx === 2 ? 'Industry Market Growth' : 'Most In-Demand Skills',
                          };
                          return (
                            <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
                              <div>
                                <span className="text-[10px] font-bold text-blue-600 block mb-1">Stat #{idx + 1} Value</span>
                                <input
                                  type="text"
                                  value={stat.value}
                                  onChange={(e) => handleFutureScopeStatChange(idx, 'value', e.target.value)}
                                  placeholder="e.g. 50,000+"
                                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-900"
                                />
                              </div>
                              <div>
                                <span className="text-[10px] font-bold text-slate-500 block mb-1">Label</span>
                                <input
                                  type="text"
                                  value={stat.label}
                                  onChange={(e) => handleFutureScopeStatChange(idx, 'label', e.target.value)}
                                  placeholder="e.g. Job Openings"
                                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* ISO Certification Section */}
                  <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>ISO Certification Details</span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Custom title, shareable badge, and bullet points on the official certificate section.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Certificate Heading
                        </label>
                        <input
                          type="text"
                          value={formCourse.certificateInfo?.title || ''}
                          onChange={(e) => handleCertificateTitleChange(e.target.value)}
                          placeholder={`Get (ISO) Certified in ${formCourse.title || 'this Programme'}`}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Shareable Badge Text
                        </label>
                        <input
                          type="text"
                          value={formCourse.certificateInfo?.shareableText || ''}
                          onChange={(e) => handleCertificateBadgeChange(e.target.value)}
                          placeholder="Shareable on LinkedIn, Twitter & More"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700">
                          Certificate Highlights / Key Points
                        </label>
                        <button
                          type="button"
                          onClick={handleAddCertificateHighlight}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Point</span>
                        </button>
                      </div>

                      {formCourse.certificateInfo?.highlights?.map((hl, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={hl}
                            onChange={(e) => handleCertificateHighlightChange(idx, e.target.value)}
                            className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveCertificateHighlight(idx)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: TRAINING OFFERED MANAGER */}
              {modalActiveTab === 'training' && (
                <div className="space-y-6">
                  {/* Training Overview */}
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                    <label className="block text-xs font-bold text-slate-900">
                      Training Overview Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={formCourse.trainingOffered?.overview || ''}
                      onChange={(e) => handleTrainingOverviewChange(e.target.value)}
                      placeholder="Comprehensive training summary shown at the top of Training Offered tab..."
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Core Highlights List */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          <span>Core Training Highlights & Badges</span>
                        </h4>
                        <p className="text-xs text-slate-500">Key bullet points showcased on the course details page.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddHighlight}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Highlight</span>
                      </button>
                    </div>

                    <div className="space-y-2 pt-2">
                      {(!formCourse.trainingOffered?.highlights || formCourse.trainingOffered.highlights.length === 0) && (
                        <p className="text-xs text-slate-400 italic py-2 border border-dashed border-slate-200 rounded-xl p-3 text-center">
                          No highlights added yet. Click "+ Add Highlight" above to add.
                        </p>
                      )}
                      {formCourse.trainingOffered?.highlights?.map((hl, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={hl}
                            onChange={(e) => handleHighlightChange(idx, e.target.value)}
                            placeholder="e.g. 100% Placement Assistance & Interview Prep"
                            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveHighlight(idx)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Modes & Feature Cards */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <Laptop className="w-4 h-4 text-indigo-600" />
                          <span>Training Delivery Modes & Features</span>
                        </h4>
                        <p className="text-xs text-slate-500">Feature cards (Live online, Mentorship, Capstone, Placement cell).</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddFeature}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Feature Card</span>
                      </button>
                    </div>

                    <div className="space-y-3 pt-2">
                      {(!formCourse.trainingOffered?.features || formCourse.trainingOffered.features.length === 0) && (
                        <p className="text-xs text-slate-400 italic py-2 border border-dashed border-slate-200 rounded-xl p-3 text-center">
                          No delivery features added yet. Click "+ Add Feature Card" above to add.
                        </p>
                      )}
                      {formCourse.trainingOffered?.features?.map((feat, idx) => (
                        <div key={feat.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={feat.title}
                              onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                              placeholder="Feature Title (e.g. Live Classroom)"
                              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-900"
                            />
                            <input
                              type="text"
                              value={feat.badge || ''}
                              onChange={(e) => handleFeatureChange(idx, 'badge', e.target.value)}
                              placeholder="Badge (e.g. Interactive)"
                              className="w-32 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-indigo-600"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(idx)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={feat.description}
                            onChange={(e) => handleFeatureChange(idx, 'description', e.target.value)}
                            placeholder="Feature description explaining how students benefit..."
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Batch Schedules */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>Training Batches & Schedules</span>
                        </h4>
                        <p className="text-xs text-slate-500">Weekday, weekend, or cohort batches with timing and seat availability.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddBatch}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Batch</span>
                      </button>
                    </div>

                    <div className="space-y-3 pt-2">
                      {(!formCourse.trainingOffered?.batches || formCourse.trainingOffered.batches.length === 0) && (
                        <p className="text-xs text-slate-400 italic py-2 border border-dashed border-slate-200 rounded-xl p-3 text-center">
                          No batch schedules added yet. Click "+ Add Batch" above to add.
                        </p>
                      )}
                      {formCourse.trainingOffered?.batches?.map((batch, idx) => (
                        <div key={batch.id || idx} className="p-4 rounded-xl border border-blue-200/80 bg-blue-50/20 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={batch.batchType}
                              onChange={(e) => handleBatchChange(idx, 'batchType', e.target.value)}
                              placeholder="Batch Name (e.g. Regular Weekday Batch)"
                              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-900"
                            />
                            <input
                              type="text"
                              value={batch.seatsStatus}
                              onChange={(e) => handleBatchChange(idx, 'seatsStatus', e.target.value)}
                              placeholder="Status (e.g. Filling Fast)"
                              className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-emerald-700"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveBatch(idx)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input
                              type="text"
                              value={batch.days}
                              onChange={(e) => handleBatchChange(idx, 'days', e.target.value)}
                              placeholder="Days (e.g. Mon – Thu)"
                              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700"
                            />
                            <input
                              type="text"
                              value={batch.timing}
                              onChange={(e) => handleBatchChange(idx, 'timing', e.target.value)}
                              placeholder="Timing (e.g. 7:30 PM – 9:30 PM)"
                              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700"
                            />
                            <input
                              type="text"
                              value={batch.mode}
                              onChange={(e) => handleBatchChange(idx, 'mode', e.target.value)}
                              placeholder="Mode (e.g. Live Online)"
                              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables / What You Receive */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-amber-500" />
                          <span>Training Deliverables & Certificates</span>
                        </h4>
                        <p className="text-xs text-slate-500">List of credentials, certificates, repositories, or assets awarded upon completion.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddDeliverable}
                        className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Deliverable</span>
                      </button>
                    </div>

                    <div className="space-y-2 pt-2">
                      {(!formCourse.trainingOffered?.deliverables || formCourse.trainingOffered.deliverables.length === 0) && (
                        <p className="text-xs text-slate-400 italic py-2 border border-dashed border-slate-200 rounded-xl p-3 text-center">
                          No deliverables added yet. Click "+ Add Deliverable" above to add.
                        </p>
                      )}
                      {formCourse.trainingOffered?.deliverables?.map((del, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={del}
                            onChange={(e) => handleDeliverableChange(idx, e.target.value)}
                            placeholder="e.g. ISO 9001:2015 Verified Certificate of Completion"
                            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveDeliverable(idx)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: REVIEWS & RATINGS MANAGER */}
              {modalActiveTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span>Student Reviews & Alumni Feedback ({formCourse.reviews?.length || 0})</span>
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Manage testimonials that appear under the "Reviews & Rating" tab on the course page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddReview}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Student Review</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formCourse.reviews && formCourse.reviews.length > 0 ? (
                      formCourse.reviews.map((rev, idx) => (
                        <div
                          key={rev.id || idx}
                          className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3"
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                              Review #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveReview(idx)}
                              className="text-slate-400 hover:text-red-600 text-xs font-bold flex items-center gap-1 p-1 hover:bg-red-50 rounded transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete Review</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                Student Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={rev.studentName}
                                onChange={(e) => handleReviewChange(idx, 'studentName', e.target.value)}
                                placeholder="Student Full Name"
                                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                Role / Placed Company
                              </label>
                              <input
                                type="text"
                                value={rev.role}
                                onChange={(e) => handleReviewChange(idx, 'role', e.target.value)}
                                placeholder="e.g. Software Engineer at Infosys"
                                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                Star Rating (1 – 5)
                              </label>
                              <select
                                value={rev.rating || 5}
                                onChange={(e) => handleReviewChange(idx, 'rating', Number(e.target.value))}
                                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-amber-600 bg-white focus:outline-none cursor-pointer"
                              >
                                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                                <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                                <option value={3}>⭐⭐⭐ (3 Stars)</option>
                                <option value={2}>⭐⭐ (2 Stars)</option>
                                <option value={1}>⭐ (1 Star)</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                Career Outcome / Placement Badge
                              </label>
                              <input
                                type="text"
                                value={rev.outcomeMetric || ''}
                                onChange={(e) => handleReviewChange(idx, 'outcomeMetric', e.target.value)}
                                placeholder="e.g. Placed with 120% hike"
                                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-emerald-700 font-semibold focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                Date / Month
                              </label>
                              <input
                                type="text"
                                value={rev.date || ''}
                                onChange={(e) => handleReviewChange(idx, 'date', e.target.value)}
                                placeholder="e.g. September 2026"
                                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">
                              Review Feedback Comment *
                            </label>
                            <textarea
                              rows={2}
                              required
                              value={rev.comment}
                              onChange={(e) => handleReviewChange(idx, 'comment', e.target.value)}
                              placeholder="Student review text..."
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none leading-relaxed"
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 border border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs">
                        No reviews yet. Click "Add Student Review" above to add alumni feedback.
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingCourse(null);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-sm shadow-blue-500/25 border border-blue-500/40 transition-all cursor-pointer"
                >
                  {isCreating ? 'Publish Course with Custom URL' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
