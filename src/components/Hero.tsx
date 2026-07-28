import React from 'react';
import { Smartphone, ArrowRight, Github, Mail, Download, Code2, Layers, Cpu } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';

interface HeroProps {
  personal: IPersonalProfile;
}

export const Hero: React.FC<HeroProps> = ({ personal }) => {
  return (
    <section id="about" className="relative pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Intro Details */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono tracking-wide">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
              </span>
              <span>{personal.availability}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <span className="text-gradient">{personal.name}</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-300 tracking-tight flex items-center justify-center lg:justify-start gap-3">
                <Smartphone className="w-8 h-8 text-cyan-400 inline" />
                <span className="text-gradient-cyan">{personal.title}</span>
              </h2>
            </div>

            {/* Bio Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {personal.bio}
            </p>

            {/* Action Buttons in Hero Banner */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Explore Mobile Apps</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-cyan-500/10 border border-cyan-500/40 hover:bg-cyan-500/20 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/10 group"
              >
                <Download className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200 glass-card hover:text-white hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl text-slate-300 glass-card hover:text-white hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>

            {/* High Impact Stats Banner */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0">
              <div className="glass-card p-3.5 rounded-xl text-center lg:text-left">
                <p className="text-2xl font-extrabold text-white text-gradient">7+</p>
                <p className="text-xs text-slate-400 font-medium">Flagship Apps</p>
              </div>
              <div className="glass-card p-3.5 rounded-xl text-center lg:text-left">
                <p className="text-2xl font-extrabold text-cyan-400">100%</p>
                <p className="text-xs text-slate-400 font-medium">Clean Architecture</p>
              </div>
              <div className="glass-card p-3.5 rounded-xl text-center lg:text-left">
                <p className="text-2xl font-extrabold text-indigo-400">BLoC / GetX</p>
                <p className="text-xs text-slate-400 font-medium">State Management</p>
              </div>
              <div className="glass-card p-3.5 rounded-xl text-center lg:text-left">
                <p className="text-2xl font-extrabold text-emerald-400">REST / Cloud</p>
                <p className="text-xs text-slate-400 font-medium">Backend Ready</p>
              </div>
            </div>
          </div>

          {/* Right Column: Code & Mobile Mockup Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glowing Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-40 animate-pulse-slow"></div>

              {/* Glass Code Editor & App Architecture Preview */}
              <div className="relative glass-panel rounded-2xl p-6 border border-slate-700/60 shadow-2xl space-y-4">
                {/* Window Control Dots */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400/90 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    medbridge_bloc_app.dart
                  </span>
                </div>

                {/* Code Snippet Box */}
                <div className="font-mono text-xs text-slate-300 space-y-1.5 overflow-x-auto p-3 bg-[#060912]/80 rounded-xl border border-slate-800/80">
                  <p className="text-indigo-400"><span className="text-cyan-400">import</span> 'package:flutter/material.dart';</p>
                  <p className="text-indigo-400"><span className="text-cyan-400">import</span> 'package:flutter_bloc/flutter_bloc.dart';</p>
                  <p className="text-slate-500">// Clean Architecture Mobile App</p>
                  <p className="text-amber-300">class <span className="text-emerald-400">MedBridgeApp</span> extends StatelessWidget &#123;</p>
                  <p className="pl-4 text-slate-300">@override</p>
                  <p className="pl-4 text-blue-400">Widget build(BuildContext context) &#123;</p>
                  <p className="pl-8 text-slate-300"><span className="text-purple-400">return</span> BlocProvider(</p>
                  <p className="pl-12 text-slate-300">create: (_) =&gt; HealthCubit()..fetchAppointments(),</p>
                  <p className="pl-12 text-slate-300">child: TelemedicineDashboard(),</p>
                  <p className="pl-8 text-slate-300">);</p>
                  <p className="pl-4 text-blue-400">&#125;</p>
                  <p className="text-amber-300">&#125;</p>
                </div>

                {/* Floating Mobile Feature Highlights */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="glass-card p-3 rounded-xl flex items-center gap-3 border-l-2 border-cyan-400">
                    <Layers className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Clean Code</p>
                      <p className="text-[10px] text-slate-400">Decoupled Layers</p>
                    </div>
                  </div>
                  <div className="glass-card p-3 rounded-xl flex items-center gap-3 border-l-2 border-indigo-400">
                    <Cpu className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Fast 60 FPS</p>
                      <p className="text-[10px] text-slate-400">Smooth Rendering</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
