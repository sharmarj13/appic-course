"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ArrowRight,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { PageSEO } from '../../components/common/PageSEO';
import { Container } from '../../components/common/Container';
import { Button } from '../../components/common/Button';

interface FaqItem {
  question: string;
  answer: string;
  category: 'Admissions' | 'Curriculum & Projects' | 'Mentorship & Support' | 'Career & Placement' | 'Fees & Billing';
}

const FAQ_CATEGORIES = [
  'All',
  'Admissions',
  'Curriculum & Projects',
  'Mentorship & Support',
  'Career & Placement',
  'Fees & Billing',
] as const;

const FAQ_DATA: FaqItem[] = [
  {
    category: 'Admissions',
    question: 'Are there any prerequisites required before enrolling in Appic Skill programmes?',
    answer:
      'Prerequisites depend on the specific track. Our foundational Full Stack and Frontend tracks assume basic computer literacy and problem-solving skills, starting with programming fundamentals. Specialized advanced tracks (such as AI Engineering or Distributed Systems) recommend familiarity with JavaScript/TypeScript or Python and basic data structures.',
  },
  {
    category: 'Admissions',
    question: 'How do I know which programme track is best for my experience level?',
    answer:
      'You can reach out directly via our Contact page or request a 15-minute diagnostic call with an academic advisor. We review your current technical background, target companies or roles, and advise on the most effective syllabus pathway.',
  },
  {
    category: 'Curriculum & Projects',
    question: 'Are the projects based on realistic production architectures or simple tutorial apps?',
    answer:
      'Every project in our curriculum is modeled after authentic engineering specifications from high-growth tech companies. You will build end-to-end architectures complete with database schema migrations, automated unit and integration tests, containerized deployments, and clean CI/CD pipelines.',
  },
  {
    category: 'Curriculum & Projects',
    question: 'Do I get permanent access to course materials and future syllabus updates?',
    answer:
      'Yes! Enrollment grants lifetime access to all recorded video modules, interactive quizzes, downloadable guides, and GitHub project template repositories, including future syllabus additions.',
  },
  {
    category: 'Mentorship & Support',
    question: 'Who are the mentors and how do 1-on-1 feedback sessions work?',
    answer:
      'Our mentors are actively practicing staff software engineers, technical architects, and tech leads from top technology companies. When you submit milestones or capstones, mentors provide personalized async code reviews as well as scheduled 1-on-1 office hours to debug complex bottlenecks.',
  },
  {
    category: 'Mentorship & Support',
    question: 'What happens if I get stuck while working on an assignment or bug?',
    answer:
      'You have continuous access to our private learner community and dedicated TA debugging desk. Most technical queries receive responses and code pointers within a few hours.',
  },
  {
    category: 'Career & Placement',
    question: 'How does Appic Skill assist with job placement and interviews?',
    answer:
      'We offer extensive career acceleration support, including resume and portfolio audits, system design mock interviews, algorithmic coding clinics, and direct referral intros through our alumni network and hiring partners.',
  },
  {
    category: 'Career & Placement',
    question: 'Will I receive a verifiable certificate upon programme completion?',
    answer:
      'Yes. Upon passing capstone review benchmarks, you receive an accredited Appic Skill credential with an immutable online verification URL and badge ready to feature on your LinkedIn profile and resume.',
  },
  {
    category: 'Fees & Billing',
    question: 'Are installment plans or interest-free EMI options available?',
    answer:
      'Yes, we offer flexible 3-month and 6-month interest-free installment plans during checkout. We also partner with major banking institutions to support split-payment options.',
  },
  {
    category: 'Fees & Billing',
    question: 'What is your refund policy if the programme does not meet my expectations?',
    answer:
      'We maintain an unconditional 7-day money-back guarantee. If you feel the curriculum or pedagogy is not the right fit for you, simply email support@appicskill.edu within 7 days of purchase for a complete refund.',
  },
];

import { useSiteData } from '../../context/SiteDataContext';

export default function FaqsPage() {
  const { faqs } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50">
      <PageSEO
        title="Frequently Asked Questions (FAQs) | Appic Skill"
        description="Clear answers to common questions about syllabus prerequisites, mentorship, hands-on production projects, job preparation, and enrollment policies."
      />

      {/* Classic Elevated Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-14 pb-16 lg:pt-18 lg:pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-100/60 via-indigo-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-2xs">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Answers & Clear Guidance</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18]">
              Frequently Asked{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Questions
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Everything you need to know about our pedagogy, mentor clinics, industry capstones, and enrollment terms in one transparent place.
            </p>

            {/* Live Search */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter questions (e.g. refund, prerequisites, certificate)..."
                  className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-md shadow-slate-100 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 transition-all"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main FAQ Section */}
      <section className="py-12 lg:py-18">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {FAQ_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOpenIndex(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Accordion List */}
            {filteredFaqs.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
                <HelpCircle className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900">No matching questions found</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Try adjusting your search query or reach out to our advisory team directly.
                </p>
                <div className="mt-5">
                  <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
                    Reset Search
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-all duration-150"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-sm sm:text-base gap-4"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/50 whitespace-nowrap hidden sm:inline-block">
                            {faq.category}
                          </span>
                          <span>{faq.question}</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-blue-600' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Support Callout Card */}
            <div className="mt-14 rounded-3xl bg-slate-900 text-white p-8 sm:p-10 border border-slate-800 shadow-xl text-center space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Still have a specific question about your situation?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Our academic advisors review career backgrounds, syllabus doubts, and prerequisite questions every business day with zero sales pressure.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="primary"
                  href="/contact"
                  size="md"
                  className="w-full sm:w-auto shadow-md"
                >
                  <span>Talk with an Advisor</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  href="/courses"
                  size="md"
                  className="w-full sm:w-auto bg-transparent border-slate-700 text-white hover:bg-slate-800"
                >
                  Explore Course Catalog
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
