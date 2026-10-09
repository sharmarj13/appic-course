"use client";
import React from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Scale,
  ShieldAlert,
  Clock,
  Mail,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { PageSEO } from '../../components/common/PageSEO';
import { Container } from '../../components/common/Container';
import { useSiteData } from '../../context/SiteDataContext';

export default function TermsOfServicePage() {
  const { legal, settings } = useSiteData();
  const { terms } = legal;

  return (
    <div className="min-h-screen bg-slate-50/50">
      <PageSEO
        title="Terms of Service | Appic Skill"
        description="Review the terms and conditions governing enrollment, platform access, code of conduct, and refund guidelines at Appic Skill."
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-14 pb-16 lg:pt-18 lg:pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-100/60 via-indigo-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-2xs">
              <Scale className="h-4 w-4 text-blue-600" />
              <span>Platform Guidelines & Student Agreement</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18]">
              Terms of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Service
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Please review these terms carefully before enrolling in courses, participating in mentor clinics, or accessing our LMS platform.
            </p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Last Updated & Effective Date: {terms.lastUpdated}
            </p>
          </div>
        </Container>
      </section>

      {/* Core Terms Highlights */}
      <section className="py-10 bg-white border-b border-slate-200/80">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-5 space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">7-Day Money-Back Guarantee</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full refunds available within 7 days of course purchase if you are not satisfied with your experience.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-5 space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Lifetime Access</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enjoy perpetual access to all purchased course modules, future curriculum updates, and repositories.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-5 space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Your Code, Your IP</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All source code, applications, and architectures you build during capstone projects remain 100% yours.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Detailed Legal Sections */}
      <section className="py-14 lg:py-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12 text-slate-700 leading-relaxed">
            {terms.sections.map((section, idx) => (
              <div key={section.id || idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                  <span className="text-blue-600 font-mono text-lg">
                    {section.number ? `${section.number}.` : `${(idx + 1).toString().padStart(2, '0')}.`}
                  </span>
                  {section.title}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-slate-600">
                    {p}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 pl-2">
                    {section.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Contact Box */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
                <Mail className="h-5 w-5 text-blue-600" />
                <h3>Legal & Compliance Inquiries</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For questions regarding these terms, institutional agreements, or billing documentation, reach our legal counsel at:
              </p>
              <p className="text-sm font-semibold text-blue-600">
                <a href={`mailto:${settings.supportEmail}`} className="hover:underline">
                  {settings.supportEmail}
                </a>{' '}
                · Legal & Admissions Office
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
