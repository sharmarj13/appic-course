"use client";
import React, { useState } from 'react';
import { Play, Star } from 'lucide-react';
import { Container } from '../common/Container';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../../context/SiteDataContext';

const VIDEO_URL = "https://cdn.iraskills.ai/wp-content/uploads/2025/01/4.mp4";

export function Testimonials() {
  const { home } = useSiteData();
  const { reviews } = home;
  const testimonials = reviews.testimonials || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const activeTestimonial = testimonials[activeIndex] || testimonials[0] || {
    id: 't-fallback',
    name: 'Learner',
    role: 'Student',
    quote: 'Appic Skill helped me transform my technical abilities.',
    initials: 'AS',
  };

  const statItems = [
    { number: reviews.yearsExp, label: 'Years of Experience' },
    { number: reviews.reviewsCount, label: 'Learner Reviews' },
    { number: reviews.partnersCount, label: 'Corporate Partners' },
    { number: reviews.studentsCount, label: 'Students Trained' },
  ];

  return (
    <section className="py-16 lg:py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative blurred background */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-50/60 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Top Section: Heading + Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Heading */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-widest uppercase mb-6 w-max">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-slate-900 leading-[1.15] mb-6">
              Hear from our <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                driven learners.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-md">
              At Appic Skill, we focus on practical outcomes. Discover how our self-paced modules and expert reviews have transformed careers.
            </p>
          </div>

          {/* Testimonial Quote Card */}
          <div className="lg:col-span-7">
            <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <svg className="w-32 h-32 text-blue-900" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={activeTestimonial.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-lg sm:text-xl text-slate-700 leading-relaxed font-serif italic mb-10 min-h-[140px]"
                  >
                    &ldquo;{activeTestimonial.quote}&rdquo;
                  </motion.p>
                </AnimatePresence>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 border-t border-slate-100 pt-6">
                  {testimonials.map((test, idx) => {
                    const isActive = activeIndex === idx;
                    return (
                      <button
                        key={test.id || idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`group flex items-center gap-3 p-2 pr-4 rounded-full transition-all duration-300 border ${
                          isActive ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                          isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                        }`}>
                          {test.initials}
                        </div>
                        {isActive && (
                          <motion.div 
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            className="text-left overflow-hidden whitespace-nowrap"
                          >
                            <p className="text-xs font-bold text-slate-900">{test.name}</p>
                            <p className="text-[10px] text-slate-500 truncate max-w-[100px]">{test.role}</p>
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Testimonials Inline Player */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Watch their journey</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[0, 1, 2].map((idx) => (
              <div 
                key={idx} 
                className={`relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900 transition-all duration-500 ${
                  playingVideo === idx ? 'ring-4 ring-blue-500/50 scale-[1.02] z-20 shadow-2xl' : 'hover:-translate-y-1 hover:shadow-xl z-10'
                }`}
              >
                {playingVideo === idx ? (
                  <video 
                    src={VIDEO_URL} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-cover bg-black"
                    onEnded={() => setPlayingVideo(null)}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <>
                    {/* Placeholder Thumbnail Background */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900" />
                    
                    {/* User Info overlay */}
                    <div className="absolute bottom-5 left-5 right-5 text-white z-10 pointer-events-none">
                      <p className="text-base font-bold drop-shadow-md">{testimonials[idx]?.name || 'Appic Skill Learner'}</p>
                      <p className="text-xs text-slate-300 drop-shadow-md">{testimonials[idx]?.role || 'Student'}</p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Play Button Overlay */}
                    <button 
                      onClick={() => setPlayingVideo(idx)}
                      className="absolute inset-0 flex items-center justify-center group/play w-full h-full bg-black/10 hover:bg-black/20 transition-colors"
                      aria-label="Play video"
                    >
                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all duration-300 group-hover/play:bg-white group-hover/play:text-blue-600 group-hover/play:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        <Play className="h-6 w-6 ml-1" fill="currentColor" />
                      </div>
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Premium Stats Section */}
        <div className="relative bg-slate-900 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle glow effect */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Heading and Google Review */}
            <div className="lg:col-span-5 flex flex-col items-start text-white">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-8">
                The numbers speak <br className="hidden sm:block" /> for themselves.
              </h3>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-white rounded-full shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold text-lg leading-none">{reviews.ratingScore}</span>
                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-slate-300 font-medium tracking-wide">
                    {reviews.ratingSource}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                {statItems.map((stat, idx) => (
                  <div key={idx} className="relative group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 sm:p-6 lg:p-8 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                    <div className="relative z-10">
                      <div className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-sm">{stat.number}</div>
                      <div className="text-xs sm:text-sm text-blue-300 font-semibold tracking-wide uppercase">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
}
