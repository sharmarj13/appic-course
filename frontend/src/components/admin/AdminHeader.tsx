"use client";
import React from 'react';
import { Menu, RotateCcw, ExternalLink, ShieldCheck, Sparkles, Compass } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import Link from 'next/link';

interface AdminHeaderProps {
  onToggleMobileMenu: () => void;
  title?: string;
  subtitle?: string;
}

export function AdminHeader({ onToggleMobileMenu, title, subtitle }: AdminHeaderProps) {
  const { resetAllData } = useSiteData();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all site data to original factory defaults? Any custom edits will be reverted.')) {
      resetAllData();
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 px-4 sm:px-8 py-4 flex items-center justify-between gap-4 shadow-2xs">
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-emerald-50 hover:text-emerald-900 transition-colors cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          {title ? (
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {title}
            </h1>
          ) : (
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-xs shadow-emerald-500/50" />
              <span className="text-sm font-semibold text-slate-800">
                Administrative Workspace
              </span>
            </div>
          )}
          {subtitle && (
            <p className="text-xs text-slate-500 hidden sm:block mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Persistence live status badge */}
        <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200/90 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Live Auto-Save Active</span>
        </div>

        {/* Reset to defaults button */}
        <button
          type="button"
          onClick={handleReset}
          title="Reset all dynamic data to initial factory defaults"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-emerald-50/60 hover:text-emerald-950 hover:border-emerald-200 transition-colors shadow-2xs cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
          <span className="hidden sm:inline">Reset Defaults</span>
        </button>

        {/* View Public Website */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-950 to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all border border-emerald-800 cursor-pointer"
        >
          <span>View Site</span>
          <ExternalLink className="h-3.5 w-3.5 text-emerald-300" />
        </Link>
      </div>
    </header>
  );
}
