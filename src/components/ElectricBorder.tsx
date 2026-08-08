import React, { useId } from 'react';
import '../styles/ElectricBorder.css';

interface ElectricBorderProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  secondaryColor?: string;
  borderRadius?: number;
}

export const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  className = '',
  glowColor = '#00f0ff',
  secondaryColor = '#38bdf8',
  borderRadius = 20,
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
            <stop offset="40%" stopColor={secondaryColor} />
            <stop offset="80%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor={glowColor} />
          </linearGradient>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035 0.085"
              numOctaves="4"
              result="noise"
            >
              <animate
                attributeName="seed"
                values="1; 12; 27; 43; 61; 79; 94; 38; 82; 105"
                dur="0.75s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="7.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Crisp Crackling Electric Lightning SVG Stroke Outline */}
      <div className="absolute -inset-[5px] pointer-events-none z-20 overflow-visible">
        <svg
          className="w-full h-full"
          style={{
            filter: `drop-shadow(0 0 3px ${glowColor}) drop-shadow(0 0 9px ${glowColor}cc)`,
          }}
        >
          <rect
            x="4"
            y="4"
            width="calc(100% - 8px)"
            height="calc(100% - 8px)"
            rx={borderRadius}
            ry={borderRadius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            style={{
              filter: `url(#${filterId})`,
            }}
            className="electric-lightning-stroke"
          />
        </svg>
      </div>

      {/* Soft Ambient Inner/Outer Cyan Energy Glow */}
      <div 
        className="absolute -inset-[3px] pointer-events-none z-10 transition-all duration-300 opacity-80 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 12px ${glowColor}44, inset 0 0 8px ${glowColor}1a`,
          borderRadius: `${borderRadius + 3}px`,
        }}
      />

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
