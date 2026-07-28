import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Github, Download, Sparkles } from 'lucide-react';
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
    <section id="contact" className="py-24 relative bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                <Mail className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Let's Build Something <span className="text-gradient">Awesome</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Whether you have a new mobile app project, an open engineering role, or a Flutter consultancy request — feel free to send a message!
              </p>
            </div>

            {/* Touchpoints */}
            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${personal.email}`}
                className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-4 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">Email Address</p>
                  <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {personal.email}
                  </p>
                </div>
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-4 hover:border-indigo-500/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">GitHub Profile</p>
                  <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                    github.com/Sifat221
                  </p>
                </div>
              </a>

              <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
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
            <div className="glass-panel p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Send a Direct Message
              </h3>

              {status && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
                    status.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
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
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Hiring / Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your mobile app project or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
      </div>
    </section>
  );
};
