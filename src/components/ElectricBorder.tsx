import React, { useId } from 'react';
import '../styles/ElectricBorder.css';

interface ElectricBorderProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  secondaryColor?: string;
  borderRadius?: number;
  isActive?: boolean;
}

export const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  className = '',
  glowColor = '#00f0ff',
  secondaryColor = '#38bdf8',
  borderRadius = 24,
  isActive = true,
}) => {
  const filterId = useId().replace(/:/g, '-');
  const gradientId = useId().replace(/:/g, '-');

  return (
    <div className={`electric-card-container relative group ${className}`}>
      {/* Hidden SVG Filter Definition for Electric Turbulence Effect */}
      <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="35%" stopColor="#38bdf8" />
            <stop offset="70%" stopColor={secondaryColor} />
            <stop offset="100%" stopColor={glowColor} />
          </linearGradient>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.08"
              numOctaves="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.04 0.08; 0.06 0.11; 0.03 0.07; 0.05 0.09; 0.04 0.08"
                dur="4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Glowing Outer Cyan Energy Aura */}
      <div 
        className="absolute -inset-[3px] rounded-[26px] pointer-events-none z-10 transition-all duration-300 opacity-90 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 15px ${glowColor}66, 0 0 30px ${glowColor}33, inset 0 0 15px ${glowColor}22`,
          borderRadius: `${borderRadius + 2}px`,
        }}
      />

      {/* Wavy Electric SVG Jagged Stroke Frame */}
      <div className="absolute -inset-[3px] pointer-events-none z-10 overflow-visible">
        <svg
          className="w-full h-full"
          style={{
            filter: `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 20px ${glowColor}bb)`,
          }}
        >
          <rect
            x="2.5"
            y="2.5"
            width="calc(100% - 5px)"
            height="calc(100% - 5px)"
            rx={borderRadius}
            ry={borderRadius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.5"
            style={{
              filter: `url(#${filterId})`,
            }}
            className="electric-stroke-pulse"
          />
        </svg>
      </div>

      {/* Traveling Electric Energy Arc / Spark Current Animation */}
      <div 
        className="absolute -inset-[2px] pointer-events-none z-20 overflow-hidden"
        style={{ borderRadius: `${borderRadius}px` }}
      >
        <div className="electric-arc-spark" />
      </div>

      {/* Card Content Container */}
      <div 
        className="relative z-0 h-full overflow-hidden"
        style={{ borderRadius: `${borderRadius}px` }}
      >
        {children}
      </div>
    </div>
  );
};

export default ElectricBorder;
