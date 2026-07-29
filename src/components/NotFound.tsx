import React from 'react';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface NotFoundProps {
  onGoHome?: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onGoHome }) => {
  const handleHomeClick = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.href = '/';
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-[#9B8FCD] selection:text-white">
      {/* Soft Background Neon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9B8FCD]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-xl mx-auto text-center relative z-10 space-y-6">
        {/* Top 404 Warning Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-rose-500/40 text-rose-400 text-xs font-mono font-bold shadow-lg shadow-rose-950/20">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>404 ERROR - PAGE NOT FOUND</span>
        </div>

        {/* 404 DotLottie Animation */}
        <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto flex items-center justify-center">
          <DotLottieReact
            src="https://lottie.host/30426e6e-b86c-4a06-b581-150d34bee925/3xHTJh1T6c.lottie"
            loop
            autoplay
          />
        </div>

        {/* Friendly Error Heading & Description */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Lost in the <span className="text-gradient-periwinkle">Digital Space?</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            The page or route you are looking for does not exist or has been moved. Let's get you back on track!
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Go Back Button */}
          <button
            onClick={handleBackClick}
            className="px-6 py-3 rounded-xl glass-card border border-slate-700/80 text-slate-200 hover:border-[#9B8FCD] hover:text-white font-bold text-sm transition-all flex items-center gap-2 active:scale-95 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          {/* Return to Home Button */}
          <button
            onClick={handleHomeClick}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9B8FCD] via-indigo-500 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-[#9B8FCD]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
          >
            <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Return to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
