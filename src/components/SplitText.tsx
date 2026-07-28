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
  highlightText?: string;
  highlightClass?: string;
}

export const SplitText: React.FC<SplitTextProps> = React.memo(({
  text,
  className = '',
  delay = 35,
  duration = 1.0,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.01,
  rootMargin = '0px',
  textAlign = 'center',
  onLetterAnimationComplete,
  showCallback = false,
  highlightText,
  highlightClass = 'text-gradient-periwinkle',
}) => {
  const containerRef = useRef<HTMLHeadingElement | HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    // Initial check after short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setInView(true);
        } else {
          observer.observe(el);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  // Run GSAP Animation when inView becomes true
  useEffect(() => {
    if (!inView || !containerRef.current || hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;

    const elements = containerRef.current.querySelectorAll('.split-item');
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 40, ...from },
        {
          opacity: 1,
          y: 0,
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
  }, [inView, delay, duration, ease, showCallback]);

  const words = text.split(' ');
  const highlightWords = highlightText ? highlightText.split(' ') : [];

  const isHighlighted = (word: string) => {
    if (!highlightText) return false;
    const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return highlightWords.some(
      (hw) => hw.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === cleanWord
    );
  };

  return (
    <h2
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={`w-full block overflow-hidden ${className}`}
      style={{ textAlign }}
    >
      {splitType === 'chars'
        ? words.map((word, wordIdx) => {
            const highlight = isHighlighted(word);
            return (
              <span
                key={wordIdx}
                className={`inline-block whitespace-nowrap ${highlight ? highlightClass : ''}`}
              >
                {word.split('').map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="split-item inline-block"
                    style={{
                      opacity: 0,
                      transform: 'translateY(40px)',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {char}
                  </span>
                ))}
                {wordIdx < words.length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            );
          })
        : words.map((word, wordIdx) => {
            const highlight = isHighlighted(word);
            return (
              <span
                key={wordIdx}
                className={`inline-block ${highlight ? highlightClass : ''}`}
              >
                <span
                  className="split-item inline-block"
                  style={{
                    opacity: 0,
                    transform: 'translateY(40px)',
                    willChange: 'transform, opacity',
                  }}
                >
                  {word}
                </span>
                {wordIdx < words.length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            );
          })}
    </h2>
  );
});

export default SplitText;
