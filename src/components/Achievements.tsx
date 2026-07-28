import React from 'react';
import { Trophy, Star, Sparkles, Quote } from 'lucide-react';
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
    <section className="py-24 relative bg-[#0B101D]/70 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Testimonials Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-amber-500/30 text-amber-400 text-xs font-mono">
                <Quote className="w-3.5 h-3.5" />
                <span>Client & Peer Feedback</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                What People <span className="text-gradient">Say</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {testimonials.map((test, index) => (
                <div
                  key={test.id || index}
                  className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800/80 hover:border-amber-500/30 transition-all duration-300 space-y-4"
                >
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(test.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed">
                    "{test.text}"
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                    <div>
                      <p className="text-sm font-bold text-white">{test.client}</p>
                      {test.company && (
                        <p className="text-xs text-amber-300 font-mono">{test.company}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                <Trophy className="w-3.5 h-3.5" />
                <span>Milestones & Impact</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Key <span className="text-gradient-cyan">Achievements</span>
              </h2>
            </div>

            <div className="space-y-4">
              {achievements.map((ach, index) => (
                <div
                  key={ach.id || index}
                  className="glass-card p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-white">{ach.title}</h3>
                      {ach.year && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
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
      </div>
    </section>
  );
};
