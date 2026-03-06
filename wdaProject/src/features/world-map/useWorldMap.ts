import { useState, useEffect, useCallback } from 'react';
import { worldMapService } from './worldMap.service';
import { ChoroplethData, MapConfig, MapInteraction, MapAnimation } from './worldMap.types';

export const useWorldMap = (indicator: string = 'population') => {
  const [data, setData] = useState<ChoroplethData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<MapConfig>({
    width: 800,
    height: 400,
    projection: 'natural-earth',
    center: [0, 0],
    zoom: 1,
    colorScheme: 'blue',
    showGraticule: true,
    showBorders: true,
    showLabels: true,
  });
  const [interaction, setInteraction] = useState<MapInteraction>({
    hoveredCountry: null,
    selectedCountry: null,
    tooltipPosition: null,
    zoomLevel: 1,
    center: [0, 0],
  });
  const [animation, setAnimation] = useState<MapAnimation>({
    isPlaying: false,
    currentYear: 2024,
    startYear: 2000,
    endYear: 2024,
    speed: 1000,
    autoReverse: false,
  });

  // Load data for current year
  const loadData = useCallback(async (year: number) => {
    try {
      setLoading(true);
      setError(null);
      const mapData = await worldMapService.getWorldMapData(indicator, year);
      setData(mapData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load map data');
    } finally {
      setLoading(false);
    }
  }, [indicator]);

  // Initial data load
  useEffect(() => {
    loadData(animation.currentYear);
  }, [loadData, animation.currentYear]);

  // Handle year change
  const changeYear = useCallback((year: number) => {
    setAnimation(prev => ({ ...prev, currentYear: year }));
  }, []);

  // Handle country hover
  const handleCountryHover = useCallback((country: string | null, position?: { x: number; y: number }) => {
    setInteraction(prev => ({
      ...prev,
      hoveredCountry: country,
      tooltipPosition: position || null,
    }));
  }, []);

  // Handle country selection
  const handleCountrySelect = useCallback((country: string) => {
    setInteraction(prev => ({
      ...prev,
      selectedCountry: prev.selectedCountry === country ? null : country,
    }));
  }, []);

  // Handle map zoom
  const handleZoom = useCallback((level: number, center?: [number, number]) => {
    setInteraction(prev => ({
      ...prev,
      zoomLevel: level,
      center: center || prev.center,
    }));
    setConfig(prev => ({
      ...prev,
      zoom: level,
      center: center || prev.center,
    }));
  }, []);

  // Toggle animation
  const toggleAnimation = useCallback(() => {
    setAnimation(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  // Update animation speed
  const updateAnimationSpeed = useCallback((speed: number) => {
    setAnimation(prev => ({ ...prev, speed }));
  }, []);

  // Reset view
  const resetView = useCallback(() => {
    setInteraction({
      hoveredCountry: null,
      selectedCountry: null,
      tooltipPosition: null,
      zoomLevel: 1,
      center: [0, 0],
    });
    setConfig(prev => ({
      ...prev,
      zoom: 1,
      center: [0, 0],
    }));
  }, []);

  // Export map
  const exportMap = useCallback((format: 'png' | 'svg' = 'png') => {
    // Implementation would depend on the mapping library used
    console.log(`Exporting map as ${format}`);
  }, []);

  // Get color scale
  const getColorScale = useCallback(() => {
    return worldMapService.getColorScale(data, config.colorScheme);
  }, [data, config.colorScheme]);

  // Get country data
  const getCountryData = useCallback((countryCode: string) => {
    return data.find(d => d.countryCode === countryCode);
  }, [data]);

  return {
    // Data
    data,
    loading,
    error,
    
    // Configuration
    config,
    updateConfig: setConfig,
    
    // Interaction
    interaction,
    handleCountryHover,
    handleCountrySelect,
    handleZoom,
    resetView,
    
    // Animation
    animation,
    changeYear,
    toggleAnimation,
    updateAnimationSpeed,
    
    // Utilities
    getColorScale,
    getCountryData,
    exportMap,
    
    // Actions
    refreshData: () => loadData(animation.currentYear),
  };
};
