import { useState, useEffect, useCallback } from 'react';
import { populationService } from './population.service';
import type { 
  PopulationRecord, 
  PopulationTrend, 
  PopulationComparison, 
  PopulationProjection,
  PopulationFilters 
} from './population.types';

export const usePopulation = (initialFilters?: PopulationFilters) => {
  const [data, setData] = useState<PopulationRecord[]>([]);
  const [trends, setTrends] = useState<PopulationTrend[]>([]);
  const [comparisons, setComparisons] = useState<PopulationComparison | null>(null);
  const [projections, setProjections] = useState<PopulationProjection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PopulationFilters>(initialFilters || {});
  const [stats, setStats] = useState<any>(null);

  // Load population data
  const loadPopulationData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await populationService.getPopulationData(
        filters.countries?.[0], // For now, take first country
        filters.yearRange?.end
      );
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load population data');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Load population trends
  const loadTrends = useCallback(async (countryCode: string, startYear: number, endYear: number) => {
    try {
      setLoading(true);
      const result = await populationService.getPopulationTrends(countryCode, startYear, endYear);
      setTrends(prev => [...prev.filter(t => t.countryCode !== countryCode), result]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load population trends');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load population comparison
  const loadComparison = useCallback(async (year: number, countries?: string[]) => {
    try {
      setLoading(true);
      const result = await populationService.getPopulationComparison(year, countries);
      setComparisons(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load population comparison');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load population projections
  const loadProjections = useCallback(async (countryCode: string, targetYear: number) => {
    try {
      setLoading(true);
      const result = await populationService.getPopulationProjections(countryCode, targetYear);
      setProjections(prev => [...prev.filter(p => p.countryCode !== countryCode), result]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load population projections');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load population stats
  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      const result = await populationService.getPopulationStats();
      setStats(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load population stats');
    } finally {
      setLoading(false);
    }
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<PopulationFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Get top countries
  const getTopCountries = useCallback(async (metric: 'population' | 'growthRate' | 'fertilityRate', limit: number = 10) => {
    try {
      setLoading(true);
      return await populationService.getTopCountries(metric, limit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load top countries');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Get population by age group
  const getPopulationByAgeGroup = useCallback(async (countryCode: string, year: number) => {
    try {
      setLoading(true);
      return await populationService.getPopulationByAgeGroup(countryCode, year);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load population by age group');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Get population density
  const getPopulationDensity = useCallback(async (countryCode: string, year: number) => {
    try {
      setLoading(true);
      return await populationService.getPopulationDensity(countryCode, year);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load population density');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get country data
  const getCountryData = useCallback((countryCode: string) => {
    return data.find(d => d.countryCode === countryCode);
  }, [data]);

  // Get trend data
  const getTrendData = useCallback((countryCode: string) => {
    return trends.find(t => t.countryCode === countryCode);
  }, [trends]);

  // Get projection data
  const getProjectionData = useCallback((countryCode: string) => {
    return projections.find(p => p.countryCode === countryCode);
  }, [projections]);

  // Calculate population change
  const calculatePopulationChange = useCallback((countryCode: string, year1: number, year2: number) => {
    const data1 = data.find(d => d.countryCode === countryCode && d.year === year1);
    const data2 = data.find(d => d.countryCode === countryCode && d.year === year2);
    
    if (!data1 || !data2) return null;
    
    const absoluteChange = data2.population - data1.population;
    const percentageChange = (absoluteChange / data1.population) * 100;
    
    return {
      absolute: absoluteChange,
      percentage: percentageChange,
      formatted: {
        absolute: populationService.formatPopulation(Math.abs(absoluteChange)),
        percentage: `${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(2)}%`,
      },
    };
  }, [data]);

  // Filter data
  const filteredData = useCallback(() => {
    let filtered = [...data];
    
    if (filters.countries && filters.countries.length > 0) {
      filtered = filtered.filter(d => filters.countries!.includes(d.countryCode));
    }
    
    if (filters.yearRange) {
      filtered = filtered.filter(d => 
        d.year >= filters.yearRange!.start && d.year <= filters.yearRange!.end
      );
    }
    
    if (filters.populationRange) {
      filtered = filtered.filter(d => 
        d.population >= filters.populationRange!.min && d.population <= filters.populationRange!.max
      );
    }
    
    if (filters.growthRateRange) {
      filtered = filtered.filter(d => 
        d.growthRate >= filters.growthRateRange!.min && d.growthRate <= filters.growthRateRange!.max
      );
    }
    
    return filtered;
  }, [data, filters]);

  // Initial data load
  useEffect(() => {
    loadPopulationData();
    loadStats();
  }, [loadPopulationData, loadStats]);

  return {
    // Data
    data,
    trends,
    comparisons,
    projections,
    stats,
    filteredData: filteredData(),
    
    // State
    loading,
    error,
    filters,
    
    // Actions
    loadPopulationData,
    loadTrends,
    loadComparison,
    loadProjections,
    loadStats,
    updateFilters,
    getTopCountries,
    getPopulationByAgeGroup,
    getPopulationDensity,
    
    // Utilities
    getCountryData,
    getTrendData,
    getProjectionData,
    calculatePopulationChange,
    
    // Refresh
    refresh: () => {
      loadPopulationData();
      loadStats();
    },
  };
};
