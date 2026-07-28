import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Github, Sparkles } from 'lucide-react';
import { IPersonalProfile } from '../types/portfolio';
import { sendContactMessage } from '../services/api';

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A2335] border border-[#9B8FCD]/40 text-[#9B8FCD] text-xs font-bold font-mono">
                <Mail className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Let's Build Something <span className="text-gradient-periwinkle">Awesome</span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Whether you have a new mobile app project, an open engineering role, or a Flutter consultancy request — feel free to send a message!
              </p>
            </div>

            {/* Touchpoints */}
            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${personal.email}`}
                className="bg-[#1A2335]/90 p-5 rounded-3xl border border-slate-700/60 shadow-lg hover:shadow-2xl hover:border-[#9B8FCD]/60 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#9B8FCD]/20 border border-[#9B8FCD]/40 flex items-center justify-center text-[#9B8FCD] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">Email Address</p>
                  <p className="text-sm font-bold text-white group-hover:text-[#9B8FCD] transition-colors">
                    {personal.email}
                  </p>
                </div>
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1A2335]/90 p-5 rounded-3xl border border-slate-700/60 shadow-lg hover:shadow-2xl hover:border-[#9B8FCD]/60 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#9B8FCD]/20 border border-[#9B8FCD]/40 flex items-center justify-center text-[#9B8FCD] group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">GitHub Profile</p>
                  <p className="text-sm font-bold text-white group-hover:text-[#9B8FCD] transition-colors">
                    github.com/Sifat221
                  </p>
                </div>
              </a>

              <div className="bg-[#1A2335]/90 p-5 rounded-3xl border border-slate-700/60 shadow-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">Location</p>
                  <p className="text-sm font-bold text-white">{personal.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#1A2335]/90 p-8 sm:p-10 rounded-3xl border border-slate-700/60 shadow-2xl space-y-6">
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

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    rows={4}
                    required
                    placeholder="Describe your mobile app project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#9B8FCD] transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#9B8FCD] via-indigo-600 to-cyan-500 hover:from-[#8B7DBE] hover:to-cyan-400 shadow-xl shadow-[#9B8FCD]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
        </div>
      </motion.div>
    </section>
  );
};
