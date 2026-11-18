import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Sparkles, Smartphone, Layout } from 'lucide-react';
import { IProject } from '../types/portfolio';

interface ProjectModalProps {
  project: IProject | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Soft Background Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/15 via-[#9B8FCD]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

          <motion.div
            key="project-modal-card"
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-3xl glass-panel rounded-3xl border border-slate-700/80 hover:border-cyan-500/40 shadow-[0_0_50px_rgba(125,249,255,0.08)] shadow-2xl overflow-hidden my-4 sm:my-6 max-h-[90vh] max-h-[90dvh] flex flex-col bg-[#0C1220] transition-colors"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside content
          >
            {/* Top Banner Image Header with Parallax Scale-in */}
            <div className="relative h-72 sm:h-[400px] overflow-hidden shrink-0 bg-slate-950">
              <motion.img
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                src={project.imageUrl || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
              {/* Deep gradient overlay for crystal-clear readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1220] via-[#0C1220]/60 to-transparent pointer-events-none z-10"></div>

              {/* Close Button with interactive spin hover */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700/80 hover:border-cyan-400 transition-colors shadow-xl z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Header Title Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="absolute bottom-5 left-6 right-6 space-y-1.5 z-20"
              >
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#9B8FCD]/20 text-[#9B8FCD] border border-[#9B8FCD]/40 backdrop-blur-md">
                    {project.category || 'Mobile App'}
                  </span>
                  {project.isFeatured && (
                    <motion.div
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="group/featured px-3.5 py-1 rounded-full text-xs font-semibold bg-[#181926]/95 text-amber-300 border border-amber-500/70 backdrop-blur-md flex items-center gap-1.5 shadow-md hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:border-amber-400 cursor-pointer transition-all duration-300 select-none"
                    >
                      <motion.span
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                        whileHover={{ rotate: 180, scale: 1.3 }}
                        className="inline-flex items-center justify-center text-amber-400 group-hover/featured:text-amber-300 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </motion.span>
                      <span className="tracking-wide">Featured App</span>
                    </motion.div>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif">
                  {project.title}
                </h2>
                {project.tagline && (
                  <p className="text-sm text-[#9B8FCD] font-mono font-semibold">
                    {project.tagline}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Modal Body - Staggered Content Animation */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-200">
              {/* Overview Description */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="space-y-2"
              >
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold">
                  Project Overview & Business Value
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                  {project.description}
                </p>
              </motion.div>

              {/* Key Capabilities Bullet List with staggered checkmarks */}
              {project.features && project.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.4 }}
                  className="space-y-3 pt-2"
                >
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold">
                    Key Capabilities & Features
                  </h3>
                  <ul className="space-y-2.5">
                    {project.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + i * 0.04, duration: 0.3 }}
                        className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Tech Stack Inline Badges with Micro-interactions */}
              {project.techStack && project.techStack.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="space-y-2 pt-2"
                >
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold">
                    Engineering Stack & Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.08, y: -2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:border-cyan-400/60 hover:text-cyan-300 cursor-default transition-colors shadow-sm"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Action Bar Footer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  {project.githubUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-[#9B8FCD] transition-all flex items-center gap-2"
                    >
                      {project.githubUrl.includes('figma.com') || (project.githubLabel && !project.githubLabel.toLowerCase().includes('github') && !project.githubLabel.toLowerCase().includes('code')) ? (
                        <Layout className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <Github className="w-4 h-4 text-[#9B8FCD]" />
                      )}
                      <span>{project.githubLabel || 'GitHub Code'}</span>
                    </motion.a>
                  )}
                  {/* @ts-ignore */}
                  {project.androidUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.androidUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 hover:border-emerald-400 shadow-md shadow-emerald-950/30 transition-all flex items-center gap-2"
                    >
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                      <span>Android</span>
                    </motion.a>
                  )}
                  {/* @ts-ignore */}
                  {project.iosUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.iosUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-slate-400 shadow-md transition-all flex items-center gap-2"
                    >
                      <Smartphone className="w-4 h-4 text-sky-400" />
                      <span>iOS</span>
                    </motion.a>
                  )}
                  {project.demoUrl && (
                    <motion.a
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#9B8FCD] via-indigo-600 to-cyan-500 hover:from-[#8B7DBE] hover:to-indigo-500 shadow-lg shadow-[#9B8FCD]/25 hover:shadow-cyan-500/30 transition-all flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{project.demoLabel || 'Live Preview'}</span>
                    </motion.a>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  Close Window
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
