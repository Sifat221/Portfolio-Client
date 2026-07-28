import React, { useState } from 'react';
import { Home, ArrowLeft, AlertTriangle, Compass, Sparkles, RefreshCw } from 'lucide-react';
import FuzzyText from './FuzzyText';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

interface NotFoundProps {
  onGoHome?: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onGoHome }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleHomeClick = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-[#9B8FCD] selection:text-white">
      {/* Soft Background Neon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9B8FCD]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-2xl mx-auto text-center relative z-10 space-y-8">
        {/* Top Warning Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-rose-500/40 text-rose-400 text-xs font-mono font-bold shadow-lg shadow-rose-950/20">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>404 ERROR - PAGE NOT FOUND</span>
        </div>

        {/* Requested Glitch/FuzzyText Component */}
        <div className="py-2 flex justify-center">
          <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover>
            404
          </FuzzyText>
        </div>

        {/* Friendly Error Heading & Description */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Lost in the <span className="text-gradient-periwinkle">Digital Space?</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            The page or route you are looking for does not exist or has been moved. Let's get you back on track!
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Home Button */}
          <button
            onClick={handleHomeClick}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9B8FCD] via-indigo-500 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-[#9B8FCD]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
          >
            <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Return to Home</span>
          </button>

          {/* Trigger 404 Dialog Button */}
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-6 py-3 rounded-xl glass-card border border-slate-700/80 text-slate-200 hover:border-[#9B8FCD] hover:text-white font-bold text-sm transition-all flex items-center gap-2 active:scale-95 shadow-md"
          >
            <Compass className="w-4 h-4 text-[#9B8FCD]" />
            <span>Open 404 Dialog</span>
          </button>
        </div>
      </div>

      {/* 404 Dialog Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md bg-[#141C2E] border-slate-700/80 text-white text-center p-8 rounded-3xl">
          <DialogHeader className="space-y-4 text-center items-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-amber-400 mx-auto shadow-lg">
              <AlertTriangle className="w-7 h-7" />
            </div>

            {/* FuzzyText inside Dialog */}
            <div className="flex justify-center py-1">
              <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover fontSize="4rem">
                404
              </FuzzyText>
            </div>

            <DialogTitle className="text-2xl font-extrabold text-white text-center">
              Page Not Found
            </DialogTitle>

            <DialogDescription className="text-slate-300 text-sm text-center">
              You are viewing the 404 status dialog. You can return directly to the main portfolio home page below.
            </DialogDescription>
          </DialogHeader>

          <div className="pt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all"
            >
              Close
            </button>

            <button
              onClick={() => {
                setIsDialogOpen(false);
                handleHomeClick();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#9B8FCD] hover:bg-[#8A7CBF] text-white font-bold text-xs shadow-lg shadow-[#9B8FCD]/20 transition-all flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Go to Home</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotFound;
