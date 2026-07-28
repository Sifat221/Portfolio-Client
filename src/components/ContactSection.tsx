import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Github, Sparkles, MessageCircle, Linkedin, Facebook } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';
import { sendContactMessage } from '../services/api';
import SplitText from './SplitText';

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
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    const res = await sendContactMessage(formData);
    setLoading(false);

    if (res.success) {
      setStatus({ type: 'success', message: res.message });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again or email directly.' });
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#141C2E] border-t border-slate-800/60">
      {/* Background Periwinkle Glow */}
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#9B8FCD]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
      >
        {/* Perfectly Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Direct Info & Touchpoint Cards (5 cols) */}
          <div className="lg:col-span-5 bg-[#1A2335]/90 p-8 sm:p-10 rounded-3xl border border-slate-700/60 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-[#9B8FCD]/40 text-[#9B8FCD] text-xs font-bold font-mono shadow-sm">
                <Mail className="w-4 h-4 text-[#9B8FCD]" />
                <span>Get In Touch</span>
              </div>

              <SplitText
                text="Let's Build Something Awesome"
                highlightText="Awesome"
                highlightClass="text-blue-500 font-extrabold"
                className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.05}
                rootMargin="0px"
                textAlign="left"
              />

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Whether you have a new mobile app project, an open engineering role, or a Flutter consultancy request — feel free to send a direct message!
              </p>
            </div>

            {/* Balanced Touchpoints */}
            <div className="space-y-3.5 pt-2">
              {/* Email */}
              <a
                href={`mailto:${personal.email}`}
                className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 hover:border-[#9B8FCD]/60 transition-all flex items-center gap-3.5 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#9B8FCD]/20 border border-[#9B8FCD]/40 flex items-center justify-center text-[#9B8FCD] shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] text-slate-400 font-mono">Email Address</p>
                  <p className="text-xs sm:text-sm font-bold text-white group-hover:text-[#9B8FCD] transition-colors truncate">
                    {personal.email}
                  </p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 hover:border-[#9B8FCD]/60 transition-all flex items-center gap-3.5 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#9B8FCD]/20 border border-[#9B8FCD]/40 flex items-center justify-center text-[#9B8FCD] shrink-0 group-hover:scale-105 transition-transform">
                  <Github className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] text-slate-400 font-mono">GitHub Profile</p>
                  <p className="text-xs sm:text-sm font-bold text-white group-hover:text-[#9B8FCD] transition-colors truncate">
                    github.com/Sifat221
                  </p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={personal.linkedin || "https://www.linkedin.com/in/sifat-khan-540a86351/"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 hover:border-sky-400/60 transition-all flex items-center gap-3.5 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] text-slate-400 font-mono">LinkedIn Profile</p>
                  <p className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-400 transition-colors truncate">
                    linkedin.com/in/sifat-khan-540a86351
                  </p>
                </div>
              </a>

              {/* Facebook */}
              <a
                href={personal.facebook || "https://facebook.com/sifatk4an.joy"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 hover:border-blue-500/60 transition-all flex items-center gap-3.5 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-105 transition-transform">
                  <Facebook className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] text-slate-400 font-mono">Facebook Profile</p>
                  <p className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-500 transition-colors truncate">
                    facebook.com/sifatk4an.joy
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/8801313997323"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/60 transition-all flex items-center gap-3.5 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] text-slate-400 font-mono">WhatsApp Direct Chat</p>
                  <p className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                    +880 1313-997323
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] text-slate-400 font-mono">Location</p>
                  <p className="text-xs sm:text-sm font-bold text-white truncate">{personal.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Balanced Contact Form with Expanded Message Description Box (7 cols) */}
          <div className="lg:col-span-7 bg-[#1A2335]/90 p-8 sm:p-10 rounded-3xl border border-slate-700/60 shadow-2xl flex flex-col justify-between space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#9B8FCD]" />
              Send a Direct Message
            </h3>

            {status && (
              <div
                className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
                  status.type === 'success'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold font-mono text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#9B8FCD] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold font-mono text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#9B8FCD] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold font-mono text-slate-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Mobile App Role"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#9B8FCD] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-mono text-slate-300 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Describe your mobile app project in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#9B8FCD] transition-colors min-h-[160px] resize-y"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-2 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#9B8FCD] via-indigo-600 to-cyan-500 hover:from-[#8B7DBE] hover:to-cyan-400 shadow-xl shadow-[#9B8FCD]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
