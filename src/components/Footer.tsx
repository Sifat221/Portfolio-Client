import React from 'react';
import { ArrowUp, Github, Linkedin, Facebook, MessageCircle, Mail, Phone, MapPin, Download, Heart, ExternalLink, Send, Globe, Play } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';
import { LineSidebar } from './LineSidebar';
import { downloadResume } from '../utils/download';

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
                  src={personal.profilePhoto || "/Profile.jpg"}
                  alt={`${personal.name} Profile Photo`}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060912]/40 via-transparent to-transparent pointer-events-none"></div>
              </div>

              <div>
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  {personal.name}<span className="text-[#9B8FCD]">.</span>
                </span>
                <p className="text-xs text-[#9B8FCD] font-mono font-semibold">{personal.title}</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {personal.bio}
            </p>

            {/* Availability / Role Status Pill (Matching 2nd Picture Style) */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-950/30 border border-emerald-500/35 text-emerald-400 text-xs font-mono font-semibold shadow-lg shadow-emerald-950/30 hover:border-emerald-400/60 transition-all">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>{personal.availability || "Open for Flutter & AI Roles"}</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1 text-xs font-mono text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#9B8FCD]" />
                <span>{personal.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#9B8FCD]" />
                <span>{personal.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{personal.location}</span>
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
                <a href="#thesis" className="hover:text-white transition-colors">Thesis & Research</a>
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
              {(personal.socialLinks && personal.socialLinks.length > 0
                ? personal.socialLinks
                : [
                    { id: '1', name: 'GitHub', url: personal.github, icon: 'github' },
                    { id: '2', name: 'LinkedIn', url: personal.linkedin, icon: 'linkedin' },
                    { id: '3', name: 'Facebook', url: personal.facebook, icon: 'facebook' },
                    { id: '4', name: 'WhatsApp', url: personal.whatsapp, icon: 'whatsapp' },
                    { id: '5', name: 'Telegram', url: personal.telegram, icon: 'telegram' },
                    { id: '6', name: 'Behance', url: personal.behance, icon: 'behance' },
                  ]
              )
                .filter((item): item is { id: string; name: string; url: string; icon?: string } => Boolean(item.url && item.url.trim() !== ''))
                .map((social) => {
                  const rawUrl = social.url;
                  const formattedUrl = rawUrl.startsWith('http') || rawUrl.startsWith('mailto:')
                    ? rawUrl
                    : social.icon === 'whatsapp' || rawUrl.startsWith('+')
                    ? `https://wa.me/${rawUrl.replace(/[^0-9]/g, '')}`
                    : social.icon === 'telegram'
                    ? `https://t.me/${rawUrl.replace('@', '')}`
                    : `https://${rawUrl}`;

                  let iconEl = <Globe className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />;
                  if (social.icon === 'github') iconEl = <Github className="w-4 h-4 text-[#9B8FCD] group-hover:scale-110 transition-transform" />;
                  else if (social.icon === 'linkedin') iconEl = <Linkedin className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />;
                  else if (social.icon === 'facebook') iconEl = <Facebook className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />;
                  else if (social.icon === 'whatsapp') iconEl = <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />;
                  else if (social.icon === 'telegram') iconEl = <Send className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />;
                  else if (social.icon === 'behance') iconEl = <span className="text-[11px] font-bold font-mono text-cyan-300 group-hover:scale-110 transition-transform">Bē</span>;
                  else if (social.icon === 'mail') iconEl = <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />;
                  else if (social.icon === 'phone') iconEl = <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />;
                  else if (social.icon === 'youtube') iconEl = <Play className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />;
                  else if (social.icon === 'twitter') iconEl = <span className="text-[11px] font-bold font-mono text-cyan-400 group-hover:scale-110 transition-transform">𝕏</span>;

                  return (
                    <a
                      key={social.id || social.name}
                      href={formattedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-slate-200 bg-slate-900 border border-slate-800 hover:border-[#9B8FCD] transition-all group shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        {iconEl}
                        <span>{social.name}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                    </a>
                  );
                })}

              {/* Download Resume */}
              <button
                type="button"
                onClick={() => downloadResume(personal.resumeUrl, 'Sifat_Khan_CV.pdf')}
                className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-slate-200 bg-slate-900 border border-slate-800 hover:border-[#9B8FCD] transition-all group shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-[#9B8FCD] group-hover:scale-110 transition-transform" />
                  <span>Resume</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
              </button>
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
            className="back-to-top-btn px-4 py-2 rounded-full bg-[#111625] border border-indigo-500/40 text-white hover:border-[#9B8FCD] hover:bg-[#1A2035] transition-all flex items-center gap-2 shadow-lg shadow-indigo-950/30 active:scale-95 cursor-pointer group"
            aria-label="Back to Top"
          >
            <span className="text-xs font-bold text-white tracking-wide">Back to Top</span>
            <ArrowUp className="w-4 h-4 text-[#9B8FCD] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
