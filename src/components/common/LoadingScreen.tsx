import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col items-center justify-center text-white space-y-4 px-4">
      <div className="w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
        <DotLottieReact
          src="https://lottie.host/d653260e-5eb6-4e8b-b552-5b7e6660f4b1/h1oxguvNEy.lottie"
          loop
          autoplay
        />
      </div>
      <div className="text-center space-y-1">
        <span className="text-3xl font-extrabold tracking-tight">
          Sifat Khan<span className="text-[#9B8FCD]">.</span>
        </span>
        <p className="text-sm font-mono text-[#9B8FCD] tracking-wider pt-1">
          Loading Portfolio...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
