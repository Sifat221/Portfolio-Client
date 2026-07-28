import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { GraduationCap, Award, BookOpen, ExternalLink, Calendar, ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles } from 'lucide-react';
import { IEducation, ICertification } from '../types/portfolio';

interface EducationCertificationsProps {
  education: IEducation[];
  certifications: ICertification[];
}

// Letter-by-Letter Staggered Typewriter Text Reveal Component
const StaggeredTitle: React.FC<{ text: string; gradientText?: string }> = ({ text, gradientText }) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
  };

  const mainLetters = Array.from(text);
  const gradientLetters = gradientText ? Array.from(gradientText) : [];

  return (
    <motion.h2
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex flex-wrap justify-center items-center gap-[0.02em]"
    >
      {mainLetters.map((char, index) => (
        <motion.span variants={child} key={`main-${index}`} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}

      {gradientLetters.length > 0 && (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B8FCD] via-indigo-400 to-cyan-400 inline-flex flex-wrap">
          {gradientLetters.map((char, index) => (
            <motion.span variants={child} key={`grad-${index}`} className="inline-block">
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      )}
    </motion.h2>
  );
};

export const EducationCertifications: React.FC<EducationCertificationsProps> = ({
  education,
  certifications,
}) => {
  // Personal University & Campus Memorable Photos List
  const universityPhotos = [
    {
      id: 'photo_1',
      title: 'Daffodil International University - Software & App Showcase',
      caption: 'Presenting Flutter mobile apps & Clean Architecture at DIU CS Department',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'photo_2',
      title: 'University Hackathon & Team Engineering',
      caption: 'Collaborating with peers on real-time mobile app hackathon projects',
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'photo_3',
      title: 'Campus Life & Graduation Milestones',
      caption: 'B.Sc. in Computer Science & Engineering graduation memories (2022 - 2025)',
      url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const handleNextPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev + 1) % universityPhotos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev - 1 + universityPhotos.length) % universityPhotos.length);
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
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-12"
      >
        {/* Animated Staggered Letter-by-Letter Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#9B8FCD]/40 text-[#9B8FCD] text-xs font-mono font-bold shadow-lg shadow-[#9B8FCD]/10 hover:scale-105 transition-transform">
            <GraduationCap className="w-4 h-4 text-[#9B8FCD] animate-bounce" />
            <span>Academic Background & Verified Credentials</span>
          </div>

          {/* Letter-by-Letter Typewriter Animation for "Education & Certifications" */}
          <StaggeredTitle text="Education & " gradientText="Certifications" />

          <p className="text-slate-300 text-sm font-normal max-w-xl mx-auto">
            Academic degrees, courseworks, professional credentials, and university memorable photo gallery.
          </p>
        </div>

        {/* 1. Academic Degrees & Certifications Grid with Vertical Divider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Academic Degrees */}
          <div className="lg:col-span-6 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-800/90 pb-8 lg:pb-0 lg:pr-8">
            <div className="flex items-center gap-2 text-[#9B8FCD] font-mono text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Degree & Coursework</span>
            </div>

            {education.map((edu, index) => (
              <motion.div
                key={edu.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800/80 hover:border-[#9B8FCD]/50 transition-all duration-300 space-y-4 shadow-xl group"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#9B8FCD]/20 border border-[#9B8FCD]/40 flex items-center justify-center text-[#9B8FCD] shrink-0 group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-white group-hover:text-[#9B8FCD] transition-colors">{edu.degree}</h3>
                      <p className="text-xs text-[#9B8FCD] font-mono font-semibold">{edu.institution}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700/60 font-semibold">
                    {edu.timeline}
                  </span>
                </div>

                {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <p className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#9B8FCD]" />
                      Relevant Coursework & Studies:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.relevantCourses.map((course, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
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

          {/* Right Column: Verified Credentials */}
          <div className="lg:col-span-6 space-y-6 lg:pl-2">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Verified Credentials & Certificates</span>
            </div>

            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 rounded-3xl border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 flex items-center justify-between gap-4 shadow-xl group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#9B8FCD] transition-colors">{cert.title}</h3>
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

        {/* 2. University Memorable Photos Gallery Carousel */}
        <div className="pt-6 space-y-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between flex-wrap gap-4 pt-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#9B8FCD]" />
                University Memorable Photos Gallery
              </h3>
              <p className="text-xs text-slate-400">Campus memories, hackathons, and graduation moments</p>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevPhoto}
                className="p-2.5 rounded-full glass-card border border-slate-700 text-white hover:border-[#9B8FCD] hover:text-[#9B8FCD] transition-all shadow-md active:scale-95"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono text-slate-300 font-bold px-1">
                {currentPhotoIdx + 1} of {universityPhotos.length}
              </span>

              <button
                onClick={handleNextPhoto}
                className="p-2.5 rounded-full glass-card border border-slate-700 text-white hover:border-[#9B8FCD] hover:text-[#9B8FCD] transition-all shadow-md active:scale-95"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Embedded Photo Gallery Carousel */}
          <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden glass-card border border-slate-800 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={universityPhotos[currentPhotoIdx].id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="relative w-full h-full"
              >
                <img
                  src={universityPhotos[currentPhotoIdx].url}
                  alt={universityPhotos[currentPhotoIdx].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/30 to-transparent"></div>

                {/* Caption & Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#9B8FCD] font-mono font-bold">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{universityPhotos[currentPhotoIdx].title}</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-normal max-w-2xl">
                    {universityPhotos[currentPhotoIdx].caption}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicator Dots */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              {universityPhotos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPhotoIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentPhotoIdx === idx ? 'w-8 bg-[#9B8FCD] shadow-sm shadow-[#9B8FCD]' : 'w-2 bg-white/40'
                  }`}
                  aria-label={`Go to photo ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
