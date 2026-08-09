import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
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
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const sections = ['about', 'skills', 'education', 'projects', 'experience', 'contact'];

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

  // Lock body scroll when mobile menu overlay is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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

          {/* Center Navigation Bar (Desktop & Landscape Rotation) */}
          <div className="hidden md:block">
            <GooeyNav
              items={navLinks.map((link) => ({ label: link.name, href: link.href }))}
              particleCount={20}
              initialActiveIndex={activeIndex}
              colors={[1, 2, 3, 1, 2, 3]}
            />
          </div>

          {/* Right Action Buttons & Mobile Hamburger Button */}
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

            {/* Mobile Hamburger Button (3 Horizontal Lines matching Image 1) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white hover:border-[#9B8FCD] shadow-lg active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5 text-slate-200" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen Mobile Navigation Drawer Overlay (matching Image 2) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-[#090D16]/98 backdrop-blur-2xl flex flex-col p-6 overflow-y-auto"
          >
            {/* Top Header Row matching Image 2 */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#9B8FCD] to-indigo-600 p-0.5 shadow-lg flex items-center justify-center shrink-0">
                  <img
                    src={personal.profilePhoto || personal.bannerPhoto || "/Profile.jpg"}
                    alt={personal.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/Profile.jpg";
                    }}
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white tracking-tight">
                    {personal.name}
                  </span>
                  <span className="text-xs font-semibold text-[#9B8FCD] tracking-wide">
                    Flutter & AI Engineer
                  </span>
                </div>
              </div>

              {/* Close Button X matching Image 2 */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-[#9B8FCD] transition-all shadow-md active:scale-95 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-slate-300" />
              </button>
            </div>

            {/* Vertical Navigation Links List matching Image 2 */}
            <div className="flex flex-col gap-6 pt-8 px-2">
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
                    className={`text-lg font-semibold tracking-wide transition-all duration-200 flex items-center justify-between ${
                      isActive
                        ? 'text-[#9B8FCD] font-bold text-xl translate-x-1'
                        : 'text-slate-300 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#9B8FCD] shadow-[0_0_10px_#9B8FCD]" />
                    )}
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
