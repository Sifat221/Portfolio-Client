import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Sparkles, CheckCircle2, GitBranch, TrendingUp, BarChart3 } from 'lucide-react';
import { IThesis } from '../types/portfolio';

interface ThesisSectionProps {
  thesisList?: IThesis[];
}

export const ThesisSection: React.FC<ThesisSectionProps> = ({ thesisList = [] }) => {
  const currentThesis = thesisList.length > 0 ? thesisList[0] : null;

  if (!currentThesis) {
    return null;
  }

  // Parse title cleanly to avoid duplicate "Pipeline" words
  const rawTitle = currentThesis.title || 'Machine Learning Pipeline';
  let mainPart = rawTitle;
  let pipelinePart = '';

  if (/pipeline/i.test(rawTitle)) {
    mainPart = rawTitle.replace(/pipeline/i, '').trim();
    pipelinePart = 'Pipeline';
  }

  // Default colorful gradients for classifier benchmark bars
  const defaultColors = [
    'from-cyan-500 to-sky-400',
    'from-fuchsia-500 to-pink-400',
    'from-teal-500 to-emerald-400',
    'from-orange-500 to-amber-400',
    'from-indigo-500 to-purple-400',
  ];

  return (
    <section id="thesis" className="relative py-20 bg-[#070b14] text-slate-100 overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header (Centered) */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-3xl mx-auto">
          {/* Top Badge (Centered) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <Atom className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{currentThesis.badge || 'RESEARCH & BACHELOR THESIS'}</span>
          </motion.div>

          {/* Section Heading (Centered, with Pipeline in electric blue & blinking cursor |) */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif text-center flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
          >
            <span className="text-white">{mainPart || 'Machine Learning'}</span>
            {pipelinePart ? (
              <span className="text-sky-400 inline-flex items-center">
                {pipelinePart}
                <span className="text-sky-400 font-sans font-light animate-pulse ml-0.5">|</span>
              </span>
            ) : (
              <span className="text-sky-400 font-sans font-light animate-pulse ml-0.5">|</span>
            )}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl text-center"
          >
            {currentThesis.subtitle ||
              'Applied predictive analytics and class-balancing techniques to model human opinion dynamics.'}
          </motion.p>
        </div>

        {/* Main Content Grid (Left: Thesis Box, Right: Accuracy & Benchmark Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Thesis Project Box (7 Columns on LG) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#0c1222] border border-slate-800/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-xl group hover:border-cyan-500/40 transition-all duration-300"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              {/* Badges Header Row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{currentThesis.projectBadge || 'DIU CSE THESIS PROJECT'}</span>
                </div>

                {currentThesis.gradeBadge && (
                  <div className="px-3.5 py-1 rounded-full bg-purple-950/50 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
                    {currentThesis.gradeBadge}
                  </div>
                )}
              </div>

              {/* Project Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug font-serif">
                {currentThesis.projectTitle ||
                  'Social Media Influence on Youth Opinion Change in Bangladesh'}
              </h3>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {currentThesis.description}
              </p>

              {/* Highlights Bullet List (3 Items from 2nd Picture) */}
              <div className="space-y-3 pt-1">
                {currentThesis.highlights?.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#121a2d] border border-slate-800/90 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full border border-cyan-400/80 flex items-center justify-center shrink-0 mt-0.5 bg-cyan-950/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Tech Stack & Action Link */}
            <div className="pt-8 mt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2">
                {currentThesis.techStack?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full bg-[#10182a] border border-cyan-900/60 text-cyan-300 text-xs font-mono font-bold hover:border-cyan-400/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Client Repo Button */}
              {currentThesis.repoUrl && (
                <a
                  href={currentThesis.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold text-white bg-slate-900 border border-slate-700 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all duration-200 cursor-pointer shrink-0 active:scale-95"
                >
                  <GitBranch className="w-4 h-4 text-cyan-400" />
                  <span>{currentThesis.repoLabel || 'Client Repo'}</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Right Column: Metrics & Benchmark Cards (5 Columns on LG) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card 1: Peak Model Accuracy */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0c1222] border border-slate-800/90 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-center backdrop-blur-xl group hover:border-cyan-500/40 transition-all duration-300"
            >
              {/* Card Header Label */}
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>PEAK MODEL ACCURACY</span>
              </div>

              {/* Big Accuracy Percentage */}
              <div className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 font-serif my-1 tracking-tight">
                {currentThesis.peakAccuracy || '84.4%'}
              </div>

              {/* Model Subtitle */}
              <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold mt-1">
                <span className="text-amber-400">🏆</span>
                <span>{currentThesis.peakModel || 'Optimized Random Forest'}</span>
              </div>
            </motion.div>

            {/* Card 2: Classifier Benchmarks Bar Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-[#0c1222] border border-slate-800/90 rounded-3xl p-6 shadow-xl flex-1 flex flex-col justify-between backdrop-blur-xl group hover:border-cyan-500/40 transition-all duration-300 space-y-6"
            >
              {/* Card Title */}
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span>CLASSIFIER BENCHMARKS (%)</span>
              </div>

              {/* Chart Visual Graphic (Exact 2D Bar Chart with Y-axis lines) */}
              <div className="relative pt-4 pb-2">
                {/* Y-Axis Grid Overlay */}
                <div className="absolute inset-x-8 top-4 bottom-8 flex flex-col justify-between pointer-events-none">
                  {[100, 75, 50, 25, 0].map((val) => (
                    <div key={val} className="w-full flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 w-6 text-right shrink-0">
                        {val}-
                      </span>
                      <div className="w-full border-b border-slate-800/80 border-dashed" />
                    </div>
                  ))}
                </div>

                {/* Bars Container */}
                <div className="pl-9 pr-2 h-44 flex items-end justify-between gap-2 relative z-10">
                  {currentThesis.benchmarks?.map((bm, idx) => {
                    const colorGradient = bm.color || defaultColors[idx % defaultColors.length];
                    const heightPercent = Math.min(100, Math.max(0, bm.accuracy));

                    return (
                      <div key={bm.model} className="flex-1 flex flex-col items-center h-full justify-end group/bar">
                        {/* Hover Tooltip Value */}
                        <span className="opacity-0 group-hover/bar:opacity-100 transition-opacity text-[10px] font-mono font-bold text-cyan-300 mb-1">
                          {bm.accuracy}%
                        </span>

                        {/* Vertical Bar */}
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${heightPercent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 + idx * 0.1, ease: 'easeOut' }}
                          className={`w-full max-w-[42px] rounded-t-xl bg-gradient-to-t ${colorGradient} shadow-md group-hover/bar:brightness-125 transition-all duration-200 cursor-pointer`}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* X-Axis Labels */}
                <div className="pl-9 pr-2 flex items-center justify-between gap-2 mt-3">
                  {currentThesis.benchmarks?.map((bm) => (
                    <span
                      key={bm.model}
                      className="flex-1 text-center text-[10px] sm:text-[11px] font-mono font-medium text-slate-300 truncate"
                      title={bm.model}
                    >
                      {bm.model}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThesisSection;
