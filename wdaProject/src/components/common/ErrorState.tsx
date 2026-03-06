import { Button } from '../ui/Button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
  icon?: string;
  variant?: 'default' | 'network' | 'notFound';
}

export const ErrorState = ({ 
  title = 'Something went wrong', 
  message, 
  onRetry,
  retryText = 'Try Again',
  icon = '⚠️',
  variant = 'default'
}: ErrorStateProps) => {
  const variantConfig = {
    default: {
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      icon: icon,
    },
    network: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: '🌐',
    },
    notFound: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: '🔍',
    },
  } as const;

  const config = variantConfig[variant];

  return (
    <div className={`flex flex-col items-center justify-center min-h-64 p-8 rounded-lg border ${config.bgColor} ${config.borderColor}`}>
      <div className="text-6xl mb-4">{config.icon}</div>
      
      <div className="text-center max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>
        
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            {retryText}
          </Button>
        )}
      </div>
    </div>
  );
};
