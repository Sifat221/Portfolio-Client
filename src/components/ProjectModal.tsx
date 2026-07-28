import React from 'react';
import { X, ExternalLink, Github, CheckCircle } from 'lucide-react';
import { IProject } from '../types/portfolio';

interface ProjectModalProps {
  project: IProject | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header Bar */}
        <div className="relative h-48 sm:h-64 overflow-hidden shrink-0">
          <img
            src={project.imageUrl || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/60 to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 hover:border-[#9B8FCD] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#9B8FCD]/20 text-[#9B8FCD] border border-[#9B8FCD]/40 inline-block mb-2">
              {project.category || 'Mobile App'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h2>
            {project.tagline && (
              <p className="text-sm text-[#9B8FCD] font-medium">{project.tagline}</p>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold mb-2">
              Overview & Architecture
            </h3>
            <p className="text-base leading-relaxed text-slate-300">
              {project.description}
            </p>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold mb-3">
                Key Mobile Features & Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="glass-card p-3 rounded-xl border border-slate-800 flex items-start gap-2.5"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold mb-3">
                Technologies & Tools Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-800/90 text-[#9B8FCD] border border-slate-700/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Links Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-[#9B8FCD]/50 transition-all flex items-center gap-2"
                >
                  <Github className="w-4 h-4 text-[#9B8FCD]" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#9B8FCD] to-indigo-600 hover:from-[#8B7DBE] hover:to-indigo-500 shadow-lg shadow-[#9B8FCD]/25 transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Preview / Demo</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
