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
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { formatCurrency } from '../../lib/utils';

export default function AdminDashboardPage() {
  const { courses, blogs, inquiries, settings, faqs, helpArticles } = useSiteData();

  const newInquiries = inquiries.filter((i) => i.status === 'New');
  const recentInquiries = inquiries.slice(0, 5);
  const recentCourses = courses.slice(0, 4);

  const totalStudents = courses.reduce((acc, c) => acc + (c.studentsCount || 0), 0);
  const totalCurriculumHours = courses.reduce((acc, c) => acc + (c.totalHours || 0), 0);

  return (
    <div className="space-y-10 sm:space-y-12 pb-12">
      {/* 1. Executive Top Header (Light, Clean, Spacious) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-3xs font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/90 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Control Center
            </span>
            <span className="text-3xs text-slate-400 font-medium">
              Real-time site sync active
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Platform Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-2xl leading-relaxed">
            Manage your academic programmes, thought leadership articles, student leads, and homepage content.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-500/20 hover:shadow-md transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Course</span>
          </Link>

          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold shadow-2xs hover:border-purple-300 transition-all cursor-pointer"
          >
            <BookOpen className="h-4 w-4" />
            <span>New Article</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <span>Live Site</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* 2. Primary Metric Cards (Spacious, Light Pastel with Dark Rich Contrast) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {/* Card 1: Learner Inquiries (Soft Amber) */}
        <Link
          href="/admin/inquiries"
          className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-white shadow-2xs hover:shadow-lg hover:border-amber-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                Learner Inquiries
              </span>
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 border border-amber-200/80 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                <MailCheck className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {inquiries.length}
              </p>
              <span className="px-2.5 py-1 rounded-full text-3xs font-extrabold uppercase tracking-wider bg-amber-200/80 text-amber-950 border border-amber-300">
                {newInquiries.length} New
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between text-3xs">
            <span className="font-semibold text-slate-600 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Direct Form Leads
            </span>
            <span className="font-bold text-amber-800 group-hover:text-amber-950 flex items-center gap-1 transition-colors">
              Manage Leads <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Card 2: Active Courses (Soft Royal Blue) */}
        <Link
          href="/admin/courses"
          className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white shadow-2xs hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-900">
                Live Courses
              </span>
              <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-800 border border-blue-200/80 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {courses.length}
              </p>
              <span className="px-2.5 py-1 rounded-full text-3xs font-extrabold uppercase tracking-wider bg-blue-200/80 text-blue-950 border border-blue-300">
                Catalog Active
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-blue-200/60 flex items-center justify-between text-3xs">
            <span className="font-semibold text-slate-600">
              {totalStudents.toLocaleString()} Enrolled
            </span>
            <span className="font-bold text-blue-800 group-hover:text-blue-950 flex items-center gap-1 transition-colors">
              Manage Courses <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Card 3: Editorial Articles (Soft Purple) */}
        <Link
          href="/admin/blogs"
          className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-purple-200/80 bg-gradient-to-br from-purple-50/80 via-fuchsia-50/40 to-white shadow-2xs hover:shadow-lg hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-900">
                Blog Publications
              </span>
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-800 border border-purple-200/80 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                <BookOpen className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {blogs.length}
              </p>
              <span className="px-2.5 py-1 rounded-full text-3xs font-extrabold uppercase tracking-wider bg-purple-200/80 text-purple-950 border border-purple-300">
                Published
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-purple-200/60 flex items-center justify-between text-3xs">
            <span className="font-semibold text-slate-600">
              Custom URLs Active
            </span>
            <span className="font-bold text-purple-800 group-hover:text-purple-950 flex items-center gap-1 transition-colors">
              Article Studio <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Card 4: Support & FAQs (Soft Emerald) */}
        <Link
          href="/admin/faqs"
          className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-white shadow-2xs hover:shadow-lg hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
                Help & FAQs
              </span>
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200/80 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                <HelpCircle className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {faqs.length + helpArticles.length}
              </p>
              <span className="px-2.5 py-1 rounded-full text-3xs font-extrabold uppercase tracking-wider bg-emerald-200/80 text-emerald-950 border border-emerald-300">
                Synced
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-200/60 flex items-center justify-between text-3xs">
            <span className="font-semibold text-slate-600">
              {faqs.length} FAQs • {helpArticles.length} Guides
            </span>
            <span className="font-bold text-emerald-800 group-hover:text-emerald-950 flex items-center gap-1 transition-colors">
              Manage Support <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>
      </div>

      {/* 3. Spacious Executive Content Grid (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Learner Inquiries Stream */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-100" />
                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Recent Learner Inquiries
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Leads captured through Contact and Programme enrollment forms
              </p>
            </div>

            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group py-1 px-2.5 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <span>View All ({inquiries.length})</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {recentInquiries.length === 0 ? (
              <div className="text-center py-12 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
                <MailCheck className="h-10 w-10 text-slate-300 mx-auto mb-2.5" />
                <p className="text-sm font-semibold text-slate-600">No inquiries received yet.</p>
                <p className="text-xs text-slate-400 mt-1">Leads submitted on /contact will display here.</p>
              </div>
            ) : (
              recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-2xs">
                      {inq.fullName ? inq.fullName.charAt(0).toUpperCase() : 'L'}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {inq.fullName}
                        </p>
                        <span
                          className={`text-3xs px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider ${
                            inq.status === 'New'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : inq.status === 'Contacted'
                              ? 'bg-purple-100 text-purple-900 border border-purple-300'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-1">
                        <span className="font-mono text-slate-600">{inq.email}</span>
                        <span className="mx-1.5 text-slate-300">•</span>
                        <span className="font-medium text-slate-700">{inq.topic}</span>
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/admin/inquiries"
                    className="self-end sm:self-center px-3.5 py-2 rounded-xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 hover:border-blue-600 text-xs font-bold shadow-2xs transition-all whitespace-nowrap cursor-pointer"
                  >
                    Triage Lead
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Active Catalog Preview */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-100" />
                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Active Programmes
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Live courses currently showcased on catalog
              </p>
            </div>

            <Link
              href="/admin/courses"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group py-1 px-2.5 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <span>Manage ({courses.length})</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {recentCourses.map((c) => (
              <div
                key={c.id}
                className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all duration-200 flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-13 h-13 rounded-2xl bg-slate-100 border border-slate-200 text-blue-600 flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs shadow-2xs">
                    {c.imageUrl ? (
                      <img src={c.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <GraduationCap className="h-6 w-6" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {c.title}
                    </p>
                    <p className="text-3xs text-slate-500 truncate mt-0.5">
                      {c.instructor.name} • {c.duration}
                    </p>
                    <p className="text-3xs font-mono font-bold text-blue-600 truncate mt-1">
                      /courses/{c.slug}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm font-black text-slate-900">{formatCurrency(c.price)}</p>
                  <span className="text-3xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block mt-1">
                    Live
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Platform Summary Strip (Spacious Clean Footer Card) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-2xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              System Health & Data Persistence Active
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              All modifications to courses, blogs, and URLs automatically persist in browser storage.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600">
          <div>
            <span className="text-3xs uppercase tracking-wider text-slate-400 block font-bold">Catalog Hours</span>
            <span className="font-extrabold text-slate-900">{totalCurriculumHours}h+ Content</span>
          </div>
          <div>
            <span className="text-3xs uppercase tracking-wider text-slate-400 block font-bold">Custom Slugs</span>
            <span className="font-extrabold text-blue-600">100% Dynamic Routing</span>
          </div>
          <div>
            <span className="text-3xs uppercase tracking-wider text-slate-400 block font-bold">Global Status</span>
            <span className="font-extrabold text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Optimal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
