"use client";
import React, { useState } from 'react';
import {
  LifeBuoy,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  ExternalLink,
  BookOpen,
  Sparkles,
  HelpCircle,
  Tag
} from 'lucide-react';
import { useSiteData, HelpArticle } from '../../../context/SiteDataContext';
import Link from 'next/link';

export default function AdminHelpCenterPage() {
  const { helpArticles, addHelpArticle, updateHelpArticle, deleteHelpArticle } = useSiteData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<HelpArticle | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const categories = [
    'All',
    'Course Access',
    'Billing',
    'Billing & Enterprise',
    'Live Mentorship',
    'Certification',
    'Account & Security'
  ];

  // Form State
  const [formData, setFormData] = useState<Omit<HelpArticle, 'id'>>({
    category: 'Course Access',
    title: '',
    answer: '',
  });

  const openCreateModal = () => {
    setEditingArticle(null);
    setFormData({
      category: 'Course Access',
      title: '',
      answer: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (article: HelpArticle) => {
    setEditingArticle(article);
    setFormData({
      category: article.category,
      title: article.title,
      answer: article.answer,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.answer.trim()) return;

    if (editingArticle) {
      updateHelpArticle(editingArticle.id, formData);
    } else {
      addHelpArticle(formData);
    }
    setIsModalOpen(false);
  };

  const filteredArticles = helpArticles.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-900 border border-emerald-200">
              Knowledge Base
            </span>
            <span className="text-slate-400 text-xs font-medium">• Live Sync with /help</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Help Center Guides & Articles
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage comprehensive guides for LMS portal, billing, mentorship sessions, and credential verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/help"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50/60 hover:text-emerald-950 hover:border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            View Public Page
          </Link>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-950 to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow-emerald-900/20 border border-emerald-800 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-300" />
            New Guide Article
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Articles</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{helpArticles.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Categories</span>
          <p className="text-2xl font-black text-indigo-600 mt-1">
            {new Set(helpArticles.map((a) => a.category)).size}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Course & Mentorship</span>
          <p className="text-2xl font-black text-blue-600 mt-1">
            {helpArticles.filter((a) => a.category.includes('Course') || a.category.includes('Mentorship')).length}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Billing & Certs</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {helpArticles.filter((a) => a.category.includes('Billing') || a.category.includes('Certification')).length}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search help articles, guides, or solutions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-3">
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl shadow-xs">
            <LifeBuoy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">No Help Articles Found</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your search criteria or add a new help guide.
            </p>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div
              key={article.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-200 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 group shadow-xs hover:shadow-sm"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" />
                    {article.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                  {article.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-start shrink-0">
                <button
                  onClick={() => openEditModal(article)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteConfirmId(article.id)}
                  className="p-1.5 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                {editingArticle ? 'Edit Help Article' : 'Create Help Article'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {categories
                    .filter((c) => c !== 'All')
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Article Title / Question
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How do I access GitHub repositories and starter code?"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Detailed Solution / Guide Content
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Provide complete step-by-step guidance..."
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-950 to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow-emerald-900/20 border border-emerald-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4 text-emerald-300" />
                  {editingArticle ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Help Article?</h3>
            <p className="text-xs text-slate-600 mb-6">
              This will remove this guide from the public Help Center immediately.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteHelpArticle(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
