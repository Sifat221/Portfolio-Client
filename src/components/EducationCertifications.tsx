import React from 'react';
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
    <section id="education" className="py-24 relative bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Column */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Academic Foundation</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Education & <span className="text-gradient">Degrees</span>
              </h2>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={edu.id || index}
                  className="glass-card p-6 rounded-3xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                        <p className="text-xs text-cyan-300 font-mono">{edu.institution}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700/60">
                      {edu.timeline}
                    </span>
                  </div>

                  {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80 space-y-2">
                      <p className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
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
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-indigo-500/30 text-indigo-400 text-xs font-mono">
                <Award className="w-3.5 h-3.5" />
                <span>Verified Credentials</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Certifications & <span className="text-gradient-cyan">Credentials</span>
              </h2>
            </div>

            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div
                  key={cert.id || index}
                  className="glass-card p-6 rounded-3xl border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{cert.title}</h3>
                      <p className="text-xs text-indigo-300 font-mono">{cert.issuer}</p>
                      {cert.issueDate && (
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
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
                      className="p-2.5 rounded-xl bg-slate-800/80 text-cyan-400 hover:text-white hover:bg-cyan-500 transition-colors border border-slate-700/60"
                      aria-label="View Credential"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
