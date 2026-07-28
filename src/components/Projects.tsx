import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, ExternalLink, Github, ArrowUpRight } from 'lucide-react';
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
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#9B8FCD]/30 text-[#9B8FCD] text-xs font-bold font-mono">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile App Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Flagship <span className="text-gradient-periwinkle">Flutter Applications</span>
          </h2>
          <p className="text-slate-300 text-base">
            Explore real-world mobile solutions engineered with Flutter, BLoC/GetX, Clean Architecture, and REST API backends.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                filterCategory === cat
                  ? 'bg-gradient-to-r from-[#9B8FCD] to-indigo-600 text-white shadow-lg shadow-[#9B8FCD]/30 scale-105'
                  : 'glass-card text-slate-300 hover:text-white hover:border-[#9B8FCD]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800/80 flex flex-col group hover:border-[#9B8FCD]/50 transition-all duration-300"
            >
              {/* Thumbnail Container */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={project.imageUrl || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111726] via-transparent to-transparent opacity-90"></div>

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#090D16]/80 text-[#9B8FCD] border border-[#9B8FCD]/40 backdrop-blur-md">
                    {project.category || 'Mobile App'}
                  </span>
                  {project.isFeatured && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#9B8FCD] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#9B8FCD] font-medium font-mono line-clamp-1">
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
                  </div>
                )}

                {/* Card Action Bar */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-[#9B8FCD] hover:text-white flex items-center gap-1 group/btn"
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
                        className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:border-[#9B8FCD]/50 border border-slate-700/60 transition-colors"
                        aria-label="GitHub Repo"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-800/80 text-[#9B8FCD] hover:text-white hover:bg-[#9B8FCD] border border-slate-700/60 transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
