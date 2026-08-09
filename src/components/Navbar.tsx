import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, MoreVertical, X } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';
import { GooeyNav } from './GooeyNav';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  personal: IPersonalProfile;
}

export const Navbar: React.FC<NavbarProps> = ({ personal }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const sections = ['about', 'skills', 'projects', 'experience', 'education', 'contact'];

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeIndex = Math.max(0, navLinks.findIndex((l) => l.href === `#${activeSection}`));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-panel py-3 shadow-2xl border-b border-slate-800/90'
          : 'bg-[#090D16]/80 backdrop-blur-md py-4 border-b border-slate-800/40'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo with Profile Avatar & Subtitle */}
          <a href="#" className="flex items-center gap-3 group" aria-label={`${personal.name} Home`}>
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#9B8FCD]/60 shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0 bg-slate-900">
              <img
                src={personal.profilePhoto || personal.bannerPhoto || "/Profile.jpg"}
                alt={personal.name}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/Profile.jpg";
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center group-hover:scale-105 transition-transform duration-200 leading-tight">
              <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center">
                {personal.name}<span className="text-[#9B8FCD] animate-pulse">.</span>
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#9B8FCD] tracking-wide mt-0.5">
                Flutter & AI Engineer
              </span>
            </div>
          </a>

          {/* Center Pill Navigation (Desktop & Landscape Rotation) */}
          <div className="hidden md:block">
            <GooeyNav
              items={navLinks.map((link) => ({ label: link.name, href: link.href }))}
              particleCount={20}
              initialActiveIndex={activeIndex}
              colors={[1, 2, 3, 1, 2, 3]}
            />
          </div>

          {/* Right Action Buttons & Mobile 3-Dots Menu */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full glass-card border border-slate-700/60 text-slate-200 hover:text-white hover:border-[#9B8FCD] transition-all shadow-md active:scale-95 flex items-center justify-center group"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark/light theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Let's Talk Contact Button */}
            <a
              href="#contact"
              className="hidden sm:inline-flex relative group overflow-hidden px-6 py-2.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#9B8FCD] via-indigo-600 to-cyan-500 hover:from-[#8B7DBE] hover:to-cyan-400 shadow-lg shadow-[#9B8FCD]/30 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span className="relative z-10">Let's Talk</span>
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>

            {/* 3-Dots Mobile Menu Trigger Button (Portrait Mobile View) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className={`p-2.5 rounded-full transition-all shadow-md active:scale-95 flex items-center justify-center border ${
                  mobileMenuOpen
                    ? 'bg-slate-800 text-white border-[#9B8FCD]'
                    : 'glass-card border-slate-700/60 text-slate-200 hover:text-white hover:border-[#9B8FCD]'
                }`}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open 3-dots navigation menu'}
                title="Navigation Options"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#9B8FCD]" />
                ) : (
                  <MoreVertical className="w-5 h-5 text-[#9B8FCD]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Mobile 3-Dots Dropdown Menu (Pill Bar matching user screenshot) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-0 right-0 p-4 bg-[#090D16]/95 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl z-50"
          >
            <div className="max-w-md mx-auto flex flex-wrap items-center justify-center gap-2 py-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection(link.href.replace('#', ''));
                      setMobileMenuOpen(false);
                      const target = document.querySelector(link.href);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-slate-950 shadow-lg scale-105 font-extrabold'
                        : 'text-slate-200 hover:text-white hover:bg-slate-800/80 border border-slate-700/60 font-semibold'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
