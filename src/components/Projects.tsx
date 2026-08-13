import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, ExternalLink, Github, ArrowUpRight, ChevronLeft, ChevronRight, Layout, Brain, Code, Sparkles } from 'lucide-react';
import { IProject } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import SplitText from './SplitText';
import ElectricBorder from './ElectricBorder';
import TiltedCard from './TiltedCard';

interface ProjectsProps {
  projects: IProject[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Exact Tabs requested by the user
  const tabs = [
    { id: 'All', label: 'All', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'Design', label: 'Design', icon: <Layout className="w-4 h-4" /> },
    { id: 'AI & Machine Learning', label: 'AI & Machine Learning', icon: <Brain className="w-4 h-4" /> },
    { id: 'Development', label: 'Development', icon: <Code className="w-4 h-4" /> },
  ];

  // Map projects based on selected Tab
  const getFilteredProjects = () => {
    if (activeTab === 'All') return projects;
    if (activeTab === 'Design') {
      return projects.filter((p) => p.category === 'Design');
    }
    if (activeTab === 'AI & Machine Learning') {
      return projects.filter(
        (p) =>
          p.category === 'AI & Machine Learning' ||
          p.category === 'AI' ||
          p.category === 'Machine Learning'
      );
    }
    if (activeTab === 'Development') {
      return projects.filter(
        (p) =>
          p.category === 'Development' ||
          !p.category ||
          p.category === 'Healthcare' ||
          p.category === 'Mobile Development' ||
          p.category === 'E-Commerce' ||
          p.category === 'Productivity'
      );
    }
    return projects;
  };

  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProjects = getFilteredProjects();
  const itemsPerPage = isMobile ? 1 : 2;
  const maxIndex = Math.max(0, filteredProjects.length - itemsPerPage);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
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

  // Visible 2 projects slice for the carousel
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
        {/* Clean Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="text-center md:text-left space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#9B8FCD]/30 text-[#9B8FCD] text-xs font-mono font-bold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Showcase Applications</span>
            </div>
            
            <SplitText
              text="Featured Projects"
              highlightText="Projects"
              highlightClass="text-blue-500"
              className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.05}
              rootMargin="0px"
              textAlign="left"
            />

            <p className="text-slate-300 text-sm font-normal">
              Explore full-stack web and production mobile solutions built with Clean Architecture, REST APIs, and scalable backends.
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
              {filteredProjects.length > 0 ? `${Math.min(currentIndex + 1, filteredProjects.length)} - ${Math.min(currentIndex + itemsPerPage, filteredProjects.length)} of ${filteredProjects.length}` : '0 of 0'}
            </span>

            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex || filteredProjects.length <= itemsPerPage}
              className="p-3 rounded-full glass-card border border-slate-700/80 text-white hover:border-[#9B8FCD] hover:text-[#9B8FCD] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-lg active:scale-95"
              aria-label="Next Projects"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="border-b border-slate-800/80 mb-10 overflow-x-auto">
          <div className="flex items-center gap-8 min-w-max pb-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative flex items-center gap-2 font-bold text-sm transition-all duration-200 py-1 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className={isActive ? 'text-[#9B8FCD]' : 'text-slate-500'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>

                  {/* Active Sliding Tab Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectTab"
                      className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-[#9B8FCD] via-indigo-400 to-cyan-400 rounded-full shadow-sm shadow-[#9B8FCD]"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive 2-Item Carousel Grid */}
        <div className="relative overflow-hidden min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredProjects.length === 0 ? (
                <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center text-center py-20 bg-[#080d19]/90 rounded-3xl border border-slate-800 space-y-3">
                  <Brain className="w-10 h-10 text-slate-600 mb-1 animate-pulse" />
                  <h3 className="text-base font-bold text-slate-300 font-mono">No Projects Added in {activeTab} Yet</h3>
                  <p className="text-xs text-slate-400 max-w-md">
                    Projects added under <span className="text-[#9B8FCD] font-bold">{activeTab}</span> in the Admin Control Center will automatically appear here.
                  </p>
                </div>
              ) : (
                visibleProjects.map((project) => (
                <ElectricBorder
                  key={project.id}
                  color="#7df9ff"
                  speed={1}
                  chaos={0.12}
                  borderRadius={24}
                >
                  <TiltedCard
                    rotateAmplitude={isMobile ? 0 : 8}
                    scaleOnHover={isMobile ? 1 : 1.03}
                    showTooltip={false}
                    captionText={project.title}
                  >
                    <div className="project-card-container rounded-3xl overflow-hidden flex flex-col group/card transition-all duration-300 h-full bg-[#080d19]">
                      {/* Full-bleed Image Banner Container */}
                      <div className="relative h-72 sm:h-[340px] md:h-[360px] overflow-hidden bg-slate-950">
                        <img
                          src={project.imageUrl || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"}
                          alt={project.title}
                          className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080d19] via-transparent to-transparent opacity-60 pointer-events-none z-10"></div>

                        {/* Category & Featured Badge */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
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
                              <span className="tracking-wide">Featured</span>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-7 flex-1 flex flex-col justify-between space-y-5">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-serif font-bold text-white group-hover/card:text-cyan-300 transition-colors">
                            {project.title}
                          </h3>
                          {project.tagline && (
                            <p className="text-xs text-[#9B8FCD] font-mono font-semibold">
                              {project.tagline}
                            </p>
                          )}
                          <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Stack Badges */}
                        {project.techStack && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {project.techStack.slice(0, 9).map((tech, i) => (
                              <span
                                key={i}
                                className="project-tech-pill px-3 py-1 rounded-full text-[11px] font-mono bg-[#0d1527] text-slate-300 border border-slate-700/60"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Card Footer Bar */}
                        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="text-xs font-semibold text-[#38bdf8] hover:text-cyan-300 underline underline-offset-4 decoration-[#38bdf8]/60 hover:decoration-cyan-300 transition-colors"
                          >
                            View Details
                          </button>

                          <div className="flex items-center gap-2">
                            {project.clientUrl && (
                              <a
                                href={project.clientUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors"
                              >
                                <Github className="w-3.5 h-3.5" />
                                <span>Client</span>
                              </a>
                            )}
                            {project.serverUrl && (
                              <a
                                href={project.serverUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors"
                              >
                                <Github className="w-3.5 h-3.5" />
                                <span>Server</span>
                              </a>
                            )}
                            {project.githubUrl && !project.clientUrl && !project.serverUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors"
                              >
                                <Github className="w-3.5 h-3.5" />
                                <span>Code</span>
                              </a>
                            )}
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0091ff] hover:bg-[#0080ff] text-white font-semibold text-xs shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Live Demo</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltedCard>
                </ElectricBorder>
              )))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Dots */}
        {filteredProjects.length > itemsPerPage && (
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
        )}
      </motion.div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
