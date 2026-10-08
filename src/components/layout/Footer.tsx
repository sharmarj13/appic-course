"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Container } from '../common/Container';
import { useSiteData } from '../../context/SiteDataContext';

export function Footer() {
  const { settings } = useSiteData();

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-800/90 overflow-hidden">
      {/* Subtle Ambient Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[200px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[200px] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 py-14 lg:py-18">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 items-start">
          
          {/* Brand Column (5 columns on lg) */}
          <div className="lg:col-span-5 max-w-sm space-y-4">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-extrabold tracking-tight text-white inline-flex items-center gap-2 group"
            >
              <span>{settings.siteName}</span>
              <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
            </Link>

            <p className="text-sm leading-relaxed text-slate-400">
              {settings.tagline}
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${settings.supportEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.supportEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                <span>Verified Curriculum · Industry Mentorship</span>
              </div>
            </div>
          </div>

          {/* Platform Column (3 columns on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-200">
              Platform
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Courses</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Contact</span>
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column (4 columns on lg - As shown in user image) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-200">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/help"
                  className="hover:text-white transition-colors block"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="hover:text-white transition-colors block"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors block"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{settings.copyrightText}</p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <Link href="/help" className="hover:text-slate-300 transition-colors">
              Help Center
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Learner Advisory
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
