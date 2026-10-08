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
  Sparkles
} from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { label: 'Leads & Inquiries', href: '/admin/inquiries', icon: MailCheck, hasBadge: true },
    ],
  },
  {
    label: 'Page Content',
    items: [
      { label: 'Home Page', href: '/admin/home', icon: Home },
      { label: 'Courses Catalog', href: '/admin/courses', icon: GraduationCap },
      { label: 'Blog & Insights', href: '/admin/blogs', icon: BookOpen },
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
      { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
      { label: 'Global Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

export function AdminSidebar({ mobileOpen = false, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const { inquiries, settings } = useSiteData();

  const newInquiriesCount = inquiries.filter((inq) => inq.status === 'New').length;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white text-slate-700 border-r border-slate-200/90 w-64 select-none relative shadow-xs">
      {/* Brand Header */}
      <div className="relative flex items-center justify-between px-6 py-5 border-b border-slate-100 z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold tracking-tight text-slate-900">
              {settings.siteName}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-3xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              Admin
            </span>
          </div>
          <p className="text-3xs text-slate-500 mt-0.5 font-medium tracking-wide">
            Executive Portal
          </p>
        </div>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6 scrollbar-none z-10">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="space-y-1">
            <p className="px-3 text-3xs font-bold uppercase tracking-wider text-slate-400 mb-2">
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
                    className={`relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all duration-150 ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.hasBadge && newInquiriesCount > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-3xs font-extrabold shadow-xs ${
                        isActive
                          ? 'bg-white text-blue-700'
                          : 'bg-blue-600 text-white'
                      }`}>
                        {newInquiriesCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Quick Links */}
      <div className="p-4 border-t border-slate-100 space-y-3 z-10 bg-slate-50/60">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-xs"
        >
          <span>View Live Site</span>
          <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
        </Link>

        <div className="flex items-center gap-3 px-2 py-1.5 bg-white rounded-xl border border-slate-200/80">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-xs">
            AS
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-800 truncate">Administrator</p>
            <p className="text-3xs text-emerald-600 truncate flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Full Privileges Active
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
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs"
          />
          <div className="relative z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}
