import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, BookOpen, ExternalLink, Calendar, MapPin, ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles } from 'lucide-react';
import { IEducation, ICertification, IGalleryPhoto } from '../types/portfolio';
import { defaultGalleryPhotos } from '../services/api';
import SplitText from './SplitText';

interface EducationCertificationsProps {
  education: IEducation[];
  certifications: ICertification[];
  galleryPhotos?: IGalleryPhoto[];
}

export const EducationCertifications: React.FC<EducationCertificationsProps> = ({
  education,
  certifications,
  galleryPhotos,
}) => {
  const universityPhotos = (galleryPhotos && galleryPhotos.length > 0) ? galleryPhotos : defaultGalleryPhotos;
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const handleNextPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev + 1) % universityPhotos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev - 1 + universityPhotos.length) % universityPhotos.length);
  };

  return (
    <section id="education" className="py-24 relative bg-[#090D16] border-t border-slate-800/80">
      {/* Ambient Background Soft Glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#9B8FCD]/10 rounded-full blur-[130px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-16"
      >
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#9B8FCD]/40 text-[#9B8FCD] text-xs font-mono font-bold shadow-lg shadow-[#9B8FCD]/10 mb-1">
            <GraduationCap className="w-4 h-4 text-[#9B8FCD]" />
            <span>Academic Background & Verified Credentials</span>
          </div>

          <SplitText
            text="Education & Certifications"
            highlightText="Certifications"
            highlightClass="text-blue-500 font-extrabold"
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

          <p className="text-slate-300 text-sm font-normal max-w-xl mx-auto leading-relaxed">
            Academic degrees, engineering courseworks, professional credentials, and university campus photo gallery.
          </p>
        </div>

        {/* 1. ACADEMIC DEGREE CARDS (Exact Layout of Image 2) */}
        <div className="space-y-10">
          <div className="flex items-center gap-2 text-[#9B8FCD] font-mono text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4.5 h-4.5" />
            <span>Academic Degree Program</span>
          </div>

          {education.map((edu, index) => (
            <motion.div
              key={edu.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-800/80 hover:border-[#9B8FCD]/50 transition-all duration-300 shadow-2xl relative overflow-hidden group"
            >
              {/* Background Blur Glow */}
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#9B8FCD]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#9B8FCD]/20 transition-all"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
                {/* Left Side: Program Details & Coursework (7 Cols) */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Top Badges Row */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-950/60 text-indigo-300 border border-indigo-500/40 shadow-sm flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                      {edu.degree.includes('B.Sc') || edu.degree.includes('Bachelor') ? 'B.Sc. Degree Program' : 'Academic Program'}
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 shadow-sm flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      {edu.timeline}
                    </span>
                  </div>

                  {/* Institution Title & Degree */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-serif">
                      {edu.institution}
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-cyan-400 flex items-center gap-2 mt-1">
                      {edu.degree}
                    </p>
                    {edu.location && (
                      <p className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mt-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{edu.location}</span>
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-2xl">
                    {edu.description || "Specialized in Mobile Application Engineering (Flutter), Clean Architecture, Distributed Systems, Artificial Intelligence, and Machine Learning algorithms. Maintained consistent academic excellence while leading student software engineering initiatives."}
                  </p>

                  {/* Coursework Section */}
                  {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                    <div className="pt-3 space-y-3">
                      <p className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                        CORE ENGINEERING COURSEWORK
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {edu.relevantCourses.map((course, i) => (
                          <span
                            key={i}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-slate-900/90 text-slate-300 border border-slate-700/80 hover:border-[#9B8FCD]/60 transition-colors shadow-sm"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side: Campus / Degree Photo Box (5 Cols - Matching Image 2) */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl group-hover:border-[#9B8FCD]/60 transition-all bg-slate-900 shrink-0">
                    <img
                      src={edu.imageUrl || universityPhotos[0]?.url || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"}
                      alt={`${edu.institution} Campus Photo`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/60 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. VERIFIED CREDENTIALS & CERTIFICATES */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Award className="w-4.5 h-4.5" />
            <span>Verified Credentials & Certificates</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 rounded-3xl border border-slate-800/80 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-800/80 text-[#9B8FCD] hover:text-white hover:bg-[#9B8FCD] transition-colors border border-slate-700/60 shadow-md"
                      aria-label="View Credential"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#9B8FCD] transition-colors">{cert.title}</h3>
                  <p className="text-xs text-indigo-300 font-mono mt-1">{cert.issuer}</p>
                  {cert.issueDate && (
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-2 font-mono">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      Issued: {cert.issueDate}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. UNIVERSITY MEMORABLE PHOTOS GALLERY CAROUSEL */}
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

export default EducationCertifications;
