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
    <section className="py-20 relative bg-[#0B101D]/90 border-t border-slate-800/80 overflow-hidden">
      {/* Background Soft Ambient Glow */}
      <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-[#9B8FCD]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Grid layout with items-start for dynamic natural height (No awkward empty gaps) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Testimonials Column (7 cols) */}
          <div
            className="lg:col-span-7 bg-[#1A2335]/90 p-6 sm:p-8 rounded-3xl border border-slate-700/60 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top Header & Slider Controls */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold shadow-sm">
                  <Quote className="w-3.5 h-3.5 text-amber-400" />
                  <span>Client & Peer Endorsements</span>
                </div>

                <div className="py-1">
                  <SplitText
                    text="What People Say"
                    highlightText="Say"
                    highlightClass="text-sky-400 font-extrabold"
                    className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif"
                    delay={40}
                    duration={1.1}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 35 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.05}
                    rootMargin="0px"
                    textAlign="left"
                  />
                </div>
              </div>

              {/* Slider Arrow Controls & Slide Counter */}
              {testimonials.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handlePrevTestimonial}
                    className="p-2 rounded-full glass-card border border-slate-700 text-white hover:border-[#9B8FCD] hover:text-[#9B8FCD] transition-all shadow-md active:scale-95 cursor-pointer"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono text-slate-300 font-bold px-1.5">
                    {currentTestimonialIdx + 1} / {testimonials.length}
                  </span>

                  <button
                    onClick={handleNextTestimonial}
                    className="p-2 rounded-full glass-card border border-slate-700 text-white hover:border-[#9B8FCD] hover:text-[#9B8FCD] transition-all shadow-md active:scale-95 cursor-pointer"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Testimonial Review Card */}
            {activeTestimonial && (
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial.id || currentTestimonialIdx}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="bg-slate-900/90 p-5 sm:p-7 rounded-2xl border border-slate-800 shadow-xl space-y-4"
                  >
                    {/* Rating Stars & Verified Review Badge */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(activeTestimonial.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs font-bold text-amber-400 ml-1.5 font-mono">
                          5.0 / 5.0
                        </span>
                      </div>

                      <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Review
                      </span>
                    </div>

                    {/* Review Quote Text */}
                    <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed font-normal">
                      "{activeTestimonial.text}"
                    </p>

                    {/* Client Photo, Name & Role */}
                    <div className="pt-4 flex items-center justify-between border-t border-slate-800/90">
                      <div className="flex items-center gap-3">
                        {activeTestimonial.avatarUrl ? (
                          <img
                            src={activeTestimonial.avatarUrl}
                            alt={activeTestimonial.client}
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#9B8FCD]/60 shadow-md"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#9B8FCD]/20 border border-[#9B8FCD]/40 text-[#9B8FCD] font-bold text-xs flex items-center justify-center font-mono shadow-md">
                            {activeTestimonial.client.charAt(0)}
                          </div>
                        )}

                        <div>
                          <p className="text-xs sm:text-sm font-extrabold text-white">{activeTestimonial.client}</p>
                          {activeTestimonial.company && (
                            <p className="text-[11px] text-[#9B8FCD] font-mono font-semibold">{activeTestimonial.company}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Indicator Dots */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonialIdx(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentTestimonialIdx === idx
                          ? 'w-7 bg-[#9B8FCD] shadow-sm shadow-[#9B8FCD]'
                          : 'w-2 bg-slate-800 hover:bg-slate-700'
                      }`}
                      aria-label={`Go to testimonial slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Key Achievements Column (5 cols - Dynamically adapts for 1, 2, 3, 4, 5+ items cleanly) */}
          <div className="lg:col-span-5 bg-[#1A2335]/90 p-6 sm:p-8 rounded-3xl border border-slate-700/60 shadow-2xl space-y-5 relative overflow-hidden backdrop-blur-xl">
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-[#9B8FCD]/40 text-[#9B8FCD] text-xs font-mono font-bold shadow-sm">
                <Trophy className="w-3.5 h-3.5 text-[#9B8FCD]" />
                <span>Milestones & Recognition</span>
              </div>

              <div className="py-1">
                <SplitText
                  text="Key Achievements"
                  highlightText="Achievements"
                  highlightClass="text-sky-400 font-extrabold"
                  className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif"
                  delay={40}
                  duration={1.1}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 35 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.05}
                  rootMargin="0px"
                  textAlign="left"
                />
              </div>

              <p className="text-xs text-slate-300">
                Hackathons, open-source work, and engineering milestones.
              </p>
            </div>

            {/* Achievements List (Sleek layout with smooth scroll for >3 items to keep layout 100% compact & flawless) */}
            <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1 custom-scrollbar">
              {achievements.map((ach, index) => (
                <motion.div
                  key={ach.id || index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="bg-slate-900/90 hover:bg-slate-900 p-4 sm:p-4.5 rounded-2xl border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 flex items-start gap-3.5 shadow-md group"
                >
                  {/* Trophy Icon */}
                  <div className="w-9 h-9 rounded-xl bg-[#9B8FCD]/20 border border-[#9B8FCD]/40 flex items-center justify-center text-[#9B8FCD] shrink-0 group-hover:scale-105 group-hover:bg-[#9B8FCD]/30 transition-all">
                    <Trophy className="w-4.5 h-4.5" />
                  </div>

                  {/* Info */}
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {ach.title}
                      </h3>
                      {ach.year && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-[#9B8FCD] border border-slate-700/60 shrink-0 font-semibold">
                          {ach.year}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-3">
                      {ach.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Achievements;
