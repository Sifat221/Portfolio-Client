import React from 'react';
import { Smartphone, Download, ArrowRight, Layers, Cpu, Code2, Sparkles, CheckCircle2, Feather, Palette, Compass } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';

interface HeroProps {
  personal: IPersonalProfile;
}

export const Hero: React.FC<HeroProps> = ({ personal }) => {
  return (
    <section id="about" className="relative pt-36 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
      {/* Soft Blue/Periwinkle Gradient Radial Backdrop Aura (Exact match to reference image) */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-blue-100/60 via-indigo-100/40 to-cyan-50/30 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Side: Headline, Subtitle, Pill Buttons & Stats */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            {/* Headline (Exact font & layout match to reference) */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold text-slate-900 leading-[1.12] tracking-tight">
                Let's Work Together to Create Mobile Wonders with Us
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                A visionary Flutter & Mobile Application Developer, crafting captivating mobile experiences through art and clean code. Adept at turning imagination into extraordinary digital reality.
              </p>
            </div>

            {/* Pill Action Buttons (Exact match to 'Let's Talk' & 'Start Project' in reference) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-full font-bold text-sm text-white bg-[#7C86E2] hover:bg-[#6873D9] shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Let's Talk
              </a>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full font-bold text-sm text-slate-800 bg-white border border-slate-300 hover:border-slate-900 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-slate-700" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* High Impact Stats Row (Exact match to 15+ / 26K / 98% in reference image) */}
            <div className="pt-10 border-t border-slate-100 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">7+</p>
                <p className="text-xs text-slate-500 font-medium leading-tight">flagship apps<br />deployed</p>
              </div>
              <div className="text-center lg:text-left space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">100%</p>
                <p className="text-xs text-slate-500 font-medium leading-tight">clean architecture<br />success</p>
              </div>
              <div className="text-center lg:text-left space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">99.8%</p>
                <p className="text-xs text-slate-500 font-medium leading-tight">crash-free<br />rate</p>
              </div>
            </div>
          </div>

          {/* Right Side: Portrait Image with Attached Floating Skill Pills (Exact match to reference layout) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Soft Periwinkle Backdrop Aura */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/50 via-indigo-100/60 to-cyan-100/40 rounded-full blur-2xl opacity-70"></div>
              
              {/* Concentric Circle Orbit Lines (Matching reference image backdrop circles) */}
              <div className="absolute -inset-6 rounded-full border border-blue-200/50 pointer-events-none"></div>
              <div className="absolute -inset-16 rounded-full border border-indigo-100/60 pointer-events-none"></div>

              {/* Main Developer Image (Matching reference pose & style) */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl bg-white p-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
                  alt="Sifat Khan - Mobile Developer"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-top rounded-2xl hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Pill 1 (Top Right - Matching 'Illustration' badge in reference) */}
              <div className="absolute top-12 -right-4 sm:-right-8 z-20 bg-white px-5 py-2.5 rounded-full border border-slate-100 shadow-xl flex items-center gap-3 animate-float">
                <div className="w-8 h-8 rounded-full bg-[#2DD4BF]/20 flex items-center justify-center text-[#0D9488]">
                  <Feather className="w-4 h-4" />
                </div>
                <span className="text-xs font-extrabold text-slate-800 tracking-tight">Flutter & Dart</span>
              </div>

              {/* Floating Pill 2 (Middle Right - Matching 'Graphic Design' badge in reference) */}
              <div className="absolute top-1/2 -right-8 sm:-right-12 z-20 bg-white px-5 py-2.5 rounded-full border border-slate-100 shadow-xl flex items-center gap-3 animate-float [animation-delay:2s]">
                <div className="w-8 h-8 rounded-full bg-[#2DD4BF]/20 flex items-center justify-center text-[#0D9488]">
                  <Palette className="w-4 h-4" />
                </div>
                <span className="text-xs font-extrabold text-slate-800 tracking-tight">Clean Architecture</span>
              </div>

              {/* Floating Pill 3 (Bottom Right - Matching 'Creative Branding' badge in reference) */}
              <div className="absolute bottom-12 -right-4 sm:-right-8 z-20 bg-white px-5 py-2.5 rounded-full border border-slate-100 shadow-xl flex items-center gap-3 animate-float [animation-delay:4s]">
                <div className="w-8 h-8 rounded-full bg-[#2DD4BF]/20 flex items-center justify-center text-[#0D9488]">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-xs font-extrabold text-slate-800 tracking-tight">REST & Firebase</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
