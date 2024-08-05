import { useState, useEffect, useRef, useCallback } from 'react';

interface Size {
  width: number;
  height: number;
}

const useTotalSize = (items: number) => {
  const [totalSize, setTotalSize] = useState<Size>({ width: 0, height: 0 });
  const element = useRef<(HTMLElement | null)[]>([]);

  const setButtonRef = useCallback((el: HTMLElement | null, index: number) => {
    element.current[index] = el;
  }, []);

  useEffect(() => {
    const calculateTotalSize = () => {
      let totalWidth = 0;
      let totalHeight = 0;

      element.current.forEach((button) => {
        if (button) {
          const { width, height } = button.getBoundingClientRect();
          totalWidth += width;
          totalHeight = Math.max(totalHeight, height);
        }
      });

      setTotalSize({ width: totalWidth, height: totalHeight });
    };

    calculateTotalSize();

    window.addEventListener('resize', calculateTotalSize);

    return () => window.removeEventListener('resize', calculateTotalSize);
  }, [items, element]);

  return { totalSize, setButtonRef };
};

export default useTotalSize;
