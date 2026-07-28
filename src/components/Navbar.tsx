import React, { useState, useEffect } from 'react';
import { Smartphone, Menu, X, ArrowRight } from 'lucide-react';
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
          ? 'glass-panel py-3 shadow-xl border-b border-slate-800/80'
          : 'bg-[#090D16]/90 backdrop-blur-md py-4 border-b border-slate-800/40'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo */}
          <a href="#" className="flex items-center gap-2 group" aria-label="Sifat Khan Home">
            <span className="text-2xl font-extrabold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
              Sifat Khan<span className="text-cyan-400">.</span>
            </span>
          </a>

          {/* Center: Clean Nav Links */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-md py-1 px-2"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Rounded Pill Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-lg shadow-indigo-500/25 hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-cyan-400 border border-slate-700/50"
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
        <div className="md:hidden glass-panel border-b border-slate-800 mt-2 px-4 pt-2 pb-5 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800/60 rounded-xl transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r from-indigo-500 to-cyan-500"
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
