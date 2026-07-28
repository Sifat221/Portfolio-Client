import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Layers, Database, Smartphone, Wrench, Code2, Terminal, Sparkles, Layout } from 'lucide-react';
import { ISkill } from '../types/portfolio';

interface SkillsProps {
  skills: ISkill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const categories = Array.from(new Set(skills.map((s) => s.category)));
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages':
        return <Code2 className="w-4 h-4 text-emerald-400" />;
      case 'Flutter Framework':
      case 'Core Mobile':
        return <Smartphone className="w-4 h-4 text-[#9B8FCD]" />;
      case 'State Management':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'Backend & Cloud':
      case 'Backend & Services':
        return <Database className="w-4 h-4 text-cyan-400" />;
      case 'Databases':
        return <Database className="w-4 h-4 text-sky-400" />;
      case 'Tools & DevOps':
        return <Terminal className="w-4 h-4 text-amber-400" />;
      case 'Soft Skills':
        return <Sparkles className="w-4 h-4 text-rose-400" />;
      default:
        return <Cpu className="w-4 h-4 text-[#9B8FCD]" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-[#141C2E] border-y border-slate-800/60">
      {/* Soft Background Periwinkle Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#9B8FCD]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-10"
      >
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-[#9B8FCD]/40 text-[#9B8FCD] text-xs font-bold font-mono">
            <Wrench className="w-3.5 h-3.5 text-[#9B8FCD]" />
            <span>Tech Stack & Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core Mobile <span className="text-gradient-periwinkle">Expertise</span>
          </h2>

          <p className="text-slate-300 text-sm font-normal">
            Specialized in Flutter SDK, BLoC/GetX state management, Clean Architecture, REST APIs, and Firebase backend services.
          </p>
        </div>

        {/* Sleek Horizontal Tab Navigation Bar */}
        <div className="border-b border-slate-800/90 overflow-x-auto pb-1">
          <div className="flex items-center gap-6 sm:gap-8 min-w-max pb-3">
            {/* "All Stack" Tab */}
            <button
              onClick={() => setActiveCategory('All')}
              className={`relative flex items-center gap-2 font-bold text-xs sm:text-sm transition-all duration-200 py-1.5 ${
                activeCategory === 'All' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              role="tab"
              aria-selected={activeCategory === 'All'}
            >
              <Cpu className={activeCategory === 'All' ? 'text-[#9B8FCD] w-4 h-4' : 'text-slate-500 w-4 h-4'} />
              <span>All Stack ({skills.length})</span>

              {activeCategory === 'All' && (
                <motion.div
                  layoutId="activeSkillTab"
                  className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-[#9B8FCD] via-indigo-400 to-cyan-400 rounded-full shadow-sm shadow-[#9B8FCD]"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>

            {/* Individual Category Tabs */}
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const categorySkillsCount = skills.filter((s) => s.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative flex items-center gap-2 font-bold text-xs sm:text-sm transition-all duration-200 py-1.5 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className={isActive ? 'text-[#9B8FCD]' : 'text-slate-500'}>
                    {getCategoryIcon(cat)}
                  </span>
                  <span>{cat}</span>
                  <span className="text-[10px] font-mono opacity-70 px-1.5 py-0.2 bg-slate-800 rounded-md">
                    {categorySkillsCount}
                  </span>

                  {/* Active Sliding Tab Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-[#9B8FCD] via-indigo-400 to-cyan-400 rounded-full shadow-sm shadow-[#9B8FCD]"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Skills Grid Matrix */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name + index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="bg-[#1A2335]/90 p-5 rounded-2xl border border-slate-700/60 shadow-md hover:border-[#9B8FCD]/60 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {getCategoryIcon(skill.category)}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm group-hover:text-[#9B8FCD] transition-colors">
                          {skill.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-mono">{skill.category}</p>
                      </div>
                    </div>
                    {skill.proficiency && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-[#9B8FCD]/20 text-[#9B8FCD] border border-[#9B8FCD]/40">
                        {skill.proficiency}
                      </span>
                    )}
                  </div>

                  {/* Minimal Progress Bar */}
                  <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        skill.proficiency === 'Expert'
                          ? 'w-[95%] bg-gradient-to-r from-[#9B8FCD] to-indigo-500'
                          : 'w-[85%] bg-gradient-to-r from-indigo-400 to-cyan-500'
                      }`}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
