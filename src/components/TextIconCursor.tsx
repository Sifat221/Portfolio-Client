// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { useMouse } from '@/hooks/use-mouse';
import { Edit, Search, Play, Link } from 'lucide-react';

export interface TextIconCursorProps {
  children?: React.ReactNode;
}

const TextIconCursor: React.FC<TextIconCursorProps> = ({ children }) => {
  const [mouseState, ref] = useMouse();
  const [cursorContent, setCursorContent] = useState<React.ReactNode | string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const icons: Record<string, React.ReactNode> = {
    edit: <Edit size={16} />,
    search: <Search size={16} />,
    play: <Play size={16} />,
    link: <Link size={16} />,
  };

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest(
        '[data-cursor], [data-cursor-text], [data-cursor-icon], a, button, input, textarea, [role="button"]'
      ) as HTMLElement | null;

      if (cursorEl) {
        const textAttr = cursorEl.getAttribute('data-cursor-text');
        const iconAttr = cursorEl.getAttribute('data-cursor-icon');
        const cursorAttr = cursorEl.getAttribute('data-cursor');

        if (textAttr) {
          setCursorContent(textAttr);
        } else if (iconAttr) {
          setCursorContent(iconAttr);
        } else if (cursorAttr) {
          setCursorContent(cursorAttr);
        } else {
          const tagName = cursorEl.tagName.toLowerCase();
          if (tagName === 'a') {
            setCursorContent('link');
          } else if (tagName === 'button' || cursorEl.getAttribute('role') === 'button') {
            setCursorContent('edit');
          } else if (tagName === 'input' || tagName === 'textarea') {
            setCursorContent('search');
          }
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest(
          '[data-cursor], [data-cursor-text], [data-cursor-icon], a, button, input, textarea, [role="button"]'
        )
      ) {
        setCursorContent(null);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (isTouchDevice) {
    return <>{children}</>;
  }

  const renderContent = () => {
    if (!cursorContent) return null;
    if (typeof cursorContent === 'string') {
      return icons[cursorContent] || cursorContent;
    }
    return cursorContent;
  };

  return (
    <div className="relative w-full h-full" ref={ref}>
      {mouseState.x !== null && mouseState.y !== null && (
        <div
          className="fixed pointer-events-none z-[99999]"
          style={{
            left: mouseState.x,
            top: mouseState.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Main cursor */}
          <div className="w-4 h-4 bg-white rounded-full mix-blend-screen shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-transform duration-75 ease-out scale-100" />

          {/* Text/Icon container */}
          {cursorContent && (
            <div
              className="absolute left-6 top-0 bg-white/90 text-gray-900 px-3 py-1.5 rounded-full whitespace-nowrap flex items-center gap-2 text-sm font-medium shadow-xl backdrop-blur-md"
              style={{
                animation: 'cursorFadeIn 0.2s ease-out',
              }}
            >
              {renderContent()}
            </div>
          )}
        </div>
      )}

      {children}

      <style>{`
        @keyframes cursorFadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default TextIconCursor;
