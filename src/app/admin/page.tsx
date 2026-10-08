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
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Settings,
  HelpCircle,
  Phone,
  Scale,
  Image as ImageIcon
} from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { formatCurrency } from '../../lib/utils';

export default function AdminDashboardPage() {
  const { courses, blogs, inquiries, settings, faqs, helpArticles } = useSiteData();

  const newInquiries = inquiries.filter((i) => i.status === 'New');
  const recentInquiries = inquiries.slice(0, 5);
  const recentCourses = courses.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Welcome & Top Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              Executive Overview
            </span>
            <span className="text-slate-400 text-xs">• Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome, Administrator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your entire website content, courses catalog, editorial blogs, learner inquiries, and assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Course</span>
          </Link>
          <Link
            href="/admin/home"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-colors"
          >
            <Home className="h-4 w-4 text-blue-600" />
            <span>Edit Home</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Active Leads */}
        <Link
          href="/admin/inquiries"
          className="group rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-blue-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Learner Inquiries</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <MailCheck className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-4 text-3xl font-extrabold text-slate-900 tracking-tight">
            {inquiries.length}
          </p>
          <div className="mt-2 flex items-center justify-between text-3xs">
            <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {newInquiries.length} New unread
            </span>
            <span className="text-slate-400 group-hover:text-blue-600 flex items-center transition-colors font-medium">
              Manage <ArrowRight className="h-3 w-3 ml-0.5" />
            </span>
          </div>
        </Link>

        {/* Card 2: Published Courses */}
        <Link
          href="/admin/courses"
          className="group rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-indigo-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Live Courses</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <GraduationCap className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-4 text-3xl font-extrabold text-slate-900 tracking-tight">
            {courses.length}
          </p>
          <div className="mt-2 flex items-center justify-between text-3xs">
            <span className="text-slate-500 font-medium">Full Catalog</span>
            <span className="text-slate-400 group-hover:text-indigo-600 flex items-center transition-colors font-medium">
              Manage <ArrowRight className="h-3 w-3 ml-0.5" />
            </span>
          </div>
        </Link>

        {/* Card 3: Editorial Articles */}
        <Link
          href="/admin/blogs"
          className="group rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-purple-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Blog Publications</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-4 text-3xl font-extrabold text-slate-900 tracking-tight">
            {blogs.length}
          </p>
          <div className="mt-2 flex items-center justify-between text-3xs">
            <span className="text-slate-500 font-medium">Published Articles</span>
            <span className="text-slate-400 group-hover:text-purple-600 flex items-center transition-colors font-medium">
              Manage <ArrowRight className="h-3 w-3 ml-0.5" />
            </span>
          </div>
        </Link>

        {/* Card 4: Knowledge & FAQs */}
        <Link
          href="/admin/faqs"
          className="group rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-emerald-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Knowledge Items</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <HelpCircle className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-4 text-3xl font-extrabold text-slate-900 tracking-tight">
            {faqs.length + helpArticles.length}
          </p>
          <div className="mt-2 flex items-center justify-between text-3xs">
            <span className="text-slate-500 font-medium">FAQs & Help Guides</span>
            <span className="text-slate-400 group-hover:text-emerald-600 flex items-center transition-colors font-medium">
              Manage <ArrowRight className="h-3 w-3 ml-0.5" />
            </span>
          </div>
        </Link>
      </div>

      {/* Quick Action Navigation Grid */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Quick Jump Shortcuts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Home Page', href: '/admin/home', icon: Home, color: 'text-blue-600' },
            { label: 'Courses', href: '/admin/courses', icon: GraduationCap, color: 'text-indigo-600' },
            { label: 'Blogs', href: '/admin/blogs', icon: BookOpen, color: 'text-purple-600' },
            { label: 'Media Library', href: '/admin/media', icon: ImageIcon, color: 'text-rose-600' },
            { label: 'Compliance', href: '/admin/legal', icon: Scale, color: 'text-amber-600' },
            { label: 'Site Settings', href: '/admin/settings', icon: Settings, color: 'text-slate-600' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="p-4 rounded-xl border border-slate-200/90 bg-white hover:bg-blue-50/50 hover:border-blue-200 transition-all text-center group flex flex-col items-center justify-center gap-2 shadow-xs hover:shadow-sm"
              >
                <Icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Two-Column Section: Recent Inquiries + Recent Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Inquiries Feed */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Learner Inquiries</h2>
              <p className="text-3xs text-slate-500">Leads captured through the public Contact page</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All ({inquiries.length})</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentInquiries.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">
                No inquiries received yet. Test by submitting the contact form on /contact.
              </p>
            ) : (
              recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/60 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {inq.fullName}
                      </p>
                      <span
                        className={`text-3xs px-2 py-0.5 rounded-full font-semibold ${
                          inq.status === 'New'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : inq.status === 'Contacted'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-3xs text-slate-500 truncate mt-0.5 font-mono">
                      {inq.email} • {inq.topic}
                    </p>
                  </div>

                  <Link
                    href="/admin/inquiries"
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-3xs font-semibold shadow-xs transition-all whitespace-nowrap"
                  >
                    Triage Lead
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Active Courses Catalog Preview */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Active Courses</h2>
              <p className="text-3xs text-slate-500">Highlighted programmes on public catalog</p>
            </div>
            <Link
              href="/admin/courses"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Manage ({courses.length})</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentCourses.map((c) => (
              <div
                key={c.id}
                className="p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/60 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-blue-600 flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs">
                    {c.imageUrl ? (
                      <img src={c.imageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <GraduationCap className="h-5 w-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {c.title}
                    </p>
                    <p className="text-3xs text-slate-500 truncate">
                      {c.instructor.name} • {c.duration}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-slate-900">{formatCurrency(c.price)}</p>
                  <span className="text-3xs text-blue-600 font-semibold">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
