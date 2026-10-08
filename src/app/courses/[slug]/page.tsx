"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PageSEO } from '../../../components/common/PageSEO';
import { Container } from '../../../components/common/Container';
import { Button } from '../../../components/common/Button';
import { CourseHero } from '../../../components/courses/CourseHero';
import { Curriculum } from '../../../components/courses/Curriculum';
import {
  InstructorCard,
  CourseFAQ,
  ToolsCovered,
  CertificateSection,
  CourseFutureScope,
  TopPlacements
} from '../../../components/courses/CourseDetailSections';
import { Testimonials } from '../../../components/home/Testimonials';
import { CourseCard } from '../../../components/courses/CourseCard';
import { useSiteData } from '../../../context/SiteDataContext';
import { useActionModal } from '../../../components/common/ActionModalContext';
import { formatCurrency } from '../../../lib/utils';

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { courses, isLoaded } = useSiteData();
  const { openEnrollModal } = useActionModal();
  const [activeTab, setActiveTab] = useState('overview');

  const normalizedSlug = slug ? decodeURIComponent(slug).trim().toLowerCase() : '';
  const course = courses.find(
    (c) =>
      c.slug.trim().toLowerCase() === normalizedSlug ||
      c.slug === slug ||
      c.id === slug
  );

  if (!course) {
    if (!isLoaded) {
      return (
        <section className="py-24 bg-white min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold text-slate-500">Loading course details...</p>
          </div>
        </section>
      );
    }

    return (
      <section className="py-24 bg-white">
        <Container className="text-center max-w-lg">
          <h1 className="text-3xl font-bold text-slate-900">Programme Not Found</h1>
          <p className="text-sm text-slate-500 mt-2">
            The requested course could not be located. Check the URL or explore our complete catalog.
          </p>
          <div className="mt-8">
            <Button href="/courses" variant="primary">
              <ArrowLeft className="h-4 w-4" /> <span>Back to All Courses</span>
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  const relatedCourses = courses
    .filter((c) => c.slug !== course.slug && c.category === course.category)
    .slice(0, 3);

  return (
    <div className="bg-white">
      <PageSEO title={course.title} description={course.subtitle} />

      <CourseHero course={course} />

      {/* Main Content & Sticky Sidebar */}
      <section className="py-12 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Fake Tabs to match design */}
              <div className="flex border-b border-slate-200 gap-8 overflow-x-auto">
                 <button 
                   onClick={() => setActiveTab('overview')}
                   className={`pb-4 text-sm font-bold border-b-2 whitespace-nowrap ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
                 >
                   Course Overview & Content
                 </button>
                 <button 
                   onClick={() => setActiveTab('training')}
                   className={`pb-4 text-sm font-bold border-b-2 whitespace-nowrap ${activeTab === 'training' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
                 >
                   Training Offered
                 </button>
                 <button 
                   onClick={() => setActiveTab('reviews')}
                   className={`pb-4 text-sm font-bold border-b-2 whitespace-nowrap ${activeTab === 'reviews' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
                 >
                   Reviews & Rating
                 </button>
              </div>

              {/* Course Content */}
              {activeTab === 'overview' && (
                <div className="space-y-10">
                  <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                    <p>{course.fullDescription}</p>
                    <p>By the end of this course, you will be able to master the advanced concepts and apply them practically.</p>
                  </div>

                  <ToolsCovered />

                  <Curriculum modules={course.curriculum} />
                </div>
              )}
            </div>

            {/* Right Sticky Column */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-lg flex flex-col items-center text-center">
                 {/* Thumbnail */}
                 <div className="w-full aspect-video bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-white mb-6">
                    <span className="font-bold">{course.title}</span>
                 </div>
                 
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Program Fees</h3>
                 <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-blue-600">{formatCurrency(course.price)}</span>
                    <span className="text-sm text-slate-400 line-through">{formatCurrency(course.originalPrice)}</span>
                 </div>
                 
                 <button 
                   className="w-full bg-blue-600 text-white rounded-md py-3 font-bold mb-3 hover:bg-blue-700"
                   onClick={() => openEnrollModal(course.title, course.price)}
                 >
                   Enroll Now
                 </button>

                 <a 
                   href={`https://wa.me/919887354080?text=I%20want%20to%20buy%20this%20course:%20${encodeURIComponent(course.title)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full flex items-center justify-center bg-green-500 text-white rounded-md py-3 font-bold mb-4 hover:bg-green-600"
                 >
                   Buy Now on WhatsApp
                 </a>

                 <div className="text-left w-full space-y-3 mt-4 border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold text-slate-900 mb-2">Program Features</p>
                    <ul className="text-xs text-slate-600 space-y-2">
                       <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500"/> {course.totalHours} Hours of Training</li>
                       <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500"/> 100% Placement Assistance</li>
                       <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500"/> ISO Certified</li>
                       <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500"/> Industry Recognized Certificate</li>
                    </ul>
                 </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Full width sections matching the image flow */}
      <CourseFutureScope />

      <Container className="py-16">
        <InstructorCard instructor={course.instructor} />
      </Container>

      <div className="bg-slate-50 py-16 border-y border-slate-200">
         <Container>
            <CertificateSection />
         </Container>
      </div>

      <TopPlacements />

      <Testimonials />

      <section className="py-16 bg-white border-t border-slate-200">
        <Container>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((rel) => (
              <CourseCard key={rel.id} course={rel} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
