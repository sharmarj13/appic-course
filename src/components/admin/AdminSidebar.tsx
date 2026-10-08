"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Home,
  GraduationCap,
  BookOpen,
  MailCheck,
  HelpCircle,
  LifeBuoy,
  Scale,
  Settings,
  Image as ImageIcon,
  ExternalLink,
  X,
  Sparkles,
  ChevronRight,
  Database,
  Activity
} from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const NAV_GROUPS = [
  {
    label: 'Core Portal',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { label: 'Leads & Inquiries', href: '/admin/inquiries', icon: MailCheck, hasBadge: true },
    ],
  },
  {
    label: 'Content & Catalog',
    items: [
      { label: 'Homepage Sections', href: '/admin/home', icon: Home },
      { label: 'Courses Catalog', href: '/admin/courses', icon: GraduationCap },
      { label: 'Blog & Editorial', href: '/admin/blogs', icon: BookOpen },
    ],
  },
  {
    label: 'Resources & Support',
    items: [
      { label: 'FAQs Manager', href: '/admin/faqs', icon: HelpCircle },
      { label: 'Help Center', href: '/admin/help', icon: LifeBuoy },
      { label: 'Legal (Privacy/Terms)', href: '/admin/legal', icon: Scale },
    ],
  },
  {
    label: 'System & Assets',
    items: [
      { label: 'Media & 3D Assets', href: '/admin/media', icon: ImageIcon },
      { label: 'Global Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

export function AdminSidebar({ mobileOpen = false, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const { inquiries, settings } = useSiteData();

  const newInquiriesCount = inquiries.filter((inq) => inq.status === 'New').length;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-gradient-to-b from-white via-slate-50/70 to-slate-100/50 text-slate-700 border-r border-slate-200/90 w-72 select-none relative shadow-sm">
      {/* Brand Header */}
      <div className="relative flex items-center justify-between px-6 py-5 border-b border-slate-200/80 bg-white/80 backdrop-blur-xs z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-900 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-900/20 border border-blue-500/30">
            <Sparkles className="w-5 h-5 text-blue-200" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold tracking-tight text-slate-900 truncate">
                {settings.siteName || 'Appic Skill'}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-3xs font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                PRO
              </span>
            </div>
            <p className="text-3xs text-slate-500 font-semibold tracking-wider uppercase mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Executive Suite
            </p>
          </div>
        </div>

        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 scrollbar-none z-10">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="space-y-1">
            <div className="px-3 pb-1 flex items-center justify-between">
              <p className="text-3xs font-extrabold uppercase tracking-widest text-slate-400">
                {group.label}
              </p>
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 via-indigo-50/60 to-white text-blue-950 font-bold border border-blue-200/90 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/80 font-medium hover:border hover:border-slate-200/60'
                    }`}
                  >
                    {/* Active Accent Indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-blue-600" />
                    )}

                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-7 h-7 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-800'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.hasBadge && newInquiriesCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-3xs font-black tracking-wide bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs">
                          {newInquiriesCount} new
                        </span>
                      )}
                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* System Health / Sync Mini Card */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-3xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5 text-slate-700">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>Storage Sync</span>
            </span>
            <span className="text-emerald-700 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Online
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full w-[88%] rounded-full" />
          </div>
          <p className="text-3xs text-slate-400">
            Local Persistence + Instant Sync active
          </p>
        </div>
      </div>

      {/* Footer Quick Links & User Badge */}
      <div className="p-4 border-t border-slate-200/80 space-y-3 z-10 bg-white/90 backdrop-blur-xs">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl border border-slate-200/90 bg-slate-50 hover:bg-white text-xs font-bold text-slate-800 hover:text-blue-700 transition-all shadow-2xs group cursor-pointer"
        >
          <span>Open Live Website</span>
          <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
        </Link>

        <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-xs font-extrabold text-white shadow-xs ring-2 ring-blue-100">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-extrabold text-slate-900 truncate">Admin Lead</p>
            <p className="text-3xs text-emerald-600 font-semibold truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Full Access Privileges
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
          />
          <div className="relative z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}
