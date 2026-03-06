import { useState } from 'react';

interface YearSliderProps {
  minYear?: number;
  maxYear?: number;
  currentYear: number;
  onYearChange: (year: number) => void;
}

export const YearSlider = ({ 
  minYear = 2000, 
  maxYear = 2024, 
  currentYear, 
  onYearChange 
}: YearSliderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentYear < maxYear) {
      const interval = setInterval(() => {
        onYearChange(prev => {
          if (prev >= maxYear) {
            setIsPlaying(false);
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">Year: {currentYear}</label>
        <button
          onClick={handlePlay}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            isPlaying 
              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={currentYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((currentYear - minYear) / (maxYear - minYear)) * 100}%, #e5e7eb ${((currentYear - minYear) / (maxYear - minYear)) * 100}%, #e5e7eb 100%)`
          }}
        />
        
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{minYear}</span>
          <span>{maxYear}</span>
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        {Array.from({ length: 5 }, (_, i) => {
          const year = minYear + Math.floor((maxYear - minYear) * (i / 4));
          return (
            <button
              key={year}
              onClick={() => onYearChange(year)}
              className={`px-2 py-1 text-xs rounded ${
                currentYear === year 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {year}
            </button>
          );
        })}
      </div>
    </div>
  );
};
