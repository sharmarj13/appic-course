"use client";
import React, { useState } from 'react';
import Link from 'next/link';

import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Star,
  Code2,
  Layers,
  Cpu,
  BarChart3,
  TrendingUp,
  Briefcase,
  Clock,
  BookOpen
} from 'lucide-react';
import { Course } from '../../types/course';
import { formatCurrency, formatNumber } from '../../lib/utils';
import { PREMIUM_EASE } from '../../lib/motion';

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const [imgError, setImgError] = useState(false);

  const renderFallbackIcon = () => {
    switch (course.category) {
      case 'Development': return <Code2 className="h-8 w-8 text-slate-400" />;
      case 'Design': return <Layers className="h-8 w-8 text-slate-400" />;
      case 'Data & AI': return course.slug.includes('ai') ? <Cpu className="h-8 w-8 text-slate-400" /> : <BarChart3 className="h-8 w-8 text-slate-400" />;
      case 'Marketing': return <TrendingUp className="h-8 w-8 text-slate-400" />;
      case 'Business': default: return <Briefcase className="h-8 w-8 text-slate-400" />;
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.08,
        ease: PREMIUM_EASE,
      }}
      className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] h-full"
    >
      <div>
        {/* Course Visual Container */}
        <Link
          href={`/courses/${course.slug}`}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-100 border-b border-slate-100"
        >
          {course.imageUrl && !imgError ? (
            <img
              src={course.imageUrl}
              alt={`${course.title} visual`}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-slate-50 text-center">
              {renderFallbackIcon()}
            </div>
          )}
          
          {/* Level Badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold text-slate-700 uppercase tracking-wider border border-slate-200/50 shadow-sm">
            {course.level}
          </div>
        </Link>

        {/* Card Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
            <span className="text-blue-600">{course.category}</span>
            <div className="flex items-center gap-1 tabular-nums">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-slate-700">{course.rating.toFixed(1)}</span>
              <span className="text-slate-400">({formatNumber(course.studentsCount)})</span>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2 font-serif">
            <Link href={`/courses/${course.slug}`} className="focus:outline-none">
              {course.title}
            </Link>
          </h3>

          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-5">
            {course.shortDescription}
          </p>

          {/* Quick Stats Line */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{course.projectsCount} Projects</span>
            </div>
          </div>

          {/* Instructor metadata line */}
          <div className="mt-4 flex items-center gap-3 text-xs">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-bold border border-slate-200">
              {(course.instructor as any)?.initials || (course.instructor as any)?.name?.substring(0, 2).toUpperCase() || 'IN'}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900">
                {(course.instructor as any)?.name || 'Course Instructor'}
              </span>
              <span className="text-slate-500 text-[10px] uppercase tracking-wide">
                {(course.instructor as any)?.role || 'Industry Mentor'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & CTA Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-4 bg-slate-50 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 mt-auto">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="text-lg font-bold text-slate-900">
              {formatCurrency(Number(course.price) || 0)}
            </span>
            {course.originalPrice ? (
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(Number(course.originalPrice))}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`https://wa.me/919887354080?text=I%20want%20to%20buy%20this%20course:%20${encodeURIComponent(course.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 border border-green-600 shadow-sm px-3.5 py-2 text-xs font-bold text-white transition-all duration-200 hover:bg-green-600 whitespace-nowrap"
          >
            Buy Now
          </a>
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 shadow-sm px-3.5 py-2 text-xs font-bold text-slate-700 transition-all duration-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 whitespace-nowrap"
          >
            <span>View Details</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
