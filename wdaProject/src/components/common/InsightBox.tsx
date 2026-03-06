import { ReactNode } from 'react';

interface InsightBoxProps {
  title: string;
  value: string | number;
  change?: number;
  changePercent?: number;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export const InsightBox = ({ 
  title, 
  value, 
  change, 
  changePercent, 
  icon, 
  trend = 'neutral',
  description,
  variant = 'default',
  className 
}: InsightBoxProps) => {
  const variantClasses = {
    default: 'bg-white border-gray-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-orange-50 border-orange-200',
    error: 'bg-red-50 border-red-200',
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  };

  const formatChange = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  return (
    <div className={`rounded-lg border p-6 ${variantClasses[variant]} ${className || ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {icon && <span className="text-2xl">{icon}</span>}
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>
          
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          
          {(change !== undefined || changePercent !== undefined) && (
            <div className="flex items-center space-x-2">
              {change !== undefined && (
                <span className={`text-sm font-medium ${trendColors[trend]}`}>
                  {formatChange(change)}
                </span>
              )}
              {changePercent !== undefined && (
                <span className={`text-sm ${trendColors[trend]}`}>
                  ({formatChange(changePercent)})
                </span>
              )}
              {trend !== 'neutral' && (
                <span className={`text-lg ${trendColors[trend]}`}>
                  {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
                </span>
              )}
            </div>
          )}
          
          {description && (
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
