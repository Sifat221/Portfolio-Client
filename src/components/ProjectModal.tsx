import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Sparkles, ShieldCheck, Zap } from 'lucide-react';
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-in fade-in duration-300"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col bg-[#0D1322]/95"
          onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
        >
          {/* Header Banner */}
          <div className="relative h-56 sm:h-72 overflow-hidden shrink-0 bg-slate-950">
            <img
              src={project.imageUrl || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1322] via-[#0D1322]/60 to-transparent"></div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-3 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700 hover:border-[#9B8FCD] transition-all shadow-xl hover:scale-110 active:scale-95 z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Content Overlay */}
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#9B8FCD]/20 text-[#9B8FCD] border border-[#9B8FCD]/40 backdrop-blur-md">
                  {project.category || 'Mobile App'}
                </span>
                {project.isFeatured && (
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Featured App
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              {project.tagline && (
                <p className="text-sm sm:text-base text-[#9B8FCD] font-mono font-semibold">
                  {project.tagline}
                </p>
              )}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 text-slate-200">
            {/* Overview & Architecture */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#9B8FCD]" />
                Project Overview & Business Value
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                {project.description}
              </p>
            </div>

            {/* Key Capabilities & Features */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Key Features & Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800 flex items-start gap-3 hover:border-[#9B8FCD]/40 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  Engineering Stack & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-800/90 text-[#9B8FCD] border border-slate-700/80 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Impact Highlights Banner */}
            <div className="bg-gradient-to-r from-[#9B8FCD]/15 via-indigo-600/10 to-cyan-500/10 p-5 rounded-2xl border border-[#9B8FCD]/30 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#9B8FCD]/20 flex items-center justify-center text-[#9B8FCD]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase">Mobile Quality Standard</h4>
                  <p className="text-xs text-slate-300">Clean Architecture • Smooth 60fps • REST API Validated</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                100% Verified
              </span>
            </div>

            {/* Action Bar Footer */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-[#9B8FCD] transition-all flex items-center gap-2 shadow-lg"
                  >
                    <Github className="w-4 h-4 text-[#9B8FCD]" />
                    <span>View GitHub Source</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#9B8FCD] via-indigo-600 to-cyan-500 hover:from-[#8B7DBE] hover:to-cyan-400 shadow-xl shadow-[#9B8FCD]/30 transition-all flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live App / Demo Preview</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-mono font-bold text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
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
