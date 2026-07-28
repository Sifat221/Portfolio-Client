import React from 'react';
import { Briefcase, Calendar, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { IExperience } from '../types/portfolio';

interface ExperienceTimelineProps {
  experience: IExperience[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experience }) => {
  return (
    <section id="experience" className="py-24 relative bg-[#0B101D]/70 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career & Engineering History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional <span className="text-gradient-cyan">Experience</span>
          </h2>
          <p className="text-slate-400 text-base">
            Proven track record of building production mobile apps, leading Flutter architecture, and delivering high quality code.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {experience.map((exp, index) => (
            <div key={exp.id || index} className="relative group">
              {/* Floating Timeline Icon Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 text-cyan-400 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300">
                <Briefcase className="w-5 h-5" />
              </div>

              {/* Experience Card */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 space-y-4">
                {/* Top Info */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-cyan-300 font-medium font-mono">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Responsibilities */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="space-y-2.5 pt-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Impact Banner */}
                {exp.impact && (
                  <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Impact:</strong> {exp.impact}</span>
                  </div>
                )}

                {/* Technologies */}
                {exp.technologies && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-md text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
