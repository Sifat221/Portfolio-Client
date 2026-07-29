import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col items-center justify-center text-white space-y-6 px-4">
      <div className="text-center space-y-2 max-w-sm">
        <span className="text-3xl font-extrabold tracking-tight">
          Sifat Khan<span className="text-[#9B8FCD]">.</span>
        </span>
        <p className="text-sm font-mono text-[#9B8FCD] flex items-center justify-center gap-2 pt-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading Portfolio...
        </p>
      </div>
    </div>
  );
};
