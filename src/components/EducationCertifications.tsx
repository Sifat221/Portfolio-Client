import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, BookOpen, ExternalLink, Calendar, MapPin, Image as ImageIcon, Sparkles, ZoomIn, X } from 'lucide-react';
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

  // Lightbox Modal state for expanding campus image on click
  const [activeModalImage, setActiveModalImage] = useState<{ url: string; title: string; subtitle: string } | null>(null);

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

        {/* 1. ACADEMIC DEGREE CARDS (Exact Layout of Image 1 & 2) */}
        <div className="space-y-10">
          <div className="flex items-center gap-2 text-[#9B8FCD] font-mono text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4.5 h-4.5" />
            <span>Academic Degree Program</span>
          </div>

          {education.map((edu, index) => {
            const imageUrl = (edu.imageUrl && edu.imageUrl.trim() !== '') ? edu.imageUrl : "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200";
            return (
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

                  {/* Right Side: Clickable Campus / Degree Photo Box (Matching Image 1) */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div
                      onClick={() => setActiveModalImage({ url: imageUrl, title: edu.institution, subtitle: edu.degree })}
                      className="relative w-full h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl group-hover:border-cyan-400/80 transition-all bg-slate-900 shrink-0 cursor-pointer group/img"
                    >
                      <img
                        src={imageUrl}
                        alt={`${edu.institution} Campus Photo`}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/80 via-transparent to-transparent pointer-events-none"></div>

                      {/* Image Click Badge Overlay (Matching Image 1) */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#060913]/90 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-semibold shadow-lg backdrop-blur-sm group-hover/img:border-cyan-400 group-hover/img:bg-cyan-950/80 transition-all">
                          <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Click to view campus image</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-110 transition-transform overflow-hidden">
                    {cert.imageUrl ? (
                      <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      <Award className="w-6 h-6" />
                    )}
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

        {/* 3. INTERACTIVE CAMPUS PHOTO GALLERY GRID (Exact Layout of Image 2) */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white dark:bg-[#080D19] glass-card border border-slate-200/80 dark:border-slate-800/80 shadow-xl dark:shadow-2xl space-y-8 relative overflow-hidden">
            {/* Background subtle glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Section Header (Exact Matching Image 2) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest">
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>INTERACTIVE PHOTO GALLERY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-serif flex items-center gap-2 flex-wrap">
                  <span className="text-slate-900 dark:text-white">Memorable</span>
                  <span className="text-cyan-600 dark:text-[#38BDF8]">Campus Moments</span>
                </h2>
              </div>

              {/* Right Side Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 dark:bg-[#071322] border border-cyan-200 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-semibold shadow-sm backdrop-blur-sm hover:border-cyan-400 transition-all cursor-pointer shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>University Life</span>
              </div>
            </div>

            {/* 3-Column Card Grid (Exact Matching Image 2) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {universityPhotos.slice(0, 3).map((photo, index) => {
                const subtitle = photo.subtitle || photo.category || (index === 0 ? 'Campus Life' : index === 1 ? 'Research & Events' : 'Milestones');
                return (
                  <motion.div
                    key={photo.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => setActiveModalImage({ url: photo.url, title: photo.title, subtitle: subtitle })}
                    className="glass-card bg-slate-50 dark:bg-[#0D1322] rounded-2xl border border-slate-200/80 dark:border-slate-800/90 hover:border-cyan-500/50 hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col justify-between"
                  >
                    {/* Card Image */}
                    <div className="relative h-48 sm:h-52 lg:h-56 w-full overflow-hidden bg-slate-900 shrink-0">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover filter grayscale contrast-105 brightness-95 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-[#0D1322] via-transparent to-transparent opacity-80"></div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 space-y-1.5 flex-1 flex flex-col justify-between bg-white dark:bg-[#0D1322]">
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-snug tracking-tight">
                          {index === 1 && <span className="text-cyan-500 dark:text-cyan-400 mr-1 font-sans">•</span>}
                          {photo.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-sans tracking-wide pt-1">
                        {subtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. INTERACTIVE CAMPUS IMAGE LIGHTBOX MODAL (Exact Matching Image 2) */}
      <AnimatePresence>
        {activeModalImage && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8"
            onClick={() => setActiveModalImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-[#0B0F1C] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header (Matching Image 2) */}
              <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-white tracking-tight font-serif">
                    {activeModalImage.title}
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono">
                    {activeModalImage.subtitle} • Campus Life
                  </p>
                </div>
                <button
                  onClick={() => setActiveModalImage(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close image popup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Image */}
              <div className="p-3 sm:p-4 bg-[#060912] flex items-center justify-center overflow-hidden">
                <img
                  src={activeModalImage.url}
                  alt={activeModalImage.title}
                  className="max-w-full max-h-[72vh] object-contain rounded-2xl border border-slate-800 shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EducationCertifications;
