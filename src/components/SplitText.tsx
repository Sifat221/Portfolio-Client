import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.05,
  rootMargin = '0px',
  textAlign = 'center',
  onLetterAnimationComplete,
  showCallback = false,
}) => {
  const containerRef = useRef<HTMLHeadingElement | HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;

    // Check if element is already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      return;
    }

    const effectiveRootMargin = rootMargin === '-100px' ? '0px' : rootMargin;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: Math.min(threshold, 0.01), rootMargin: effectiveRootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!inView || !containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.split-item');

    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: () => {
            if (showCallback && onLetterAnimationComplete) {
              onLetterAnimationComplete();
            }
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [inView, delay, duration, ease, from, to, onLetterAnimationComplete, showCallback]);

  const words = text.split(' ');

  return (
    <h2
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={`w-full block overflow-hidden ${className}`}
      style={{ textAlign }}
    >
      {splitType === 'chars'
        ? words.map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap">
              {word.split('').map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="split-item inline-block"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {char}
                </span>
              ))}
              {wordIdx < words.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))
        : words.map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block">
              <span
                className="split-item inline-block"
                style={{ willChange: 'transform, opacity' }}
              >
                {word}
              </span>
              {wordIdx < words.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
    </h2>
  );
};

export default SplitText;
