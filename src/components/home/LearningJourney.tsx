"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Layers, Award } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { Interactive3DTilt, PREMIUM_EASE } from '../../lib/motion';
import learningModules3dImg from '../../assets/images/visual_3d_learning_modules_1791369313405.jpg';
import certificateCrestImg from '../../assets/images/visual_3d_certificate_crest_1791369163747.jpg';
import { useSiteData } from '../../context/SiteDataContext';

const COLOR_MAP: Record<string, any> = {
  blue: {
    defaultBorder: 'border-blue-100',
    defaultBg: 'bg-blue-50/60',
    activeBorder: 'border-blue-400',
    activeBg: 'bg-gradient-to-br from-blue-100 to-white',
    numBgInactive: 'bg-blue-100 text-blue-700',
    numBgActive: 'bg-blue-600 text-white',
    iconColor: 'text-blue-500',
    badgeText: 'text-blue-600',
    shadowColor: 'blue-200/50',
  },
  indigo: {
    defaultBorder: 'border-indigo-100',
    defaultBg: 'bg-indigo-50/60',
    activeBorder: 'border-indigo-400',
    activeBg: 'bg-gradient-to-br from-indigo-100 to-white',
    numBgInactive: 'bg-indigo-100 text-indigo-700',
    numBgActive: 'bg-indigo-600 text-white',
    iconColor: 'text-indigo-500',
    badgeText: 'text-indigo-600',
    shadowColor: 'indigo-200/50',
  },
  emerald: {
    defaultBorder: 'border-emerald-100',
    defaultBg: 'bg-emerald-50/60',
    activeBorder: 'border-emerald-400',
    activeBg: 'bg-gradient-to-br from-emerald-100 to-white',
    numBgInactive: 'bg-emerald-100 text-emerald-700',
    numBgActive: 'bg-emerald-600 text-white',
    iconColor: 'text-emerald-500',
    badgeText: 'text-emerald-600',
    shadowColor: 'emerald-200/50',
  },
  purple: {
    defaultBorder: 'border-purple-100',
    defaultBg: 'bg-purple-50/60',
    activeBorder: 'border-purple-400',
    activeBg: 'bg-gradient-to-br from-purple-100 to-white',
    numBgInactive: 'bg-purple-100 text-purple-700',
    numBgActive: 'bg-purple-600 text-white',
    iconColor: 'text-purple-500',
    badgeText: 'text-purple-600',
    shadowColor: 'purple-200/50',
  },
};

const COLOR_KEYS = ['blue', 'indigo', 'emerald', 'purple'];

export function LearningJourney() {
  const { home } = useSiteData();
  const { journey } = home;
  const [activeStep, setActiveStep] = useState(0);
  const [imgError, setImgError] = useState(false);

  const steps = journey.stages || [];
  const currentStep = steps[activeStep] || steps[0] || {
    number: '01',
    title: 'Choose your programme',
    subtitle: 'Select a structured track',
    description: 'Start learning.',
    deliverable: 'Learning roadmap',
    layerLabel: 'Stage 01',
  };

  return (
    <section className="py-8 lg:py-10 bg-[#F8FAFC] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Heading + Interactive 3D Modular Learning Showcase */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <SectionHeading
              eyebrow={journey.eyebrow}
              title={journey.title}
              description={journey.description}
            />

            {/* Interactive 3D Visual Card responding to selected step & cursor tilt */}
            <Interactive3DTilt intensity={6} className="pt-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 text-white overflow-hidden shadow-xl">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 border-b border-slate-800">
                  {!imgError ? (
                    <img
                      src={
                        activeStep === steps.length - 1
                          ? certificateCrestImg.src
                          : learningModules3dImg.src
                      }
                      alt="3D isometric visualization of modular learning blocks and academic credentials"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-500 ease-out hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6">
                      <Layers className="h-10 w-10 text-blue-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  <div className="absolute top-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-slate-300">
                    <span className="bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1 font-mono text-blue-400">
                      {currentStep.layerLabel}
                    </span>
                    <span className="bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1 font-mono tabular-nums">
                      Step {currentStep.number}/0{steps.length}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-xs font-semibold text-emerald-400">
                      Active Deliverable
                    </p>
                    <p className="text-sm font-bold text-white mt-0.5">
                      {currentStep.deliverable}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex items-center justify-between gap-4 bg-slate-950">
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <Award className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>Select any stage on the right to inspect milestone</span>
                  </div>
                  <Button href="/courses" variant="primary" size="sm">
                    <span>Explore Tracks</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Interactive3DTilt>
          </div>

          {/* Right Column: Interactive Timeline Steps */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step, index) => {
              const isSelected = activeStep === index;
              const colorKey = COLOR_KEYS[index % COLOR_KEYS.length];
              const theme = COLOR_MAP[colorKey] || COLOR_MAP.blue;

              return (
                <motion.div
                  key={step.id || step.number}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.42,
                    delay: index * 0.06,
                    ease: PREMIUM_EASE,
                  }}
                  onClick={() => setActiveStep(index)}
                  className={`cursor-pointer rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
                    isSelected
                      ? `${theme.activeBorder} ${theme.activeBg} shadow-lg shadow-${theme.shadowColor} -translate-y-0.5`
                      : `${theme.defaultBorder} ${theme.defaultBg} hover:${theme.activeBorder} hover:shadow-md hover:shadow-${theme.shadowColor}/50`
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold transition-colors ${
                        isSelected
                          ? `${theme.numBgActive} shadow-sm`
                          : theme.numBgInactive
                      }`}
                    >
                      {step.number}
                    </span>

                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className={`text-lg sm:text-xl font-bold transition-colors ${isSelected ? 'text-slate-900' : 'text-slate-800'}`}>
                          {step.number} — {step.title}
                        </h3>
                        <span className={`text-xs font-semibold ${theme.badgeText}`}>
                          Stage {step.number}
                        </span>
                      </div>

                      <p className={`text-xs sm:text-sm font-semibold transition-colors ${isSelected ? 'text-slate-800' : 'text-slate-600'}`}>
                        {step.subtitle}
                      </p>

                      <p className="text-sm text-slate-600 leading-relaxed pt-1">
                        {step.description}
                      </p>

                      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-800">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 transition-colors ${isSelected ? theme.iconColor : 'text-slate-400'}`} />
                        <span>Milestone Deliverable: {step.deliverable}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
