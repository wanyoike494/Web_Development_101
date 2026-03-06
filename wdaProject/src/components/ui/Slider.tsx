import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/helpers';

export interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  showValue?: boolean;
  marks?: Array<{
    value: number;
    label: string;
  }>;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, min, max, step = 1, value, onChange, showValue = true, marks, id, ...props }, ref) => {
    const sliderId = id || `slider-${Math.random().toString(36).substr(2, 9)}`;
    
    const percentage = ((value - min) / (max - min)) * 100;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={sliderId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            id={sliderId}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className={cn(
              'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider',
              className
            )}
            ref={ref}
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
            }}
            {...props}
          />
          
          {showValue && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
              {value}
            </div>
          )}
        </div>

        {/* Marks */}
        {marks && marks.length > 0 && (
          <div className="relative mt-1">
            {marks.map((mark) => {
              const markPercentage = ((mark.value - min) / (max - min)) * 100;
              return (
                <div
                  key={mark.value}
                  className="absolute transform -translate-x-1/2"
                  style={{ left: `${markPercentage}%` }}
                >
                  <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
                  <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                    {mark.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Min/Max Labels */}
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
