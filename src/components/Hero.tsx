import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Feather, Palette, Compass, Cloud, ChevronLeft, ChevronRight } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';

interface HeroProps {
  personal: IPersonalProfile;
}

export const Hero: React.FC<HeroProps> = ({ personal }) => {
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);

  // Generate 35 unique snowflakes with random positions, sizes, delays, and speeds
  const snowflakes = useMemo(() => {
    return Array.from({ length: 35 }).map((_, index) => {
      const left = Math.random() * 100;
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 8 + 6;
      const delay = Math.random() * 8;
      const opacity = Math.random() * 0.7 + 0.3;

      return {
        id: index,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity,
      };
    });
  }, []);

  const totalBanners = 2;

  const handlePrevBanner = () => {
    setActiveBannerIdx((prev) => (prev - 1 + totalBanners) % totalBanners);
  };

  const handleNextBanner = () => {
    setActiveBannerIdx((prev) => (prev + 1) % totalBanners);
  };

  return (
    <section id="about" className="relative pt-36 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#090D16]">
      {/* ================= ONLY THE BACKDROP SWITCHES (CONTENT STAYS SAME) ================= */}
      <AnimatePresence mode="wait">
        {activeBannerIdx === 0 ? (
          <motion.div
            key="snow_clouds_river_backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none overflow-hidden z-0"
          >
            {/* 1. Snowfall Particles */}
            {snowflakes.map((flake) => (
              <div
                key={flake.id}
                className="snowflake-particle"
                style={{
                  left: flake.left,
                  width: flake.width,
                  height: flake.height,
                  animationDuration: flake.animationDuration,
                  animationDelay: flake.animationDelay,
                  opacity: flake.opacity,
                }}
              />
            ))}

            {/* 2. Floating Clouds (Megh) */}
            <div className="absolute -top-10 -left-20 w-[600px] h-[350px] bg-gradient-to-r from-[#9B8FCD]/30 via-indigo-600/20 to-transparent rounded-full blur-[110px] animate-cloud-slow-1"></div>
            <div className="absolute top-10 -right-20 w-[650px] h-[400px] bg-gradient-to-l from-cyan-500/25 via-indigo-500/20 to-transparent rounded-full blur-[120px] animate-cloud-slow-2"></div>
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-tr from-[#9B8FCD]/20 via-purple-600/15 to-cyan-400/15 rounded-full blur-[140px] animate-cloud-slow-3"></div>

            <div className="absolute top-24 left-[15%] text-[#9B8FCD]/20 animate-cloud-slow-1">
              <Cloud className="w-32 h-32 blur-[1px]" />
            </div>
            <div className="absolute top-36 right-[12%] text-cyan-400/20 animate-cloud-slow-2">
              <Cloud className="w-40 h-40 blur-[2px]" />
            </div>

            {/* 3. ANIMATED RIVER / SEA OCEAN WAVES BACKDROP AT BOTTOM */}
            <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none opacity-40">
              {/* Back Wave Layer */}
              <svg
                className="relative block w-[160%] h-32 sm:h-44 text-indigo-900/60 animate-wave-slow-2"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.94,130.83,121.2,201,114.6,242.75,110.66,283.47,88.75,321.39,56.44Z"
                  fill="currentColor"
                ></path>
              </svg>
              {/* Front Wave Layer */}
              <svg
                className="relative block w-[160%] -mt-16 h-28 sm:h-36 text-[#9B8FCD]/25 animate-wave-slow-1"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="video_backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none overflow-hidden z-0"
          >
            {/* Video Background playing public/BannerTwo.mp4 */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-35 filter contrast-125 saturate-150"
            >
              <source src="/BannerTwo.mp4" type="video/mp4" />
              <source src="https://assets.mixkit.co/videos/preview/mixkit-code-running-on-a-computer-screen-23583-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#090D16]/90 via-[#090D16]/75 to-[#090D16]"></div>
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#9B8FCD]/20 rounded-full blur-[140px]"></div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ========================================================================= */}

      {/* ================= IDENTICAL BANNER CONTENT FOR ALL BACKGROUNDS ================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Side: Headline, Subtitle, Pill Buttons & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-8 text-center lg:text-left"
          >
            {/* Clean Headline */}
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

          {/* Right Side: Male Developer Portrait Image with Floating Badges */}
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

              {/* Professional Male Developer Portrait Image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl glass-panel border border-slate-700/60 p-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
                  alt="Sifat Khan - Professional Flutter Developer"
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

        {/* ================= BANNER SWITCHER ARROW CONTROLS (< & >) ================= */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
              Background Backdrop Theme:
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 text-[#9B8FCD] border border-slate-700/80">
              {activeBannerIdx === 0 ? '🌊 River & Snowfall Cloud Landscape' : '🎥 Video Background Backdrop (public/BannerTwo.mp4)'}
            </span>
          </div>

          {/* Left (<) and Right (>) Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevBanner}
              className="p-3 rounded-full glass-card border border-slate-700 text-white hover:border-[#9B8FCD] hover:text-[#9B8FCD] transition-all shadow-xl active:scale-95 flex items-center gap-1 group"
              aria-label="Previous Banner Background"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs font-mono font-bold pr-1">Previous</span>
            </button>

            <div className="flex items-center gap-1.5 px-2">
              {Array.from({ length: totalBanners }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveBannerIdx(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeBannerIdx === idx
                      ? 'w-8 bg-[#9B8FCD] shadow-md shadow-[#9B8FCD]'
                      : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                  }`}
                  aria-label={`Go to background theme ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextBanner}
              className="p-3 rounded-full glass-card border border-slate-700 text-white hover:border-[#9B8FCD] hover:text-[#9B8FCD] transition-all shadow-xl active:scale-95 flex items-center gap-1 group"
              aria-label="Next Banner Background"
            >
              <span className="text-xs font-mono font-bold pl-1">Next</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
        {/* ========================================================================= */}
      </div>
    </section>
  );
};
