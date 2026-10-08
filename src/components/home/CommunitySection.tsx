"use client";
import React from 'react';
import { MessageSquare, GitPullRequest, Users, Compass, CheckCircle2 } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { useActionModal } from '../common/ActionModalContext';

const PILLARS = [
  {
    icon: GitPullRequest,
    title: 'Line-by-Line Code & Design Critiques',
    text: 'Share your GitHub pull requests or Figma token files for structured feedback from mentors and peers.',
  },
  {
    icon: MessageSquare,
    title: 'Topic-Specific Architecture Threads',
    text: 'Dedicated channels for Full Stack, UI/UX, Applied AI, SQL Analytics, and Career Interview Prep.',
  },
  {
    icon: Users,
    title: 'Weekly Peer Study & Accountability Groups',
    text: 'Join small cohort circles matched by time zone and target career track to stay consistent.',
  },
  {
    icon: Compass,
    title: 'Mock Interviews & Portfolio Defense',
    text: 'Practice explaining your system trade-offs and product case studies before real hiring loops.',
  },
];

export function CommunitySection() {
  const { openAuthModal } = useActionModal();

  return (
    <section id="community" className="py-8 lg:py-10 bg-[#F8FAFC] border-b border-slate-200/80">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
          {/* Left Column: Explanation & Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="Peer & Mentor Network"
              title="You’re not learning alone."
              description="Self-paced never means isolated. Connect with 50,000+ learners, practicing mentors, and alumni across our structured discussion channels and weekly review clinics."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {PILLARS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-200/90 bg-white p-4 space-y-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-blue-600 shrink-0" />
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Button variant="dark" onClick={() => openAuthModal('signup')}>
                Join the Learner Community
              </Button>
            </div>
          </div>

          {/* Right Column: Stacked Conversation & Review UI */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-lg space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    #architecture-and-portfolio-review
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Active mentor & peer discussion thread
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 tabular-nums">
                  ● 142 Members Online
                </span>
              </div>

              {/* Thread Item 1 */}
              <div className="rounded-xl bg-slate-50 p-4 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                      ER
                    </span>
                    <span className="font-bold text-slate-900">Elena Rostova</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-blue-600 font-medium">Module 03 Capstone</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">14m ago</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Just pushed my PostgreSQL composite index migration for the booking engine. Reduced query execution time from 140ms to 6.4ms on 2M seeded rows!
                </p>
              </div>

              {/* Thread Item 2: Mentor Reply */}
              <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-4 space-y-2.5 ml-3 sm:ml-6">
                <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                      MV
                    </span>
                    <span className="font-bold text-slate-900">Marcus Vance</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-blue-700 font-semibold">Principal Architect (Mentor)</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">6m ago</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  Clean EXPLAIN ANALYZE benchmark, Elena. Make sure to include that before/after query plan in your Capstone ADR document—hiring managers love seeing concrete latency metrics.
                </p>
                <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-700 pt-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Marked as Portfolio-Ready Solution</span>
                </div>
              </div>

              {/* Thread Item 3 */}
              <div className="rounded-xl bg-slate-50 p-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                      ST
                    </span>
                    <span className="font-bold text-slate-900">Sora Takahashi</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-indigo-600 font-medium">UI/UX Design Systems</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">Just now</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Sharing my Figma multi-mode token spec ahead of Thursday’s critique clinic with Clara. Feedback welcome!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
