"use client";
import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  MailCheck,
  ArrowRight,
  Plus,
  ExternalLink,
  HelpCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  Users,
  ShieldCheck,
  TrendingUp,
  Layers,
  BarChart3,
  Building2,
  Calendar
} from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { formatCurrency } from '../../lib/utils';

export default function AdminDashboardPage() {
  const { courses, blogs, inquiries, settings, faqs } = useSiteData();

  const newInquiries = inquiries.filter((i) => i.status === 'New');
  const recentInquiries = inquiries.slice(0, 5);
  const recentCourses = courses.slice(0, 4);

  const totalStudents = courses.reduce((acc, c) => acc + (c.studentsCount || 0), 0);
  const totalCurriculumHours = courses.reduce((acc, c) => acc + (c.totalHours || 0), 0);

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      
      {/* 1. Classic Executive Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/90">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Executive Suite Active
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Real-time synchronization enabled
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Executive Dashboard
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Central management console for academic tracks, editorial essays, student inquiry pipelines, and live site content.
          </p>
        </div>

        {/* Action Button Group */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-950 to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-emerald-900/20 border border-emerald-800 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4 text-emerald-300" />
            <span>New Programme</span>
          </Link>

          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50/60 text-slate-700 hover:text-emerald-950 border border-slate-200 hover:border-emerald-200 text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-emerald-700" />
            <span>Write Article</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <span>Public Site</span>
            <ExternalLink className="h-4 w-4 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* 2. Classic Primary Metric Cards (Spacious, Prestige Emerald & Gold Tints) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        
        {/* Card 1: Learner Inquiries */}
        <Link
          href="/admin/inquiries"
          className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50/80 via-white to-white shadow-xs hover:shadow-md hover:border-amber-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Learner Inquiries
              </span>
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <MailCheck className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {inquiries.length}
              </p>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-200/80 text-amber-950 border border-amber-300">
                {newInquiries.length} New
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs sm:text-sm">
            <span className="font-semibold text-slate-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Direct Leads
            </span>
            <span className="font-bold text-amber-900 group-hover:text-amber-950 flex items-center gap-1 transition-colors">
              Manage Pipeline <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Card 2: Academic Programmes (Emerald) */}
        <Link
          href="/admin/courses"
          className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/80 via-white to-white shadow-xs hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                Live Programmes
              </span>
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {courses.length}
              </p>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-200/80 text-emerald-950 border border-emerald-300">
                Published
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-200/60 flex items-center justify-between text-xs sm:text-sm">
            <span className="font-semibold text-slate-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Custom Slugs Active
            </span>
            <span className="font-bold text-emerald-900 group-hover:text-emerald-950 flex items-center gap-1 transition-colors">
              Manage Catalog <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Card 3: Editorial Articles (Teal / Sage) */}
        <Link
          href="/admin/blogs"
          className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-teal-200/90 bg-gradient-to-br from-teal-50/80 via-white to-white shadow-xs hover:shadow-md hover:border-teal-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-950">
                Editorial Essays
              </span>
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-800 border border-teal-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <BookOpen className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {blogs.length}
              </p>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-200/80 text-teal-950 border border-teal-300">
                Live Slugs
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-teal-200/60 flex items-center justify-between text-xs sm:text-sm">
            <span className="font-semibold text-slate-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              Playbooks & News
            </span>
            <span className="font-bold text-teal-900 group-hover:text-teal-950 flex items-center gap-1 transition-colors">
              Editorial Studio <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Card 4: Enrolled Students (Luxury Forest & Mint) */}
        <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-emerald-300/80 bg-gradient-to-br from-emerald-100/50 via-white to-white shadow-xs">
          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                Enrolled Students
              </span>
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center shadow-xs">
                <Users className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {totalStudents.toLocaleString()}
              </p>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-200/80 text-emerald-950 border border-emerald-300">
                Verified
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-200/60 flex items-center justify-between text-xs sm:text-sm">
            <span className="font-semibold text-slate-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Global Cohorts
            </span>
            <span className="font-bold text-emerald-900">
              Across 5 Tracks
            </span>
          </div>
        </div>

      </div>

      {/* 3. Classic Secondary Operational Metrics Strip */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Curriculum Volume
            </span>
            <p className="text-2xl font-extrabold text-slate-900">
              {totalCurriculumHours} Hours
            </p>
            <p className="text-xs text-slate-500 font-medium">Production HD Labs</p>
          </div>

          <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Average Rating
            </span>
            <p className="text-2xl font-extrabold text-slate-900">
              4.8 / 5.0
            </p>
            <p className="text-xs text-slate-500 font-medium">41K+ Verified Reviews</p>
          </div>

          <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Corporate Hiring
            </span>
            <p className="text-2xl font-extrabold text-slate-900">
              300+ Partners
            </p>
            <p className="text-xs text-slate-500 font-medium">Global Tech Studios</p>
          </div>

          <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              FAQs & Knowledge
            </span>
            <p className="text-2xl font-extrabold text-slate-900">
              {faqs.length} Q&As
            </p>
            <p className="text-xs text-slate-500 font-medium">Active Candidate Help</p>
          </div>
        </div>
      </div>

      {/* 4. Core Operational Workspaces (Two Spacious Classic Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Inquiries & Admissions Pipeline */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MailCheck className="w-5 h-5 text-amber-600" />
                <span>Recent Inquiries & Admissions Pipeline</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Prospective students requesting advisory, syllabus info, or team pricing.
              </p>
            </div>

            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors shrink-0"
            >
              View All ({inquiries.length})
            </Link>
          </div>

          <div className="space-y-3.5">
            {recentInquiries.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                No active candidate inquiries yet.
              </div>
            ) : (
              recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 hover:border-emerald-200/60 hover:bg-emerald-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 truncate">
                        {inq.fullName}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 truncate">
                        {inq.topic}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 truncate max-w-md">
                      {inq.message}
                    </p>

                    <p className="text-xs text-slate-400 font-mono">
                      {inq.createdAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                        inq.status === 'New'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : inq.status === 'In Progress'
                          ? 'bg-teal-100 text-teal-900 border border-teal-200'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      }`}
                    >
                      {inq.status}
                    </span>
                    <Link
                      href="/admin/inquiries"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-900 hover:bg-white transition-colors"
                      title="Inspect inquiry"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Showing {recentInquiries.length} of {inquiries.length} admissions tickets
            </span>
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200/80 transition-colors cursor-pointer"
            >
              <span>Manage Inquiries</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column (5 cols): Academic Catalog & Live Slugs */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-700" />
                <span>Programmes Catalog & Slugs</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Self-paced curricula and their custom detail page URLs.
              </p>
            </div>

            <Link
              href="/admin/courses"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors shrink-0"
            >
              View All ({courses.length})
            </Link>
          </div>

          <div className="space-y-3.5">
            {recentCourses.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 hover:border-emerald-200/60 hover:bg-emerald-50/20 transition-all flex flex-col justify-between gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 leading-snug truncate">
                      {c.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-slate-500">
                        {c.category}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-bold text-slate-800">
                        {formatCurrency(c.price)}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                    Active
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-200/70 truncate max-w-[200px]">
                    /courses/{c.slug || c.id}
                  </span>

                  <Link
                    href={`/courses/${c.slug || c.id}`}
                    target="_blank"
                    className="font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition-colors"
                  >
                    <span>View</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              {courses.length} active courses published
            </span>
            <Link
              href="/admin/courses"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200/80 transition-colors cursor-pointer"
            >
              <span>Manage Courses</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
