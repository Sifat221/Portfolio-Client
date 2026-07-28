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
        return <Layers className="w-4 h-4 text-[#8B7DBE]" />;
      case 'Backend & Services':
        return <Database className="w-4 h-4 text-emerald-600" />;
      default:
        return <Cpu className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-slate-50/60 border-y border-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9B8FCD]/15 border border-[#9B8FCD]/30 text-[#8B7DBE] text-xs font-bold">
            <Wrench className="w-3.5 h-3.5" />
            <span>Tech Stack & Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mobile Development <span className="text-[#9B8FCD]">Expertise</span>
          </h2>
          <p className="text-slate-600 text-base">
            Proficiency in modern Flutter development, reactive state management, clean architecture, and cloud backends.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeCategory === 'All'
                ? 'bg-[#9B8FCD] text-white shadow-md shadow-[#9B8FCD]/30 scale-105'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm'
            }`}
          >
            All Stack ({skills.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                activeCategory === cat
                  ? 'bg-[#9B8FCD] text-white shadow-md shadow-[#9B8FCD]/30 scale-105'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name + index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#9B8FCD]/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#9B8FCD]/15 border border-[#9B8FCD]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-[#9B8FCD] transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{skill.category}</p>
                  </div>
                </div>
                {skill.proficiency && (
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider ${
                      skill.proficiency === 'Expert'
                        ? 'bg-[#9B8FCD]/15 text-[#8B7DBE] border border-[#9B8FCD]/30'
                        : skill.proficiency === 'Advanced'
                        ? 'bg-blue-50 text-blue-700 border border-blue-100'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}
                  >
                    {skill.proficiency}
                  </span>
                )}
              </div>

              {/* Progress bar visual indicator */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    skill.proficiency === 'Expert'
                      ? 'w-[95%] bg-[#9B8FCD]'
                      : skill.proficiency === 'Advanced'
                      ? 'w-[85%] bg-[#7C86E2]'
                      : 'w-[75%] bg-emerald-500'
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
