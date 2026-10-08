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
  ExternalLink
} from 'lucide-react';
import { useSiteData, HomeContent } from '../../../context/SiteDataContext';
import Link from 'next/link';

export default function AdminHomePageEditor() {
  const { home, updateHome } = useSiteData();
  const [formData, setFormData] = useState<HomeContent>(home);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'why' | 'journey' | 'reviews' | 'finalCta'>('hero');

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

  return (
    <div className="space-y-8">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              Content Management
            </span>
            <span className="text-slate-400 text-xs">• Live Sync with /</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Home Page Content & Sections Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Customize headings, paragraphs, 6 feature cards, 4 journey stages, reviews stats, and CTA banner.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-xs"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Preview Live</span>
          </Link>

          <button
            type="button"
            onClick={() => handleSave()}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4 text-emerald-200" />
                <span>Changes Saved!</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'hero', label: '1. Hero Section' },
          { id: 'why', label: '2. Why Appic Skill (Features)' },
          { id: 'journey', label: '3. Learning Journey (4 Stages)' },
          { id: 'reviews', label: '4. Ratings & Numbers' },
          { id: 'finalCta', label: '5. Bottom Final CTA' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: HERO SECTION */}
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
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                  Main Headline (Line 1)
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
                  Gradient Headline Accent (Line 2)
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
                Hero Subtitle Description
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
                Primary CTA Button Label
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
                className="w-full sm:w-80 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* TAB 2: WHY APPIC SKILL (FEATURES) */}
        {activeTab === 'why' && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Why Appic Skill Feature Cards</span>
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Section Eyebrow
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
                      <label className="block text-3xs font-bold text-slate-500 uppercase mb-1">
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
                      <label className="block text-3xs font-bold text-slate-500 uppercase mb-1">
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

        {/* TAB 3: LEARNING JOURNEY */}
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
                      <label className="block text-3xs font-bold text-slate-500 uppercase mb-1">
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
                      <label className="block text-3xs font-bold text-slate-500 uppercase mb-1">
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
                    <label className="block text-3xs font-bold text-slate-500 uppercase mb-1">
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

        {/* TAB 4: REVIEWS & NUMBERS */}
        {activeTab === 'reviews' && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Social Proof & Trust Numbers</span>
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
                <label className="block text-3xs font-bold text-slate-500 uppercase mb-1">
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
                <label className="block text-3xs font-bold text-slate-500 uppercase mb-1">
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
                <label className="block text-3xs font-bold text-slate-500 uppercase mb-1">
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
                <label className="block text-3xs font-bold text-slate-500 uppercase mb-1">
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
        )}

        {/* TAB 5: FINAL CTA */}
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
