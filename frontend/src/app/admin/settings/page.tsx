"use client";
import React, { useState } from 'react';
import {
  Settings,
  Building,
  Mail,
  Phone,
  Clock,
  Globe,
  Save,
  RotateCcw,
  Sparkles,
  Check,
  ExternalLink,
  Shield,
  MessageSquare
} from 'lucide-react';
import { useSiteData, SiteSettings } from '../../../context/SiteDataContext';
import Link from 'next/link';

export default function AdminSettingsPage() {
  const { settings, updateSettings, resetAllData } = useSiteData();
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [savedNotice, setSavedNotice] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  // Sync if context updates
  React.useEffect(() => {
    setFormData({ ...settings });
  }, [settings]);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/90">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-900 border border-emerald-200">
              System Configuration
            </span>
            <span className="text-slate-400 text-xs font-medium">• Global Sync Across Public Site</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Global Site Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure platform branding, contact emails, hotline numbers, operational timings, and footer copyright.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50/60 hover:text-emerald-950 hover:border-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            <span>View Live Site</span>
          </Link>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-950 to-emerald-900 hover:from-emerald-900 hover:to-emerald-800 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-emerald-900/20 border border-emerald-800 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4 text-emerald-300" />
            <span>{savedNotice ? 'Saved!' : 'Save Settings'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Brand & Identity Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Brand & Visual Identity</h2>
              <p className="text-xs text-slate-500">Controls headers, navigation bars, and page titles</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Site Name (Brand Title)
              </label>
              <input
                type="text"
                required
                value={formData.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Appic Skill"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Logo Wordmark Text
              </label>
              <input
                type="text"
                required
                value={formData.logoText}
                onChange={(e) => handleChange('logoText', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                placeholder="Appic Skill"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Custom Logo Image URL (Optional)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={(e) => handleChange('logoUrl', e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 font-mono text-xs"
                  placeholder="https://... or /logo.png (leave empty to use styled wordmark)"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                If provided, will replace the text wordmark in header and footer.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Global Tagline & Value Proposition
              </label>
              <textarea
                rows={2}
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                placeholder="Self-paced technical and professional programmes..."
              />
            </div>
          </div>
        </div>

        {/* Contact & Support Channels Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Contact & Support Channels</h2>
              <p className="text-xs text-slate-500">Displayed in footer, contact form, and help desk</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Primary Support Email
              </label>
              <input
                type="email"
                required
                value={formData.supportEmail}
                onChange={(e) => handleChange('supportEmail', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                placeholder="support@appicskill.edu"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Admissions & Enrollment Email
              </label>
              <input
                type="email"
                required
                value={formData.admissionsEmail}
                onChange={(e) => handleChange('admissionsEmail', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                placeholder="admissions@appicskill.edu"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Official Helpline (Phone)
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                placeholder="+1 (415) 890-4320"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                WhatsApp Support Hotline
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                placeholder="+91 9887354080"
              />
            </div>
          </div>
        </div>

        {/* Headquarters & Operational Hours */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Headquarters & Operational Hours</h2>
              <p className="text-xs text-slate-500">Shows learners office locations and advisory desk hours</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Physical Campus / Headquarters Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                placeholder="548 Market Street, Suite 420, San Francisco, CA 94104"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Weekday Hours
              </label>
              <input
                type="text"
                value={formData.hoursWeekdays}
                onChange={(e) => handleChange('hoursWeekdays', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                placeholder="Mon – Fri: 8:00 AM – 7:00 PM EST"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Weekend Hours
              </label>
              <input
                type="text"
                value={formData.hoursWeekends}
                onChange={(e) => handleChange('hoursWeekends', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                placeholder="Sat: 9:00 AM – 2:00 PM EST"
              />
            </div>
          </div>
        </div>

        {/* Footer & Copyright */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Footer & Copyright Notices</h2>
              <p className="text-xs text-slate-500">Controls the legal trademark and year line</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Copyright Notice
            </label>
            <input
              type="text"
              value={formData.copyrightText}
              onChange={(e) => handleChange('copyrightText', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 font-mono text-xs"
              placeholder="© 2026 Appic Skill. All rights reserved."
            />
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setResetConfirm(true)}
            className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Website Data to Defaults
          </button>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              {savedNotice ? 'Changes Applied Live!' : 'Save & Sync Settings'}
            </button>
          </div>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      {resetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Reset All Website Data?</h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              This will restore all courses, blogs, FAQs, help guides, legal text, and site settings back to the initial demo state.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllData();
                  setResetConfirm(false);
                  window.location.reload();
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs"
              >
                Confirm Factory Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
