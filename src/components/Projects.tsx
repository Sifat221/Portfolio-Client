import React, { useState } from 'react';
import { Smartphone, ExternalLink, Github, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { IProject } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  projects: IProject[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category || 'Mobile Development')))];

  const filteredProjects =
    filterCategory === 'All'
      ? projects
      : projects.filter((p) => (p.category || 'Mobile Development') === filterCategory);

  return (
    <section id="projects" className="py-24 relative bg-[#090D16]">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile App Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Flagship <span className="text-gradient">Flutter Applications</span>
          </h2>
          <p className="text-slate-400 text-base">
            Explore real-world mobile solutions engineered with Flutter, BLoC/GetX, Clean Architecture, and REST API backends.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                filterCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                  : 'glass-card text-slate-400 hover:text-white hover:border-cyan-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800/80 flex flex-col group hover:border-cyan-500/40 transition-all duration-300"
            >
              {/* Thumbnail Container */}
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={project.imageUrl || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111726] via-transparent to-transparent opacity-90"></div>

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#090D16]/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                    {project.category || 'Mobile App'}
                  </span>
                  {project.isFeatured && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                      Featured App
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-cyan-300 font-medium font-mono line-clamp-1">
                    {project.tagline}
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                {project.techStack && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-1 rounded-md text-[10px] font-mono text-slate-400 bg-slate-800/40">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Card Action Bar */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/btn"
                  >
                    <span>View App Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:border-cyan-500/50 border border-slate-700/60 transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-800/80 text-cyan-400 hover:text-white hover:bg-cyan-500 border border-slate-700/60 transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
