import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#090D16] flex flex-col items-center justify-center text-white space-y-5 px-4">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-[#9B8FCD]/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-[#9B8FCD] border-r-cyan-400 border-b-transparent border-l-transparent animate-spin" />
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#9B8FCD] to-cyan-400 opacity-80 blur-[2px] animate-pulse" />
      </div>
      <div className="text-center space-y-1">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Sifat Khan<span className="text-[#9B8FCD]">.</span>
        </span>
        <p className="text-xs sm:text-sm font-mono text-[#9B8FCD] tracking-wider pt-1">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
