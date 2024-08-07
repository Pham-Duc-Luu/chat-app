import { useState, useEffect, useRef } from 'react';

interface Size {
  width: number;
  height: number;
}

const useSize = () => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setSize({ width, height });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { ref, size };
};

export default useSize;
