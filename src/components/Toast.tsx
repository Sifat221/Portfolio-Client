import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';

interface ToastProps {
  isVisible: boolean;
  type: 'success' | 'error';
  title?: string;
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  isVisible,
  type,
  title,
  message,
  onClose,
  duration = 6000,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed top-6 right-6 sm:top-8 sm:right-8 z-[100] max-w-md w-full px-4 pointer-events-auto"
        >
          <div
            className={`relative overflow-hidden p-4 sm:p-5 rounded-2xl backdrop-blur-xl border shadow-2xl ${
              type === 'success'
                ? 'bg-[#090D16]/95 border-[#9B8FCD]/60 shadow-[#9B8FCD]/20 text-white'
                : 'bg-[#090D16]/95 border-rose-500/60 shadow-rose-500/20 text-white'
            }`}
          >
            {/* Top Glow Bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                type === 'success' ? 'from-[#9B8FCD] via-indigo-500 to-cyan-400' : 'from-rose-500 to-amber-500'
              }`}
            />

            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                  type === 'success'
                    ? 'bg-[#9B8FCD]/20 border-[#9B8FCD]/50 text-[#9B8FCD]'
                    : 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                }`}
              >
                {type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              </div>

              <div className="flex-1 space-y-1 pr-2">
                <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 font-mono">
                  {title || (type === 'success' ? 'Message Delivered!' : 'Delivery Error')}
                  {type === 'success' && <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {message}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close Toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Countdown Progress Bar */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              className={`absolute bottom-0 left-0 h-0.5 ${
                type === 'success' ? 'bg-[#9B8FCD]' : 'bg-rose-500'
              }`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
