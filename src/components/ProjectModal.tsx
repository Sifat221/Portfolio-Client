import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Sparkles } from 'lucide-react';
import { IProject } from '../types/portfolio';

interface ProjectModalProps {
  project: IProject | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col bg-[#0C1220]"
          onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking content
        >
          {/* Top Banner Image Header */}
          <div className="relative h-56 sm:h-64 overflow-hidden shrink-0 bg-slate-950">
            <img
              src={project.imageUrl || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1220] via-[#0C1220]/60 to-transparent"></div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700/80 hover:border-[#9B8FCD] transition-all shadow-xl hover:scale-105 active:scale-95 z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Title Overlay */}
            <div className="absolute bottom-5 left-6 right-6 space-y-1.5">
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

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              {project.tagline && (
                <p className="text-sm text-[#9B8FCD] font-mono font-semibold">
                  {project.tagline}
                </p>
              )}
            </div>
          </div>

          {/* Modal Body - Clean, Simple Prose Layout Without Heavy Boxes */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-200">
            {/* Overview Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold">
                Project Overview & Business Value
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {project.description}
              </p>
            </div>

            {/* Key Capabilities Bullet List (Clean text list without button boxes) */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold">
                  Key Capabilities & Features
                </h3>
                <ul className="space-y-2.5">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#9B8FCD] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Inline Badges */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold">
                  Engineering Stack & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar Footer */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-[#9B8FCD] transition-all flex items-center gap-2"
                  >
                    <Github className="w-4 h-4 text-[#9B8FCD]" />
                    <span>GitHub Code</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#9B8FCD] to-indigo-600 hover:from-[#8B7DBE] hover:to-indigo-500 shadow-md shadow-[#9B8FCD]/20 transition-all flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Preview</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
