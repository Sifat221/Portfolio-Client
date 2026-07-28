import React from 'react';
import { motion, Variants } from 'framer-motion';

interface StaggeredTitleProps {
  text: string;
  gradientText?: string;
  className?: string;
  alignment?: 'center' | 'left' | 'right';
}

export const StaggeredTitle: React.FC<StaggeredTitleProps> = ({
  text,
  gradientText,
  className = "text-3xl sm:text-5xl font-extrabold tracking-tight",
  alignment = 'center',
}) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.035, delayChildren: 0.1 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
  };

  const mainLetters = Array.from(text);
  const gradientLetters = gradientText ? Array.from(gradientText) : [];

  const alignClass =
    alignment === 'center'
      ? 'justify-center text-center'
      : alignment === 'left'
      ? 'justify-start text-left'
      : 'justify-end text-right';

  return (
    <motion.h2
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      className={`${className} flex flex-wrap items-center gap-[0.02em] ${alignClass}`}
    >
      {mainLetters.map((char, index) => (
        <motion.span variants={child} key={`main-${index}`} className="inline-block text-white">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}

      {gradientLetters.length > 0 && (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B8FCD] via-indigo-400 to-cyan-400 inline-flex flex-wrap">
          {gradientLetters.map((char, index) => (
            <motion.span variants={child} key={`grad-${index}`} className="inline-block">
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      )}
    </motion.h2>
  );
};
