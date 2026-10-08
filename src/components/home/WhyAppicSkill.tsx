"use client";
import React, { useState } from 'react';
import { Compass, Users, Code2, Briefcase, Video, MessageSquare, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Interactive3DTilt, PREMIUM_EASE } from '../../lib/motion';
import learningModules3dImg from '../../assets/images/visual_3d_learning_modules_1791369313405.jpg';
import { useSiteData } from '../../context/SiteDataContext';

const ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  Users,
  Code2,
  Briefcase,
  Video,
  MessageSquare,
};

const DEFAULT_FEATURE_STYLES = [
  {
    span: 'lg:col-span-2',
    has3DVisual: true,
    bgClass: 'bg-slate-900',
    iconColor: 'text-blue-400 bg-blue-950',
  },
  {
    span: 'lg:col-span-1',
    has3DVisual: false,
    bgClass: 'bg-gradient-to-br from-indigo-900 to-indigo-950 border-indigo-800',
    iconColor: 'text-indigo-400 bg-indigo-950',
  },
  {
    span: 'lg:col-span-1',
    has3DVisual: false,
    bgClass: 'bg-gradient-to-br from-purple-900 to-purple-950 border-purple-800',
    iconColor: 'text-purple-400 bg-purple-950',
  },
  {
    span: 'lg:col-span-2',
    has3DVisual: false,
    bgClass: 'bg-gradient-to-br from-emerald-900 to-emerald-950 border-emerald-800',
    iconColor: 'text-emerald-400 bg-emerald-950',
  },
  {
    span: 'lg:col-span-1',
    has3DVisual: false,
    bgClass: 'bg-gradient-to-br from-cyan-900 to-cyan-950 border-cyan-800',
    iconColor: 'text-cyan-400 bg-cyan-950',
  },
  {
    span: 'lg:col-span-2',
    has3DVisual: false,
    bgClass: 'bg-gradient-to-br from-fuchsia-900 to-fuchsia-950 border-fuchsia-800',
    iconColor: 'text-fuchsia-400 bg-fuchsia-950',
  },
];

export function WhyAppicSkill() {
  const { home } = useSiteData();
  const { whyAppic } = home;
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="why-appic-skill"
      className="py-8 lg:py-10 bg-white border-y border-slate-200/80"
    >
      <Container>
        <SectionHeading
          eyebrow={whyAppic.eyebrow}
          title={whyAppic.title}
          description={whyAppic.description}
          className="mb-6"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyAppic.features.map((feature, index) => {
            const IconComponent = ICON_MAP[feature.iconName] || Compass;
            const style = DEFAULT_FEATURE_STYLES[index % DEFAULT_FEATURE_STYLES.length];

            if (style.has3DVisual) {
              return (
                <motion.div
                  key={feature.id || feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                    ease: PREMIUM_EASE,
                  }}
                  className={style.span}
                >
                  <Interactive3DTilt intensity={5} className="h-full">
                    <div className="group h-full rounded-2xl border border-blue-900 bg-gradient-to-br from-blue-900 to-slate-900 text-white p-5 sm:p-6 shadow-xl overflow-hidden grid grid-cols-1 sm:grid-cols-12 gap-5 items-center hover:shadow-blue-900/30 transition-all">
                      <div className="sm:col-span-7 space-y-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-800 text-blue-200 shadow-inner">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white pt-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-blue-100/80 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      <div className="sm:col-span-5 relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                        {!imgError ? (
                          <img
                            src={learningModules3dImg.src}
                            alt="3D architectural learning blocks"
                            referrerPolicy="no-referrer"
                            onError={() => setImgError(true)}
                            className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Layers className="h-8 w-8 text-blue-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        <span className="absolute bottom-2.5 left-3 text-[11px] font-mono text-blue-300">
                          Modular 3D Syllabus
                        </span>
                      </div>
                    </div>
                  </Interactive3DTilt>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={feature.id || feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.42,
                  delay: index * 0.05,
                  ease: PREMIUM_EASE,
                }}
                className={`group rounded-2xl border ${style.bgClass} p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl ${style.span}`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.iconColor} shadow-inner`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
