import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, ExternalLink, Calendar } from 'lucide-react';
import { IEducation, ICertification } from '../types/portfolio';

interface EducationCertificationsProps {
  education: IEducation[];
  certifications: ICertification[];
}

export const EducationCertifications: React.FC<EducationCertificationsProps> = ({
  education,
  certifications,
}) => {
  return (
    <section id="education" className="py-24 relative bg-[#090D16] border-t border-slate-800/80">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Column */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#9B8FCD]/30 text-[#9B8FCD] text-xs font-mono font-bold">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Academic Foundation</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Education & <span className="text-gradient-periwinkle">Degrees</span>
              </h2>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-3xl border border-slate-800/80 hover:border-[#9B8FCD]/50 transition-all duration-300 space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#9B8FCD]/20 border border-[#9B8FCD]/40 flex items-center justify-center text-[#9B8FCD]">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                        <p className="text-xs text-[#9B8FCD] font-mono">{edu.institution}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700/60">
                      {edu.timeline}
                    </span>
                  </div>

                  {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80 space-y-2">
                      <p className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#9B8FCD]" />
                        Relevant Coursework:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.relevantCourses.map((course, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-indigo-500/30 text-indigo-400 text-xs font-mono font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>Verified Credentials</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Certifications & <span className="text-gradient">Credentials</span>
              </h2>
            </div>

            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-3xl border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{cert.title}</h3>
                      <p className="text-xs text-indigo-300 font-mono">{cert.issuer}</p>
                      {cert.issueDate && (
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-mono">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          Issued: {cert.issueDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-800/80 text-[#9B8FCD] hover:text-white hover:bg-[#9B8FCD] transition-colors border border-slate-700/60"
                      aria-label="View Credential"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
