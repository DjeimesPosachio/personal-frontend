import { useState, useEffect } from "react";

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    size: undefined,
  });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let size;
      if (width >= breakpoints.xxl) {
        size = 'xxl';
      } else if (width >= breakpoints.xl) {
        size = 'xl';
      } else if (width >= breakpoints.lg) {
        size = 'lg';
      } else if (width >= breakpoints.md) {
        size = 'md';
      } else {
        size = 'sm';
      }
      setWindowSize({
        width,
        height,
        size,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}