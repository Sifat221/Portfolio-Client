// @ts-nocheck
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import '../styles/NeonCursor.css';

export const NeonCursor: React.FC = () => {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const trailControls = useAnimation();
  const glowControls = useAnimation();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setIsVisible(true);
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('a, button, input, textarea, select, [data-hover="true"], .cursor-pointer')) {
        setIsHovering(true);
        void trailControls.start({
          scale: 1.5,
          borderColor: 'rgb(255, 150, 50)',
          borderWidth: '3px',
        });
        void glowControls.start({
          scale: 2,
          opacity: 0.8,
        });
      }
    },
    [trailControls, glowControls]
  );

  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('a, button, input, textarea, select, [data-hover="true"], .cursor-pointer')) {
        setIsHovering(false);
        void trailControls.start({
          scale: 1,
          borderColor: 'rgb(236, 101, 23)',
          borderWidth: '2px',
        });
        void glowControls.start({
          scale: 1,
          opacity: 0.4,
        });
      }
    },
    [trailControls, glowControls]
  );

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut, handleMouseLeave]);

  if (!isVisible) return null;

  return (
    <div className="neon-cursor-container">
      {/* Main cursor dot */}
      <motion.div
        className="cursor-main"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isClicking ? 0.7 : isHovering ? 1.3 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 500,
          mass: 0.2,
        }}
      />

      {/* Trailing circle */}
      <motion.div
        className="cursor-trail"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 250,
          mass: 0.5,
        }}
        initial={false}
      >
        <motion.div
          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
          animate={trailControls}
          initial={{ scale: 1, borderColor: 'rgb(236, 101, 23)', borderWidth: '2px' }}
        />
      </motion.div>

      {/* Outer glow */}
      <motion.div
        className="cursor-glow"
        animate={{
          x: position.x - 25,
          y: position.y - 25,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 180,
          mass: 0.8,
        }}
        initial={false}
      >
        <motion.div
          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
          animate={glowControls}
          initial={{ scale: 1, opacity: 0.4 }}
        />
      </motion.div>
    </div>
  );
};

export default NeonCursor;
