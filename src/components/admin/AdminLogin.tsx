import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Mail } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const VALID_ADMIN_EMAILS = ['sifatkhanjoy996@gmail.com'];
const VALID_ADMIN_PASSWORDS = ['221-15-5869@', 'sifat2024admin'];

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('sifatkhanjoy996@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = VALID_ADMIN_EMAILS.includes(email.trim().toLowerCase());
    const isPasswordValid = VALID_ADMIN_PASSWORDS.includes(password.trim());

    if (isEmailValid && isPasswordValid) {
      sessionStorage.setItem('admin_auth', 'true');
      sessionStorage.setItem('admin_email', email.trim());
      onLogin();
    } else {
      setError('Invalid admin credentials. Please check email and password.');
      setTimeout(() => setError(''), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex items-center justify-center px-4 py-10 selection:bg-[#9B8FCD] selection:text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="glass-panel rounded-3xl p-8 border border-slate-700/60 shadow-2xl space-y-6">
          {/* Header with Admin Lottie Animation */}
          <div className="text-center space-y-2">
            <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto flex items-center justify-center -my-2">
              <DotLottieReact
                src="https://lottie.host/332fef7f-6095-4e1d-bb17-1f94579e60b5/p41zrIREf4.lottie"
                loop
                autoplay
              />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-slate-400 font-mono">Sign in with your admin credentials</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sifatkhanjoy996@gmail.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-[#9B8FCD] focus:ring-1 focus:ring-[#9B8FCD] outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-[#9B8FCD] focus:ring-1 focus:ring-[#9B8FCD] outline-none transition-all"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-rose-400 font-mono text-center font-bold"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#9B8FCD] via-indigo-600 to-cyan-500 hover:from-[#8B7DBE] hover:to-cyan-400 shadow-lg shadow-[#9B8FCD]/30 active:scale-[0.98] transition-all"
            >
              Sign In to Admin Panel
            </button>
          </form>

          <p className="text-center text-[11px] text-slate-500 font-mono">
            Protected admin area • Session-based authentication
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
