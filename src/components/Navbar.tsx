import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';

interface NavbarProps {
  personal: IPersonalProfile;
}

export const Navbar: React.FC<NavbarProps> = ({ personal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel py-3 shadow-2xl border-b border-slate-800/90'
          : 'bg-[#090D16]/80 backdrop-blur-md py-4 border-b border-slate-800/40'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo with Gold S Brand Image */}
          <a href="#" className="flex items-center gap-3 group" aria-label="Sifat Khan Home">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#9B8FCD]/60 shadow-md group-hover:scale-105 transition-transform duration-200 bg-black shrink-0">
              <img src="/logo.png" alt="Sifat Khan Gold S Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight group-hover:scale-105 transition-transform duration-200">
              Sifat Khan<span className="text-[#9B8FCD] animate-pulse">.</span>
            </span>
          </a>

          {/* Center Nav Links with Animated Underline */}
          <nav className="hidden md:flex items-center gap-2 glass-card px-4 py-1.5 rounded-full border border-slate-800/80 shadow-inner" role="navigation" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-1.5 text-sm font-bold text-slate-300 hover:text-white transition-colors duration-200 group rounded-full hover:bg-slate-800/60"
              >
                <span>{link.name}</span>
                
                {/* Animated Glowing Underline */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2.5px] rounded-full bg-gradient-to-r from-[#9B8FCD] via-indigo-400 to-cyan-400 group-hover:w-3/4 transition-all duration-300 ease-out shadow-sm shadow-[#9B8FCD]/80"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="relative group overflow-hidden px-7 py-2.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#9B8FCD] via-indigo-600 to-cyan-500 hover:from-[#8B7DBE] hover:to-cyan-400 shadow-lg shadow-[#9B8FCD]/30 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span className="relative z-10">Let's Talk</span>
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 mt-2 px-6 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-bold text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#9B8FCD] to-indigo-600"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
