import { useEffect } from 'react';
import { playButtonClickSound } from '../utils/sound';

export const useGlobalSound = (): void => {
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Play click sound for ANY button, link, tab, or interactive element across the entire site
      const clickable = target.closest(
        'button, a, [role="button"], input[type="submit"], input[type="button"], select, [tabindex="0"]'
      );
      if (clickable) {
        playButtonClickSound();
      }
    };

    window.addEventListener('click', handleGlobalClick, true);
    return () => window.removeEventListener('click', handleGlobalClick, true);
  }, []);
};
