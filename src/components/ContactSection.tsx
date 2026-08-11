import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Github, Sparkles, MessageCircle, Linkedin, Facebook, FileText, Phone, MessageSquare } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';
import { sendContactMessage } from '../services/api';
import { playSuccessSound } from '../utils/sound';
import { downloadResume } from '../utils/download';
import { Toast } from './Toast';

interface ContactSectionProps {
  personal: IPersonalProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ personal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [toastState, setToastState] = useState<{
    isVisible: boolean;
    type: 'success' | 'error';
    title?: string;
    message: string;
  }>({
    isVisible: false,
    type: 'success',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setToastState({
        isVisible: true,
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all required fields (Name, Email & Message).',
      });
      return;
    }

    setLoading(true);

    const res = await sendContactMessage(formData);
    setLoading(false);

    if (res.success) {
      playSuccessSound();
      setToastState({
        isVisible: true,
        type: 'success',
        title: `Thank You, ${formData.name}!`,
        message: res.message,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setToastState({
        isVisible: true,
        type: 'error',
        title: 'Delivery Failed',
        message: 'Failed to send message. Please try again or email directly.',
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#080D1A] border-t border-slate-800/60 overflow-hidden">
      {/* Toast Notification Popup */}
      <Toast
        isVisible={toastState.isVisible}
        type={toastState.type}
        title={toastState.title}
        message={toastState.message}
        onClose={() => setToastState((prev) => ({ ...prev, isVisible: false }))}
      />

      {/* Ambient Radial Backdrops */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-16"
      >
        {/* Main Section Header (Centered - Matching Screenshot 2) */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D1629] border border-cyan-500/40 text-cyan-400 text-xs font-bold font-mono uppercase tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>LET'S CONNECT</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
            Get In Touch
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Have a full-stack engineering role, AI research collaboration, or custom software project in mind? Send me a message and I'll respond promptly!
          </p>
        </div>

        {/* Two-Column Layout Grid (Matching Screenshot 2) */}
        <div id="contact-form-card" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Channels / Reach Out Directly (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>DIRECT CHANNELS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Reach Out Directly
              </h3>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-3.5">
              {/* Email */}
              <a
                href={`mailto:${personal.email}`}
                className="bg-[#0D1526]/90 hover:bg-[#111C33] p-4 sm:p-4.5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center gap-4 group shadow-lg"
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-bold">GMAIL / DIRECT EMAIL</p>
                  <p className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                    {personal.email}
                  </p>
                </div>
              </a>

              {/* Phone */}
              {personal.phone && (
                <a
                  href={`tel:${personal.phone}`}
                  className="bg-[#0D1526]/90 hover:bg-[#111C33] p-4 sm:p-4.5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all flex items-center gap-4 group shadow-lg"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-bold">PHONE / IMESSAGE</p>
                    <p className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                      {personal.phone}
                    </p>
                  </div>
                </a>
              )}

              {/* LinkedIn */}
              {personal.linkedin && (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0D1526]/90 hover:bg-[#111C33] p-4 sm:p-4.5 rounded-2xl border border-slate-800 hover:border-sky-500/50 transition-all flex items-center gap-4 group shadow-lg"
                >
                  <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-bold">LINKEDIN PROFILE</p>
                    <p className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-400 transition-colors truncate">
                      {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                    </p>
                  </div>
                </a>
              )}

              {/* Location */}
              {personal.location && (
                <div className="bg-[#0D1526]/90 p-4 sm:p-4.5 rounded-2xl border border-slate-800 flex items-center gap-4 shadow-lg">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-bold">LOCATION</p>
                    <p className="text-xs sm:text-sm font-bold text-white truncate">{personal.location}</p>
                  </div>
                </div>
              )}

              {/* GitHub */}
              {personal.github && (
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0D1526]/90 hover:bg-[#111C33] p-4 sm:p-4.5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center gap-4 group shadow-lg"
                >
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Github className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-bold">GITHUB PROFILE</p>
                    <p className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                      {personal.github.replace(/^https?:\/\/(www\.)?/, '')}
                    </p>
                  </div>
                </a>
              )}

              {/* Facebook */}
              {personal.facebook && (
                <a
                  href={personal.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0D1526]/90 hover:bg-[#111C33] p-4 sm:p-4.5 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all flex items-center gap-4 group shadow-lg"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-bold">FACEBOOK PROFILE</p>
                    <p className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                      {personal.facebook.replace(/^https?:\/\/(www\.)?/, '')}
                    </p>
                  </div>
                </a>
              )}

              {/* WhatsApp */}
              <a
                href="https://wa.me/8801313997323"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0D1526]/90 hover:bg-[#111C33] p-4 sm:p-4.5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all flex items-center gap-4 group shadow-lg"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-bold">WHATSAPP DIRECT CHAT</p>
                  <p className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                    +880 1313-997323
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Form (7 cols - Matching Screenshot 2) */}
          <div className="lg:col-span-7 bg-[#0D1526]/80 p-8 sm:p-10 rounded-[28px] border border-slate-800/90 shadow-2xl space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-2.5">
                <Send className="w-6 h-6 text-cyan-400 transform -rotate-12" />
                Send Me A Message
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Fill in the form below and I'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    YOUR NAME <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Md. Samim"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#080E1B] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    EMAIL ADDRESS <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#080E1B] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  SUBJECT
                </label>
                <input
                  type="text"
                  placeholder="Inquiry / Research Collaboration / Hiring"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#080E1B] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  MESSAGE <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#080E1B] border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors min-h-[150px] resize-y"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-xl shadow-cyan-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 text-white" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Ready to Collaborate Banner CTA Card - Positioned BELOW the Form Grid for perfect closing hook */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#0D1527] via-[#121C30] to-[#0B2536] border border-slate-700/60 p-8 sm:p-12 shadow-2xl group mt-8">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-[11px] font-bold font-mono uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Available for opportunities</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-white tracking-tight leading-tight">
                Ready to collaborate on your{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                  next big project?
                </span>
              </h2>

              <p className="text-slate-300/90 text-xs sm:text-sm leading-relaxed max-w-xl">
                Specialized in AI-driven automation, machine learning pipelines, distributed backend services, and high-performance web applications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('contact-form-card');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-white" />
                <span>Get In Touch</span>
              </button>

              <button
                type="button"
                onClick={() => downloadResume(personal.resumeUrl, 'Sifat_Khan_CV.pdf')}
                className="px-7 py-3.5 rounded-2xl font-bold text-sm text-slate-200 bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Download CV</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
