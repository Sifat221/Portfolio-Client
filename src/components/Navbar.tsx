import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';
import { StaggeredMenu } from './StaggeredMenu';

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
          {/* Logo with React Man User Icon Avatar */}
          <a href="#" className="flex items-center gap-3 group" aria-label="Sifat Khan Home">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#9B8FCD] via-indigo-600 to-cyan-500 border-2 border-[#9B8FCD]/60 shadow-lg flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-200">
              <User className="w-5 h-5 text-white" />
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
