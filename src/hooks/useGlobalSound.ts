import { useEffect } from 'react';
import { playButtonClickSound } from '../utils/sound';

export const useGlobalSound = (): void => {
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Exclude clicks inside Navbar / Header
      if (
        target.closest('header') ||
        target.closest('nav') ||
        target.closest('[role="banner"]') ||
        target.closest('.navbar-container')
      ) {
        return;
      }

      // Play click sound for any button, link, tab, or interactive element
      const clickable = target.closest(
        'button, a, [role="button"], input[type="submit"], input[type="button"], [tabindex="0"]'
      );
      if (clickable) {
        playButtonClickSound();
      }
    };

    window.addEventListener('click', handleGlobalClick, true);
    return () => window.removeEventListener('click', handleGlobalClick, true);
  }, []);
};
