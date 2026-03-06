import { ReactNode } from 'react';

interface SectionIntroProps {
  title: string;
  children: ReactNode;
  variant?: 'default' | 'highlight' | 'subtle';
  className?: string;
}

export const SectionIntro = ({ 
  title, 
  children, 
  variant = 'default',
  className 
}: SectionIntroProps) => {
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    highlight: 'bg-blue-50 border-blue-200',
    subtle: 'bg-gray-50 border-gray-100',
  };

  return (
    <div className={`rounded-lg p-6 mb-6 ${variantClasses[variant]} ${className || ''}`}>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>
      <div className="text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
};
