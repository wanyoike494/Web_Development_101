import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/helpers';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const Tooltip = ({ 
  content, 
  children, 
  position = 'top', 
  delay = 200,
  className 
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const getPositionClasses = () => {
    const baseClasses = 'absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg';
    
    switch (position) {
      case 'top':
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
      case 'bottom':
        return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 mt-2`;
      case 'left':
        return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 mr-2`;
      case 'right':
        return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 ml-2`;
      default:
        return baseClasses;
    }
  };

  const getArrowClasses = () => {
    const baseArrowClasses = 'absolute w-0 h-0 border-4 border-transparent';
    
    switch (position) {
      case 'top':
        return `${baseArrowClasses} top-full left-1/2 transform -translate-x-1/2 border-t-gray-900 border-b-transparent`;
      case 'bottom':
        return `${baseArrowClasses} bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900 border-t-transparent`;
      case 'left':
        return `${baseArrowClasses} left-full top-1/2 transform -translate-y-1/2 border-l-gray-900 border-r-transparent`;
      case 'right':
        return `${baseArrowClasses} right-full top-1/2 transform -translate-y-1/2 border-r-gray-900 border-l-transparent`;
      default:
        return baseArrowClasses;
    }
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className={cn('cursor-help', className)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={getPositionClasses()}
        >
          {content}
          <div className={getArrowClasses()} />
        </div>
      )}
    </div>
  );
};
