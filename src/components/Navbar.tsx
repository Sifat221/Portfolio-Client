import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
          ? 'glass-panel py-3 shadow-2xl border-b border-slate-800/90'
          : 'bg-[#090D16]/80 backdrop-blur-md py-4 border-b border-slate-800/40'
        }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
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

          {/* Right Action Buttons & Mobile Menu */}
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

            {/* Mobile StaggeredMenu Integration */}
            <div className="md:hidden flex items-center">
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
      </div>
    </header>
  );
};
