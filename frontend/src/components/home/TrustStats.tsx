"use client";
import React from 'react';
import { Container } from '../common/Container';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { useSiteData } from '../../context/SiteDataContext';

const COMPANY_CATEGORIES = [
  'Enterprise Cloud & SaaS',
  'Global FinTech Systems',
  'Applied AI Laboratories',
  'Digital Product Studios',
  'HealthTech Infrastructure',
  'High-Growth Commerce',
];

export function TrustStats() {
  const { home } = useSiteData();
  const { reviews } = home;

  // Extract numeric portion for counter if possible
  const parseNum = (str: string, fallback: number) => {
    const match = str?.match(/\d+/);
    return match ? parseInt(match[0], 10) : fallback;
  };

  const STATS = [
    {
      id: 'stat-students',
      value: parseNum(reviews.studentsCount, 50),
      suffix: 'K+',
      label: 'Students Placed',
      detail: 'Building careers across engineering, design, data & product',
    },
    {
      id: 'stat-completion',
      value: 95,
      suffix: '%',
      label: 'Completion Rate',
      detail: 'Supported by weekly live clinics and 1-on-1 mentor reviews',
    },
    {
      id: 'stat-mentors',
      value: parseNum(reviews.partnersCount, 300),
      suffix: '+',
      label: 'Partner Companies',
      detail: 'Hiring graduates directly across global software teams',
    },
    {
      id: 'stat-reviews',
      value: parseNum(reviews.reviewsCount, 41),
      suffix: 'K+',
      label: 'Learner Reviews',
      detail: 'Verified feedback with exceptional satisfaction rating',
    },
  ];

  return (
    <section className="pb-14 lg:pb-18 bg-white border-b border-slate-200/80">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            Trusted by learners building careers at leading companies
          </p>
          {/* Neutral text-based company categories */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold text-slate-400">
            {COMPANY_CATEGORIES.map((category) => (
              <span key={category} className="tracking-tight">
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-6 border-t border-slate-100">
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className="rounded-2xl bg-slate-50/70 border border-slate-200/70 p-6 transition-colors hover:bg-slate-50"
            >
              <p className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <h3 className="mt-2 text-sm font-bold text-slate-900">{stat.label}</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">{stat.detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
