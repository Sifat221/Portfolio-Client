import React from 'react';
import { Smartphone, ArrowUp, Github, Mail, Heart } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';

interface FooterProps {
  personal: IPersonalProfile;
}

export const Footer: React.FC<FooterProps> = ({ personal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060912] border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[2px]">
              <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg tracking-tight">
                {personal.name}
              </h3>
              <p className="text-xs text-cyan-400 font-mono">
                Flutter & Mobile Application Developer
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-cyan-400 transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">
              Projects
            </a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">
              Experience
            </a>
            <a href="#education" className="hover:text-cyan-400 transition-colors">
              Education
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl glass-card text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all flex items-center gap-2 group"
            aria-label="Back to Top"
          >
            <span className="text-xs font-mono">Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© {new Date().getFullYear()} Sifat Khan Joy. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Flutter & Mobile Software Engineering
          </p>
        </div>
      </div>
    </footer>
  );
};
