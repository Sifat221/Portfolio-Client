import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Quote, Sparkles, UserCheck } from 'lucide-react';
import { IAchievement, ITestimonial } from '../types/portfolio';

interface TestimonialsAchievementsProps {
  testimonials: ITestimonial[];
  achievements: IAchievement[];
}

export const Achievements: React.FC<TestimonialsAchievementsProps> = ({
  testimonials,
  achievements,
}) => {
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
          {/* Testimonials Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#1A2335]/90 p-8 sm:p-10 rounded-3xl border border-slate-700/60 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold shadow-sm">
                <Quote className="w-3.5 h-3.5" />
                <span>Client & Peer Endorsements</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                What People <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B8FCD] via-indigo-400 to-cyan-400">Say</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Direct feedback from engineering leads, project managers, and product partners.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 flex-1 flex flex-col justify-center">
              {testimonials.map((test, index) => (
                <div
                  key={test.id || index}
                  className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 hover:border-[#9B8FCD]/60 transition-all duration-300 space-y-4 shadow-lg group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(test.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> Verified Feedback
                    </span>
                  </div>

                  <p className="text-sm text-slate-200 italic leading-relaxed font-normal">
                    "{test.text}"
                  </p>

                  <div className="pt-3 flex items-center justify-between border-t border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#9B8FCD]/20 border border-[#9B8FCD]/40 text-[#9B8FCD] font-bold text-xs flex items-center justify-center font-mono">
                        {test.client.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#9B8FCD] transition-colors">{test.client}</p>
                        {test.company && (
                          <p className="text-[11px] text-[#9B8FCD] font-mono">{test.company}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#1A2335]/90 p-8 sm:p-10 rounded-3xl border border-slate-700/60 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-[#9B8FCD]/40 text-[#9B8FCD] text-xs font-mono font-bold shadow-sm">
                <Trophy className="w-3.5 h-3.5" />
                <span>Milestones & Recognition</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B8FCD] via-indigo-400 to-cyan-400">Achievements</span>
              </h2>
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
