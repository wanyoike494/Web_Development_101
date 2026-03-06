import { formatNumber } from './formatNumber';

export const formatPopulation = (population: number): string => {
  if (population === 0) return '0';
  if (population < 1000) {
    return population.toString();
  }
  
  if (population < 1000000) {
    return `${(population / 1000).toFixed(1)}K`;
  }
  
  if (population < 1000000000) {
    return `${(population / 1000000).toFixed(2)}M`;
  }
  
  if (population < 1000000000000) {
    return `${(population / 1000000000).toFixed(2)}B`;
  }
  
  return `${(population / 1000000000000).toFixed(2)}T`;
};

export const formatPopulationDensity = (density: number): string => {
  if (density === 0) return '0';
  if (density < 1) {
    return `${density.toFixed(2)}/km²`;
  }
  
  return `${density.toFixed(1)}/km²`;
};

export const formatPopulationGrowth = (growthRate: number): string => {
  const sign = growthRate >= 0 ? '+' : '';
  return `${sign}${growthRate.toFixed(2)}%`;
};

export const formatPopulationChange = (current: number, previous: number): {
  absolute: number;
  percentage: number;
  formatted: {
    absolute: string;
    percentage: string;
  };
} => {
  const absolute = current - previous;
  const percentage = previous === 0 ? 0 : (absolute / previous) * 100;
  
  return {
    absolute,
    percentage,
    formatted: {
      absolute: formatNumber(Math.abs(absolute)),
      percentage: formatPopulationGrowth(percentage),
    },
  };
};

export const getPopulationScale = (population: number): {
  scale: 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'massive';
  description: string;
} => {
  if (population < 100000) {
    return { scale: 'tiny', description: 'Less than 100K' };
  }
  if (population < 1000000) {
    return { scale: 'small', description: '100K - 1M' };
  }
  if (population < 10000000) {
    return { scale: 'medium', description: '1M - 10M' };
  }
  if (population < 100000000) {
    return { scale: 'large', description: '10M - 100M' };
  }
  if (population < 1000000000) {
    return { scale: 'huge', description: '100M - 1B' };
  }
  
  return { scale: 'massive', description: 'Over 1B' };
};

export const calculateDoublingTime = (growthRate: number): number | null => {
  if (growthRate <= 0) return null;
  
  // Rule of 70: doubling time ≈ 70 / growth rate percentage
  return 70 / growthRate;
};

export const formatAgeStructure = (ageGroups: Record<string, number>): Array<{
  ageGroup: string;
  population: number;
  percentage: number;
  barWidth: number;
}> => {
  const total = Object.values(ageGroups).reduce((sum, count) => sum + count, 0);
  
  return Object.entries(ageGroups).map(([ageGroup, population]) => ({
    ageGroup,
    population,
    percentage: (population / total) * 100,
    barWidth: (population / total) * 100, // For bar charts
  }));
};

export const formatUrbanRuralSplit = (urban: number, rural: number): {
  urban: {
    count: number;
    percentage: number;
    formatted: string;
  };
  rural: {
    count: number;
    percentage: number;
    formatted: string;
  };
  total: number;
} => {
  const total = urban + rural;
  
  return {
    urban: {
      count: urban,
      percentage: (urban / total) * 100,
      formatted: `${((urban / total) * 100).toFixed(1)}%`,
    },
    rural: {
      count: rural,
      percentage: (rural / total) * 100,
      formatted: `${((rural / total) * 100).toFixed(1)}%`,
    },
    total,
  };
};

export const getLifeExpectancyCategory = (age: number): {
  category: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
  description: string;
  color: string;
} => {
  if (age < 50) {
    return {
      category: 'very-low',
      description: 'Very Low',
      color: 'text-red-600',
    };
  }
  
  if (age < 60) {
    return {
      category: 'low',
      description: 'Low',
      color: 'text-orange-600',
    };
  }
  
  if (age < 70) {
    return {
      category: 'medium',
      description: 'Medium',
      color: 'text-yellow-600',
    };
  }
  
  if (age < 75) {
    return {
      category: 'high',
      description: 'High',
      color: 'text-green-600',
    };
  }
  
  return {
    category: 'very-high',
    description: 'Very High',
    color: 'text-emerald-600',
  };
};
