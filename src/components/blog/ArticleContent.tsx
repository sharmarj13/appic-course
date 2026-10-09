"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Share2, Check, ArrowLeft, Copy, Sparkles, Quote, Terminal } from 'lucide-react';
import { BlogArticle } from '../../types/blog';

interface ArticleContentProps {
  article: BlogArticle;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const handleCopyLink = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-12">
      {/* Sections Flow */}
      {article.sections.map((sec, sIdx) => (
        <section
          key={sec.id}
          id={sec.id}
          className="scroll-mt-28 space-y-6 pb-8 border-b border-slate-100 last:border-b-0"
        >
          {/* Section Heading */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              Part {String(sIdx + 1).padStart(2, '0')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 leading-snug tracking-tight">
              {sec.heading}
            </h2>
          </div>

          {/* Paragraphs */}
          <div className="space-y-5">
            {sec.paragraphs.map((p, pIdx) => (
              <p
                key={pIdx}
                className="text-base sm:text-lg text-slate-700 leading-[1.85] font-normal"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Key Takeaway Callout Box */}
          {sec.keyTakeaway && (
            <div className="rounded-2xl border border-amber-200/90 bg-amber-50/70 p-6 sm:p-7 shadow-2xs">
              <div className="flex items-center gap-2 mb-2 text-amber-800">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Strategic Takeaway
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-semibold">
                {sec.keyTakeaway}
              </p>
            </div>
          )}

          {/* Code Snippet Box */}
          {sec.codeSnippet && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
              <div className="flex items-center justify-between px-5 py-3 bg-slate-900/90 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-semibold text-slate-300">
                    {sec.codeSnippet.language.toUpperCase()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode(sec.id, sec.codeSnippet!.code)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
                >
                  {copiedCodeId === sec.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-5 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                <pre>
                  <code>{sec.codeSnippet.code}</code>
                </pre>
              </div>
            </div>
          )}
        </section>
      ))}

      {/* Share & Feedback Bottom Banner */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Found this analysis insightful?</h3>
          <p className="text-xs text-slate-500 mt-0.5">Share with your engineering or design team.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-slate-500" />
                <span>Copy Share Link</span>
              </>
            )}
          </button>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>More Articles</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
