import React, { useState } from 'react';
import { Cpu, Layers, Database, Smartphone, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
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
        return <Smartphone className="w-4 h-4 text-cyan-400" />;
      case 'State Management':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'Backend & Services':
        return <Database className="w-4 h-4 text-blue-400" />;
      default:
        return <Cpu className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-[#0B101D]/70 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Wrench className="w-3.5 h-3.5" />
            <span>Tech Stack & Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mobile Development <span className="text-gradient-cyan">Expertise</span>
          </h2>
          <p className="text-slate-400 text-base">
            Proficiency in modern Flutter development, reactive state management, clean architecture, and cloud backends.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeCategory === 'All'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                : 'glass-card text-slate-400 hover:text-white hover:border-cyan-500/40'
            }`}
          >
            All Stack ({skills.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                  : 'glass-card text-slate-400 hover:text-white hover:border-cyan-500/40'
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
            <div
              key={skill.name + index}
              className="glass-card p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">{skill.category}</p>
                  </div>
                </div>
                {skill.proficiency && (
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider ${
                      skill.proficiency === 'Expert'
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                        : skill.proficiency === 'Advanced'
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {skill.proficiency}
                  </span>
                )}
              </div>

              {/* Progress bar visual indicator */}
              <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    skill.proficiency === 'Expert'
                      ? 'w-[95%] bg-gradient-to-r from-cyan-400 to-blue-500'
                      : skill.proficiency === 'Advanced'
                      ? 'w-[85%] bg-gradient-to-r from-indigo-400 to-purple-500'
                      : 'w-[75%] bg-gradient-to-r from-emerald-400 to-teal-500'
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
