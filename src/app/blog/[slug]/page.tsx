"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Share2,
  Check,
  Award,
  Sparkles,
  MessageCircle,
  Bookmark,
  ExternalLink
} from 'lucide-react';
import { PageSEO } from '../../../components/common/PageSEO';
import { Container } from '../../../components/common/Container';
import { Button } from '../../../components/common/Button';
import { ArticleContent } from '../../../components/blog/ArticleContent';
import { BlogCard } from '../../../components/blog/BlogCard';
import { useSiteData } from '../../../context/SiteDataContext';
import { FinalCTA } from '../../../components/home/FinalCTA';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { blogs, isLoaded } = useSiteData();
  const [imgError, setImgError] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  const normalizedSlug = slug ? decodeURIComponent(slug).trim().toLowerCase() : '';
  const article = blogs.find(
    (b) =>
      b.slug.trim().toLowerCase() === normalizedSlug ||
      b.slug === slug ||
      b.id === slug
  );

  // Track scroll progress for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Copy share URL
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href).catch(() => {});
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (!article) {
    if (!isLoaded) {
      return (
        <section className="py-24 bg-slate-50 min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold text-slate-500">Loading article...</p>
          </div>
        </section>
      );
    }

    return (
      <section className="py-24 bg-slate-50 min-h-[60vh] flex items-center">
        <Container className="text-center max-w-lg">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold font-serif text-slate-900 mb-3">
            Article Not Found
          </h1>
          <p className="text-slate-600 text-sm mb-8 leading-relaxed">
            The requested editorial article could not be located in our catalog. Browse our published essays and tech guides below.
          </p>
          <Button href="/blog" variant="primary">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Articles</span>
          </Button>
        </Container>
      </section>
    );
  }

  const relatedArticles = blogs
    .filter((b) => b.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen relative">
      <PageSEO title={`${article.title} | Appic Skill Editorial`} description={article.excerpt} />

      {/* Floating Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200/50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Header Section */}
      <section className="bg-white border-b border-slate-200/80 pt-10 pb-16 lg:pt-14 lg:pb-20">
        <Container>
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-none"
          >
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <Link href="/blog" className="hover:text-blue-600 transition-colors">
              Blog & Insights
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-800 font-bold truncate max-w-xs sm:max-w-md">
              {article.title}
            </span>
          </nav>

          <div className="max-w-4xl space-y-6">
            {/* Meta Tags: Category, Date, Read Time */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 text-3xs">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {article.publishedAt}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.readingTime}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-slate-900 leading-[1.18] tracking-tight">
              {article.title}
            </h1>

            {/* Excerpt Lead */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-3xl">
              {article.excerpt}
            </p>

            {/* Author Byline & Quick Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-xs shrink-0">
                  {article.author.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-900">{article.author.name}</p>
                    <span className="px-2 py-0.5 rounded text-3xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Author
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{article.author.role}</p>
                </div>
              </div>

              {/* Share & Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Body & Sticky Sidebar */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 8 Columns: Article Body */}
            <article className="lg:col-span-8 bg-white p-6 sm:p-10 lg:p-12 rounded-3xl border border-slate-200/90 shadow-xs space-y-10">
              {/* Cover Artwork Banner */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs">
                {!imgError ? (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                    <BookOpen className="h-16 w-16" />
                  </div>
                )}
              </div>

              {/* Dynamic Article Sections Content */}
              <ArticleContent article={article} />
            </article>

            {/* Right 4 Columns: Sticky Sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">
              {/* Table of Contents Card */}
              {article.sections && article.sections.length > 0 && (
                <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Table of Contents
                    </h3>
                  </div>

                  <nav aria-label="Table of contents" className="space-y-2 text-xs">
                    {article.sections.map((sec, idx) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50/60 transition-colors font-medium group"
                      >
                        <span className="text-3xs font-mono font-bold text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <span className="line-clamp-2 leading-relaxed">
                          {sec.heading}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Author Spotlight Card */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                    {article.author.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{article.author.name}</h4>
                    <p className="text-3xs text-slate-500 font-medium">{article.author.role}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {article.author.bio ||
                    'Senior faculty mentor and curriculum specialist at Appic Skill. Contributes regular architecture audits and technical practice guidelines.'}
                </p>

                <div className="pt-2">
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-xs font-semibold transition-colors"
                  >
                    <span>View Curriculum Tracks</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Admissions Consultation Card */}
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white p-6 shadow-xs space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-3xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow-2xs">
                  <Sparkles className="w-3 h-3" />
                  <span>Free Diagnostic</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  Plan your technical learning path with faculty
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Have questions about this framework or career transition? Connect directly with our advisors for a 15-minute roadmap call.
                </p>
                <div className="pt-1">
                  <Button href="/contact" variant="primary" size="sm" className="w-full">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Talk to an Advisor</span>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200/80">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-3xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  Recommended Reading
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2 font-serif">
                  More Articles & Insights
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                <span>View All Articles</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedArticles.map((rel) => (
                <BlogCard key={rel.id} article={rel} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Final Conversion CTA */}
      <FinalCTA />
    </div>
  );
}
