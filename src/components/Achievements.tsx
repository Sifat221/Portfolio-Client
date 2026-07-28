import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Quote, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';
import { IAchievement, ITestimonial } from '../types/portfolio';
import SplitText from './SplitText';

interface TestimonialsAchievementsProps {
  testimonials: ITestimonial[];
  achievements: IAchievement[];
}

export const Achievements: React.FC<TestimonialsAchievementsProps> = ({
  testimonials,
  achievements,
}) => {
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (isPaused || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handleNextTestimonial = () => {
    setCurrentTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[currentTestimonialIdx] || testimonials[0];

  return (
    <section className="py-24 relative bg-[#0B101D]/90 border-t border-slate-800/80">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-[#9B8FCD]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Testimonials Column with Auto-sliding Carousel (7 cols) */}
          <div
            className="lg:col-span-7 bg-[#1A2335]/90 p-8 sm:p-10 rounded-3xl border border-slate-700/60 shadow-2xl flex flex-col justify-between space-y-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top Header & Slider Controls */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold shadow-sm">
                  <Quote className="w-3.5 h-3.5" />
                  <span>Client & Peer Endorsements</span>
                </div>
                <SplitText
                  text="What People Say"
                  highlightText="Say"
                  highlightClass="text-blue-500 font-extrabold"
                  className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                  delay={50}
                  duration={1.25}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.05}
                  rootMargin="0px"
                  textAlign="left"
                />
              </div>

              {/* Slider Arrow Controls */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handlePrevTestimonial}
                  className="p-2.5 rounded-full glass-card border border-slate-700 text-white hover:border-[#9B8FCD] hover:text-[#9B8FCD] transition-all shadow-md active:scale-95"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-xs font-mono text-slate-300 font-bold px-1">
                  {currentTestimonialIdx + 1} / {testimonials.length}
                </span>

                <button
                  onClick={handleNextTestimonial}
                  className="p-2.5 rounded-full glass-card border border-slate-700 text-white hover:border-[#9B8FCD] hover:text-[#9B8FCD] transition-all shadow-md active:scale-95"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Testimonials Auto-sliding Card Window */}
            {activeTestimonial && (
              <div className="relative min-h-[220px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial.id || currentTestimonialIdx}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between"
                  >
                    {/* Ratings & Verified Badge */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(activeTestimonial.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4.5 h-4.5 fill-amber-400" />
                        ))}
                        <span className="text-xs font-bold text-amber-400 ml-1.5 font-mono">
                          5.0 / 5.0
                        </span>
                      </div>

                      <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5" /> Verified Review
                      </span>
                    </div>

                    {/* Testimonial Review Quote */}
                    <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed font-normal">
                      "{activeTestimonial.text}"
                    </p>

                    {/* Client Photo Avatar, Name & Company Title */}
                    <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                      <div className="flex items-center gap-3.5">
                        {activeTestimonial.avatarUrl ? (
                          <img
                            src={activeTestimonial.avatarUrl}
                            alt={activeTestimonial.client}
                            className="w-11 h-11 rounded-full object-cover border-2 border-[#9B8FCD]/60 shadow-md"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-[#9B8FCD]/20 border border-[#9B8FCD]/40 text-[#9B8FCD] font-bold text-sm flex items-center justify-center font-mono shadow-md">
                            {activeTestimonial.client.charAt(0)}
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-extrabold text-white">{activeTestimonial.client}</p>
                          {activeTestimonial.company && (
                            <p className="text-xs text-[#9B8FCD] font-mono font-semibold">{activeTestimonial.company}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Indicator Dots */}
                <div className="flex items-center justify-center gap-2 pt-6">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonialIdx(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentTestimonialIdx === idx
                          ? 'w-8 bg-[#9B8FCD] shadow-sm shadow-[#9B8FCD]'
                          : 'w-2 bg-slate-800 hover:bg-slate-700'
                      }`}
                      aria-label={`Go to testimonial slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Achievements Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#1A2335]/90 p-8 sm:p-10 rounded-3xl border border-slate-700/60 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-[#9B8FCD]/40 text-[#9B8FCD] text-xs font-mono font-bold shadow-sm">
                <Trophy className="w-3.5 h-3.5" />
                <span>Milestones & Recognition</span>
              </div>
              <SplitText
                text="Key Achievements"
                highlightText="Achievements"
                highlightClass="text-blue-500 font-extrabold"
                className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.05}
                rootMargin="0px"
                textAlign="left"
              />
              <p className="text-xs sm:text-sm text-slate-300">
                Hackathons, open-source work, and engineering milestones.
              </p>
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-center">
              {achievements.map((ach, index) => (
                <div
                  key={ach.id || index}
                  className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 hover:border-[#9B8FCD]/60 transition-all duration-300 flex items-start gap-4 shadow-lg group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#9B8FCD]/20 border border-[#9B8FCD]/40 flex items-center justify-center text-[#9B8FCD] shrink-0 group-hover:scale-105 transition-transform">
                    <Trophy className="w-5 h-5" />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-[#9B8FCD] transition-colors truncate">{ach.title}</h3>
                      {ach.year && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-[#9B8FCD] border border-slate-700/60 shrink-0 font-semibold">
                          {ach.year}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
