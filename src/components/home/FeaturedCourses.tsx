"use client";
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { CourseCard } from '../courses/CourseCard';
import { CourseCategory } from '../../types/course';
import { motion } from 'motion/react';
import { staggerContainerVariants, fadeUpItemVariants } from '../../lib/motion';
import { useSiteData } from '../../context/SiteDataContext';

const FILTER_TABS: (CourseCategory | 'All')[] = [
  'All',
  'Development',
  'Design',
  'Data & AI',
  'Marketing',
  'Business',
];

export function FeaturedCourses() {
  const { courses, home } = useSiteData();
  const featured = home?.featuredCourses || {
    eyebrow: 'Featured Programmes',
    title: 'Learn skills that move your',
    titleItalic: 'career forward.',
    description: 'Choose practical, industry-focused programmes designed by senior practitioners. Build real portfolio systems and receive structured mentor feedback.',
  };
  const [activeTab, setActiveTab] = useState<CourseCategory | 'All'>('All');

  const displayedCourses =
    activeTab === 'All'
      ? courses
      : courses.filter((course) => course.category === activeTab);

  return (
    <section className="py-8 lg:py-10 bg-white border-t border-slate-100">
      <Container>
        {/* Classic Centered Heading */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8"
        >
          <motion.div variants={fadeUpItemVariants}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold tracking-widest uppercase mb-4">
              {featured.eyebrow}
            </span>
          </motion.div>
          <motion.h2 
            variants={fadeUpItemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 leading-tight mb-6"
          >
            {featured.title} <br className="hidden sm:block" />
            <span className="italic text-slate-500">{featured.titleItalic}</span>
          </motion.h2>
          <motion.p 
            variants={fadeUpItemVariants}
            className="text-lg text-slate-600 font-light max-w-2xl"
          >
            {featured.description}
          </motion.p>
        </motion.div>

        {/* Elegant Minimalist Filter Tabs */}
        <div className="flex justify-center mb-6">
          <div
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl sm:rounded-full bg-slate-50 border border-slate-200/60"
            role="group"
            aria-label="Filter featured courses by category"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8"
        >
          {displayedCourses.map((course, idx) => (
            <CourseCard key={course.id} course={course} index={idx} />
          ))}
        </motion.div>

        {/* Bottom CTA Centered */}
        <div className="flex justify-center">
          <Button href="/courses" variant="outline" size="lg" className="rounded-none border-slate-300 hover:bg-slate-50 px-8">
            <span className="font-semibold tracking-wide">View All Programmes</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

      </Container>
    </section>
  );
}
