// @ts-nocheck
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import '../styles/NeonCursor.css';

export const NeonCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const coarse = window.matchMedia?.('(pointer: coarse)').matches;
    const noHover = window.matchMedia?.('(hover: none)').matches;
    return Boolean(coarse || noHover);
  });

  // GPU MotionValues: zero React re-renders on mousemove (120fps smooth on Chrome/Web)
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const mainX = useSpring(rawX, { damping: 24, stiffness: 500, mass: 0.35 });
  const mainY = useSpring(rawY, { damping: 24, stiffness: 500, mass: 0.35 });

  const trailX = useSpring(rawX, { damping: 28, stiffness: 240, mass: 0.7 });
  const trailY = useSpring(rawY, { damping: 28, stiffness: 240, mass: 0.7 });

  const glowX = useSpring(rawX, { damping: 35, stiffness: 180, mass: 0.9 });
  const glowY = useSpring(rawY, { damping: 35, stiffness: 180, mass: 0.9 });

  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(pointer: coarse)');
    const update = () => setIsTouchDevice(mq.matches || window.matchMedia('(hover: none)').matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  }, [rawX, rawY]);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

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
    if (isTouchDevice) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isTouchDevice, handleMouseMove, handleMouseDown, handleMouseUp, handleMouseOver, handleMouseOut]);

  if (isTouchDevice) return null;

  return (
    <div className="neon-cursor-container">
      {/* Background soft warm orange halo/shadow */}
      <motion.div
        className="cursor-glow"
        style={{ x: glowX, y: glowY, marginLeft: -32, marginTop: -32 }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.85 : 0.5,
        }}
        transition={{ duration: 0.2 }}
        initial={false}
      />

      {/* Outer glowing neon orange ring */}
      <motion.div
        className="cursor-trail"
        style={{ x: trailX, y: trailY, marginLeft: -19, marginTop: -19 }}
        animate={{
          scale: isHovering ? 1.45 : 1,
          borderColor: isHovering ? '#ff8c3a' : '#ff7012',
          borderWidth: isHovering ? '2.5px' : '2px',
        }}
        transition={{ duration: 0.18 }}
        initial={false}
      />

      {/* Main inner neon orange dot */}
      <motion.div
        className="cursor-main"
        style={{ x: mainX, y: mainY, marginLeft: -9, marginTop: -9 }}
        animate={{
          scale: isClicking ? 0.75 : isHovering ? 1.25 : 1,
        }}
        transition={{ duration: 0.12 }}
      />
    </div>
  );
};

export default NeonCursor;
