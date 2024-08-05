// hooks/useResponsiveLayout.ts
import { useState, useEffect } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

interface ResponsiveLayout {
  windowSize: WindowSize;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const useResponsiveLayout = (): ResponsiveLayout => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    handleResize(); // Call the handler right away to set the initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = (windowSize.width ?? 0) <= 768;
  const isTablet =
    (windowSize.width ?? 0) > 768 && (windowSize.width ?? 0) <= 1024;
  const isDesktop = (windowSize.width ?? 0) > 1024;

  return { windowSize, isMobile, isTablet, isDesktop };
};

export default useResponsiveLayout;
