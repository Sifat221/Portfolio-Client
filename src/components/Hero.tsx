import React from 'react';
import { motion } from 'framer-motion';
import { Download, Feather, Palette, Compass } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';

interface HeroProps {
  personal: IPersonalProfile;
}

export const Hero: React.FC<HeroProps> = ({ personal }) => {
  return (
    <section id="about" className="relative pt-36 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#090D16]">
      {/* Dark Periwinkle & Neon Cyan Backdrop Aura */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#9B8FCD]/30 via-indigo-600/20 to-cyan-500/20 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#9B8FCD]/15 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Side: Headline, Subtitle, Pill Buttons & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-8 text-center lg:text-left"
          >
            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight"
              >
                Let's Work Together to Create <span className="text-gradient-periwinkle">Mobile Wonders</span> with Us
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                A visionary Flutter & Mobile Application Developer, crafting captivating mobile experiences through art and clean code. Adept at turning imagination into extraordinary digital reality.
              </motion.p>
            </div>

            {/* Periwinkle Action Pill Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#9B8FCD] via-indigo-600 to-cyan-500 hover:from-[#8B7DBE] hover:to-cyan-400 shadow-xl shadow-[#9B8FCD]/30 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Let's Talk
              </a>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full font-bold text-sm text-slate-200 glass-card border border-slate-700 hover:border-[#9B8FCD] hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4 text-[#9B8FCD]" />
                <span>Download Resume</span>
              </a>
            </motion.div>

            {/* High Impact Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-10 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">7+</p>
                <p className="text-xs text-slate-400 font-medium leading-tight">flagship apps<br />deployed</p>
              </div>
              <div className="text-center lg:text-left space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#9B8FCD] tracking-tight">100%</p>
                <p className="text-xs text-slate-400 font-medium leading-tight">clean architecture<br />success</p>
              </div>
              <div className="text-center lg:text-left space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400 tracking-tight">99.8%</p>
                <p className="text-xs text-slate-400 font-medium leading-tight">crash-free<br />rate</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Portrait Image with Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Glowing Aura Circle */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#9B8FCD]/40 via-indigo-600/30 to-cyan-500/30 rounded-full blur-2xl opacity-80"></div>
              
              {/* Orbit Rings */}
              <div className="absolute -inset-6 rounded-full border border-[#9B8FCD]/30 pointer-events-none"></div>
              <div className="absolute -inset-16 rounded-full border border-indigo-500/15 pointer-events-none"></div>

              {/* Developer Image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl glass-panel border border-slate-700/60 p-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
                  alt="Sifat Khan - Mobile Developer"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-top rounded-2xl hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute top-12 -right-4 sm:-right-8 z-20 glass-panel px-5 py-2.5 rounded-full border border-[#9B8FCD]/40 shadow-2xl flex items-center gap-3 animate-float">
                <div className="w-8 h-8 rounded-full bg-[#9B8FCD]/20 flex items-center justify-center text-[#9B8FCD]">
                  <Feather className="w-4 h-4" />
                </div>
                <span className="text-xs font-extrabold text-white tracking-tight">Flutter & Dart</span>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute top-1/2 -right-8 sm:-right-12 z-20 glass-panel px-5 py-2.5 rounded-full border border-indigo-500/40 shadow-2xl flex items-center gap-3 animate-float [animation-delay:2s]">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Palette className="w-4 h-4" />
                </div>
                <span className="text-xs font-extrabold text-white tracking-tight">Clean Architecture</span>
              </div>

              {/* Floating Badge 3 */}
              <div className="absolute bottom-12 -right-4 sm:-right-8 z-20 glass-panel px-5 py-2.5 rounded-full border border-cyan-500/40 shadow-2xl flex items-center gap-3 animate-float [animation-delay:4s]">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-xs font-extrabold text-white tracking-tight">REST & Firebase</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
