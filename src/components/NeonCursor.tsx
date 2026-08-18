// @ts-nocheck
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../styles/NeonCursor.css';

export const NeonCursor: React.FC = () => {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (
      target &&
      target.closest &&
      target.closest('a, button, input, textarea, select, [data-hover="true"], [role="button"], .cursor-pointer')
    ) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (
      target &&
      target.closest &&
      target.closest('a, button, input, textarea, select, [data-hover="true"], [role="button"], .cursor-pointer')
    ) {
      setIsHovering(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut]);

  return (
    <div className="neon-cursor-container">
      {/* Background soft warm orange halo/shadow */}
      <motion.div
        className="cursor-glow"
        animate={{
          x: position.x - 32,
          y: position.y - 32,
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.85 : 0.5,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 180,
          mass: 0.9,
        }}
        initial={false}
      />

      {/* Outer glowing neon orange ring */}
      <motion.div
        className="cursor-trail"
        animate={{
          x: position.x - 19,
          y: position.y - 19,
          scale: isHovering ? 1.45 : 1,
          borderColor: isHovering ? '#ff8c3a' : '#ff7012',
          borderWidth: isHovering ? '2.5px' : '2px',
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 240,
          mass: 0.7,
        }}
        initial={false}
      />

      {/* Main inner neon orange dot */}
      <motion.div
        className="cursor-main"
        animate={{
          x: position.x - 9,
          y: position.y - 9,
          scale: isClicking ? 0.75 : isHovering ? 1.25 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 450,
          mass: 0.4,
        }}
      />
    </div>
  );
};

export default NeonCursor;
