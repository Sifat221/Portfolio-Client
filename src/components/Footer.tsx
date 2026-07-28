import React from 'react';
import { ArrowUp, Github, Mail, MapPin, Heart } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';

interface FooterProps {
  personal: IPersonalProfile;
}

export const Footer: React.FC<FooterProps> = ({ personal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060912] border-t border-slate-800/80 text-slate-300 pt-12 pb-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80 items-center justify-between">
          {/* Brand Info (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Sifat Khan<span className="text-[#9B8FCD]">.</span>
            </span>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Flutter & Mobile Application Developer specializing in Clean Architecture, BLoC/GetX state management, and REST APIs.
            </p>
            <p className="text-xs font-mono text-[#9B8FCD]">sifatkhanjoy996@gmail.com • Dhaka, Bangladesh</p>
          </div>

          {/* Quick Links (6 cols) */}
          <div className="md:col-span-6 flex flex-wrap items-center md:justify-end gap-6 text-xs font-semibold text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:border-[#9B8FCD] transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4 text-[#9B8FCD]" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>© {new Date().getFullYear()} Sifat Khan. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full glass-card text-slate-300 hover:text-white hover:border-[#9B8FCD]/60 transition-all flex items-center gap-1.5 shadow-md"
            aria-label="Back to Top"
          >
            <span className="text-[10px] font-bold">Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#9B8FCD]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
