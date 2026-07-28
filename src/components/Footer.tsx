import React from 'react';
import { ArrowUp, Github, Linkedin, Facebook, MessageCircle, Mail, Phone, MapPin, Download, Heart, ExternalLink } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';
import { LineSidebar } from './LineSidebar';

interface FooterProps {
  personal: IPersonalProfile;
}

export const Footer: React.FC<FooterProps> = ({ personal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNumber = "8801313997323";

  return (
    <footer className="bg-[#060912] border-t border-slate-800/80 text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Rich Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800/80 items-start">
          {/* Brand Info & Passport Photo (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-4">
              {/* Male Passport Photo Avatar Frame */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-[#9B8FCD]/60 shadow-xl shrink-0 group bg-slate-900">
                <img
                  src="/Profile.JPG"
                  alt="Sifat Khan Passport Photo"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060912]/40 via-transparent to-transparent pointer-events-none"></div>
              </div>

              <div>
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  Sifat Khan<span className="text-[#9B8FCD]">.</span>
                </span>
                <p className="text-xs text-[#9B8FCD] font-mono font-semibold">Flutter & Mobile Developer</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Motivated & detail-oriented Flutter Developer specializing in Clean Architecture, BLoC/GetX state management, REST APIs, and Firebase backends.
            </p>

            <div className="space-y-1.5 pt-1 text-xs font-mono text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#9B8FCD]" />
                <span>sifatkhanjoy996@gmail.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#9B8FCD]" />
                <span>01313997323</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Mirpur, Dhaka, Bangladesh</span>
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">Skills & Stack</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              </li>
              <li>
                <a href="#education" className="hover:text-white transition-colors">Education</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Get In Touch</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Expertise with LineSidebar */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold">
              Core Expertise
            </h3>
            <LineSidebar
              items={[
                'Flutter & Dart Dev',
                'BLoC, Cubit & GetX',
                'Clean Architecture',
                'REST APIs & Firebase',
                'Android SDK & Java',
              ]}
              accentColor="#38BDF8"
              textColor="#94A3B8"
              markerColor="#475569"
              showIndex={true}
              showMarker={true}
              proximityRadius={80}
              maxShift={18}
              markerLength={32}
              itemGap={10}
              fontSize={0.8}
            />
          </div>

          {/* Column 4: Connect & Socials (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#9B8FCD] font-bold">
              Connect
            </h3>

            <div className="space-y-2">
              {/* GitHub */}
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-slate-200 bg-slate-900 border border-slate-800 hover:border-[#9B8FCD] transition-all group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-[#9B8FCD] group-hover:scale-110 transition-transform" />
                  <span>GitHub</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/sifatkhan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-slate-200 bg-slate-900 border border-slate-800 hover:border-[#9B8FCD] transition-all group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/sifatkhan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-slate-200 bg-slate-900 border border-slate-800 hover:border-[#9B8FCD] transition-all group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Facebook className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span>Facebook</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-slate-200 bg-slate-900 border border-slate-800 hover:border-[#9B8FCD] transition-all group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              {/* Download Resume */}
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-slate-200 bg-slate-900 border border-slate-800 hover:border-[#9B8FCD] transition-all group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-[#9B8FCD] group-hover:scale-110 transition-transform" />
                  <span>Resume</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>© {new Date().getFullYear()} Sifat Khan. All rights reserved.</p>

          <p className="flex items-center gap-1 text-[11px]">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Mobile Software Engineering
          </p>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full glass-card text-slate-300 hover:text-white hover:border-[#9B8FCD]/60 transition-all flex items-center gap-1.5 shadow-md active:scale-95"
            aria-label="Back to Top"
          >
            <span className="text-[11px] font-bold">Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#9B8FCD]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
