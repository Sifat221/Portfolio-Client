import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';

interface FooterProps {
  personal: IPersonalProfile;
}

export const Footer: React.FC<FooterProps> = ({ personal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 pt-16 pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-200/80">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Sifat Khan<span className="text-indigo-600">.</span>
            </span>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold">
            <a href="#about" className="hover:text-indigo-600 transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-indigo-600 transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-indigo-600 transition-colors">
              Projects
            </a>
            <a href="#experience" className="hover:text-indigo-600 transition-colors">
              Experience
            </a>
            <a href="#education" className="hover:text-indigo-600 transition-colors">
              Education
            </a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">
              Contact
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 shadow-sm transition-all flex items-center gap-2 group"
            aria-label="Back to Top"
          >
            <span className="text-xs font-bold">Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <p>© {new Date().getFullYear()} Sifat Khan. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Flutter & Mobile Software Engineering
          </p>
        </div>
      </div>
    </footer>
  );
};
