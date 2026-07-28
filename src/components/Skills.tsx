import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layers, Database, Smartphone, Wrench } from 'lucide-react';
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
      case 'Core Mobile':
        return <Smartphone className="w-4 h-4 text-[#9B8FCD]" />;
      case 'State Management':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'Backend & Cloud':
      case 'Backend & Services':
        return <Database className="w-4 h-4 text-cyan-400" />;
      default:
        return <Cpu className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-[#141C2E] border-y border-slate-800/60">
      {/* Soft Background Periwinkle Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#9B8FCD]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
      >
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-[#9B8FCD]/40 text-[#9B8FCD] text-xs font-bold font-mono">
            <Wrench className="w-3.5 h-3.5" />
            <span>Tech Stack</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Core Mobile <span className="text-gradient-periwinkle">Expertise</span>
          </h2>
          <p className="text-slate-300 text-sm font-normal">
            Specialized in Flutter, BLoC/GetX state management, Clean Architecture, and REST/Firebase backends.
          </p>
        </div>

        {/* Minimal Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
              activeCategory === 'All'
                ? 'bg-gradient-to-r from-[#9B8FCD] to-indigo-600 text-white shadow-md shadow-[#9B8FCD]/30'
                : 'bg-[#1A2335]/90 text-slate-300 hover:text-white border border-slate-700/60'
            }`}
          >
            All Stack ({skills.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#9B8FCD] to-indigo-600 text-white shadow-md shadow-[#9B8FCD]/30'
                  : 'bg-[#1A2335]/90 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Minimal Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name + index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
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
        </div>
      </motion.div>
    </section>
  );
};
