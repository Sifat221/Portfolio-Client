import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Feather, Palette, Compass, Cloud, ChevronLeft, ChevronRight, Github, Linkedin, Facebook, MessageCircle, Sparkles, Smartphone, Code2, Play, Pause, Clock } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';
import SplitText from './SplitText';
import { LightRays } from './LightRays';

interface HeroProps {
  personal: IPersonalProfile;
}

export const Hero: React.FC<HeroProps> = ({ personal }) => {
  const totalBanners = 3;
  const BANNER_DURATION = 30; // 30 seconds single banner duration
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(BANNER_DURATION);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);

  // Reset countdown whenever active banner index changes
  useEffect(() => {
    setSecondsLeft(BANNER_DURATION);
  }, [activeBannerIdx]);

  // 1-second interval timer counting down 30s banner duration
  useEffect(() => {
    if (isTimerPaused) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setActiveBannerIdx((current) => (current + 1) % totalBanners);
          return BANNER_DURATION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalBanners, isTimerPaused]);

  const elapsedTime = BANNER_DURATION - secondsLeft;
  const progressPercent = Math.min(100, Math.max(0, (elapsedTime / BANNER_DURATION) * 100));

  // Generate 25 subtle snowflakes for a clean, elegant winter backdrop
  const snowflakes = useMemo(() => {
    return Array.from({ length: 25 }).map((_, index) => {
      const left = Math.random() * 100;
      const size = Math.random() * 4.5 + 2;
      const duration = Math.random() * 7 + 3.5;
      const delay = Math.random() * 8;
      const opacity = Math.random() * 0.55 + 0.4;

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

  // Generate 150 heavy rain storm particles for Banner 2
  const raindrops = useMemo(() => {
    return Array.from({ length: 150 }).map((_, index) => {
      const left = Math.random() * 100;
      const duration = Math.random() * 0.7 + 0.6; // 0.6s to 1.3s fast rain fall
      const delay = Math.random() * 4;
      const opacity = Math.random() * 0.6 + 0.35;
      const height = Math.random() * 20 + 20;

      return {
        id: index,
        left: `${left}%`,
        height: `${height}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity,
      };
    });
  }, []);

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
            {/* 1. Dense Realistic Snowfall Particles (140 Flakes) */}
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

            {/* 2. Rich Floating Clouds & Nebula Mist Layers */}
            <div className="absolute -top-10 -left-20 w-[700px] h-[400px] bg-gradient-to-r from-[#9B8FCD]/35 via-indigo-600/25 to-transparent rounded-full blur-[110px] animate-cloud-slow-1"></div>
            <div className="absolute top-10 -right-20 w-[750px] h-[450px] bg-gradient-to-l from-cyan-500/30 via-indigo-500/25 to-transparent rounded-full blur-[120px] animate-cloud-slow-2"></div>
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-tr from-[#9B8FCD]/25 via-purple-600/20 to-cyan-400/20 rounded-full blur-[140px] animate-cloud-slow-3"></div>
            <div className="absolute top-2/3 left-10 w-[600px] h-[300px] bg-gradient-to-r from-indigo-500/20 via-[#9B8FCD]/20 to-transparent rounded-full blur-[120px] animate-cloud-slow-1"></div>

            {/* LightRays WebGL Ray Casting Backdrop */}
            <div className="absolute inset-0 pointer-events-none z-[1] opacity-40">
              <LightRays
                raysOrigin="top-center"
                raysColor="#9B8FCD"
                raysSpeed={1.2}
                lightSpread={0.85}
                rayLength={1.4}
                followMouse={true}
                mouseInfluence={0.15}
                noiseAmount={0.05}
                distortion={0.03}
              />
            </div>

            {/* 2. Floating Cloud Layers (Exactly 2 Soft Floating Clouds) */}
            <div className="absolute top-12 left-[10%] text-[#9B8FCD]/25 animate-cloud-slow-1">
              <Cloud className="w-56 h-56 blur-[1.5px]" />
            </div>
            <div className="absolute top-20 right-[10%] text-cyan-400/25 animate-cloud-slow-2">
              <Cloud className="w-52 h-52 blur-[1.5px]" />
            </div>

            {/* 3. ANIMATED RIVER / SEA OCEAN WAVES BACKDROP AT BOTTOM */}
            <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none opacity-40">
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
        ) : activeBannerIdx === 1 ? (
          <motion.div
            key="video_backdrop_1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none overflow-hidden z-0"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-30 filter contrast-125 saturate-150"
            >
              <source src="/BANNER2.mp4" type="video/mp4" />
              <source src="https://assets.mixkit.co/videos/preview/mixkit-code-running-on-a-computer-screen-23583-large.mp4" type="video/mp4" />
            </video>

            {/* Heavy Rain Storm Streak Particles (150 Raindrops) */}
            {raindrops.map((drop) => (
              <div
                key={drop.id}
                className="raindrop-particle"
                style={{
                  left: drop.left,
                  height: drop.height,
                  animationDuration: drop.animationDuration,
                  animationDelay: drop.animationDelay,
                  opacity: drop.opacity,
                }}
              />
            ))}

            {/* Heavy Storm Clouds & Rain Mist Backdrop */}
            <div className="absolute -top-10 -left-10 w-[700px] h-[350px] bg-cyan-900/25 rounded-full blur-[110px] animate-cloud-slow-1"></div>
            <div className="absolute top-10 -right-10 w-[750px] h-[400px] bg-slate-800/40 rounded-full blur-[120px] animate-cloud-slow-2"></div>

            <div className="absolute inset-0 bg-gradient-to-b from-[#090D16]/85 via-[#090D16]/70 to-[#090D16]"></div>
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#9B8FCD]/20 rounded-full blur-[140px]"></div>
          </motion.div>
        ) : (
          <motion.div
            key="video_backdrop_2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none overflow-hidden z-0"
          >
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
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[140px]"></div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ========================================================================= */}

      {/* ================= BALANCED & RICH LEFT SIDE CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          {/* Left Side: Headline, Availability Pill, Core Focus Tags & Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col justify-between space-y-8 text-center lg:text-left py-2"
          >
            {/* Top Availability Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold self-center lg:self-start shadow-lg shadow-emerald-950/20"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Available for Remote & Full-time Roles</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <SplitText
                text="Let's Work Together to Create Mobile Wonders with Us"
                highlightText="Mobile Wonders"
                highlightClass="text-blue-500"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight"
                delay={40}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.01}
                rootMargin="0px"
                textAlign="left"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                A visionary Flutter & Mobile Application Developer, crafting captivating mobile experiences through art and clean code. Adept at turning imagination into extraordinary digital reality.
              </motion.p>
            </div>

            {/* Core Capability Feature Pills Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1"
            >
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold glass-card border border-[#9B8FCD]/40 text-[#9B8FCD] flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#9B8FCD]" />
                <span>Flutter & Dart</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold glass-card border border-indigo-500/40 text-indigo-300 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Clean Architecture</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold glass-card border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>BLoC & GetX</span>
              </span>
            </motion.div>

            {/* Action Pill Buttons + Social Media Links */}
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

              {/* Social Media Link Buttons */}
              <div className="flex items-center gap-2.5 sm:pl-2 pt-2 sm:pt-0">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass-card border border-slate-700 text-slate-300 hover:text-white hover:border-[#9B8FCD] hover:scale-110 transition-all shadow-md"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4 text-[#9B8FCD]" />
                </a>

                <a
                  href={personal.linkedin || "https://www.linkedin.com/in/sifat-khan-540a86351/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass-card border border-slate-700 text-slate-300 hover:text-white hover:border-sky-400 hover:scale-110 transition-all shadow-md"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 text-sky-400" />
                </a>

                <a
                  href={personal.facebook || "https://facebook.com/sifatk4an.joy"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass-card border border-slate-700 text-slate-300 hover:text-white hover:border-blue-500 hover:scale-110 transition-all shadow-md"
                  aria-label="Facebook Profile"
                >
                  <Facebook className="w-4 h-4 text-blue-500" />
                </a>

                <a
                  href="https://wa.me/8801313997323"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass-card border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-400 hover:scale-110 transition-all shadow-md"
                  aria-label="WhatsApp Direct Chat"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </a>
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
                  src={personal.bannerPhoto || personal.profilePhoto || "/BannerProfile.JPG"}
                  alt={`${personal.name} - Professional Flutter Developer`}
                  className="w-full h-[460px] sm:h-[520px] object-cover object-top rounded-2xl hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute top-8 right-0 sm:-right-6 z-20 glass-panel px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#9B8FCD]/40 shadow-2xl flex items-center gap-2.5 sm:gap-3 animate-float">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#9B8FCD]/20 flex items-center justify-center text-[#9B8FCD]">
                  <Feather className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-extrabold text-white tracking-tight">Flutter & Dart</span>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute top-1/2 right-2 sm:-right-10 z-20 glass-panel px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-indigo-500/40 shadow-2xl flex items-center gap-2.5 sm:gap-3 animate-float [animation-delay:2s]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-extrabold text-white tracking-tight">Clean Architecture</span>
              </div>

              {/* Floating Badge 3 */}
              <div className="absolute bottom-8 right-0 sm:-right-6 z-20 glass-panel px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-cyan-500/40 shadow-2xl flex items-center gap-2.5 sm:gap-3 animate-float [animation-delay:4s]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-extrabold text-white tracking-tight">REST & Firebase</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= BANNER PROGRESS TIMER & ARROW CONTROLS ================= */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* 30-Second Live Countdown Progress Button & Animated Progress Bar */}
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={() => setIsTimerPaused(!isTimerPaused)}
              className="px-4 py-2.5 rounded-full glass-card border border-[#9B8FCD]/40 hover:border-[#9B8FCD] text-white text-xs font-mono font-bold flex items-center gap-2.5 shadow-xl transition-all active:scale-95 group shrink-0"
              title={isTimerPaused ? "Resume 30s Auto-Switch" : "Pause 30s Auto-Switch"}
            >
              {isTimerPaused ? (
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              ) : (
                <Pause className="w-3.5 h-3.5 text-[#9B8FCD]" />
              )}
              <span>{isTimerPaused ? "Paused" : "30s Banner Timer"}</span>
              <span className="text-[10px] text-[#9B8FCD] bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800 font-bold font-mono">
                {secondsLeft}s
              </span>
            </button>

            {/* Glowing 30s Duration Progress Bar */}
            <div className="flex-1 sm:w-56 h-2 bg-slate-800/90 rounded-full overflow-hidden border border-slate-700/60 relative">
              <div
                className="h-full bg-gradient-to-r from-[#9B8FCD] via-indigo-500 to-cyan-400 rounded-full transition-all duration-1000 ease-linear shadow-sm shadow-[#9B8FCD]"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Banner Navigation Switcher Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevBanner}
              className="p-3 rounded-full glass-card border border-slate-700 text-white hover:border-[#9B8FCD] hover:text-[#9B8FCD] transition-all shadow-xl active:scale-95 flex items-center gap-1 group"
              aria-label="Previous Banner Background"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Active Indicator Dots with Mini Fill Progress */}
            <div className="flex items-center gap-1.5 px-2">
              {Array.from({ length: totalBanners }).map((_, idx) => {
                const isActive = activeBannerIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveBannerIdx(idx)}
                    className={`relative h-2.5 rounded-full transition-all duration-300 overflow-hidden ${
                      isActive
                        ? 'w-10 bg-slate-800 border border-[#9B8FCD]/60 shadow-md shadow-[#9B8FCD]'
                        : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                    }`}
                    aria-label={`Go to background theme ${idx + 1}`}
                  >
                    {isActive && (
                      <div
                        className="absolute inset-0 bg-[#9B8FCD] transition-all duration-1000 ease-linear"
                        style={{ width: `${progressPercent}%` }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNextBanner}
              className="p-3 rounded-full glass-card border border-slate-700 text-[#9B8FCD] hover:border-[#9B8FCD] hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-1 group"
              aria-label="Next Banner Background"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
        {/* ========================================================================= */}
      </div>
    </section>
  );
};
