import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { IExperience } from '../types/portfolio';

interface ExperienceTimelineProps {
  experience: IExperience[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experience }) => {
  return (
    <section id="experience" className="py-24 relative bg-[#F8FAFC] text-slate-900 border-y border-slate-200/80">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9B8FCD]/15 border border-[#9B8FCD]/30 text-[#8B7DBE] text-xs font-bold font-mono shadow-sm">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career & Engineering History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Professional <span className="text-[#9B8FCD]">Experience</span>
          </h2>
          <p className="text-slate-600 text-base font-normal">
            Proven track record of building production mobile apps, leading Flutter architecture, and delivering high quality code.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-300 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
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
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-10 h-10 rounded-2xl bg-white border-2 border-[#9B8FCD] text-[#8B7DBE] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-5 h-5" />
              </div>

              {/* Light Experience Card for Visual Section Contrast */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#9B8FCD] transition-all duration-300 space-y-4">
                {/* Top Info */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#9B8FCD] transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-[#8B7DBE] font-bold">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-[#8B7DBE]" />
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Responsibilities */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="space-y-2.5 pt-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed font-normal">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
                        className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#9B8FCD]/15 text-[#8B7DBE] border border-[#9B8FCD]/30"
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
