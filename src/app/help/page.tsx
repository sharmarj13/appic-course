"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  GraduationCap,
  CreditCard,
  UserCheck,
  ShieldCheck,
  Award,
  ChevronDown,
  ArrowRight,
  Mail,
  MessageSquare,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { PageSEO } from '../../components/common/PageSEO';
import { Container } from '../../components/common/Container';
import { Button } from '../../components/common/Button';

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  articlesCount: number;
}

const CATEGORIES: HelpCategory[] = [
  {
    id: 'admissions',
    title: 'Admissions & Prerequisites',
    description: 'Enrolling in courses, eligibility criteria, and preparation materials.',
    icon: GraduationCap,
    articlesCount: 6,
  },
  {
    id: 'portal',
    title: 'Course Access & LMS Portal',
    description: 'Logging in, accessing video lessons, source code, and project repos.',
    icon: BookOpen,
    articlesCount: 8,
  },
  {
    id: 'billing',
    title: 'Billing, Fees & Invoices',
    description: 'Payment receipts, installment plans, GST invoices, and refund requests.',
    icon: CreditCard,
    articlesCount: 5,
  },
  {
    id: 'mentorship',
    title: 'Live Mentorship & Code Reviews',
    description: 'Scheduling 1-on-1 sessions, office hours, and submitting assignments.',
    icon: UserCheck,
    articlesCount: 7,
  },
  {
    id: 'certificates',
    title: 'Certification & Verification',
    description: 'Capstone project evaluations, digital credentials, and LinkedIn badges.',
    icon: Award,
    articlesCount: 4,
  },
  {
    id: 'security',
    title: 'Account Security & Privacy',
    description: 'Password resets, email updates, and data privacy options.',
    icon: ShieldCheck,
    articlesCount: 4,
  },
];

const POPULAR_ARTICLES = [
  {
    title: 'How do I access GitHub repositories and starter code for course projects?',
    category: 'Course Access',
    answer:
      'Once enrolled, access your course dashboard. In the "Resources" tab of each module, you will find direct links to private starter repositories, setup scripts, and Figma design specifications.',
  },
  {
    title: 'What is the refund policy for self-paced and cohort programmes?',
    category: 'Billing',
    answer:
      'We offer a 7-day no-questions-asked refund policy for all self-paced programmes starting from the enrollment date. For live cohorts, refunds are available up to 48 hours prior to the second live lecture.',
  },
  {
    title: 'How do 1-on-1 mentor code reviews work?',
    category: 'Live Mentorship',
    answer:
      'Submit your completed project pull request via the dashboard. An allocated staff engineer or senior mentor will review your architecture, clean code standards, and deliver personalized line-by-line video or inline commentary within 48 hours.',
  },
  {
    title: 'Can my company sponsor my tuition or provide educational reimbursement?',
    category: 'Billing & Enterprise',
    answer:
      'Yes! We provide official GST-compliant tax invoices and customized employer reimbursement letters with itemized syllabus breakdowns to submit to your HR or L&D department.',
  },
  {
    title: 'How are course completion certificates verified by employers?',
    category: 'Certification',
    answer:
      'Every Appic Skill certificate includes a unique cryptographic verification hash and permanent public URL that recruiters can inspect directly to confirm authentic syllabus completion and capstone grades.',
  },
];

import { useSiteData } from '../../context/SiteDataContext';

export default function HelpCenterPage() {
  const { helpArticles, settings } = useSiteData();
  const [searchQuery, setSearchQuery] = useState('');
  const [openArticle, setOpenArticle] = useState<number | null>(0);

  const filteredArticles = helpArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50">
      <PageSEO
        title="Help Center – Learner Support & Knowledge Base | Appic Skill"
        description="Find answers to common questions about course enrollment, LMS dashboard, live mentor clinics, billing, and project certification."
      />

      {/* Classic Elevated Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-14 pb-20 lg:pt-18 lg:pb-24">
        {/* Soft Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-100/60 via-indigo-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-2xs">
              <HelpCircle className="h-4 w-4 text-blue-600" />
              <span>Learner Advisory & Support Knowledge Base</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18]">
              How Can We Help You{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Succeed?
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Browse our guides, search answers regarding syllabus access and mentor clinics, or reach out directly to our dedicated support desk.
            </p>

            {/* Classic Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles (e.g., refunds, certificates, mentors)..."
                  className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-md shadow-slate-100 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 transition-all"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Support Categories Grid */}
      <section className="py-14 lg:py-18">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Explore by Category
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Select a domain below to browse articles, FAQs, and setup instructions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="group rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 cursor-pointer"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-blue-600">
                    <span>{cat.articlesCount} Guides available</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Popular Articles Accordion */}
      <section className="py-14 lg:py-18 bg-white border-t border-slate-200/80">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                Top Inquiries
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Frequently Viewed Guides
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Clear answers to the most common learner and enterprise questions.
              </p>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8 text-center text-slate-600">
                <p className="font-semibold text-slate-900">No articles matched your search.</p>
                <p className="text-xs mt-1">Try different terms or browse the categories above.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredArticles.map((article, idx) => {
                  const isOpen = openArticle === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-150"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenArticle(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-sm sm:text-base gap-4"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60 whitespace-nowrap hidden sm:inline-block">
                            {article.category}
                          </span>
                          <span>{article.title}</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-blue-600' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                          {article.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Direct Contact Banner */}
            <div className="mt-12 rounded-3xl bg-slate-950 text-white p-8 sm:p-10 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-xl font-bold text-white">
                  Still have questions or need assistance?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                  Our academic advisors and student support desk are available Monday through Friday.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <Button
                  variant="primary"
                  href="/contact"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  <span>Contact Advisory Desk</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <a
                  href={`mailto:${settings.supportEmail}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-300 text-sm font-semibold transition-colors w-full sm:w-auto"
                >
                  <Mail className="h-4 w-4" />
                  <span>{settings.supportEmail}</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
