"use client";
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code2, Database, MonitorPlay, Layers, Cpu, Globe } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { staggerContainerVariants, fadeUpItemVariants } from '../../lib/motion';
import { useSiteData } from '../../context/SiteDataContext';

export function Hero() {
  const { home } = useSiteData();
  const { hero } = home;

  return (
    <section className="relative overflow-hidden py-8 lg:py-10 bg-white text-slate-900">

      {/* 1. Subtle Shadow-Type Color Glow from the Top Header */}
      {/* Top Center Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-100/70 rounded-full blur-[100px] pointer-events-none" />
      {/* Top Left Glow */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[600px] h-[400px] bg-indigo-100/60 rounded-full blur-[90px] pointer-events-none" />
      {/* Top Right Glow */}
      <div className="absolute top-10 right-0 translate-x-1/4 -translate-y-1/4 w-[500px] h-[400px] bg-purple-100/60 rounded-full blur-[90px] pointer-events-none" />

      {/* Subtle Grid Pattern for tech vibe (Light Version) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      {/* 2. Floating Course Vector Icons in the Background (Subtle for Light Mode) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] text-blue-500/10"
        >
          <Code2 size={56} strokeWidth={1.5} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[25%] right-[12%] text-indigo-500/10"
        >
          <Database size={64} strokeWidth={1.5} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] left-[15%] text-purple-500/10"
        >
          <MonitorPlay size={48} strokeWidth={1.5} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[25%] right-[20%] text-cyan-500/10"
        >
          <Layers size={60} strokeWidth={1.5} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[10%] right-[30%] text-emerald-500/10 hidden lg:block"
        >
          <Cpu size={50} strokeWidth={1.5} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -20, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute top-[40%] left-[5%] text-pink-500/10 hidden lg:block"
        >
          <Globe size={55} strokeWidth={1.5} />
        </motion.div>
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 flex flex-col items-center"
          >
            <motion.div variants={fadeUpItemVariants}>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-sm font-semibold tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                {hero.badge}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpItemVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]"
            >
              {hero.titleLine1} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                {hero.titleGradient}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpItemVariants}
              className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-2xl font-medium"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              variants={fadeUpItemVariants}
              className="flex flex-wrap items-center justify-center gap-4 pt-6"
            >
              <Button href={hero.ctaLink} variant="primary" size="lg" className="rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 px-8 py-4">
                <span className="text-base font-semibold">{hero.ctaText}</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </motion.div>

          </motion.div>

        </div>
      </Container>
    </section>
  );
}
