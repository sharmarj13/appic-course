"use client";
import React, { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import {
  CourseInstructor,
  CourseFAQItem,
  PlacementItem,
  ToolItem,
  FutureScopeData,
  CertificateData
} from '../../types/course';

export function InstructorCard({
  instructor,
  trainers
}: {
  instructor?: CourseInstructor;
  trainers?: CourseInstructor[];
}) {
  const leadTrainer = instructor || {
    name: 'Lead Technical Faculty',
    role: 'Principal Architect',
    companyContext: 'Industry Practice Leader',
    bio: 'Senior technology mentor.',
    initials: 'LT',
    experienceYears: 10,
    studentsTaught: '10,000+',
  };

  const list: CourseInstructor[] = trainers && trainers.length > 0
    ? trainers
    : [
        leadTrainer,
        {
          name: 'Rajeev Sharma',
          role: 'Systems Architect',
          companyContext: 'Cloud Platforms',
          bio: 'Specialist in distributed architectures and cloud computing.',
          initials: 'RS',
          experienceYears: 9,
          studentsTaught: '7,500+'
        },
        {
          name: 'Vikram Singh',
          role: 'Staff Engineer',
          companyContext: 'Enterprise Engineering',
          bio: 'Expertise in high-scale performance engineering.',
          initials: 'VS',
          experienceYears: 11,
          studentsTaught: '12,000+'
        },
        {
          name: 'Smita Joshi',
          role: 'Principal Mentor',
          companyContext: 'Design & Code Systems',
          bio: 'Focus on production quality and software excellence.',
          initials: 'SJ',
          experienceYears: 8,
          studentsTaught: '6,200+'
        }
      ];

  const colors = ['bg-blue-500', 'bg-sky-500', 'bg-emerald-500', 'bg-amber-500', 'bg-indigo-500'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
           <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
             Faculty & Mentorship
           </span>
           <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">Our Expert Trainers</h2>
         </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {list.map((trainer, idx) => {
          const color = colors[idx % colors.length];
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col hover:border-blue-200 hover:shadow-md transition-all">
               {/* Colored Top with Avatar */}
               <div className={`${color} h-28 relative flex justify-center items-end rounded-b-[36px] mb-12`}>
                  <div className="w-24 h-24 bg-white rounded-full border-4 border-white absolute -bottom-10 overflow-hidden shadow-md flex items-center justify-center text-xl font-extrabold text-blue-700">
                     {trainer.initials || trainer.name.slice(0, 2).toUpperCase()}
                  </div>
               </div>
               {/* Info */}
               <div className="p-5 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{trainer.name}</h3>
                    <p className="text-xs font-bold text-blue-600 uppercase mt-1 mb-2">{trainer.role}</p>
                    {trainer.companyContext && (
                      <p className="text-[11px] font-semibold text-slate-500 mb-2">{trainer.companyContext}</p>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                     {trainer.experienceYears}+ Years of Experience. Mentored over {trainer.studentsTaught} students globally.
                  </p>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ToolsCovered({
  tools,
  courseTitle
}: {
  tools?: (string | ToolItem)[];
  courseTitle?: string;
}) {
  const defaultTools = [
    { name: 'TypeScript', color: 'bg-blue-100 text-blue-600', letter: 'TS' },
    { name: 'React & Next.js', color: 'bg-cyan-100 text-cyan-600', letter: 'R' },
    { name: 'Node.js', color: 'bg-emerald-100 text-emerald-600', letter: 'N' },
    { name: 'PostgreSQL', color: 'bg-indigo-100 text-indigo-600', letter: 'DB' },
    { name: 'Docker & Git', color: 'bg-amber-100 text-amber-600', letter: 'D' },
  ];

  const colors = [
    'bg-emerald-100 text-emerald-600',
    'bg-blue-100 text-blue-600',
    'bg-amber-100 text-amber-600',
    'bg-yellow-100 text-yellow-600',
    'bg-purple-100 text-purple-600',
    'bg-cyan-100 text-cyan-600',
    'bg-rose-100 text-rose-600',
  ];

  const renderedTools = tools && tools.length > 0
    ? tools.map((t, idx) => {
        if (typeof t === 'string') {
          const letter = t.trim().slice(0, 2).toUpperCase();
          const color = colors[idx % colors.length];
          return { name: t.trim(), letter, color };
        }
        return {
          name: t.name,
          letter: t.letter || t.name.slice(0, 2).toUpperCase(),
          color: t.color || colors[idx % colors.length]
        };
      })
    : defaultTools;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Tools & Technologies Covered</h3>
        {courseTitle && (
          <p className="text-xs text-slate-500 mt-0.5">
            Industry tools and frameworks mastered during hands-on labs in this programme
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {renderedTools.map((tool, idx) => (
          <div key={idx} className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all">
            <div className={`w-8 h-8 rounded-lg ${tool.color} flex items-center justify-center font-bold text-xs shadow-2xs`}>
               {tool.letter}
            </div>
            <span className="font-bold text-slate-700 text-xs sm:text-sm">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CertificateSection({
  certificateInfo,
  courseTitle
}: {
  certificateInfo?: CertificateData;
  courseTitle?: string;
}) {
  const title = certificateInfo?.title?.trim() || `Get (ISO) Certified in ${courseTitle || 'Professional Skills'}`;
  const badge = certificateInfo?.shareableText?.trim() || 'Shareable on LinkedIn, Twitter & More';
  const highlights = certificateInfo?.highlights && certificateInfo.highlights.length > 0
    ? certificateInfo.highlights
    : [
        'The certification validates your skills and serves as a powerful testament to your industry readiness.',
        'Upon completion, present the verified credential to potential employers to fast-track hiring.',
      ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-10 shadow-xs">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Certificate Graphic */}
        <div className="relative">
           <div className="w-full aspect-[4/3] bg-gradient-to-r from-blue-50 to-slate-100 border border-slate-200 rounded-xl shadow-md flex items-center justify-center p-4">
              <div className="w-full h-full border-4 border-double border-amber-300 bg-white p-6 flex flex-col items-center justify-center text-center relative rounded-sm">
                 <h4 className="text-base sm:text-lg font-serif font-bold text-blue-950 tracking-wider">
                   {certificateInfo?.certificateType || 'ADVANCE CERTIFICATION'}
                 </h4>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-semibold">
                   Appic Skill Verified Credentials
                 </p>
                 <div className="mt-4 px-3 py-1 bg-blue-50 border border-blue-200 rounded text-xs font-bold text-blue-900 max-w-[220px] truncate">
                   {courseTitle || 'Specialized Program'}
                 </div>
                 <div className="absolute bottom-4 left-4 w-9 h-9 bg-amber-400 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow">
                   ISO
                 </div>
                 <div className="w-10 h-10 bg-blue-600 absolute right-4 bottom-4" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
              </div>
           </div>
        </div>
        
        {/* Right: Text Content */}
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Official Certification
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-bold bg-blue-50/80 text-blue-800 p-2.5 rounded-xl border border-blue-100 inline-block">
            {badge}
          </p>
          <ul className="space-y-2.5 mt-4 text-xs sm:text-sm text-slate-600">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                 <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /> 
                 <span>{item}</span>
              </li>
            ))}
          </ul>
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

export function CourseFutureScope({
  futureScope,
  courseTitle,
  category
}: {
  futureScope?: FutureScopeData;
  courseTitle?: string;
  category?: string;
}) {
  const defaultStats = [
    { value: '50,000+', label: 'Active Job Openings' },
    { value: '1,20,000+', label: 'New Roles by 2027' },
    { value: '32% YoY', label: 'Industry Market Growth' },
    { value: 'Top 3', label: 'Most In-Demand Skills' },
  ];

  const title = futureScope?.title?.trim() || `Future Scope in ${courseTitle || category || 'Tech'}`;
  const stats = futureScope?.stats && futureScope.stats.length > 0 ? futureScope.stats : defaultStats;

  return (
    <section className="bg-gradient-to-r from-[#172554] via-[#1e3a8a] to-[#1e40af] text-white py-14 border-y border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-3 py-1 rounded-full">
              Industry Demand & Growth
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
              {title}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/95 rounded-2xl p-6 text-center text-slate-900 shadow-md border border-white/20">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-1.5">{stat.value}</div>
              <div className="text-xs sm:text-sm font-bold text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TopPlacements({
  placements,
  courseTitle
}: {
  placements?: PlacementItem[];
  courseTitle?: string;
}) {
  const [scrollIndex, setScrollIndex] = useState(0);

  const defaultPlacements: PlacementItem[] = [
    { id: 'p1', name: 'Rahul Sharma', role: 'Data & Cloud Analyst', company: 'Google', package: '40 LAKHS' },
    { id: 'p2', name: 'Priya Patel', role: 'Frontend Engineer', company: 'Amazon', package: '25 LAKHS' },
    { id: 'p3', name: 'Amit Singh', role: 'Product Designer', company: 'Microsoft', package: '15.5 LAKHS' },
    { id: 'p4', name: 'Neha Gupta', role: 'Full Stack Engineer', company: 'Meta', package: '45 LAKHS' },
  ];

  const items = placements && placements.length > 0 ? placements : defaultPlacements;

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Career Success & Alumni
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Our Students Placed In Top Companies
              </h2>
              {courseTitle && (
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Recent hiring outcomes for students graduated from {courseTitle} and allied programs
                </p>
              )}
            </div>
            {items.length > 4 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setScrollIndex((prev) => Math.max(0, prev - 1))}
                  disabled={scrollIndex === 0}
                  className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-white disabled:opacity-40 cursor-pointer shadow-xs transition-colors"
                >
                  &lt;
                </button>
                <button
                  type="button"
                  onClick={() => setScrollIndex((prev) => Math.min(items.length - 4, prev + 1))}
                  disabled={scrollIndex >= items.length - 4}
                  className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-white disabled:opacity-40 cursor-pointer shadow-xs transition-colors"
                >
                  &gt;
                </button>
              </div>
            )}
         </div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {items.slice(scrollIndex, scrollIndex + 4).map((p, idx) => (
              <div key={p.id || idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative text-center mt-6 hover:shadow-md hover:border-blue-200 transition-all">
                 {/* Floating Image / Initial */}
                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-tr from-slate-100 to-blue-50 rounded-full border-4 border-white shadow-md flex items-center justify-center font-bold text-xl text-blue-600 overflow-hidden">
                   {p.avatarUrl ? (
                     <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" />
                   ) : (
                     <span>{p.name.charAt(0).toUpperCase()}</span>
                   )}
                 </div>
                 
                 <div className="mt-10">
                    <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                    <p className="text-[11px] text-slate-500 mb-6 font-medium">{p.role}</p>
                    
                    <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
                       <div className="text-left">
                          <p className="text-xs font-extrabold text-blue-700">{p.package}</p>
                          <p className="text-[9px] text-slate-400 font-semibold uppercase">per annum</p>
                       </div>
                       <div className="font-bold text-slate-800 text-xs bg-slate-100 border border-slate-200/60 px-2.5 py-1 rounded-lg">
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
