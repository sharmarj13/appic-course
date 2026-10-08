"use client";
import React from 'react';
import Link from 'next/link';
import { Download, ChevronRight, FileText, Globe, Clock, CheckCircle2 } from 'lucide-react';
import { Course } from '../../types/course';
import { Container } from '../common/Container';
import { Button } from '../common/Button';

interface CourseHeroProps {
  course: Course;
}

export function CourseHero({ course }: CourseHeroProps) {
  return (
    <section className="bg-slate-50 pt-8 pb-20 relative">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/courses" className="hover:text-blue-600 transition-colors">Courses</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-800">{course.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              {course.title}
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {course.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-6 py-4">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"><FileText className="w-4 h-4"/></div>
                 <div>
                   <p className="text-[10px] text-slate-500 font-bold uppercase">Course Type</p>
                   <p className="text-sm font-semibold text-slate-900">Self-Paced</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"><Globe className="w-4 h-4"/></div>
                 <div>
                   <p className="text-[10px] text-slate-500 font-bold uppercase">Language</p>
                   <p className="text-sm font-semibold text-slate-900">English</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"><Clock className="w-4 h-4"/></div>
                 <div>
                   <p className="text-[10px] text-slate-500 font-bold uppercase">Total Duration</p>
                   <p className="text-sm font-semibold text-slate-900">{course.totalHours} Hours</p>
                 </div>
              </div>
            </div>

            <div>
              <Button variant="primary" size="lg" className="rounded-md">
                Download Brochure <Download className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5">
             <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-2 transform rotate-1 hover:rotate-0 transition-transform duration-300">
               {course.imageUrl ? (
                 <img src={course.imageUrl} alt={course.title} className="w-full h-auto rounded-xl" />
               ) : (
                 <div className="w-full aspect-video bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white p-6 text-center">
                    <h3 className="text-2xl font-bold leading-tight">{course.title}</h3>
                 </div>
               )}
             </div>
          </div>
        </div>
      </Container>

      {/* ISO Banner */}
      <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 w-[90%] max-w-sm">
         <div className="bg-white rounded-lg shadow-lg border border-slate-100 p-4 flex items-center justify-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-slate-800 tracking-wide">ISO 9001:2015 CERTIFIED</span>
         </div>
      </div>
    </section>
  );
}
