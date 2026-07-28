import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, BookOpen, ExternalLink, Calendar, ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles } from 'lucide-react';
import { IEducation, ICertification } from '../types/portfolio';

interface EducationCertificationsProps {
  education: IEducation[];
  certifications: ICertification[];
}

export const EducationCertifications: React.FC<EducationCertificationsProps> = ({
  education,
  certifications,
}) => {
  // University Memorable Moments Images
  const campusMemories = [
    {
      id: 'mem_1',
      title: 'DIU Computer Science Department & Software Showcase',
      caption: 'Presenting Flutter mobile apps & Clean Architecture at Daffodil International University',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'mem_2',
      title: 'University Hackathon & Team Collaboration',
      caption: 'Building real-time mobile solutions with peers during university hackathons',
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'mem_3',
      title: 'Campus Tech Life & Graduation Celebrations',
      caption: 'Memorable milestones during B.Sc. in Computer Science & Engineering (2022 - 2025)',
      url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  const [currentMemoryIdx, setCurrentMemoryIdx] = useState(0);

  const handleNextMemory = () => {
    setCurrentMemoryIdx((prev) => (prev + 1) % campusMemories.length);
  };

  const handlePrevMemory = () => {
    setCurrentMemoryIdx((prev) => (prev - 1 + campusMemories.length) % campusMemories.length);
  };

  return (
    <section id="education" className="py-24 relative bg-[#090D16] border-t border-slate-800/80">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#9B8FCD]/10 rounded-full blur-[130px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Education & Memorable Campus Carousel (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#9B8FCD]/30 text-[#9B8FCD] text-xs font-mono font-bold">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Academic Foundation</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Education & <span className="text-gradient-periwinkle">Degrees</span>
              </h2>
            </div>

            {/* Education Degree Cards */}
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800/80 hover:border-[#9B8FCD]/50 transition-all duration-300 space-y-4 shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#9B8FCD]/20 border border-[#9B8FCD]/40 flex items-center justify-center text-[#9B8FCD] shrink-0">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-white">{edu.degree}</h3>
                        <p className="text-xs text-[#9B8FCD] font-mono font-semibold">{edu.institution}</p>
                      </div>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700/60 font-semibold">
                      {edu.timeline}
                    </span>
                  </div>

                  {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                    <div className="pt-3 border-t border-slate-800/80 space-y-2">
                      <p className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#9B8FCD]" />
                        Relevant Coursework & Specialization:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.relevantCourses.map((course, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
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

            {/* University Memorable Moments Image Carousel Slider */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono uppercase tracking-wider text-[#9B8FCD] font-bold flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#9B8FCD]" />
                  University Memorable Moments
                </h3>

                {/* Carousel Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevMemory}
                    className="p-2 rounded-full glass-card border border-slate-700 text-white hover:border-[#9B8FCD] hover:text-[#9B8FCD] transition-all shadow-md active:scale-95"
                    aria-label="Previous Campus Memory"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-400">
                    {currentMemoryIdx + 1} / {campusMemories.length}
                  </span>
                  <button
                    onClick={handleNextMemory}
                    className="p-2 rounded-full glass-card border border-slate-700 text-white hover:border-[#9B8FCD] hover:text-[#9B8FCD] transition-all shadow-md active:scale-95"
                    aria-label="Next Campus Memory"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Memory Slider Window */}
              <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden glass-card border border-slate-800 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={campusMemories[currentMemoryIdx].id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="relative w-full h-full"
                  >
                    <img
                      src={campusMemories[currentMemoryIdx].url}
                      alt={campusMemories[currentMemoryIdx].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/40 to-transparent"></div>

                    {/* Caption Overlay */}
                    <div className="absolute bottom-4 left-5 right-5 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-[#9B8FCD] font-mono font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>{campusMemories[currentMemoryIdx].title}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-normal">
                        {campusMemories[currentMemoryIdx].caption}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dots indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
                  {campusMemories.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentMemoryIdx(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentMemoryIdx === idx ? 'w-6 bg-[#9B8FCD]' : 'w-1.5 bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Certifications & Verified Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
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
                  className="glass-card p-6 rounded-3xl border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 flex items-center justify-between gap-4 shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
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
                      className="p-3 rounded-xl bg-slate-800/80 text-[#9B8FCD] hover:text-white hover:bg-[#9B8FCD] transition-colors border border-slate-700/60 shadow-md"
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
