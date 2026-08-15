import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, ExternalLink, Github, ArrowUpRight, ChevronLeft, ChevronRight, Layout, Brain, Code, Sparkles, Search, ArrowLeft } from 'lucide-react';
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
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Exact Tabs requested by the user
  const tabs = [
    { id: 'All', label: 'All', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'Design', label: 'Design', icon: <Layout className="w-4 h-4" /> },
    { id: 'AI & Machine Learning', label: 'AI & Machine Learning', icon: <Brain className="w-4 h-4" /> },
    { id: 'Development', label: 'Development', icon: <Code className="w-4 h-4" /> },
  ];

  // Filter projects based on selected Tab and Search Query
  const getFilteredProjects = () => {
    let result = projects;

    // Filter by Tab
    if (activeTab === 'Design') {
      result = result.filter((p) => p.category === 'Design');
    } else if (activeTab === 'AI & Machine Learning') {
      result = result.filter(
        (p) =>
          p.category === 'AI & Machine Learning' ||
          p.category === 'AI' ||
          p.category === 'Machine Learning'
      );
    } else if (activeTab === 'Development') {
      result = result.filter(
        (p) =>
          p.category === 'Development' ||
          !p.category ||
          p.category === 'Healthcare' ||
          p.category === 'Mobile Development' ||
          p.category === 'E-Commerce' ||
          p.category === 'Productivity'
      );
    }

    // Filter by Search Query
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((p) => {
        const titleMatch = p.title.toLowerCase().includes(query);
        const taglineMatch = p.tagline ? p.tagline.toLowerCase().includes(query) : false;
        const descMatch = p.description ? p.description.toLowerCase().includes(query) : false;
        const techMatch = p.techStack ? p.techStack.some((t) => t.toLowerCase().includes(query)) : false;
        const categoryMatch = p.category ? p.category.toLowerCase().includes(query) : false;
        return titleMatch || taglineMatch || descMatch || techMatch || categoryMatch;
      });
    }

    return result;
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
  const stepSize = isMobile ? 1 : 2;
  const itemsPerPage = showAll ? filteredProjects.length : stepSize;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex + stepSize < filteredProjects.length) {
      setCurrentIndex((prev) => prev + stepSize);
    }
  };

  const handlePrev = () => {
    if (currentIndex - stepSize >= 0) {
      setCurrentIndex((prev) => prev - stepSize);
    } else {
      setCurrentIndex(0);
    }
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
    setCurrentIndex(0);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setShowAll(false);
    setActiveTab('All');
    setCurrentIndex(0);
  };

  // Visible projects slice for the carousel / grid
  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(currentIndex, currentIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredProjects.length / stepSize);
  const isFilteredOrSearched = searchQuery || showAll || activeTab !== 'All' || currentIndex > 0;

  const headerBadgeText = showAll ? 'ALL PROJECTS & SYSTEMS' : 'FEATURED SHOWCASE';
  const headerTitleText = showAll ? 'Featured Works & Architecture' : 'Featured Projects';
  const headerHighlightText = showAll ? 'Architecture' : 'Projects';
  const headerDescriptionText = showAll
    ? 'Comprehensive showcase of full-stack web platforms, mobile apps, AI/ML models, and enterprise software systems engineered with modern scalable architecture.'
    : 'Selected mobile & web applications engineered with clean architecture, responsive UI/UX, role-based access control, and real-time APIs.';

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
        {/* 1. Badge & Back Button Row */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Back Option Button */}
            {isFilteredOrSearched && (
              <button
                onClick={handleResetFilters}
                className="px-3.5 py-1.5 rounded-full glass-card border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95 group shrink-0"
                title="Go back / Reset all filters"
              >
                <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back</span>
              </button>
            )}

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>{headerBadgeText}</span>
            </div>
          </div>
        </div>

        {/* 2. Main Title (Left) + Search Bar (Right - Moved down aligned with Title) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-3">
          <SplitText
            key={headerTitleText + showAll}
            text={headerTitleText}
            highlightText={headerHighlightText}
            highlightClass="text-[#38bdf8]"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
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

          {/* Search Bar Input (Moved down to align with Title row) */}
          <div className="relative w-full sm:w-72 md:w-80 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="Search by title, technology, or description..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full glass-card border border-slate-700/80 focus:border-cyan-400 bg-slate-900/60 text-slate-200 placeholder-slate-400 text-xs focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold p-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 3. Subtitle Description */}
        <motion.p
          key={headerDescriptionText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-slate-300 text-sm font-normal max-w-2xl leading-relaxed mb-6"
        >
          {headerDescriptionText}
        </motion.p>

        {/* 4. Tab Navigation Bar (Left) + See More Projects Button (Right - Moved down to tab row) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 mb-10 gap-4">
          <div className="flex items-center gap-8 overflow-x-auto min-w-max pb-3">
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

          {/* See More Projects Action Button (Moved down aligned with tab line) */}
          <button
            onClick={toggleShowAll}
            className="self-start sm:self-auto group px-5 py-2 rounded-full glass-card border border-slate-700/80 hover:border-[#38bdf8] text-white text-xs font-bold flex items-center gap-2 shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95 shrink-0 mb-3 sm:mb-2"
          >
            <span>{showAll ? 'Show Fewer Projects' : 'See More Projects'}</span>
            <ArrowUpRight className={`w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${showAll ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Interactive Carousel / Grid */}
        <div className="relative overflow-hidden min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + currentIndex + searchQuery + (showAll ? 'all' : 'paginated')}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredProjects.length === 0 ? (
                <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center text-center py-20 bg-[#080d19]/90 rounded-3xl border border-slate-800 space-y-3">
                  <Brain className="w-10 h-10 text-slate-600 mb-1 animate-pulse" />
                  <h3 className="text-base font-bold text-slate-300 font-mono">
                    {searchQuery ? `No Projects Found Matching "${searchQuery}"` : `No Projects Added in ${activeTab} Yet`}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md">
                    {searchQuery
                      ? 'Try searching for a different keyword such as "React", "Node", "Flutter", or project title.'
                      : `Projects added under ${activeTab} in the Admin Control Center will automatically appear here.`}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-400 transition-colors mt-2"
                    >
                      Clear Search Filter
                    </button>
                  )}
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

                          <div className="flex flex-wrap items-center gap-2">
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
                                className={
                                  project.githubLabel
                                    ? "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 hover:scale-105 transition-all"
                                    : "inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors"
                                }
                              >
                                {project.githubUrl.includes('figma.com') || (project.githubLabel && !project.githubLabel.toLowerCase().includes('github') && !project.githubLabel.toLowerCase().includes('code')) ? (
                                  <Layout className="w-3.5 h-3.5" />
                                ) : (
                                  <Github className="w-3.5 h-3.5" />
                                )}
                                <span>{project.githubLabel || 'Code'}</span>
                              </a>
                            )}
                            {project.androidUrl && (
                              <a
                                href={project.androidUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                              >
                                <Smartphone className="w-3.5 h-3.5" />
                                <span>Android</span>
                              </a>
                            )}
                            {project.iosUrl && (
                              <a
                                href={project.iosUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-sky-400 hover:text-sky-300 transition-colors"
                              >
                                <Smartphone className="w-3.5 h-3.5" />
                                <span>iOS</span>
                              </a>
                            )}
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={
                                  project.githubLabel
                                    ? "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-cyan-500/50 bg-cyan-950/30 hover:bg-cyan-900/50 text-cyan-300 font-semibold text-xs transition-all hover:scale-105"
                                    : "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0091ff] hover:bg-[#0080ff] text-white font-semibold text-xs shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all"
                                }
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>{project.demoLabel || 'Live Demo'}</span>
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

        {/* Bottom Pagination Control Footer (Positioned Bottom Right) */}
        {!showAll && filteredProjects.length > stepSize && (
          <div className="pt-8 mt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Bottom Left: Showing X to Y of Z projects */}
            <div className="text-xs font-mono text-slate-400">
              Showing <span className="font-bold text-white">{filteredProjects.length > 0 ? currentIndex + 1 : 0}</span> to <span className="font-bold text-white">{Math.min(currentIndex + stepSize, filteredProjects.length)}</span> of <span className="font-bold text-cyan-400">{filteredProjects.length}</span> projects
            </div>

            {/* Bottom Right: Previous, Page Pills, Next */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-3.5 py-1.5 rounded-xl glass-card border border-slate-700/80 text-xs font-medium text-slate-300 hover:text-white hover:border-[#9B8FCD] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1"
                aria-label="Previous Projects"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {/* Page Number Pills */}
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isActivePage = Math.floor(currentIndex / stepSize) === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx * stepSize)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                      isActivePage
                        ? 'bg-[#0091ff] text-white shadow-md shadow-cyan-500/30 scale-105'
                        : 'glass-card border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={handleNext}
                disabled={currentIndex + stepSize >= filteredProjects.length}
                className="px-3.5 py-1.5 rounded-xl glass-card border border-slate-700/80 text-xs font-medium text-slate-300 hover:text-white hover:border-[#9B8FCD] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1"
                aria-label="Next Projects"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
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
