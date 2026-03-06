import { useState, useEffect, useRef } from 'react';

export interface UseResizeObserverOptions {
  debounceMs?: number;
}

export interface UseResizeObserverReturn {
  width: number;
  height: number;
  isResizing: boolean;
}

export const useResizeObserver = (
  targetRef?: React.RefObject<HTMLElement>,
  options: UseResizeObserverOptions = {}
): UseResizeObserverReturn => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimeoutRef = useRef<number>();
  const localRef = useRef<HTMLElement>();
  const elementRef = targetRef || localRef;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial dimensions
    const { width, height } = element.getBoundingClientRect();
    setDimensions({ width, height });

    const resizeObserver = new ResizeObserver((entries) => {
      setIsResizing(true);

      // Debounce resize events
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = window.setTimeout(() => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setDimensions({ width, height });
        }
        setIsResizing(false);
      }, options.debounceMs || 100);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [elementRef, options.debounceMs]);

  return {
    ...dimensions,
    isResizing,
  };
};
