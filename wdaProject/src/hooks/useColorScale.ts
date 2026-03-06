import { useMemo } from 'react';

export interface ColorScaleOptions {
  domain?: [number, number];
  range?: string[];
  colorScheme?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'viridis';
  steps?: number;
  clamp?: boolean;
}

export interface UseColorScaleReturn {
  scale: (value: number) => string;
  domain: [number, number];
  range: string[];
}

const colorSchemes = {
  blue: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'],
  green: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'],
  red: ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'],
  purple: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7c3aed', '#6d28d9', '#5b21b6'],
  orange: ['#fff7ed', '#ffedd5', '#fed7aa', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03'],
  viridis: ['#440154', '#482677', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825', '#fde725'],
};

export const useColorScale = (options: ColorScaleOptions = {}): UseColorScaleReturn => {
  const {
    domain = [0, 100],
    range,
    colorScheme = 'blue',
    steps = 10,
    clamp = true,
  } = options;

  const colorRange = useMemo(() => {
    if (range) return range;
    
    const scheme = colorSchemes[colorScheme];
    return scheme.slice(0, Math.min(steps, scheme.length));
  }, [range, colorScheme, steps]);

  const scale = useMemo(() => {
    return (value: number): string => {
      if (isNaN(value)) return '#e5e7eb';
      
      const normalizedValue = clamp ? Math.max(domain[0], Math.min(domain[1], value)) : value;
      const normalizedDomain = domain[1] - domain[0];
      const normalizedValueInRange = normalizedValue - domain[0];
      
      if (normalizedDomain === 0) return colorRange[0];
      
      const index = Math.floor((normalizedValueInRange / normalizedDomain) * (colorRange.length - 1));
      const clampedIndex = Math.max(0, Math.min(colorRange.length - 1, index));
      
      return colorRange[clampedIndex];
    };
  }, [domain, colorRange, clamp]);

  return {
    scale,
    domain,
    range: colorRange,
  };
};
