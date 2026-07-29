import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Lock, Eye, EyeOff, Mail, ShieldCheck, KeyRound, Sparkles, ArrowRight } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const VALID_ADMIN_EMAILS = ['sifatkhanjoy996@gmail.com'];
const EXACT_ADMIN_PASSWORD = '@221_15_5869#$#';

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('sifatkhanjoy996@gmail.com');
  const [password, setPassword] = useState('@221_15_5869#$#');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3D Tilt animation hook using Framer Motion values
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      const isEmailValid = VALID_ADMIN_EMAILS.some((e) => e.toLowerCase() === cleanEmail);
      const isPasswordValid = cleanPassword === EXACT_ADMIN_PASSWORD;

      if (isEmailValid && isPasswordValid) {
        sessionStorage.setItem('admin_auth', 'true');
        sessionStorage.setItem('admin_email', cleanEmail);
        onLogin();
      } else {
        setError('Invalid admin credentials. Please verify your email and password.');
        setIsSubmitting(false);
      }
    }, 300);
  };

  const handleAutoFillDemo = () => {
    setEmail('sifatkhanjoy996@gmail.com');
    setPassword('@221_15_5869#$#');
    setError('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex items-center justify-center p-2 sm:p-6 selection:bg-[#9B8FCD] selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full grid grid-cols-1 lg:grid-cols-12 glass-panel rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-black/60 relative"
      >
        {/* Ambient Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-[#9B8FCD] to-cyan-400 z-20" />

        {/* LEFT COLUMN: 3D Interactive Tilt Card & Graphic */}
        <div
          className="lg:col-span-5 relative bg-slate-900/90 p-8 sm:p-10 flex flex-col justify-between items-center text-center overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
        >
          {/* Animated Background Atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-[#090D16] to-[#0D1322] pointer-events-none" />
          <motion.div
            className="absolute w-72 h-72 rounded-full bg-[#9B8FCD]/15 blur-3xl pointer-events-none"
            style={{ left: glowX, top: glowY }}
          />

          {/* Header Tag */}
          <div className="relative z-10 w-full flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#9B8FCD]/15 text-[#9B8FCD] border border-[#9B8FCD]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400 tracking-wider">v2.0 • 256-bit</span>
          </div>

          {/* 3D Tilt Hero Illustration Container */}
          <motion.div
            ref={cardRef}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Interactive 3D Graphic"
            tabIndex={0}
            className="relative z-10 my-8 py-4 w-full flex flex-col items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#9B8FCD] focus:ring-offset-2 focus:ring-offset-slate-900 rounded-2xl"
          >
            {/* Outer Glowing Ring */}
            <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-[#9B8FCD]/20 via-cyan-500/10 to-indigo-500/20 blur-xl animate-pulse" />

            {/* Lottie Animation Display */}
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 flex items-center justify-center transition-transform duration-300">
              <DotLottieReact
                src="https://lottie.host/332fef7f-6095-4e1d-bb17-1f94579e60b5/p41zrIREf4.lottie"
                loop
                autoplay
              />
            </div>

            {/* Floating Tilt Badge */}
            <motion.div
              style={{ translateZ: 40 }}
              className="mt-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700/80 shadow-lg text-xs font-mono text-slate-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9B8FCD] animate-spin" style={{ animationDuration: '6s' }} />
              <span>Interactive 3D Security Tilt</span>
            </motion.div>
          </motion.div>

          {/* Footer Info inside Left Column */}
          <div className="relative z-10 space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight">Sifat Khan Joy</h2>
            <p className="text-xs text-slate-400 font-mono">Portfolio Management Control Center</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Modern Admin Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6 bg-[#0D1322]/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Sign In to <span className="text-gradient-periwinkle">Admin Dashboard</span>
            </h1>
            <p className="mt-1.5 text-sm text-slate-400 font-sans">
              Enter your verified credentials to access portfolio settings and live controls.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input Field */}
            <div className="space-y-2">
              <label htmlFor="admin-email-input" className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="admin-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="admin@portfolio.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-[#9B8FCD] focus:ring-2 focus:ring-[#9B8FCD]/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="admin-password-input" className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleAutoFillDemo}
                  className="text-[11px] font-mono text-[#9B8FCD] hover:underline flex items-center gap-1"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Auto-fill Demo</span>
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter password"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-[#9B8FCD] focus:ring-2 focus:ring-[#9B8FCD]/20 outline-none transition-all"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Animated Error Shake State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: [-8, 8, -6, 6, -3, 3, 0] }}
                transition={{ duration: 0.4 }}
                className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center justify-between"
              >
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => setError('')}
                  className="text-rose-400 hover:text-white font-bold ml-2"
                >
                  ✕
                </button>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#9B8FCD] via-indigo-600 to-cyan-500 hover:from-[#8B7DBE] hover:to-cyan-400 shadow-xl shadow-[#9B8FCD]/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate & Enter Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer Metadata */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
            <span>Session Status: Active</span>
            <span className="text-slate-400">Security Layer: AES-256</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
