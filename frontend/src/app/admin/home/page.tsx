"use client";
import React, { useState } from 'react';
import {
  Save,
  Check,
  Sparkles,
  Layers,
  Award,
  Compass,
  MessageSquare,
  HelpCircle,
  Eye,
  ExternalLink,
  Plus,
  Trash2,
  Star,
  Building2,
  Upload,
  Video,
  BookOpen,
  Users,
  Calendar,
  ArrowRight
} from 'lucide-react';
import {
  useSiteData,
  HomeContent,
  HomeTestimonial,
  HomeFeature,
  HomeStage,
  HomePillar
} from '../../../context/SiteDataContext';
import Link from 'next/link';

type TabType =
  | 'hero'
  | 'featuredCourses'
  | 'why'
  | 'journey'
  | 'reviews'
  | 'workshops'
  | 'community'
  | 'blogPreview'
  | 'finalCta';

export default function AdminHomePageEditor() {
  const { home, updateHome } = useSiteData();
  const [formData, setFormData] = useState<HomeContent>(home);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('reviews');

  // Keep in sync if site data changes
  React.useEffect(() => {
    setFormData(home);
  }, [home]);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateHome(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Helper for adding testimonial
  const handleAddTestimonial = () => {
    const newTestimonial: HomeTestimonial = {
      id: `t-${Date.now()}`,
      name: 'New Student',
      role: 'Full Stack Engineer',
      company: 'Tech Company',
      quote: 'The practical curriculum and mentor reviews completely elevated my professional skills.',
      initials: 'NS',
      rating: 5,
      videoUrl: 'https://cdn.iraskills.ai/wp-content/uploads/2025/01/4.mp4',
      videoThumbnail: '',
    };
    setFormData((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        testimonials: [newTestimonial, ...(prev.reviews?.testimonials || [])],
      },
    }));
  };

  // Helper for deleting testimonial
  const handleDeleteTestimonial = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        testimonials: (prev.reviews?.testimonials || []).filter((t) => t.id !== id),
      },
    }));
  };

  // Helper for video upload via FileReader
  const handleVideoUpload = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Use URL.createObjectURL or FileReader
    const objectUrl = URL.createObjectURL(file);
    const updated = [...(formData.reviews?.testimonials || [])];
    updated[idx] = { ...updated[idx], videoUrl: objectUrl };
    setFormData((prev) => ({
      ...prev,
      reviews: { ...prev.reviews, testimonials: updated },
    }));
  };

  // Helper for thumbnail upload via FileReader
  const handleThumbnailUpload = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const updated = [...(formData.reviews?.testimonials || [])];
      updated[idx] = { ...updated[idx], videoThumbnail: dataUrl };
      setFormData((prev) => ({
        ...prev,
        reviews: { ...prev.reviews, testimonials: updated },
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/90">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Content Architecture Engine
            </span>
            <span className="text-slate-400 text-xs font-medium">• Real-Time Site Synchronization</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Home Page Content & Sections Editor
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Every heading, testimonial, video URL, review stat, workshop, and card is 100% dynamic and manageable here.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs sm:text-sm font-semibold hover:bg-emerald-50/60 hover:text-emerald-950 hover:border-emerald-200 transition-colors shadow-xs"
          >
            <ExternalLink className="h-4 w-4 text-emerald-700" />
            <span>Preview Live Site</span>
          </Link>

          <button
            type="button"
            onClick={() => handleSave()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-950 to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-emerald-900/20 border border-emerald-800 transition-all cursor-pointer"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4 text-emerald-300" />
                <span>Changes Saved!</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Section Tabs (Classic Segmented Control with Emerald Accents) */}
      <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/90 shadow-2xs">
        {[
          { id: 'hero', label: '1. Hero Header' },
          { id: 'featuredCourses', label: '2. Featured Catalog' },
          { id: 'why', label: '3. Why Appic (6 Cards)' },
          { id: 'journey', label: '4. Learning Journey' },
          { id: 'reviews', label: '5. Testimonials & Videos' },
          { id: 'workshops', label: '6. Live Workshops' },
          { id: 'community', label: '7. Community Network' },
          { id: 'blogPreview', label: '8. Blog & Editorial' },
          { id: 'finalCta', label: '9. Conversion Banner' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-emerald-950 to-emerald-900 text-white shadow-xs border border-emerald-800/80'
                : 'text-slate-600 hover:text-emerald-950 hover:bg-white/90'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* ========================================================================= */}
        {/* TAB 1: HERO SECTION */}
        {/* ========================================================================= */}
        {activeTab === 'hero' && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Hero Header Configuration</span>
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Top Pill Badge
                </label>
                <input
                  type="text"
                  value={formData.hero.badge}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, badge: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  CTA Button Link
                </label>
                <input
                  type="text"
                  value={formData.hero.ctaLink}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, ctaLink: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Title Line 1 (Dark Text)
                </label>
                <input
                  type="text"
                  value={formData.hero.titleLine1}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, titleLine1: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Title Gradient Line 2 (Colored Text)
                </label>
                <input
                  type="text"
                  value={formData.hero.titleGradient}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, titleGradient: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Hero Subtitle / Description
              </label>
              <textarea
                rows={3}
                value={formData.hero.subtitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, subtitle: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Primary CTA Button Text
              </label>
              <input
                type="text"
                value={formData.hero.ctaText}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, ctaText: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: FEATURED COURSES SECTION HEADINGS */}
        {/* ========================================================================= */}
        {activeTab === 'featuredCourses' && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Featured Courses Section Heading</span>
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Eyebrow Badge
                </label>
                <input
                  type="text"
                  value={formData.featuredCourses?.eyebrow || 'Featured Programmes'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featuredCourses: {
                        ...(formData.featuredCourses || {
                          eyebrow: '',
                          title: '',
                          titleItalic: '',
                          description: '',
                        }),
                        eyebrow: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Main Title Part 1
                </label>
                <input
                  type="text"
                  value={formData.featuredCourses?.title || 'Learn skills that move your'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featuredCourses: {
                        ...(formData.featuredCourses || {
                          eyebrow: '',
                          title: '',
                          titleItalic: '',
                          description: '',
                        }),
                        title: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Main Title Part 2 (Italic Slate Accent)
              </label>
              <input
                type="text"
                value={formData.featuredCourses?.titleItalic || 'career forward.'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    featuredCourses: {
                      ...(formData.featuredCourses || {
                        eyebrow: '',
                        title: '',
                        titleItalic: '',
                        description: '',
                      }),
                      titleItalic: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Section Description
              </label>
              <textarea
                rows={2}
                value={
                  formData.featuredCourses?.description ||
                  'Choose practical, industry-focused programmes designed by senior practitioners. Build real portfolio systems and receive structured mentor feedback.'
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    featuredCourses: {
                      ...(formData.featuredCourses || {
                        eyebrow: '',
                        title: '',
                        titleItalic: '',
                        description: '',
                      }),
                      description: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: WHY APPIC SKILL (FEATURES) */}
        {/* ========================================================================= */}
        {activeTab === 'why' && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Why Appic Skill (6 Feature Cards)</span>
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Eyebrow Badge
                </label>
                <input
                  type="text"
                  value={formData.whyAppic.eyebrow}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whyAppic: { ...formData.whyAppic, eyebrow: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={formData.whyAppic.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whyAppic: { ...formData.whyAppic, title: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Section Overview Description
              </label>
              <textarea
                rows={2}
                value={formData.whyAppic.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    whyAppic: { ...formData.whyAppic, description: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Individual Feature Cards (6 Items)
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {formData.whyAppic.features.map((feature, idx) => (
                  <div
                    key={feature.id}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3"
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Feature {idx + 1} Title
                      </label>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => {
                          const updated = [...formData.whyAppic.features];
                          updated[idx].title = e.target.value;
                          setFormData({
                            ...formData,
                            whyAppic: { ...formData.whyAppic, features: updated },
                          });
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={feature.description}
                        onChange={(e) => {
                          const updated = [...formData.whyAppic.features];
                          updated[idx].description = e.target.value;
                          setFormData({
                            ...formData,
                            whyAppic: { ...formData.whyAppic, features: updated },
                          });
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-700 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: LEARNING JOURNEY */}
        {/* ========================================================================= */}
        {activeTab === 'journey' && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Learning Journey Stages (4 Progression Steps)</span>
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={formData.journey.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      journey: { ...formData.journey, title: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Section Description
                </label>
                <input
                  type="text"
                  value={formData.journey.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      journey: { ...formData.journey, description: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              {formData.journey.stages.map((stage, idx) => (
                <div
                  key={stage.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 space-y-3"
                >
                  <span className="text-xs font-bold text-blue-600">
                    Stage {stage.number} Configuration
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={stage.title}
                        onChange={(e) => {
                          const updated = [...formData.journey.stages];
                          updated[idx].title = e.target.value;
                          setFormData({
                            ...formData,
                            journey: { ...formData.journey, stages: updated },
                          });
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Deliverable Badge
                      </label>
                      <input
                        type="text"
                        value={stage.deliverable}
                        onChange={(e) => {
                          const updated = [...formData.journey.stages];
                          updated[idx].deliverable = e.target.value;
                          setFormData({
                            ...formData,
                            journey: { ...formData.journey, stages: updated },
                          });
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={stage.description}
                      onChange={(e) => {
                        const updated = [...formData.journey.stages];
                        updated[idx].description = e.target.value;
                        setFormData({
                          ...formData,
                          journey: { ...formData.journey, stages: updated },
                        });
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: TESTIMONIALS & VIDEO STORIES (USER PRIMARY FOCUS) */}
        {/* ========================================================================= */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            
            {/* 1. SECTION HEADERS & LABELS */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-blue-600" />
                  <span>Testimonials & Video Section Titles</span>
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  Dynamic Text
                </span>
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Eyebrow Pill Badge
                  </label>
                  <input
                    type="text"
                    value={formData.reviews?.eyebrow || 'Success Stories'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviews: { ...formData.reviews, eyebrow: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Heading Line 1
                  </label>
                  <input
                    type="text"
                    value={formData.reviews?.title || 'Hear from our'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviews: { ...formData.reviews, title: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Heading Gradient Line 2
                  </label>
                  <input
                    type="text"
                    value={formData.reviews?.titleGradient || 'driven learners.'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviews: { ...formData.reviews, titleGradient: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Section Description
                </label>
                <textarea
                  rows={2}
                  value={
                    formData.reviews?.description ||
                    'At Appic Skill, we focus on practical outcomes. Discover how our self-paced modules and expert reviews have transformed careers.'
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reviews: { ...formData.reviews, description: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Video Player Section Headline
                  </label>
                  <input
                    type="text"
                    value={formData.reviews?.videoSectionTitle || 'Watch their journey'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviews: { ...formData.reviews, videoSectionTitle: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Stats Banner Headline
                  </label>
                  <input
                    type="text"
                    value={formData.reviews?.statsTitle || 'The numbers speak for themselves.'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviews: { ...formData.reviews, statsTitle: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. DYNAMIC TESTIMONIALS & VIDEO UPLOADS */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>Learner Video Testimonials Catalog</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload or paste MP4 video URLs, custom poster thumbnails, student names, roles, and review quotes.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddTestimonial}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Testimonial</span>
                </button>
              </div>

              {/* List of Testimonials */}
              <div className="space-y-6">
                {(formData.reviews?.testimonials || []).map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6 space-y-5 transition-all hover:border-slate-300"
                  >
                    {/* Header bar of the card */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                          {item.initials || item.name?.substring(0, 2).toUpperCase() || 'ST'}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-900">{item.name}</span>
                          <span className="text-xs text-slate-500 ml-2 font-medium">
                            • {item.role} {item.company ? `(${item.company})` : ''}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.videoUrl && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                            <Video className="w-3 h-3" />
                            <span>Video Active</span>
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteTestimonial(item.id)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete testimonial"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Form fields grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Student Name
                        </label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const updated = [...(formData.reviews?.testimonials || [])];
                            updated[idx].name = e.target.value;
                            setFormData({
                              ...formData,
                              reviews: { ...formData.reviews, testimonials: updated },
                            });
                          }}
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Job Role / Target Role
                        </label>
                        <input
                          type="text"
                          value={item.role}
                          onChange={(e) => {
                            const updated = [...(formData.reviews?.testimonials || [])];
                            updated[idx].role = e.target.value;
                            setFormData({
                              ...formData,
                              reviews: { ...formData.reviews, testimonials: updated },
                            });
                          }}
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Company / Employer
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Google, TechCorp"
                          value={item.company || ''}
                          onChange={(e) => {
                            const updated = [...(formData.reviews?.testimonials || [])];
                            updated[idx].company = e.target.value;
                            setFormData({
                              ...formData,
                              reviews: { ...formData.reviews, testimonials: updated },
                            });
                          }}
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Initials & Rating
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={3}
                            value={item.initials}
                            onChange={(e) => {
                              const updated = [...(formData.reviews?.testimonials || [])];
                              updated[idx].initials = e.target.value.toUpperCase();
                              setFormData({
                                ...formData,
                                reviews: { ...formData.reviews, testimonials: updated },
                              });
                            }}
                            className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-bold text-center text-slate-900 focus:border-blue-500 focus:outline-none"
                          />
                          <select
                            value={item.rating || 5}
                            onChange={(e) => {
                              const updated = [...(formData.reviews?.testimonials || [])];
                              updated[idx].rating = Number(e.target.value);
                              setFormData({
                                ...formData,
                                reviews: { ...formData.reviews, testimonials: updated },
                              });
                            }}
                            className="flex-1 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-bold text-amber-600 focus:border-blue-500 focus:outline-none"
                          >
                            <option value={5}>★★★★★ (5 Stars)</option>
                            <option value={4}>★★★★☆ (4 Stars)</option>
                            <option value={3}>★★★☆☆ (3 Stars)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Testimonial Quote / Review Text
                      </label>
                      <textarea
                        rows={2}
                        value={item.quote}
                        onChange={(e) => {
                          const updated = [...(formData.reviews?.testimonials || [])];
                          updated[idx].quote = e.target.value;
                          setFormData({
                            ...formData,
                            reviews: { ...formData.reviews, testimonials: updated },
                          });
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-800 leading-relaxed focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* VIDEO URL & UPLOAD CONTROLS */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-3 border-t border-slate-200/70">
                      
                      {/* Video Source Control */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Video URL (MP4 / WebM / CDN Video Link)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="https://.../video.mp4"
                            value={item.videoUrl || ''}
                            onChange={(e) => {
                              const updated = [...(formData.reviews?.testimonials || [])];
                              updated[idx].videoUrl = e.target.value;
                              setFormData({
                                ...formData,
                                reviews: { ...formData.reviews, testimonials: updated },
                              });
                            }}
                            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-slate-900 focus:border-blue-500 focus:outline-none"
                          />

                          <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Video</span>
                            <input
                              type="file"
                              accept="video/mp4,video/webm,video/*"
                              className="hidden"
                              onChange={(e) => handleVideoUpload(idx, e)}
                            />
                          </label>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Supports direct MP4 links, AWS S3/Cloudflare CDN, or uploading local video files.
                        </p>
                      </div>

                      {/* Thumbnail Poster Image Control */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Video Poster / Thumbnail Image URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="https://.../thumbnail.jpg"
                            value={item.videoThumbnail || ''}
                            onChange={(e) => {
                              const updated = [...(formData.reviews?.testimonials || [])];
                              updated[idx].videoThumbnail = e.target.value;
                              setFormData({
                                ...formData,
                                reviews: { ...formData.reviews, testimonials: updated },
                              });
                            }}
                            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-slate-900 focus:border-blue-500 focus:outline-none"
                          />

                          <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Poster</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleThumbnailUpload(idx, e)}
                            />
                          </label>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Custom thumbnail preview image displayed prior to hitting play.
                        </p>
                      </div>

                    </div>

                    {/* Mini live video / poster preview if URL exists */}
                    {item.videoUrl && (
                      <div className="pt-2">
                        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 p-2 max-w-sm">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1">
                            <Video className="w-3 h-3 text-emerald-400" />
                            <span>Live Video Preview</span>
                          </p>
                          <video
                            src={item.videoUrl}
                            controls
                            className="w-full aspect-video rounded-lg object-cover bg-black"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. SOCIAL PROOF & TRUST NUMBERS STATS */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Global Social Proof & Trust Counters</span>
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Rating Score (e.g. 4.8)
                  </label>
                  <input
                    type="text"
                    value={formData.reviews.ratingScore}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviews: { ...formData.reviews, ratingScore: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Rating Source Text
                  </label>
                  <input
                    type="text"
                    value={formData.reviews.ratingSource}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviews: { ...formData.reviews, ratingSource: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Years of Exp
                  </label>
                  <input
                    type="text"
                    value={formData.reviews.yearsExp}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviews: { ...formData.reviews, yearsExp: e.target.value },
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Reviews Count
                  </label>
                  <input
                    type="text"
                    value={formData.reviews.reviewsCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviews: { ...formData.reviews, reviewsCount: e.target.value },
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Partners Count
                  </label>
                  <input
                    type="text"
                    value={formData.reviews.partnersCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviews: { ...formData.reviews, partnersCount: e.target.value },
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Students Trained
                  </label>
                  <input
                    type="text"
                    value={formData.reviews.studentsCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviews: { ...formData.reviews, studentsCount: e.target.value },
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: WORKSHOPS BANNER */}
        {/* ========================================================================= */}
        {activeTab === 'workshops' && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Interactive Cohort Workshops Heading</span>
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Eyebrow Badge
                </label>
                <input
                  type="text"
                  value={formData.workshops?.eyebrow || 'Interactive Cohort Clinics'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      workshops: {
                        ...(formData.workshops || {
                          eyebrow: '',
                          title: '',
                          description: '',
                          note: '',
                        }),
                        eyebrow: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={formData.workshops?.title || 'Learn live. Ask questions. Build faster.'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      workshops: {
                        ...(formData.workshops || {
                          eyebrow: '',
                          title: '',
                          description: '',
                          note: '',
                        }),
                        title: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Section Description
              </label>
              <textarea
                rows={2}
                value={
                  formData.workshops?.description ||
                  'Supplement your self-paced modules with live interactive engineering, design, and analytics workshops led by our faculty.'
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workshops: {
                      ...(formData.workshops || {
                        eyebrow: '',
                        title: '',
                        description: '',
                        note: '',
                      }),
                      description: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Right Side Small Note
              </label>
              <input
                type="text"
                value={
                  formData.workshops?.note ||
                  'All live workshops include interactive Q&A, downloadable starter repositories, and session recordings.'
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workshops: {
                      ...(formData.workshops || {
                        eyebrow: '',
                        title: '',
                        description: '',
                        note: '',
                      }),
                      note: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: COMMUNITY NETWORK */}
        {/* ========================================================================= */}
        {activeTab === 'community' && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Community Network & Discussion Section</span>
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Eyebrow Badge
                </label>
                <input
                  type="text"
                  value={formData.community?.eyebrow || 'Peer & Mentor Network'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      community: {
                        ...(formData.community || {
                          eyebrow: '',
                          title: '',
                          description: '',
                          buttonText: '',
                          channelName: '',
                          channelDesc: '',
                          membersOnlineText: '',
                          pillars: [],
                        }),
                        eyebrow: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={formData.community?.title || 'You’re not learning alone.'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      community: {
                        ...(formData.community || {
                          eyebrow: '',
                          title: '',
                          description: '',
                          buttonText: '',
                          channelName: '',
                          channelDesc: '',
                          membersOnlineText: '',
                          pillars: [],
                        }),
                        title: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Overview Description
              </label>
              <textarea
                rows={2}
                value={
                  formData.community?.description ||
                  'Self-paced never means isolated. Connect with 50,000+ learners, practicing mentors, and alumni across our structured discussion channels and weekly review clinics.'
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    community: {
                      ...(formData.community || {
                        eyebrow: '',
                        title: '',
                        description: '',
                        buttonText: '',
                        channelName: '',
                        channelDesc: '',
                        membersOnlineText: '',
                        pillars: [],
                      }),
                      description: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={formData.community?.buttonText || 'Join the Learner Community'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      community: {
                        ...(formData.community || {
                          eyebrow: '',
                          title: '',
                          description: '',
                          buttonText: '',
                          channelName: '',
                          channelDesc: '',
                          membersOnlineText: '',
                          pillars: [],
                        }),
                        buttonText: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mock Channel Name
                </label>
                <input
                  type="text"
                  value={formData.community?.channelName || '#architecture-and-portfolio-review'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      community: {
                        ...(formData.community || {
                          eyebrow: '',
                          title: '',
                          description: '',
                          buttonText: '',
                          channelName: '',
                          channelDesc: '',
                          membersOnlineText: '',
                          pillars: [],
                        }),
                        channelName: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Online Members Badge
                </label>
                <input
                  type="text"
                  value={formData.community?.membersOnlineText || '142 Members Online'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      community: {
                        ...(formData.community || {
                          eyebrow: '',
                          title: '',
                          description: '',
                          buttonText: '',
                          channelName: '',
                          channelDesc: '',
                          membersOnlineText: '',
                          pillars: [],
                        }),
                        membersOnlineText: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Editable Pillars */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Community Benefit Pillars (4 Cards)
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {(formData.community?.pillars || []).map((pillar, idx) => (
                  <div
                    key={pillar.id || idx}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3"
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Pillar {idx + 1} Title
                      </label>
                      <input
                        type="text"
                        value={pillar.title}
                        onChange={(e) => {
                          const updated = [...(formData.community?.pillars || [])];
                          updated[idx].title = e.target.value;
                          setFormData({
                            ...formData,
                            community: {
                              ...(formData.community || {
                                eyebrow: '',
                                title: '',
                                description: '',
                                buttonText: '',
                                channelName: '',
                                channelDesc: '',
                                membersOnlineText: '',
                                pillars: [],
                              }),
                              pillars: updated,
                            },
                          });
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={pillar.text}
                        onChange={(e) => {
                          const updated = [...(formData.community?.pillars || [])];
                          updated[idx].text = e.target.value;
                          setFormData({
                            ...formData,
                            community: {
                              ...(formData.community || {
                                eyebrow: '',
                                title: '',
                                description: '',
                                buttonText: '',
                                channelName: '',
                                channelDesc: '',
                                membersOnlineText: '',
                                pillars: [],
                              }),
                              pillars: updated,
                            },
                          });
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-700 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: BLOG & EDITORIAL SECTION */}
        {/* ========================================================================= */}
        {activeTab === 'blogPreview' && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Editorial & Blog Articles Preview Heading</span>
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Eyebrow Badge
                </label>
                <input
                  type="text"
                  value={formData.blogPreview?.eyebrow || 'Editorial & Career Playbooks'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      blogPreview: {
                        ...(formData.blogPreview || {
                          eyebrow: '',
                          title: '',
                          description: '',
                          buttonText: '',
                        }),
                        eyebrow: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={formData.blogPreview?.title || 'Insights for your next career move'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      blogPreview: {
                        ...(formData.blogPreview || {
                          eyebrow: '',
                          title: '',
                          description: '',
                          buttonText: '',
                        }),
                        title: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Section Description
              </label>
              <textarea
                rows={2}
                value={
                  formData.blogPreview?.description ||
                  'Practical essays, architectural deep-dives, and career guides written by our teaching faculty.'
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    blogPreview: {
                      ...(formData.blogPreview || {
                        eyebrow: '',
                        title: '',
                        description: '',
                        buttonText: '',
                      }),
                      description: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Button Text
              </label>
              <input
                type="text"
                value={formData.blogPreview?.buttonText || 'View All Articles'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    blogPreview: {
                      ...(formData.blogPreview || {
                        eyebrow: '',
                        title: '',
                        description: '',
                        buttonText: '',
                      }),
                      buttonText: e.target.value,
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 9: FINAL CTA */}
        {/* ========================================================================= */}
        {activeTab === 'finalCta' && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Bottom Conversion CTA Banner</span>
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={formData.finalCta.badge}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      finalCta: { ...formData.finalCta, badge: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  CTA Link
                </label>
                <input
                  type="text"
                  value={formData.finalCta.ctaLink}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      finalCta: { ...formData.finalCta, ctaLink: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Main Headline
              </label>
              <input
                type="text"
                value={formData.finalCta.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    finalCta: { ...formData.finalCta, title: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Subtitle Description
              </label>
              <textarea
                rows={2}
                value={formData.finalCta.subtitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    finalCta: { ...formData.finalCta, subtitle: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.finalCta.ctaText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      finalCta: { ...formData.finalCta, ctaText: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Diploma / Credential Badge Text
                </label>
                <input
                  type="text"
                  value={formData.finalCta.diplomaText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      finalCta: { ...formData.finalCta, diplomaText: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button at bottom */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4 text-emerald-200" />
                <span>Saved Successfully!</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save All Home Page Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
