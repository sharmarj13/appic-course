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
  ShieldCheck,
  Database,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const NAV_GROUPS = [
  {
    label: 'Overview & Operations',
    items: [
      { label: 'Executive Dashboard', href: '/admin', icon: LayoutDashboard },
      { label: 'Leads & Inquiries', href: '/admin/inquiries', icon: MailCheck, hasBadge: true },
    ],
  },
  {
    label: 'Curriculum & Content',
    items: [
      { label: 'Homepage Sections', href: '/admin/home', icon: Home },
      { label: 'Courses Catalog', href: '/admin/courses', icon: GraduationCap },
      { label: 'Blog & Editorial', href: '/admin/blogs', icon: BookOpen },
    ],
  },
  {
    label: 'Knowledge & Policies',
    items: [
      { label: 'FAQs Knowledgebase', href: '/admin/faqs', icon: HelpCircle },
      { label: 'Help Center', href: '/admin/help', icon: LifeBuoy },
      { label: 'Legal & Terms', href: '/admin/legal', icon: Scale },
    ],
  },
  {
    label: 'Configuration & Assets',
    items: [
      { label: 'Media & 3D Assets', href: '/admin/media', icon: ImageIcon },
      { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

export function AdminSidebar({ mobileOpen = false, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const { inquiries, settings } = useSiteData();

  const newInquiriesCount = inquiries.filter((inq) => inq.status === 'New').length;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white text-slate-800 border-r border-emerald-900/10 w-72 select-none relative shadow-[1px_0_12px_rgba(6,78,59,0.04)]">
      
      {/* Classic Executive Brand Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-900/10 bg-white z-10">
        <Link href="/admin" className="flex items-center gap-3.5 group cursor-pointer">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-amber-300 flex items-center justify-center font-serif font-bold text-base tracking-tight shadow-md border border-emerald-700/40 group-hover:shadow-emerald-900/20 group-hover:scale-105 transition-all">
            AS
          </div>
          <div className="min-w-0">
            <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors truncate block">
              {settings.siteName || 'Appic Skill'}
            </span>
            <p className="text-xs font-semibold text-emerald-800/70 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block shadow-xs shadow-emerald-500/50" />
              <span>Executive Console</span>
            </p>
          </div>
        </Link>

        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-emerald-900 hover:bg-emerald-50 transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation Groups with Classic Proportions */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7 scrollbar-none z-10">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="space-y-1.5">
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-emerald-900/45 mb-2">
              {group.label}
            </p>
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
                    className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-950 to-emerald-900 text-white font-semibold shadow-md shadow-emerald-950/20 border border-emerald-800/80'
                        : 'text-slate-600 hover:text-emerald-950 hover:bg-emerald-50/70'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                          isActive
                            ? 'text-amber-300'
                            : 'text-slate-400 group-hover:text-emerald-800'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.hasBadge && newInquiriesCount > 0 && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-bold shadow-xs ${
                            isActive
                              ? 'bg-amber-400 text-emerald-950'
                              : 'bg-amber-500 text-white'
                          }`}
                        >
                          {newInquiriesCount} new
                        </span>
                      )}
                      {isActive && (
                        <ChevronRight className="w-4 h-4 text-emerald-300/80" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Client State Persistence Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/50 border border-emerald-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-700" />
              <span>Client State Sync</span>
            </span>
            <span className="text-xs text-emerald-800 font-bold bg-white px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
              Live
            </span>
          </div>
          <p className="text-xs text-emerald-900/70 leading-relaxed">
            All edits are synchronized and preserved in browser local storage.
          </p>
        </div>
      </div>

      {/* Classic Administrator Profile Footer */}
      <div className="p-4 border-t border-emerald-900/10 space-y-3 z-10 bg-white">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-900/80 hover:text-emerald-950 hover:bg-emerald-50/80 border border-emerald-200/70 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-emerald-600" />
            <span>Open Public Website</span>
          </span>
          <span className="text-[10px] text-emerald-700 uppercase font-bold bg-emerald-100/70 px-1.5 py-0.5 rounded">Live</span>
        </Link>

        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs flex items-center justify-center shrink-0">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Administrator</p>
              <p className="text-[11px] text-slate-500 truncate">{settings.supportEmail || 'admin@appicskill.edu'}</p>
            </div>
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

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="md:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
