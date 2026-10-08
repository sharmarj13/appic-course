"use client";
import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  MailCheck,
  TrendingUp,
  ArrowRight,
  Plus,
  Home,
  Clock,
  Sparkles,
  ExternalLink,
  Settings,
  HelpCircle,
  Scale,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Layers,
  BarChart3,
  Users
} from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { formatCurrency } from '../../lib/utils';

export default function AdminDashboardPage() {
  const { courses, blogs, inquiries, settings, faqs, helpArticles } = useSiteData();

  const newInquiries = inquiries.filter((i) => i.status === 'New');
  const recentInquiries = inquiries.slice(0, 5);
  const recentCourses = courses.slice(0, 4);

  // Quick stats calculation
  const totalStudents = courses.reduce((acc, c) => acc + (c.studentsCount || 0), 0);
  const coursesByCategory: { [key: string]: number } = {};
  courses.forEach((c) => {
    coursesByCategory[c.category] = (coursesByCategory[c.category] || 0) + 1;
  });

  return (
    <div className="space-y-8 pb-8">
      {/* Top Executive Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-6 sm:p-8 text-white shadow-xl shadow-blue-950/20 border border-slate-800">
        {/* Subtle decorative background glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-1/3 -bottom-16 w-60 h-60 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-3xs font-extrabold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Control Center
              </span>
              <span className="text-3xs text-slate-400 font-mono">
                {settings.siteName || 'Appic Skill'} Enterprise OS
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Welcome Back, Administrator
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-2xl leading-relaxed">
              Real-time administrative cockpit for managing courses, editorial articles, learner leads, custom URLs, and homepage content.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/admin/courses"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Course</span>
            </Link>

            <Link
              href="/admin/blogs"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>New Article</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-xs transition-colors cursor-pointer"
            >
              <span>View Site</span>
              <ExternalLink className="h-3.5 w-3.5 text-blue-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Colorful Metric Cards (Light tint with rich dark contrast) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Learner Inquiries / Leads (Amber / Orange) */}
        <Link
          href="/admin/inquiries"
          className="group relative overflow-hidden rounded-3xl border border-amber-200/90 bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-amber-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Learner Inquiries
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 border border-amber-300/80 shadow-xs group-hover:scale-105 transition-transform">
              <MailCheck className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <p className="text-3xl sm:text-4xl font-black text-amber-950 tracking-tight">
              {inquiries.length}
            </p>
            <span className="px-2.5 py-1 rounded-full text-3xs font-extrabold uppercase tracking-wider bg-amber-200/80 text-amber-900 border border-amber-300">
              {newInquiries.length} New
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center justify-between text-3xs">
            <span className="font-semibold text-amber-900 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Active lead intake
            </span>
            <span className="font-bold text-amber-900 group-hover:text-amber-950 flex items-center gap-0.5 transition-colors">
              Triage Leads <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Card 2: Published Programmes (Royal Blue / Sky) */}
        <Link
          href="/admin/courses"
          className="group relative overflow-hidden rounded-3xl border border-blue-200/90 bg-gradient-to-br from-blue-50/90 via-indigo-50/60 to-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Live Courses
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-800 border border-blue-300/80 shadow-xs group-hover:scale-105 transition-transform">
              <GraduationCap className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <p className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
              {courses.length}
            </p>
            <span className="px-2.5 py-1 rounded-full text-3xs font-extrabold uppercase tracking-wider bg-blue-200/80 text-blue-900 border border-blue-300">
              {totalStudents.toLocaleString()}+ Enrolled
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-blue-200/60 flex items-center justify-between text-3xs">
            <span className="font-semibold text-blue-900">
              Curriculum + Slugs active
            </span>
            <span className="font-bold text-blue-900 group-hover:text-blue-950 flex items-center gap-0.5 transition-colors">
              Manage Catalog <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Card 3: Editorial Articles (Purple / Violet) */}
        <Link
          href="/admin/blogs"
          className="group relative overflow-hidden rounded-3xl border border-purple-200/90 bg-gradient-to-br from-purple-50/90 via-fuchsia-50/60 to-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-purple-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
              Blog & Editorial
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100 text-purple-800 border border-purple-300/80 shadow-xs group-hover:scale-105 transition-transform">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <p className="text-3xl sm:text-4xl font-black text-purple-950 tracking-tight">
              {blogs.length}
            </p>
            <span className="px-2.5 py-1 rounded-full text-3xs font-extrabold uppercase tracking-wider bg-purple-200/80 text-purple-900 border border-purple-300">
              Live Articles
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-purple-200/60 flex items-center justify-between text-3xs">
            <span className="font-semibold text-purple-900">
              Custom URLs & bylines
            </span>
            <span className="font-bold text-purple-900 group-hover:text-purple-950 flex items-center gap-0.5 transition-colors">
              Editorial Studio <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Card 4: Knowledgebase & FAQs (Emerald / Teal) */}
        <Link
          href="/admin/faqs"
          className="group relative overflow-hidden rounded-3xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/90 via-teal-50/60 to-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Knowledge Base
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300/80 shadow-xs group-hover:scale-105 transition-transform">
              <HelpCircle className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <p className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight">
              {faqs.length + helpArticles.length}
            </p>
            <span className="px-2.5 py-1 rounded-full text-3xs font-extrabold uppercase tracking-wider bg-emerald-200/80 text-emerald-900 border border-emerald-300">
              100% Synced
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-emerald-200/60 flex items-center justify-between text-3xs">
            <span className="font-semibold text-emerald-900">
              {faqs.length} FAQs • {helpArticles.length} Guides
            </span>
            <span className="font-bold text-emerald-900 group-hover:text-emerald-950 flex items-center gap-0.5 transition-colors">
              Manage Support <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>
      </div>



      {/* Analytics Snapshot Strip (3 colorful cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Analytics 1: Category Distribution */}
        <div className="p-5 rounded-3xl border border-indigo-200/90 bg-gradient-to-br from-indigo-50/70 via-white to-white shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-950 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Catalog Breakdown</span>
            </h3>
            <span className="text-3xs font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full border border-indigo-200">
              {courses.length} Courses
            </span>
          </div>

          <div className="space-y-2 pt-1">
            {Object.entries(coursesByCategory).slice(0, 3).map(([cat, count]) => {
              const pct = Math.round((count / courses.length) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-3xs font-semibold text-slate-700">
                    <span>{cat}</span>
                    <span className="font-mono text-indigo-900 font-bold">{count} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-indigo-100/70 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Analytics 2: Editorial Health */}
        <div className="p-5 rounded-3xl border border-purple-200/90 bg-gradient-to-br from-purple-50/70 via-white to-white shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-purple-950 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-600" />
              <span>Editorial Velocity</span>
            </h3>
            <span className="text-3xs font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full border border-purple-200">
              Active Studio
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-center">
            <div className="p-3 rounded-2xl bg-white border border-purple-100 shadow-2xs">
              <p className="text-xl font-black text-purple-950">{blogs.length}</p>
              <p className="text-3xs text-purple-800 font-semibold mt-0.5">Articles Online</p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-purple-100 shadow-2xs">
              <p className="text-xl font-black text-purple-950">
                {blogs.filter((b) => b.featured).length || 2}
              </p>
              <p className="text-3xs text-purple-800 font-semibold mt-0.5">Featured Staff Picks</p>
            </div>
          </div>
          <p className="text-3xs text-slate-500 text-center font-medium">
            Dynamic slugs & author attribution enabled
          </p>
        </div>

        {/* Analytics 3: Lead Pipeline Health */}
        <div className="p-5 rounded-3xl border border-amber-200/90 bg-gradient-to-br from-amber-50/70 via-white to-white shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-950 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600" />
              <span>Lead Response Health</span>
            </h3>
            <span className="text-3xs font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
              {inquiries.length} Total
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-center">
            <div className="p-3 rounded-2xl bg-white border border-amber-100 shadow-2xs">
              <p className="text-xl font-black text-amber-950">{newInquiries.length}</p>
              <p className="text-3xs text-amber-800 font-semibold mt-0.5">Pending Action</p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-amber-100 shadow-2xs">
              <p className="text-xl font-black text-emerald-700">
                {inquiries.length - newInquiries.length}
              </p>
              <p className="text-3xs text-emerald-800 font-semibold mt-0.5">Contacted / Resolved</p>
            </div>
          </div>
          <p className="text-3xs text-slate-500 text-center font-medium">
            Contact inquiries direct from public portal
          </p>
        </div>
      </div>

      {/* Two-Column Section: Recent Inquiries + Active Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: Recent Inquiries Feed */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <h2 className="text-base font-extrabold text-slate-900">Recent Learner Inquiries</h2>
              </div>
              <p className="text-3xs text-slate-500 mt-0.5">Direct leads captured via Contact and Enrollment forms</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
            >
              <span>View All ({inquiries.length})</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentInquiries.length === 0 ? (
              <div className="text-center py-10 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
                <MailCheck className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-medium">No inquiries received yet.</p>
                <p className="text-3xs text-slate-400 mt-1">Submit test lead via /contact form.</p>
              </div>
            ) : (
              recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      {inq.fullName ? inq.fullName.charAt(0).toUpperCase() : 'U'}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {inq.fullName}
                        </p>
                        <span
                          className={`text-3xs px-2 py-0.5 rounded-md font-extrabold uppercase tracking-wider ${
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
                      <p className="text-3xs text-slate-500 truncate mt-0.5 font-mono">
                        {inq.email} • <span className="font-sans font-medium text-slate-700">{inq.topic}</span>
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/admin/inquiries"
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 hover:border-blue-600 text-3xs font-bold shadow-2xs transition-all whitespace-nowrap cursor-pointer"
                  >
                    Triage Lead
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Active Courses Catalog Preview */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <h2 className="text-base font-extrabold text-slate-900">Active Catalog</h2>
              </div>
              <p className="text-3xs text-slate-500 mt-0.5">Programmes visible on public website</p>
            </div>
            <Link
              href="/admin/courses"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
            >
              <span>Manage ({courses.length})</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentCourses.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 text-blue-600 flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs shadow-2xs">
                    {c.imageUrl ? (
                      <img src={c.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <GraduationCap className="h-6 w-6" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {c.title}
                    </p>
                    <p className="text-3xs text-slate-500 truncate mt-0.5">
                      {c.instructor.name} • {c.duration}
                    </p>
                    <p className="text-3xs font-mono text-blue-600 font-semibold truncate mt-0.5">
                      /courses/{c.slug}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-slate-900">{formatCurrency(c.price)}</p>
                  <span className="text-3xs px-2 py-0.5 rounded-md font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block mt-1">
                    Live
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
