import { ReactNode } from 'react';

interface ChartContainerProps {
  title?: string;
  description?: string;
  children: ReactNode;
  loading?: boolean;
  error?: string;
  actions?: ReactNode;
  className?: string;
}

export const ChartContainer = ({ 
  title, 
  description, 
  children, 
  loading, 
  error, 
  actions,
  className 
}: ChartContainerProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className || ''}`}>
      {(title || description || actions) && (
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
          </div>
          {actions && <div className="flex space-x-2">{actions}</div>}
        </div>
      )}
      
      <div className="p-6">
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            <span className="ml-3 text-gray-600">Loading chart...</span>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center h-64">
            <div className="text-red-600 text-center">
              <div className="text-lg font-semibold mb-2">Chart Error</div>
              <div className="text-sm">{error}</div>
            </div>
          </div>
        )}
        
        {!loading && !error && children}
      </div>
    </div>
  );
};
