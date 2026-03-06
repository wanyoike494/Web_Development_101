import { ReactNode } from 'react';

interface BaseMapProps {
  children: ReactNode;
  width?: number;
  height?: number;
  className?: string;
}

export const BaseMap = ({ 
  children, 
  width = 800, 
  height = 400, 
  className 
}: BaseMapProps) => {
  return (
    <div 
      className={`relative bg-gray-100 rounded-lg overflow-hidden ${className || ''}`}
      style={{ width, height }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
      
      {/* Map attribution */}
      <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600">
        World Data Analysis © 2024
      </div>
    </div>
  );
};
