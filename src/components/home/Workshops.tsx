"use client";
import React from 'react';
import { Calendar, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { WORKSHOPS } from '../../data/workshops';
import { useActionModal } from '../common/ActionModalContext';

export function Workshops() {
  const { openWorkshopModal } = useActionModal();

  return (
    <section id="workshops" className="py-8 lg:py-10 bg-slate-950 text-white relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
      />

      <Container className="relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <SectionHeading
            eyebrow="Interactive Cohort Clinics"
            title="Learn live. Ask questions. Build faster."
            description="Supplement your self-paced modules with live interactive engineering, design, and analytics workshops led by our faculty."
            dark
          />

          <p className="text-xs sm:text-sm text-slate-400 max-w-xs">
            All live workshops include interactive Q&A, downloadable starter repositories, and session recordings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {WORKSHOPS.map((ws, index) => (
            <motion.div
              key={ws.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 hover:border-blue-500/60 transition-colors"
            >
              <div>
                {/* Clean unboxed metadata */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-semibold text-blue-400">{ws.category}</span>
                  <span className="tabular-nums text-emerald-400 font-semibold">
                    ● {ws.seatsRemaining} of {ws.seatsTotal} seats left
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {ws.title}
                </h3>

                <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                  {ws.topic}
                </p>

                {/* Date & Time Metadata */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-300 tabular-nums">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-blue-400" />
                    <span>{ws.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-blue-400" />
                    <span>{ws.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-blue-400" />
                    <span>{ws.duration}</span>
                  </div>
                </div>

                {/* Key Takeaways */}
                <ul className="mt-5 space-y-2 text-xs text-slate-300">
                  {ws.keyTakeaways.map((takeaway) => (
                    <li key={takeaway} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 pt-5 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    {ws.instructorInitials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">
                      {ws.instructorName}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {ws.instructorRole}
                    </p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    openWorkshopModal(ws.title, `${ws.date} · ${ws.time}`, ws.instructorName)
                  }
                >
                  <span>Reserve Seat</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
