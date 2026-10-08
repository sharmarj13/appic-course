"use client";
import React, { useState } from 'react';
import Link from 'next/link';

import { Search, ArrowUpRight, BookOpen } from 'lucide-react';
import { BlogArticle, BlogCategory } from '../../types/blog';

const BLOG_CATEGORIES: (BlogCategory | 'All')[] = [
  'All',
  'Career',
  'Technology',
  'Design',
  'Development',
  'Business',
  'Learning',
];

interface BlogFiltersProps {
  selectedCategory: BlogCategory | 'All';
  onCategoryChange: (cat: BlogCategory | 'All') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function BlogFilters({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: BlogFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter articles by category"
      >
        {BLOG_CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="relative w-full md:w-80 shrink-0">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles & guides..."
          aria-label="Search blog articles"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
        />
      </div>
    </div>
  );
}

export function FeaturedArticle({ article }: { article: BlogArticle }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <Link
          href={`/blog/${article.slug}`}
          className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[300px] overflow-hidden bg-slate-100 block"
        >
          {article.imageUrl && !imgError ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-slate-50 p-8 text-center">
              <BookOpen className="h-10 w-10 text-slate-300" />
            </div>
          )}
        </Link>

        <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              <span className="text-blue-600">Featured</span>
              <span aria-hidden="true">·</span>
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-4">
              <Link href={`/blog/${article.slug}`}>{article.title}</Link>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700">
                {article.author.initials}
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">{article.author.name}</p>
                <p className="text-[11px] text-slate-500">{article.publishedAt}</p>
              </div>
            </div>

            <Link
              href={`/blog/${article.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Read Full Essay</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
