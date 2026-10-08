"use client";
import React, { useState } from 'react';
import { Star, ChevronDown, CheckCircle2 } from 'lucide-react';
import { CourseInstructor, CourseFAQItem } from '../../types/course';

export function InstructorCard({ instructor }: { instructor: CourseInstructor }) {
  // Creating a mock array of trainers to match the visual of a carousel/grid
  const trainers = [
    { ...instructor, color: 'bg-blue-400' },
    { ...instructor, name: 'Rajeev Sharma', color: 'bg-sky-500' },
    { ...instructor, name: 'Vikram Singh', color: 'bg-lime-400' },
    { ...instructor, name: 'Smita Joshi', color: 'bg-orange-300' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold text-slate-900">Our Expert Trainers</h2>
         <div className="flex gap-2">
           <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-400">&lt;</button>
           <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-400">&gt;</button>
         </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainers.map((trainer, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
             {/* Colored Top with Image */}
             <div className={`${trainer.color} h-32 relative flex justify-center items-end rounded-b-[40px] mb-12`}>
                <div className="w-24 h-24 bg-slate-200 rounded-full border-4 border-white absolute -bottom-10 overflow-hidden shadow-md flex items-center justify-center text-xl font-bold text-slate-500">
                   {trainer.initials}
                </div>
             </div>
             {/* Info */}
             <div className="p-5 text-center flex-1">
                <h3 className="text-base font-bold text-slate-900">{trainer.name}</h3>
                <p className="text-xs font-semibold text-slate-500 uppercase mt-1 mb-3">{trainer.role}</p>
                <p className="text-[11px] text-slate-600 border-t border-slate-100 pt-3">
                   {trainer.experienceYears}+ Years of Experience in Tech. Mentored over {trainer.studentsTaught} students globally.
                </p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ToolsCovered() {
  const tools = [
    { name: 'Excel', color: 'bg-emerald-100 text-emerald-600', letter: 'X' },
    { name: 'SQL', color: 'bg-blue-100 text-blue-600', letter: 'S' },
    { name: 'Python', color: 'bg-amber-100 text-amber-600', letter: 'P' },
    { name: 'PowerBI', color: 'bg-yellow-100 text-yellow-600', letter: 'B' },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Tools Covered</h3>
      <div className="flex flex-wrap gap-4">
        {tools.map((tool, idx) => (
          <div key={idx} className="flex items-center gap-2 p-2 pr-4 rounded-full border border-slate-100 bg-slate-50">
            <div className={`w-8 h-8 rounded-full ${tool.color} flex items-center justify-center font-bold text-xs`}>
               {tool.letter}
            </div>
            <span className="font-semibold text-slate-700 text-sm">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CertificateSection() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Certificate Graphic */}
        <div className="relative">
           {/* Placeholder for certificate image */}
           <div className="w-full aspect-[4/3] bg-gradient-to-r from-blue-50 to-slate-100 border border-slate-200 rounded-lg shadow-md flex items-center justify-center p-4">
              <div className="w-full h-full border-4 border-double border-amber-300 bg-white p-4 flex flex-col items-center justify-center text-center relative">
                 <h4 className="text-lg font-serif font-bold text-blue-900">ADVANCE CERTIFICATION</h4>
                 <p className="text-[8px] mt-2">Appic Skill Verified Credentials</p>
                 <div className="absolute bottom-4 left-4 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow">ISO</div>
                 <div className="w-12 h-12 bg-blue-600 absolute right-4 bottom-4" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
              </div>
           </div>
        </div>
        
        {/* Right: Text Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Get (ISO) Certified in Data Science</h2>
          <p className="text-sm text-slate-600 font-semibold bg-blue-50 text-blue-800 p-2 rounded inline-block">
            Shareable on LinkedIn, Twitter & More
          </p>
          <ul className="space-y-2 mt-4 text-sm text-slate-600">
            <li className="flex items-start gap-2">
               <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /> 
               <span>The certification validates your skills and serves as a powerful testament to your knowledge.</span>
            </li>
            <li className="flex items-start gap-2">
               <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /> 
               <span>Upon completion, present the certificate to potential employers to showcase your expertise.</span>
            </li>
          </ul>
          <div className="pt-2">
             <button className="bg-blue-600 text-white px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-blue-700 transition">
               Know More
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CourseFAQ({ faqs }: { faqs: CourseFAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div id="faq" className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 text-center">Frequently Asked Questions</h2>
      <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-5 text-left bg-white hover:bg-slate-50 cursor-pointer"
              >
                <span className="text-sm font-semibold text-slate-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm text-slate-600 bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CourseFutureScope() {
  const stats = [
    { value: '50,000+', label: 'Job Openings' },
    { value: '1,00,000+', label: 'Job Openings' },
    { value: '30% YoY', label: 'Industry Growth' },
    { value: 'Top 5', label: 'In-Demand Skills' },
  ];

  return (
    <section className="bg-[#1e3a8a] text-white py-12 border-y-8 border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8">Future Scope in Data Science</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 text-center text-slate-900 shadow-md">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TopPlacements() {
  const placements = [
    { name: 'Rahul Sharma', role: 'Data Analyst', company: 'Google', package: '40 LAKHS' },
    { name: 'Priya Patel', role: 'Frontend Eng.', company: 'Amazon', package: '25 LAKHS' },
    { name: 'Amit Singh', role: 'Product Designer', company: 'Microsoft', package: '15.5 LAKHS' },
    { name: 'Neha Gupta', role: 'Backend Eng.', company: 'Meta', package: '45 LAKHS' },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold text-slate-900">Our Students Placed In Top Companies</h2>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-400">&lt;</button>
              <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-400">&gt;</button>
            </div>
         </div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {placements.map((p, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative text-center mt-6">
                 {/* Floating Image */}
                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-slate-200 rounded-full border-4 border-white shadow-md flex items-center justify-center font-bold text-xl text-slate-500 overflow-hidden">
                   {p.name.charAt(0)}
                 </div>
                 
                 <div className="mt-10">
                    <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                    <p className="text-[11px] text-slate-500 mb-6">{p.role}</p>
                    
                    <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
                       <div className="text-left">
                          <p className="text-xs font-bold text-blue-700">{p.package}</p>
                          <p className="text-[9px] text-slate-400">per annum</p>
                       </div>
                       <div className="font-bold text-slate-800 text-sm bg-slate-100 px-2 py-1 rounded">
                          {p.company}
                       </div>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
}
