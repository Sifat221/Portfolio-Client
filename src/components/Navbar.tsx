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
          ? 'bg-white/90 backdrop-blur-md py-3.5 shadow-sm border-b border-slate-100'
          : 'bg-white/70 backdrop-blur-sm py-5 border-b border-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo (Matching reference 'Xander.') */}
          <a href="#" className="flex items-center gap-2 group" aria-label="Sifat Khan Home">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Sifat Khan<span className="text-indigo-600">.</span>
            </span>
          </a>

          {/* Center Nav Links (Matching reference 'About Service Works Products Contact') */}
          <nav className="hidden md:flex items-center gap-9" role="navigation" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Button (Matching reference 'Sign up' pill button) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="px-7 py-2.5 rounded-full font-bold text-sm text-white bg-[#7C86E2] hover:bg-[#6873D9] shadow-md shadow-indigo-200 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-indigo-600 border border-slate-200"
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
        <div className="md:hidden bg-white border-b border-slate-200 mt-2 px-6 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-semibold text-slate-800 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center py-3 rounded-full font-bold text-sm text-white bg-[#7C86E2]"
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
