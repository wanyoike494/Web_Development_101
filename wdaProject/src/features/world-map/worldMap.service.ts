import { apiService } from '../../services/api';

export interface WorldMapData {
  country: string;
  countryCode: string;
  value: number;
  year: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface MapGeometry {
  type: 'FeatureCollection';
  features: Array<{
    type: 'Feature';
    properties: {
      name: string;
      iso_a2: string;
      iso_a3: string;
    };
    geometry: {
      type: 'Polygon' | 'MultiPolygon';
      coordinates: number[][][] | number[][][][];
    };
  }>;
}

class WorldMapService {
  async getWorldMapData(indicator: string, year: number): Promise<WorldMapData[]> {
    return apiService.get<WorldMapData[]>(`/world-map/${indicator}?year=${year}`);
  }

  async getCountryGeometry(): Promise<MapGeometry> {
    // In a real app, this would load from a GeoJSON file
    return apiService.get<MapGeometry>('/world-map/geometry');
  }

  async getPopulationByYear(year: number): Promise<WorldMapData[]> {
    return this.getWorldMapData('population', year);
  }

  async getGDPByYear(year: number): Promise<WorldMapData[]> {
    return this.getWorldMapData('gdp', year);
  }

  async getAvailableIndicators(): Promise<Array<{
    id: string;
    name: string;
    description: string;
    unit: string;
  }>> {
    return apiService.get('/world-map/indicators');
  }

  async getCountryData(countryCode: string, indicator: string): Promise<Array<{
    year: number;
    value: number;
  }>> {
    return apiService.get(`/world-map/countries/${countryCode}/${indicator}`);
  }

  // Helper method to get color scale for choropleth
  getColorScale(data: WorldMapData[], colorScheme: 'blue' | 'green' | 'red' | 'purple' = 'blue'): {
    min: number;
    max: number;
    scale: (value: number) => string;
  } {
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);

    const colorSchemes = {
      blue: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'],
      green: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'],
      red: ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'],
      purple: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7c3aed', '#6d28d9', '#5b21b6'],
    };

    const colors = colorSchemes[colorScheme];

    return {
      min,
      max,
      scale: (value: number) => {
        if (value <= min) return colors[0];
        if (value >= max) return colors[colors.length - 1];
        
        const index = Math.floor(((value - min) / (max - min)) * (colors.length - 1));
        return colors[Math.min(index, colors.length - 1)];
      },
    };
  }

  // Helper method to format tooltip content
  formatTooltip(data: WorldMapData, indicator: string): string {
    const units = {
      population: 'people',
      gdp: 'USD',
      gdp_per_capita: 'USD per person',
      fertility_rate: 'children per woman',
      life_expectancy: 'years',
    };

    const unit = units[indicator as keyof typeof units] || '';
    
    return `
      <div class="font-semibold">${data.country}</div>
      <div>${indicator}: ${data.value.toLocaleString()} ${unit}</div>
      <div class="text-xs text-gray-500">Year: ${data.year}</div>
    `;
  }
}

export const worldMapService = new WorldMapService();
export default worldMapService;
