import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, ExternalLink, Github, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { IProject } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  projects: IProject[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category || 'Mobile Apps')))];

  const filteredProjects =
    filterCategory === 'All'
      ? projects
      : projects.filter((p) => (p.category || 'Mobile Apps') === filterCategory);

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, filteredProjects.length - itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    setFilterCategory(cat);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex + itemsPerPage < filteredProjects.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Visible 3 projects slice for the carousel
  const visibleProjects = filteredProjects.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section id="projects" className="py-24 relative bg-[#090D16]">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#9B8FCD]/10 rounded-full blur-[130px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#9B8FCD]/30 text-[#9B8FCD] text-xs font-mono font-bold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Flagship Apps Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured <span className="text-gradient-periwinkle">Mobile Projects</span>
            </h2>
            <p className="text-slate-300 text-sm font-normal">
              Explore production mobile solutions built with Flutter, Clean Architecture, BLoC/GetX, and REST API backends.
            </p>
          </div>

          {/* Carousel Control Buttons (Left & Right Arrows) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-3 rounded-full glass-card border border-slate-700/80 text-white hover:border-[#9B8FCD] hover:text-[#9B8FCD] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-lg active:scale-95"
              aria-label="Previous Projects"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <span className="text-xs font-mono text-slate-400 font-bold px-1">
              {Math.min(currentIndex + 1, filteredProjects.length)} - {Math.min(currentIndex + itemsPerPage, filteredProjects.length)} of {filteredProjects.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="p-3 rounded-full glass-card border border-slate-700/80 text-white hover:border-[#9B8FCD] hover:text-[#9B8FCD] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-lg active:scale-95"
              aria-label="Next Projects"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                filterCategory === cat
                  ? 'bg-gradient-to-r from-[#9B8FCD] to-indigo-600 text-white shadow-lg shadow-[#9B8FCD]/30 scale-105'
                  : 'glass-card text-slate-300 hover:text-white hover:border-[#9B8FCD]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive 3-Item Carousel Grid */}
        <div className="relative overflow-hidden min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={filterCategory + currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {visibleProjects.map((project) => (
                <div
                  key={project.id}
                  className="glass-card rounded-3xl overflow-hidden border border-slate-800/80 flex flex-col group hover:border-[#9B8FCD]/50 transition-all duration-300 shadow-xl"
                >
                  {/* Image Container */}
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img
                      src={project.imageUrl || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111726] via-transparent to-transparent opacity-90"></div>

                    {/* Category & Featured Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#090D16]/90 text-[#9B8FCD] border border-[#9B8FCD]/40 backdrop-blur-md">
                        {project.category || 'Mobile App'}
                      </span>
                      {project.isFeatured && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#9B8FCD] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#9B8FCD] font-medium font-mono line-clamp-1">
                        {project.tagline}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Badges */}
                    {project.techStack && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Card Footer Bar */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-bold text-[#9B8FCD] hover:text-white flex items-center gap-1 group/btn"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:border-[#9B8FCD]/50 border border-slate-700/60 transition-colors"
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
                            className="p-2 rounded-full bg-[#9B8FCD] text-white hover:bg-[#8B7DBE] shadow-sm transition-colors"
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
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-8">
          {Array.from({ length: Math.ceil(filteredProjects.length / itemsPerPage) }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx * itemsPerPage)}
              className={`h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / itemsPerPage) === dotIdx
                  ? 'w-8 bg-[#9B8FCD] shadow-sm shadow-[#9B8FCD]/50'
                  : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
              aria-label={`Go to slide page ${dotIdx + 1}`}
            />
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
