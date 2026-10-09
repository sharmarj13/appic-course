"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { BlogArticle } from '../../types/blog';

interface BlogCardProps {
  article: BlogArticle;
}

export function BlogCard({ article }: BlogCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
      <div>
        <Link
          href={`/blog/${article.slug}`}
          className="relative block aspect-[16/10] w-full overflow-hidden bg-slate-100"
        >
          {article.imageUrl && !imgError ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-slate-50 text-center">
              <BookOpen className="h-8 w-8 text-slate-300" />
            </div>
          )}
        </Link>

        <div className="p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            <span className="text-blue-600">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
          </div>

          <h3 className="text-xl font-bold font-serif text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
            <Link href={`/blog/${article.slug}`}>{article.title}</Link>
          </h3>

          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4 mt-auto bg-slate-50">
        <div className="flex items-center gap-3 text-xs text-slate-600 min-w-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-600">
            {article.author.initials}
          </span>
          <div className="flex flex-col">
             <span className="font-bold text-slate-900 truncate">{article.author.name}</span>
             <span className="text-[10px] text-slate-500">{article.publishedAt}</span>
          </div>
        </div>

        <Link
          href={`/blog/${article.slug}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 shadow-sm px-4 py-2 text-xs font-bold text-slate-700 transition-all duration-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 whitespace-nowrap shrink-0"
        >
          <span>Read</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
