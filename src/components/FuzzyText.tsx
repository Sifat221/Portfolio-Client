import React, { useEffect, useRef, useState } from 'react';

interface FuzzyTextProps {
  children?: React.ReactNode;
  text?: string;
  baseIntensity?: number;
  hoverIntensity?: number;
  enableHover?: boolean;
  fontSize?: string | number;
  fontWeight?: string | number;
  fontFamily?: string;
  color?: string;
  className?: string;
}

export const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  text,
  baseIntensity = 0.2,
  hoverIntensity = 0.5,
  enableHover = true,
  fontSize = 'clamp(4rem, 12vw, 9rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  color = '#9B8FCD',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const content = (children ? String(children) : text) || '404';
  const intensity = isHovered && enableHover ? hoverIntensity : baseIntensity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const computedFontSize =
        typeof fontSize === 'number' ? `${fontSize}px` : fontSize;

      ctx.font = `${fontWeight} ${computedFontSize} ${fontFamily || 'Inter, sans-serif'}`;
      const textMetrics = ctx.measureText(content);
      
      const width = Math.ceil(textMetrics.width + 80);
      const height = Math.ceil(parseInt(computedFontSize) * 1.4 || 160);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontWeight} ${computedFontSize} ${fontFamily || 'Inter, sans-serif'}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw fuzzy glitch layers
      const passes = Math.max(3, Math.floor(intensity * 12));

      for (let i = 0; i < passes; i++) {
        const dx = (Math.random() - 0.5) * (intensity * 18);
        const dy = (Math.random() - 0.5) * (intensity * 18);
        const alpha = Math.max(0.1, 1 - i * (0.8 / passes));

        ctx.save();
        ctx.globalAlpha = alpha;

        if (i === 1) {
          ctx.fillStyle = '#00F0FF'; // Cyan chromatic shift
        } else if (i === 2) {
          ctx.fillStyle = '#FF007A'; // Pink chromatic shift
        } else {
          ctx.fillStyle = color;
        }

        ctx.fillText(content, cx + dx, cy + dy);
        ctx.restore();
      }

      // Add digital noise grain pixels
      const noiseCount = Math.floor(intensity * 400);
      ctx.fillStyle = '#ffffff';
      for (let n = 0; n < noiseCount; n++) {
        const nx = Math.random() * canvas.width;
        const ny = Math.random() * canvas.height;
        const size = Math.random() * 2 + 1;
        ctx.globalAlpha = Math.random() * 0.4;
        ctx.fillRect(nx, ny, size, size);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [content, intensity, fontSize, fontWeight, fontFamily, color]);

  return (
    <div
      className={`relative inline-flex items-center justify-center cursor-pointer select-none ${className}`}
      onMouseEnter={() => enableHover && setIsHovered(true)}
      onMouseLeave={() => enableHover && setIsHovered(false)}
    >
      <canvas ref={canvasRef} className="block max-w-full h-auto" />
    </div>
  );
};

export default FuzzyText;
