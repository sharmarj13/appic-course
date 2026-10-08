"use client";
import React, { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  FileText,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ExternalLink,
  Save,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { useSiteData, LegalSection } from '../../../context/SiteDataContext';
import Link from 'next/link';

export default function AdminLegalPage() {
  const { legal, updateLegal } = useSiteData();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');
  const [savedNotice, setSavedNotice] = useState(false);

  // Local draft states
  const [privacyData, setPrivacyData] = useState(legal.privacy);
  const [termsData, setTermsData] = useState(legal.terms);

  // Modal State for adding/editing a section
  const [editingSection, setEditingSection] = useState<LegalSection | null>(null);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [sectionForm, setSectionForm] = useState<LegalSection>({
    id: '',
    number: '',
    title: '',
    paragraphs: [''],
    bullets: [],
  });

  // Keep in sync if legal updates from context
  React.useEffect(() => {
    setPrivacyData(legal.privacy);
    setTermsData(legal.terms);
  }, [legal]);

  const currentData = activeTab === 'privacy' ? privacyData : termsData;

  const handleSaveAll = () => {
    if (activeTab === 'privacy') {
      updateLegal('privacy', privacyData);
    } else {
      updateLegal('terms', termsData);
    }
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleLastUpdatedChange = (val: string) => {
    if (activeTab === 'privacy') {
      setPrivacyData({ ...privacyData, lastUpdated: val });
    } else {
      setTermsData({ ...termsData, lastUpdated: val });
    }
  };

  const openNewSectionModal = () => {
    const nextNum = (currentData.sections.length + 1).toString().padStart(2, '0');
    setEditingSection(null);
    setSectionForm({
      id: `${activeTab}-${Date.now()}`,
      number: nextNum,
      title: '',
      paragraphs: [''],
      bullets: [],
    });
    setIsSectionModalOpen(true);
  };

  const openEditSectionModal = (sec: LegalSection) => {
    setEditingSection(sec);
    setSectionForm({
      id: sec.id,
      number: sec.number,
      title: sec.title,
      paragraphs: [...sec.paragraphs],
      bullets: sec.bullets ? [...sec.bullets] : [],
    });
    setIsSectionModalOpen(true);
  };

  const handleSaveSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionForm.title.trim()) return;

    const sections = [...currentData.sections];
    if (editingSection) {
      const idx = sections.findIndex((s) => s.id === editingSection.id);
      if (idx !== -1) {
        sections[idx] = sectionForm;
      }
    } else {
      sections.push(sectionForm);
    }

    if (activeTab === 'privacy') {
      const updated = { ...privacyData, sections };
      setPrivacyData(updated);
      updateLegal('privacy', updated);
    } else {
      const updated = { ...termsData, sections };
      setTermsData(updated);
      updateLegal('terms', updated);
    }

    setIsSectionModalOpen(false);
  };

  const handleDeleteSection = (id: string) => {
    const sections = currentData.sections.filter((s) => s.id !== id);
    if (activeTab === 'privacy') {
      const updated = { ...privacyData, sections };
      setPrivacyData(updated);
      updateLegal('privacy', updated);
    } else {
      const updated = { ...termsData, sections };
      setTermsData(updated);
      updateLegal('terms', updated);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-3xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
              Compliance & Legal
            </span>
            <span className="text-slate-400 text-xs">• Live Sync</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Legal & Policy Documents
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Edit and customize Privacy Policy and Terms of Service clauses, dates, and compliance highlights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={activeTab === 'privacy' ? '/privacy' : '/terms'}
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View {activeTab === 'privacy' ? 'Privacy' : 'Terms'} Live
          </Link>

          <button
            onClick={handleSaveAll}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {savedNotice ? 'Saved!' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'privacy'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-transparent'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy Policy</span>
          <span className="ml-1 text-3xs px-2 py-0.5 rounded-full bg-white/20">
            {privacyData.sections.length} clauses
          </span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'terms'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-transparent'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms of Service</span>
          <span className="ml-1 text-3xs px-2 py-0.5 rounded-full bg-white/20">
            {termsData.sections.length} clauses
          </span>
        </button>
      </div>

      {/* Document Meta Settings */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-900 block">
              Last Updated & Effective Date
            </label>
            <p className="text-3xs text-slate-500">
              Shown to users at the top of the {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms'} page
            </p>
          </div>
        </div>

        <div className="sm:w-64">
          <input
            type="text"
            value={currentData.lastUpdated}
            onChange={(e) => handleLastUpdatedChange(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 font-mono"
            placeholder="e.g. October 8, 2026"
          />
        </div>
      </div>

      {/* Sections Manager */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Clauses & Policy Sections</span>
            <span className="text-xs font-normal text-slate-400">
              ({currentData.sections.length} total)
            </span>
          </h2>
          <button
            onClick={openNewSectionModal}
            className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Clause Section
          </button>
        </div>

        <div className="space-y-3">
          {currentData.sections.map((section, idx) => (
            <div
              key={section.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-200 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 group shadow-xs hover:shadow-sm"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-3xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    Section {section.number || (idx + 1).toString().padStart(2, '0')}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    {section.title}
                  </h3>
                </div>

                <div className="space-y-1.5 pt-1">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-xs text-slate-600 leading-relaxed">
                      {p}
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-500 pl-2 pt-1">
                      {section.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-start shrink-0">
                <button
                  onClick={() => openEditSectionModal(section)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSection(section.id)}
                  className="p-1.5 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 transition-colors"
                  title="Delete Section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Section Modal */}
      {isSectionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                {editingSection ? 'Edit Legal Clause' : 'Add New Legal Clause'}
              </h2>
              <button
                onClick={() => setIsSectionModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSection} className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="01"
                    value={sectionForm.number}
                    onChange={(e) => setSectionForm({ ...sectionForm, number: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Information We Collect"
                    value={sectionForm.title}
                    onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Section Body Content (Paragraph)
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter the comprehensive legal explanation here..."
                  value={sectionForm.paragraphs[0] || ''}
                  onChange={(e) =>
                    setSectionForm({
                      ...sectionForm,
                      paragraphs: [e.target.value],
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Optional Bullet Points (one per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter bullet points, one on each line..."
                  value={(sectionForm.bullets || []).join('\n')}
                  onChange={(e) =>
                    setSectionForm({
                      ...sectionForm,
                      bullets: e.target.value
                        .split('\n')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSectionModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Save Clause
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
