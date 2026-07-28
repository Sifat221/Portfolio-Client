import React from 'react';
import { ArrowUp, Github, Mail, Phone, MapPin, Heart, Smartphone, Sparkles } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';

interface FooterProps {
  personal: IPersonalProfile;
}

export const Footer: React.FC<FooterProps> = ({ personal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060912] border-t border-slate-800/80 text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-slate-800/80">
          {/* Brand & Resume Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Sifat Khan<span className="text-[#9B8FCD]">.</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Motivated & detail-oriented Flutter Developer with proven expertise in building high-performance cross-platform mobile apps using Clean Architecture, BLoC/GetX state management, REST APIs, and Firebase backends.
            </p>

            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-[#9B8FCD]/30 text-xs font-mono text-[#9B8FCD]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Remote & Full-time Mobile Roles</span>
            </div>

            {/* Direct Touchpoints */}
            <div className="space-y-2 pt-2 text-xs font-mono text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#9B8FCD]" />
                <a href={`mailto:${personal.email}`} className="hover:text-white transition-colors">
                  sifatkhanjoy996@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#9B8FCD]" />
                <span>01313997323</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Mirpur, Dhaka, Bangladesh</span>
              </p>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold">
              Navigation & Sections
            </h3>
            <ul className="space-y-2.5 text-sm font-medium text-slate-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#9B8FCD]">›</span> About & Overview
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#9B8FCD]">›</span> Tech Stack & Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#9B8FCD]">›</span> Flagship Applications
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#9B8FCD]">›</span> Professional Experience
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#9B8FCD]">›</span> Education & Credentials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-[#9B8FCD]">›</span> Contact & Direct Message
                </a>
              </li>
            </ul>
          </div>

          {/* Core Mobile Stack & Flagship Apps (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold">
              Mobile Core Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Flutter & Dart',
                'BLoC / Cubit',
                'GetX',
                'Provider',
                'Clean Architecture',
                'REST API',
                'Firebase',
                'Android & Java',
                'Postman',
                'Git & GitHub'
              ].map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-900 border border-slate-800 hover:border-[#9B8FCD] transition-colors"
              >
                <Github className="w-4 h-4 text-[#9B8FCD]" />
                <span>github.com/Sifat221</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Scroll Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>© {new Date().getFullYear()} Sifat Khan. All rights reserved.</p>

          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Mobile Engineering Excellence
          </p>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full glass-card text-slate-300 hover:text-white hover:border-[#9B8FCD]/60 transition-all flex items-center gap-2 group shadow-lg"
            aria-label="Back to Top"
          >
            <span className="text-[11px] font-bold">Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#9B8FCD] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
