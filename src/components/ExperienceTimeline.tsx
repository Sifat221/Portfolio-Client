import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { IExperience } from '../types/portfolio';
import SplitText from './SplitText';

interface ExperienceTimelineProps {
  experience: IExperience[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experience }) => {
  return (
    <section id="experience" className="py-24 relative text-slate-100 border-y border-slate-800/60">
      {/* Background Soft Periwinkle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#9B8FCD]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
      >
        {/* Clean Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#9B8FCD]/40 text-[#9B8FCD] text-xs font-bold font-mono shadow-lg shadow-[#9B8FCD]/10 mb-1">
            <Briefcase className="w-4 h-4 text-[#9B8FCD]" />
            <span>Career & Engineering History</span>
          </div>

          <SplitText
            text="Professional Experience"
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight py-1"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.05}
            rootMargin="0px"
            textAlign="center"
          />

          <p className="text-slate-300 text-sm font-normal max-w-xl mx-auto">
            Proven track record of building production mobile apps, leading Flutter architecture, and delivering high quality code.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-700/80 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Floating Timeline Icon Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-10 h-10 rounded-2xl glass-card border-2 border-[#9B8FCD] text-[#9B8FCD] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-5 h-5" />
              </div>

              {/* Harmonious Responsive Experience Card */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-700/60 shadow-xl hover:shadow-2xl hover:border-[#9B8FCD]/60 transition-all duration-300 space-y-4">
                {/* Top Info */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-[#9B8FCD] transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-[#9B8FCD] font-bold">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
                    <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60">
                      <Calendar className="w-3.5 h-3.5 text-[#9B8FCD]" />
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Responsibilities */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="space-y-2.5 pt-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-200 leading-relaxed font-normal">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Technologies */}
                {exp.technologies && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#9B8FCD]/20 text-[#9B8FCD] border border-[#9B8FCD]/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
