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
  BookOpen,
  Calendar,
  Clock,
  User,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Link as LinkIcon,
  Copy,
  ChevronUp,
  ChevronDown,
  List,
  Table as TableIcon,
  AlignLeft,
  FileText,
  Code
} from 'lucide-react';
import { useSiteData } from '../../../context/SiteDataContext';
import { BlogArticle, BlogCategory, BlogSection, BlogTableData } from '../../../types/blog';

// Presets for 1-click blog cover selection
import blogEditorialImg from '../../../assets/images/blog_featured_editorial_1791367171346.jpg';
import fullstackImg from '../../../assets/images/course_fullstack_dev_1791367137460.jpg';
import uiuxImg from '../../../assets/images/course_uiux_design_1791367148988.jpg';
import dataAiImg from '../../../assets/images/course_data_ai_1791367159844.jpg';
import hero3d from '../../../assets/images/hero_3d_workspace_1791369131544.jpg';

const BLOG_IMAGE_PRESETS = [
  { label: 'Editorial Cover', url: blogEditorialImg.src },
  { label: 'Full Stack 3D', url: fullstackImg.src },
  { label: 'UI/UX Design 3D', url: uiuxImg.src },
  { label: 'Data & AI 3D', url: dataAiImg.src },
  { label: 'Workspace 3D', url: hero3d.src },
];

export default function AdminBlogsPage() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useSiteData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingBlog, setEditingBlog] = useState<BlogArticle | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [copiedSlugId, setCopiedSlugId] = useState<string | null>(null);
  const [userCustomizedSlug, setUserCustomizedSlug] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formBlog, setFormBlog] = useState<Partial<BlogArticle>>({
    title: '',
    slug: '',
    excerpt: '',
    category: 'Technology',
    readingTime: '5 min read',
    publishedAt: 'October 2026',
    imageUrl: blogEditorialImg.src,
    visualTheme: 'blue',
    featured: false,
    author: {
      name: 'Editorial Staff',
      role: 'Senior Technical Lead',
      initials: 'ES',
      bio: 'Staff engineering writer and mentor specializing in production architecture.',
    },
    sections: [
      {
        id: 'sec-1',
        heading: 'Overview & Problem Statement',
        paragraphs: ['Explain the context, key industry developments, and background insights.'],
      },
    ],
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
    setFormBlog({
      id: `blog-${Date.now()}`,
      title: '',
      slug: '',
      excerpt: '',
      category: 'Technology',
      readingTime: '6 min read',
      publishedAt: 'October 2026',
      imageUrl: blogEditorialImg.src,
      visualTheme: 'blue',
      featured: false,
      author: {
        name: 'Technical Editor',
        role: 'Engineering Lead',
        initials: 'TE',
        bio: 'Senior technology writer and practice mentor.',
      },
      sections: [
        {
          id: 'sec-1',
          heading: 'Introduction & Core Concepts',
          paragraphs: ['Write the first section paragraphs here.'],
        },
        {
          id: 'sec-2',
          heading: 'Practical Implementation & Benchmarks',
          paragraphs: ['Add actionable code advice, industry guidelines, and best practices.'],
        },
      ],
    });
    setUserCustomizedSlug(false);
    setIsCreating(true);
    setEditingBlog(null);
  };

  const openEditModal = (b: BlogArticle) => {
    setFormBlog({
      ...b,
      sections: b.sections ? JSON.parse(JSON.stringify(b.sections)) : [
        {
          id: 'sec-1',
          heading: 'Overview',
          paragraphs: [b.excerpt || 'Article body content.'],
          listItems: [],
        }
      ],
    });
    setUserCustomizedSlug(true);
    setEditingBlog(b);
    setIsCreating(false);
  };

  // Section Management Handlers
  const handleAddSection = () => {
    const nextNumber = (formBlog.sections?.length || 0) + 1;
    const newSec: BlogSection = {
      id: `sec-${Date.now()}`,
      heading: `Section ${nextNumber}`,
      paragraphs: ['Write section content here.'],
      listItems: [],
    };
    setFormBlog((prev) => ({
      ...prev,
      sections: [...(prev.sections || []), newSec],
    }));
  };

  const handleRemoveSection = (secIndex: number) => {
    setFormBlog((prev) => ({
      ...prev,
      sections: (prev.sections || []).filter((_, idx) => idx !== secIndex),
    }));
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const secs = [...(formBlog.sections || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= secs.length) return;
    const temp = secs[index];
    secs[index] = secs[targetIndex];
    secs[targetIndex] = temp;
    setFormBlog((prev) => ({ ...prev, sections: secs }));
  };

  const handleSectionHeadingChange = (secIndex: number, val: string) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      secs[secIndex] = { ...secs[secIndex], heading: val };
      return { ...prev, sections: secs };
    });
  };

  const handleParagraphChange = (secIndex: number, pIndex: number, val: string) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      const pars = [...(secs[secIndex].paragraphs || [])];
      pars[pIndex] = val;
      secs[secIndex] = { ...secs[secIndex], paragraphs: pars };
      return { ...prev, sections: secs };
    });
  };

  const handleAddParagraph = (secIndex: number) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      secs[secIndex] = {
        ...secs[secIndex],
        paragraphs: [...(secs[secIndex].paragraphs || []), ''],
      };
      return { ...prev, sections: secs };
    });
  };

  const handleRemoveParagraph = (secIndex: number, pIndex: number) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      const pars = (secs[secIndex].paragraphs || []).filter((_, idx) => idx !== pIndex);
      secs[secIndex] = { ...secs[secIndex], paragraphs: pars.length > 0 ? pars : [''] };
      return { ...prev, sections: secs };
    });
  };

  const handleBulletChange = (secIndex: number, bIndex: number, val: string) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      const items = [...(secs[secIndex].listItems || [])];
      items[bIndex] = val;
      secs[secIndex] = { ...secs[secIndex], listItems: items };
      return { ...prev, sections: secs };
    });
  };

  const handleAddBullet = (secIndex: number) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      secs[secIndex] = {
        ...secs[secIndex],
        listItems: [...(secs[secIndex].listItems || []), ''],
      };
      return { ...prev, sections: secs };
    });
  };

  const handleRemoveBullet = (secIndex: number, bIndex: number) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      const items = (secs[secIndex].listItems || []).filter((_, idx) => idx !== bIndex);
      secs[secIndex] = { ...secs[secIndex], listItems: items };
      return { ...prev, sections: secs };
    });
  };

  const handleSectionImageChange = (
    secIndex: number,
    key: 'imageUrl' | 'imageCaption',
    val: string
  ) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      secs[secIndex] = { ...secs[secIndex], [key]: val };
      return { ...prev, sections: secs };
    });
  };

  const handleSectionFileUpload = (
    secIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSectionImageChange(secIndex, 'imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleTable = (secIndex: number) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      if (secs[secIndex].table) {
        const copy = { ...secs[secIndex] };
        delete copy.table;
        secs[secIndex] = copy;
      } else {
        secs[secIndex] = {
          ...secs[secIndex],
          table: {
            headers: ['Feature / Aspect', 'Details & Implementation', 'Status'],
            rows: [
              ['Core Concept', 'Description of fundamental mechanism', 'Active'],
              ['Optimization', 'Speed and benchmark notes', 'Recommended'],
            ],
          },
        };
      }
      return { ...prev, sections: secs };
    });
  };

  const handleTableHeaderChange = (secIndex: number, hIndex: number, val: string) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      if (!secs[secIndex].table) return prev;
      const headers = [...secs[secIndex].table!.headers];
      headers[hIndex] = val;
      secs[secIndex] = {
        ...secs[secIndex],
        table: { ...secs[secIndex].table!, headers },
      };
      return { ...prev, sections: secs };
    });
  };

  const handleAddTableColumn = (secIndex: number) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      if (!secs[secIndex].table) return prev;
      const headers = [
        ...secs[secIndex].table!.headers,
        `Column ${secs[secIndex].table!.headers.length + 1}`,
      ];
      const rows = secs[secIndex].table!.rows.map((row) => [...row, '']);
      secs[secIndex] = {
        ...secs[secIndex],
        table: { headers, rows },
      };
      return { ...prev, sections: secs };
    });
  };

  const handleRemoveTableColumn = (secIndex: number, colIndex: number) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      if (!secs[secIndex].table || secs[secIndex].table!.headers.length <= 1) return prev;
      const headers = secs[secIndex].table!.headers.filter((_, idx) => idx !== colIndex);
      const rows = secs[secIndex].table!.rows.map((row) =>
        row.filter((_, idx) => idx !== colIndex)
      );
      secs[secIndex] = {
        ...secs[secIndex],
        table: { headers, rows },
      };
      return { ...prev, sections: secs };
    });
  };

  const handleTableCellChange = (
    secIndex: number,
    rIndex: number,
    cIndex: number,
    val: string
  ) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      if (!secs[secIndex].table) return prev;
      const rows = secs[secIndex].table!.rows.map((row, idx) => {
        if (idx !== rIndex) return row;
        const newRow = [...row];
        newRow[cIndex] = val;
        return newRow;
      });
      secs[secIndex] = {
        ...secs[secIndex],
        table: { ...secs[secIndex].table!, rows },
      };
      return { ...prev, sections: secs };
    });
  };

  const handleAddTableRow = (secIndex: number) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      if (!secs[secIndex].table) return prev;
      const newRow = new Array(secs[secIndex].table!.headers.length).fill('');
      secs[secIndex] = {
        ...secs[secIndex],
        table: {
          ...secs[secIndex].table!,
          rows: [...secs[secIndex].table!.rows, newRow],
        },
      };
      return { ...prev, sections: secs };
    });
  };

  const handleRemoveTableRow = (secIndex: number, rIndex: number) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      if (!secs[secIndex].table || secs[secIndex].table!.rows.length <= 1) return prev;
      const rows = secs[secIndex].table!.rows.filter((_, idx) => idx !== rIndex);
      secs[secIndex] = {
        ...secs[secIndex],
        table: { ...secs[secIndex].table!, rows },
      };
      return { ...prev, sections: secs };
    });
  };

  const handleTakeawayChange = (secIndex: number, val: string) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      secs[secIndex] = { ...secs[secIndex], keyTakeaway: val };
      return { ...prev, sections: secs };
    });
  };

  const handleCodeSnippetChange = (
    secIndex: number,
    field: 'language' | 'code',
    val: string
  ) => {
    setFormBlog((prev) => {
      const secs = [...(prev.sections || [])];
      const existing = secs[secIndex].codeSnippet || { language: 'typescript', code: '' };
      secs[secIndex] = {
        ...secs[secIndex],
        codeSnippet: { ...existing, [field]: val },
      };
      return { ...prev, sections: secs };
    });
  };

  const handleTitleChange = (val: string) => {
    if (!userCustomizedSlug && isCreating) {
      setFormBlog((prev) => ({
        ...prev,
        title: val,
        slug: slugify(val),
      }));
    } else {
      setFormBlog((prev) => ({ ...prev, title: val }));
    }
  };

  const handleSlugChange = (val: string) => {
    setUserCustomizedSlug(true);
    const formatted = val
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-_]/g, '');
    setFormBlog((prev) => ({ ...prev, slug: formatted }));
  };

  const handleGenerateSlugFromTitle = () => {
    if (formBlog.title) {
      const generated = slugify(formBlog.title);
      setFormBlog((prev) => ({ ...prev, slug: generated }));
      setUserCustomizedSlug(true);
    }
  };

  const handleCopyBlogUrl = (slug: string, id: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const fullUrl = `${origin}/blog/${slug}`;
    navigator.clipboard?.writeText(fullUrl).catch(() => {});
    setCopiedSlugId(id);
    setTimeout(() => setCopiedSlugId(null), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormBlog((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formBlog.title || !formBlog.title.trim()) {
      alert('Article title is required');
      return;
    }

    const finalSlug = formBlog.slug?.trim()
      ? slugify(formBlog.slug)
      : slugify(formBlog.title);

    const blogPayload: BlogArticle = {
      ...(formBlog as BlogArticle),
      id: editingBlog ? editingBlog.id : `blog-${Date.now()}`,
      slug: finalSlug,
      publishedAt: formBlog.publishedAt || 'October 2026',
      readingTime: formBlog.readingTime || '5 min read',
      visualTheme: formBlog.visualTheme || 'blue',
      sections: formBlog.sections || [
        {
          id: 'sec-1',
          heading: 'Overview',
          paragraphs: [formBlog.excerpt || 'Article body content.'],
        },
      ],
    };

    if (editingBlog) {
      updateBlog(editingBlog.id, blogPayload);
    } else {
      addBlog(blogPayload);
    }

    setIsCreating(false);
    setEditingBlog(null);
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory =
      selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/90">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              Editorial & Publishing
            </span>
            <span className="text-slate-400 text-xs font-medium">• Live Sync with /blog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Blog & Editorial Articles ({blogs.length})
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Write thought leadership essays, tech articles, upload cover artwork, and assign author bylines.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-sm shadow-blue-500/25 border border-blue-500/40 transition-all cursor-pointer w-fit"
        >
          <Plus className="h-4 w-4 text-blue-100" />
          <span>New Article</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by article title, author, or keyword..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['All', 'Technology', 'Career', 'Design', 'Development', 'Business', 'Learning'].map((cat) => (
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

      {/* Articles Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/90 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3.5 px-6">Article</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Read Time</th>
                <th className="py-3.5 px-4">Published</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No articles match your query.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((article) => {
                  const isCopied = copiedSlugId === article.id;
                  return (
                    <tr key={article.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="py-4 px-6 max-w-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 text-purple-600 flex items-center justify-center shrink-0 font-bold text-xs overflow-hidden">
                            {article.imageUrl ? (
                              <img src={article.imageUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <BookOpen className="h-6 w-6" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                              {article.title}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-mono font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 truncate">
                                /blog/{article.slug}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyBlogUrl(article.slug, article.id)}
                                title="Copy public article URL"
                                className="text-xs text-slate-500 hover:text-purple-600 transition-colors flex items-center gap-1 cursor-pointer font-medium"
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
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                        {article.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-slate-700 font-medium">
                      {article.author.name}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-slate-500">
                      {article.readingTime}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-slate-500">
                      {article.publishedAt}
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/blog/${article.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View on public site"
                          className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => openEditModal(article)}
                          title="Edit article"
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(article.id)}
                          title="Delete article"
                          className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }))}
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
              <h3 className="text-base font-bold text-slate-900">Delete Article?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Are you sure you want to remove this article? It will immediately disappear from the public blog and search results.
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
                  deleteBlog(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-xs"
              >
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Article Modal */}
      {(isCreating || editingBlog) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono text-purple-700 uppercase font-bold tracking-wider">
                  {isCreating ? 'Article Draft' : 'Article Editor'}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  {isCreating ? 'Write New Editorial' : `Edit: ${editingBlog?.title}`}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingBlog(null);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-6">
              {/* Image Manager Section */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-purple-600" />
                    <span>Article Cover Image</span>
                  </label>
                  <span className="text-xs text-slate-500 font-medium">Live Preview & Presets</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {/* Live Thumbnail Preview */}
                  <div className="relative w-36 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    {formBlog.imageUrl ? (
                      <img
                        src={formBlog.imageUrl}
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
                        value={formBlog.imageUrl || ''}
                        onChange={(e) => setFormBlog({ ...formBlog, imageUrl: e.target.value })}
                        placeholder="Paste image URL (https://...)"
                        className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:outline-none font-mono"
                      />

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
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
                      <p className="text-xs text-slate-500 mb-1 font-medium">Or Pick from 3D Artwork Presets:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {BLOG_IMAGE_PRESETS.map((p) => (
                          <button
                            key={p.label}
                            type="button"
                            onClick={() => setFormBlog({ ...formBlog, imageUrl: p.url })}
                            className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Custom Details Page URL (Slug) */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formBlog.title || ''}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Modern Full Stack Systems Architecture"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                {/* Custom Details Page URL (Slug) Card */}
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <LinkIcon className="w-4 h-4 text-purple-600" />
                      <span>Custom Details Page URL Slug *</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateSlugFromTitle}
                      className="text-xs font-bold text-purple-700 hover:text-purple-900 hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
                    >
                      <Sparkles className="w-3 h-3 text-purple-600" />
                      <span>Auto-generate from Title</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-slate-500 bg-white px-3 py-2.5 rounded-xl border border-slate-200 select-none">
                      /blog/
                    </span>
                    <input
                      type="text"
                      required
                      value={formBlog.slug || ''}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      placeholder="e.g. modern-full-stack-systems-architecture"
                      className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-mono font-bold text-purple-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                    <p>
                      Live Preview:{' '}
                      <span className="font-mono font-bold text-purple-700">
                        /blog/{formBlog.slug || 'custom-url-slug'}
                      </span>
                    </p>
                    <p className="text-slate-500 hidden sm:block">
                      This exact URL will be used for the public article details page.
                    </p>
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Excerpt / Brief Summary
                </label>
                <textarea
                  rows={2}
                  value={formBlog.excerpt}
                  onChange={(e) => setFormBlog({ ...formBlog, excerpt: e.target.value })}
                  placeholder="Key takeaways for the card and hero summary..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs sm:text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Category, Reading Time, Published */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formBlog.category}
                    onChange={(e) =>
                      setFormBlog({ ...formBlog, category: e.target.value as BlogCategory })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-purple-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Career">Career</option>
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="Business">Business</option>
                    <option value="Learning">Learning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Reading Time
                  </label>
                  <input
                    type="text"
                    value={formBlog.readingTime}
                    onChange={(e) => setFormBlog({ ...formBlog, readingTime: e.target.value })}
                    placeholder="6 min read"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Publication Date
                  </label>
                  <input
                    type="text"
                    value={formBlog.publishedAt}
                    onChange={(e) => setFormBlog({ ...formBlog, publishedAt: e.target.value })}
                    placeholder="October 2026"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Author Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formBlog.author?.name}
                    onChange={(e) =>
                      setFormBlog({
                        ...formBlog,
                        author: { ...formBlog.author!, name: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Author Role / Title
                  </label>
                  <input
                    type="text"
                    value={formBlog.author?.role}
                    onChange={(e) =>
                      setFormBlog({
                        ...formBlog,
                        author: { ...formBlog.author!, role: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Article Content & Sections Manager (Details Page Body) */}
              <div className="space-y-6 pt-6 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-purple-50/80 to-blue-50/50 p-4 rounded-2xl border border-purple-200/80">
                  <div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-700" />
                      <h3 className="text-sm font-bold text-slate-900">
                        Article Content & Sections (Details Page)
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                        {formBlog.sections?.length || 0} Parts
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Manage each section's headings, text paragraphs, in-article images, bullet points, and data tables.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-sm shadow-blue-500/25 border border-blue-500/40 transition-all cursor-pointer self-start sm:self-auto shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5 text-blue-100" />
                    <span>Add New Section</span>
                  </button>
                </div>

                {/* Sections List */}
                <div className="space-y-6">
                  {formBlog.sections && formBlog.sections.length > 0 ? (
                    formBlog.sections.map((sec, sIdx) => (
                      <div
                        key={sec.id || sIdx}
                        className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5"
                      >
                        {/* Section Header Toolbar */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-2.5">
                            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              Part {String(sIdx + 1).padStart(2, '0')}
                            </span>
                            <span className="text-xs font-bold text-slate-800 truncate max-w-[200px] sm:max-w-xs">
                              {sec.heading || 'Untitled Section'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleMoveSection(sIdx, 'up')}
                              disabled={sIdx === 0}
                              title="Move up"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveSection(sIdx, 'down')}
                              disabled={sIdx === (formBlog.sections?.length || 1) - 1}
                              title="Move down"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            {(formBlog.sections?.length || 0) > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSection(sIdx)}
                                title="Delete section"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer ml-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Section Heading Input */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Section Heading / Part Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={sec.heading}
                            onChange={(e) => handleSectionHeadingChange(sIdx, e.target.value)}
                            placeholder="e.g. Introduction & Core Concepts"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        {/* Paragraphs Editor */}
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                              <AlignLeft className="w-3.5 h-3.5 text-blue-600" />
                              <span>Paragraphs ({sec.paragraphs?.length || 0})</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => handleAddParagraph(sIdx)}
                              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Paragraph</span>
                            </button>
                          </div>

                          <div className="space-y-2">
                            {sec.paragraphs?.map((p, pIdx) => (
                              <div key={pIdx} className="flex items-start gap-2">
                                <textarea
                                  rows={3}
                                  value={p}
                                  onChange={(e) =>
                                    handleParagraphChange(sIdx, pIdx, e.target.value)
                                  }
                                  placeholder={`Paragraph ${pIdx + 1} content...`}
                                  className="flex-1 rounded-xl border border-slate-200 bg-white p-3 text-xs sm:text-sm text-slate-800 focus:border-purple-500 focus:outline-none leading-relaxed"
                                />
                                {sec.paragraphs.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveParagraph(sIdx, pIdx)}
                                    title="Delete paragraph"
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer mt-1"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bullet Points List (ul / li) */}
                        <div className="space-y-2.5 p-4 rounded-xl bg-slate-50/70 border border-slate-200">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                              <List className="w-3.5 h-3.5 text-purple-600" />
                              <span>Bullet Points List (ul / li)</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => handleAddBullet(sIdx)}
                              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Bullet Point</span>
                            </button>
                          </div>

                          {sec.listItems && sec.listItems.length > 0 ? (
                            <div className="space-y-2">
                              {sec.listItems.map((item, bIdx) => (
                                <div key={bIdx} className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                                  <input
                                    type="text"
                                    value={item}
                                    onChange={(e) =>
                                      handleBulletChange(sIdx, bIdx, e.target.value)
                                    }
                                    placeholder={`Bullet point ${bIdx + 1}...`}
                                    className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-purple-500 focus:outline-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveBullet(sIdx, bIdx)}
                                    title="Remove bullet point"
                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 italic">
                              No bullet list added for this section. Click "+ Add Bullet Point" to add.
                            </p>
                          )}
                        </div>

                        {/* In-Section Image / Diagram */}
                        <div className="space-y-2.5 p-4 rounded-xl bg-slate-50/70 border border-slate-200">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                              <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                              <span>Section Image / Diagram</span>
                            </label>
                            {sec.imageUrl && (
                              <button
                                type="button"
                                onClick={() => {
                                  handleSectionImageChange(sIdx, 'imageUrl', '');
                                  handleSectionImageChange(sIdx, 'imageCaption', '');
                                }}
                                className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                              >
                                Remove Image
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={sec.imageUrl || ''}
                                onChange={(e) =>
                                  handleSectionImageChange(sIdx, 'imageUrl', e.target.value)
                                }
                                placeholder="Paste image URL (https://...)"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none font-mono"
                              />
                              <div className="flex items-center gap-2">
                                <label className="px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs">
                                  <Upload className="w-3 h-3 text-purple-600" />
                                  <span>Upload File</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleSectionFileUpload(sIdx, e)}
                                    className="hidden"
                                  />
                                </label>
                                <input
                                  type="text"
                                  value={sec.imageCaption || ''}
                                  onChange={(e) =>
                                    handleSectionImageChange(sIdx, 'imageCaption', e.target.value)
                                  }
                                  placeholder="Caption (e.g. Architecture Flowchart)"
                                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 focus:border-purple-500 focus:outline-none"
                                />
                              </div>
                            </div>

                            {sec.imageUrl && (
                              <div className="relative h-24 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                <img
                                  src={sec.imageUrl}
                                  alt="Section visual preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Section Data Table */}
                        <div className="space-y-3 p-4 rounded-xl bg-slate-50/70 border border-slate-200">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                              <TableIcon className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Section Data Table</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => handleToggleTable(sIdx)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                                sec.table
                                  ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              }`}
                            >
                              {sec.table ? 'Remove Table' : '+ Enable Table in this Section'}
                            </button>
                          </div>

                          {sec.table && (
                            <div className="space-y-3 bg-white p-3.5 rounded-xl border border-slate-200 overflow-x-auto">
                              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                                <span className="text-xs font-bold text-slate-700">
                                  Table Headers ({sec.table.headers.length} Columns):
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleAddTableColumn(sIdx)}
                                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>Add Column</span>
                                </button>
                              </div>

                              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                                {sec.table.headers.map((hdr, hIdx) => (
                                  <div
                                    key={hIdx}
                                    className="flex items-center gap-1 min-w-[140px] flex-1"
                                  >
                                    <input
                                      type="text"
                                      value={hdr}
                                      onChange={(e) =>
                                        handleTableHeaderChange(sIdx, hIdx, e.target.value)
                                      }
                                      placeholder={`Header ${hIdx + 1}`}
                                      className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-800 focus:bg-white focus:border-purple-500 focus:outline-none"
                                    />
                                    {sec.table!.headers.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveTableColumn(sIdx, hIdx)}
                                        title="Delete column"
                                        className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>

                              <div className="space-y-2 pt-2 border-t border-slate-100">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-bold text-slate-700">
                                    Table Rows ({sec.table.rows.length}):
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleAddTableRow(sIdx)}
                                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>Add Row</span>
                                  </button>
                                </div>

                                {sec.table.rows.map((row, rIdx) => (
                                  <div key={rIdx} className="flex items-center gap-2">
                                    <span className="text-xs font-mono font-bold text-slate-400 w-5 text-center shrink-0">
                                      {rIdx + 1}
                                    </span>
                                    <div
                                      className="flex-1 grid gap-2"
                                      style={{
                                        gridTemplateColumns: `repeat(${sec.table!.headers.length}, minmax(0, 1fr))`,
                                      }}
                                    >
                                      {row.map((cell, cIdx) => (
                                        <input
                                          key={cIdx}
                                          type="text"
                                          value={cell}
                                          onChange={(e) =>
                                            handleTableCellChange(
                                              sIdx,
                                              rIdx,
                                              cIdx,
                                              e.target.value
                                            )
                                          }
                                          placeholder={`Cell (${rIdx + 1}, ${cIdx + 1})`}
                                          className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 focus:border-purple-500 focus:outline-none"
                                        />
                                      ))}
                                    </div>
                                    {sec.table!.rows.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveTableRow(sIdx, rIdx)}
                                        title="Delete row"
                                        className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Strategic Takeaway (Optional) */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>Strategic Takeaway Callout (Optional)</span>
                          </label>
                          <input
                            type="text"
                            value={sec.keyTakeaway || ''}
                            onChange={(e) => handleTakeawayChange(sIdx, e.target.value)}
                            placeholder="Highlight key takeaway or summary insight for this section..."
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        {/* Code Snippet (Optional) */}
                        <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold flex items-center gap-1.5 text-blue-700">
                              <Code className="w-3.5 h-3.5 text-blue-600" />
                              <span>Code Snippet (Optional)</span>
                            </label>
                            <select
                              value={sec.codeSnippet?.language || 'typescript'}
                              onChange={(e) =>
                                handleCodeSnippetChange(sIdx, 'language', e.target.value)
                              }
                              className="bg-white text-slate-700 text-xs rounded-md px-2.5 py-1 border border-slate-200 focus:border-blue-500 focus:outline-none shadow-2xs font-medium"
                            >
                              <option value="typescript">TypeScript</option>
                              <option value="javascript">JavaScript</option>
                              <option value="python">Python</option>
                              <option value="html">HTML</option>
                              <option value="css">CSS</option>
                              <option value="bash">Bash / Shell</option>
                              <option value="sql">SQL</option>
                              <option value="json">JSON</option>
                            </select>
                          </div>
                          <textarea
                            rows={3}
                            value={sec.codeSnippet?.code || ''}
                            onChange={(e) =>
                              handleCodeSnippetChange(sIdx, 'code', e.target.value)
                            }
                            placeholder="// Paste code snippet here (leave blank if not needed)..."
                            className="w-full rounded-lg bg-white border border-slate-200 p-2.5 text-xs font-mono text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none shadow-2xs"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">
                      <p className="text-xs">No sections added yet.</p>
                      <button
                        type="button"
                        onClick={handleAddSection}
                        className="mt-3 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        + Add First Section
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingBlog(null);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-sm shadow-blue-500/25 border border-blue-500/40 transition-all cursor-pointer"
                >
                  {isCreating ? 'Publish Article' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
