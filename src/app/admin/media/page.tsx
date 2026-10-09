"use client";
import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Copy,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  Eye,
  Sparkles,
  Layers,
  Download
} from 'lucide-react';
import Image from 'next/image';

// System built-in assets
import hero3d from '../../../assets/images/hero_3d_workspace_1791369131544.jpg';
import fullstackImg from '../../../assets/images/course_fullstack_dev_1791367137460.jpg';
import uiuxImg from '../../../assets/images/course_uiux_design_1791367148988.jpg';
import dataAiImg from '../../../assets/images/course_data_ai_1791367159844.jpg';
import blogEditorialImg from '../../../assets/images/blog_featured_editorial_1791367171346.jpg';
import certCrestImg from '../../../assets/images/visual_3d_certificate_crest_1791369163747.jpg';
import learningModulesImg from '../../../assets/images/visual_3d_learning_modules_1791369313405.jpg';

interface MediaAsset {
  id: string;
  title: string;
  category: '3D Visuals' | 'Courses' | 'Blogs' | 'Credentials' | 'Custom';
  url: string;
  staticSrc?: any;
  description: string;
  dimensions: string;
  isCustom?: boolean;
}

const INITIAL_SYSTEM_ASSETS: MediaAsset[] = [
  {
    id: 'hero-3d',
    title: 'Hero 3D Workspace Hub',
    category: '3D Visuals',
    url: hero3d.src,
    staticSrc: hero3d,
    description: 'Elevated dark glassmorphic workstation with ambient neon lighting and dev tools.',
    dimensions: '1920 x 1080',
  },
  {
    id: 'course-fs',
    title: 'Full Stack Engineering Visual',
    category: 'Courses',
    url: fullstackImg.src,
    staticSrc: fullstackImg,
    description: '3D code editor blocks, API pipelines, and interactive reactive architecture.',
    dimensions: '1600 x 900',
  },
  {
    id: 'course-ui',
    title: 'UI/UX Design Systems Visual',
    category: 'Courses',
    url: uiuxImg.src,
    staticSrc: uiuxImg,
    description: 'Vector curves, typography tokens, glass components, and modern Figma wireframes.',
    dimensions: '1600 x 900',
  },
  {
    id: 'course-ai',
    title: 'Data & AI Engineering Matrix',
    category: 'Courses',
    url: dataAiImg.src,
    staticSrc: dataAiImg,
    description: 'Neural networks, tensor flow visuals, and real-time streaming analytics.',
    dimensions: '1600 x 900',
  },
  {
    id: 'blog-editorial',
    title: 'Editorial Article Cover Art',
    category: 'Blogs',
    url: blogEditorialImg.src,
    staticSrc: blogEditorialImg,
    description: 'Minimalist tech journalism cover with high-contrast architectural typography.',
    dimensions: '1600 x 900',
  },
  {
    id: 'cert-crest',
    title: 'Accredited Certificate Crest',
    category: 'Credentials',
    url: certCrestImg.src,
    staticSrc: certCrestImg,
    description: 'Isometric metallic emblem with cryptographic verification badge and laurel.',
    dimensions: '1200 x 1200',
  },
  {
    id: 'learning-modules',
    title: 'Interactive Learning Architecture',
    category: '3D Visuals',
    url: learningModulesImg.src,
    staticSrc: learningModulesImg,
    description: 'Stacked 3D course syllabus tiers showcasing learner progression pathways.',
    dimensions: '1600 x 900',
  },
];

const STORAGE_KEY = 'appic_media_library_v1';

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>(INITIAL_SYSTEM_ASSETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);

  // New Custom Media Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAssetForm, setNewAssetForm] = useState({
    title: '',
    category: 'Custom' as MediaAsset['category'],
    url: '',
    description: '',
    dimensions: 'Web Optimized',
  });

  // Load custom assets on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const customItems: MediaAsset[] = JSON.parse(stored);
        setAssets([...INITIAL_SYSTEM_ASSETS, ...customItems]);
      }
    } catch (e) {}
  }, []);

  const saveCustomAssets = (allAssets: MediaAsset[]) => {
    const customOnly = allAssets.filter((a) => a.isCustom);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
    } catch (e) {}
  };

  const handleCopyUrl = (asset: MediaAsset) => {
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleAddCustomAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetForm.url.trim() || !newAssetForm.title.trim()) return;

    const newAsset: MediaAsset = {
      id: `custom-${Date.now()}`,
      title: newAssetForm.title,
      category: newAssetForm.category,
      url: newAssetForm.url,
      description: newAssetForm.description || 'Custom uploaded/external asset.',
      dimensions: newAssetForm.dimensions || 'Custom Aspect',
      isCustom: true,
    };

    const updated = [newAsset, ...assets];
    setAssets(updated);
    saveCustomAssets(updated);
    setIsAddModalOpen(false);
    setNewAssetForm({
      title: '',
      category: 'Custom',
      url: '',
      description: '',
      dimensions: 'Web Optimized',
    });
  };

  const handleDeleteAsset = (id: string) => {
    const updated = assets.filter((a) => a.id !== id);
    setAssets(updated);
    saveCustomAssets(updated);
  };

  const categories = ['All', '3D Visuals', 'Courses', 'Blogs', 'Credentials', 'Custom'];

  const filteredAssets = assets.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || a.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-200">
              Media & Creative Assets
            </span>
            <span className="text-slate-400 text-xs font-medium">• 1-Click Copy for Course & Blog Covers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Media & Visual Asset Library
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse high-resolution 3D renders, course covers, and editorial artwork. Copy URLs to paste into any editor.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-950 to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow-emerald-900/20 border border-emerald-800 flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-emerald-300" />
          Add Image URL to Library
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Media Assets</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{assets.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">3D Renderings</span>
          <p className="text-2xl font-black text-blue-600 mt-1">
            {assets.filter((a) => a.category === '3D Visuals').length}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Course & Blog Covers</span>
          <p className="text-2xl font-black text-purple-600 mt-1">
            {assets.filter((a) => a.category === 'Courses' || a.category === 'Blogs').length}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Custom Uploads</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {assets.filter((a) => a.isCustom).length}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search assets by title, usage, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => {
          const isCopied = copiedId === asset.id;
          return (
            <div
              key={asset.id}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all duration-200 group flex flex-col shadow-xs"
            >
              {/* Image Preview Container */}
              <div
                className="relative aspect-video w-full bg-slate-100 overflow-hidden cursor-pointer"
                onClick={() => setPreviewAsset(asset)}
              >
                {asset.staticSrc ? (
                  <Image
                    src={asset.staticSrc}
                    alt={asset.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <img
                    src={asset.url}
                    alt={asset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="text-xs text-white font-mono bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs font-semibold">
                    {asset.dimensions}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewAsset(asset);
                    }}
                    className="p-1.5 rounded-lg bg-white/30 text-white hover:bg-white/50 backdrop-blur-xs cursor-pointer"
                    title="Inspect Full Size"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 border border-slate-200 shadow-xs backdrop-blur-xs">
                    {asset.category}
                  </span>
                </div>
              </div>

              {/* Info & Copy Actions */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {asset.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {asset.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopyUrl(asset)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 shadow-2xs'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied URL!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Image URL</span>
                      </>
                    )}
                  </button>

                  {asset.isCustom && (
                    <button
                      onClick={() => handleDeleteAsset(asset.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors"
                      title="Remove from custom list"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-Screen Preview Lightbox */}
      {previewAsset && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPreviewAsset(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl space-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full bg-slate-950">
              {previewAsset.staticSrc ? (
                <Image
                  src={previewAsset.staticSrc}
                  alt={previewAsset.title}
                  fill
                  className="object-contain"
                />
              ) : (
                <img
                  src={previewAsset.url}
                  alt={previewAsset.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-t border-slate-100">
              <div>
                <span className="text-xs uppercase font-bold text-slate-700 tracking-wider">
                  {previewAsset.category} • {previewAsset.dimensions}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">{previewAsset.title}</h2>
                <p className="text-sm text-slate-500 mt-1 max-w-xl">{previewAsset.description}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleCopyUrl(previewAsset)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-950 to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:shadow-emerald-900/20 border border-emerald-800 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-emerald-300" />
                  {copiedId === previewAsset.id ? 'Copied!' : 'Copy URL'}
                </button>
                <button
                  onClick={() => setPreviewAsset(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Media URL Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-lg font-bold text-slate-900">Add Image URL to Library</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomAsset} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Asset Title / Label
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud Infrastructure Architecture"
                  value={newAssetForm.title}
                  onChange={(e) => setNewAssetForm({ ...newAssetForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Image Direct URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/... or CDN link"
                  value={newAssetForm.url}
                  onChange={(e) => setNewAssetForm({ ...newAssetForm, url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Category Tag
                  </label>
                  <select
                    value={newAssetForm.category}
                    onChange={(e) =>
                      setNewAssetForm({
                        ...newAssetForm,
                        category: e.target.value as MediaAsset['category'],
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Courses">Courses</option>
                    <option value="Blogs">Blogs</option>
                    <option value="3D Visuals">3D Visuals</option>
                    <option value="Credentials">Credentials</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Dimensions (approx)
                  </label>
                  <input
                    type="text"
                    placeholder="1600 x 900"
                    value={newAssetForm.dimensions}
                    onChange={(e) =>
                      setNewAssetForm({ ...newAssetForm, dimensions: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Description / Context (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Where is this asset intended to be displayed..."
                  value={newAssetForm.description}
                  onChange={(e) =>
                    setNewAssetForm({ ...newAssetForm, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Save to Media Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
