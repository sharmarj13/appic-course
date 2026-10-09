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
  Copy
} from 'lucide-react';
import { useSiteData } from '../../../context/SiteDataContext';
import { Course, CourseCategory, CourseLevel } from '../../../types/course';
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
    });
    setUserCustomizedSlug(false);
    setIsCreating(true);
    setEditingCourse(null);
  };

  const openEditModal = (c: Course) => {
    setFormCourse({ ...c });
    setUserCustomizedSlug(true);
    setEditingCourse(c);
    setIsCreating(false);
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
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-950 to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-emerald-900/20 border border-emerald-800 transition-all cursor-pointer w-fit"
        >
          <Plus className="h-4 w-4 text-emerald-300" />
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
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl space-y-6">
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

            <form onSubmit={handleSaveForm} className="space-y-6">
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
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-950 to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow-emerald-900/20 border border-emerald-800 transition-all cursor-pointer"
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
