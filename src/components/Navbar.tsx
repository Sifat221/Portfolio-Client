import React, { useState, useEffect } from 'react';
import { User, Sun, Moon } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';
import { StaggeredMenu } from './StaggeredMenu';
import { GooeyNav } from './GooeyNav';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  personal: IPersonalProfile;
}

export const Navbar: React.FC<NavbarProps> = ({ personal }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-panel py-3 shadow-2xl border-b border-slate-800/90'
          : 'bg-[#090D16]/80 backdrop-blur-md py-4 border-b border-slate-800/40'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo with Dynamic Profile Avatar (WhatsApp / Telegram style) */}
          <a href="#" className="flex items-center gap-3 group" aria-label="Sifat Khan Home">
            <div className="relative shrink-0 group-hover:scale-105 transition-transform duration-200">
              {/* Glowing animated ring */}
              <div className="absolute -inset-[2px] rounded-full bg-gradient-to-tr from-[#9B8FCD] via-indigo-500 to-cyan-400 animate-spin-slow opacity-80" />
              {/* Avatar */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#090D16] shadow-lg bg-gradient-to-tr from-[#9B8FCD] via-indigo-600 to-cyan-500 flex items-center justify-center">
                {personal.profilePhoto ? (
                  <img
                    src={personal.profilePhoto}
                    alt={personal.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight group-hover:scale-105 transition-transform duration-200">
              {personal.name}<span className="text-[#9B8FCD] animate-pulse">.</span>
            </span>
          </a>

          {/* Center GooeyNav Navigation */}
          <div className="hidden md:block">
            <GooeyNav
              items={navLinks.map((link) => ({ label: link.name, href: link.href }))}
              particleCount={25}
              particleDistances={[90, 10]}
              particleR={300}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={2000}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          {/* Right Action Buttons & Theme Toggle */}
          <div className="flex items-center gap-3">
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
          </div>

          {/* Mobile StaggeredMenu Integration */}
          <div className="md:hidden">
            <StaggeredMenu
              position="right"
              items={[
                { label: 'About', link: '#about' },
                { label: 'Skills', link: '#skills' },
                { label: 'Projects', link: '#projects' },
                { label: 'Experience', link: '#experience' },
                { label: 'Education', link: '#education' },
                { label: 'Contact', link: '#contact' },
              ]}
              socialItems={[
                { label: 'GitHub', link: personal.github || 'https://github.com' },
                { label: 'LinkedIn', link: personal.linkedin || 'https://linkedin.com' },
                { label: 'Facebook', link: personal.facebook || 'https://facebook.com' },
              ]}
              displaySocials={true}
              displayItemNumbering={true}
              colors={['#9B8FCD', '#4F46E5', '#090D16']}
              accentColor="#9B8FCD"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
