import React from 'react';
import { Smartphone, Download, ArrowRight, Layers, Cpu, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';

interface HeroProps {
  personal: IPersonalProfile;
}

export const Hero: React.FC<HeroProps> = ({ personal }) => {
  return (
    <section id="about" className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-[#090D16]">
      {/* Soft Ambient Background Glow Aura (matching reference image) */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Side: Headline, Subtitle, Pill Buttons & Stats */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            {/* Main Headline (Matching reference style) */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
                Let's Work Together to Create <span className="text-gradient">Mobile Wonders</span> with Us
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                A visionary Flutter & Mobile Application Developer, crafting captivating mobile experiences through Clean Architecture, BLoC/GetX state management, and seamless REST/Firebase APIs. Adept at turning imagination into extraordinary digital reality.
              </p>
            </div>

            {/* Action Buttons (Matching reference image pill buttons) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-xl shadow-indigo-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Let's Talk
              </a>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full font-bold text-sm text-slate-200 border-2 border-slate-700 hover:border-cyan-400 hover:text-cyan-400 hover:bg-slate-800/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Stats Row (Matching reference image 15+ / 26K / 98% layout) */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">7+</p>
                <p className="text-xs text-slate-400 font-medium">Flagship Apps Deployed</p>
              </div>
              <div className="text-center lg:text-left space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400 tracking-tight">100%</p>
                <p className="text-xs text-slate-400 font-medium">Clean Architecture</p>
              </div>
              <div className="text-center lg:text-left space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tracking-tight">99.8%</p>
                <p className="text-xs text-slate-400 font-medium">Crash-Free Rate</p>
              </div>
            </div>
          </div>

          {/* Right Side: Portrait Image with Floating Badges (Matching reference image) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Radial Glowing Aura Circle */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-indigo-600/30 rounded-full blur-3xl opacity-60"></div>
              
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-4 rounded-full border border-cyan-500/20 pointer-events-none"></div>
              <div className="absolute -inset-12 rounded-full border border-indigo-500/10 pointer-events-none"></div>

              {/* Developer Image Container */}
              <div className="relative z-10 rounded-3xl overflow-hidden glass-panel border border-slate-700/60 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
                  alt="Sifat Khan Joy - Mobile App Developer"
                  className="w-full h-[450px] sm:h-[500px] object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-80"></div>
              </div>

              {/* Floating Badge 1 (Top Right - Illustration style badge) */}
              <div className="absolute -top-2 -right-4 z-20 glass-panel px-4 py-2.5 rounded-full border border-cyan-500/40 shadow-xl flex items-center gap-2.5 animate-float">
                <div className="w-7 h-7 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white tracking-wide">Flutter & BLoC</span>
              </div>

              {/* Floating Badge 2 (Middle Right) */}
              <div className="absolute top-1/2 -right-6 z-20 glass-panel px-4 py-2.5 rounded-full border border-indigo-500/40 shadow-xl flex items-center gap-2.5 animate-float [animation-delay:2s]">
                <div className="w-7 h-7 rounded-full bg-indigo-400/20 flex items-center justify-center text-indigo-400">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white tracking-wide">Clean Architecture</span>
              </div>

              {/* Floating Badge 3 (Bottom Right) */}
              <div className="absolute bottom-6 -right-2 z-20 glass-panel px-4 py-2.5 rounded-full border border-emerald-500/40 shadow-xl flex items-center gap-2.5 animate-float [animation-delay:4s]">
                <div className="w-7 h-7 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white tracking-wide">REST & Firebase</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
