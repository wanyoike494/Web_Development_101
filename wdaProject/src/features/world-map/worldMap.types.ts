export interface CountryData {
  name: string;
  iso_a2: string;
  iso_a3: string;
  population?: number;
  gdp?: number;
  area?: number;
  region?: string;
  subregion?: string;
}

export interface MapIndicator {
  id: string;
  name: string;
  description: string;
  unit: string;
  category: 'demographic' | 'economic' | 'geographic' | 'social';
  decimals: number;
}

export interface ChoroplethData {
  country: string;
  countryCode: string;
  value: number;
  year: number;
  formattedValue?: string;
  color?: string;
}

export interface MapTooltipData {
  country: string;
  value: number;
  year: number;
  indicator: string;
  rank?: number;
  change?: number;
  changePercent?: number;
}

export interface MapLegend {
  title: string;
  colors: string[];
  labels: string[];
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface MapConfig {
  width: number;
  height: number;
  projection: 'mercator' | 'natural-earth' | 'robinson' | 'winkel-tripel';
  center: [number, number];
  zoom: number;
  colorScheme: 'blue' | 'green' | 'red' | 'purple' | 'orange';
  showGraticule: boolean;
  showBorders: boolean;
  showLabels: boolean;
}

export interface MapAnimation {
  isPlaying: boolean;
  currentYear: number;
  startYear: number;
  endYear: number;
  speed: number; // milliseconds per year
  autoReverse: boolean;
}

export interface MapInteraction {
  hoveredCountry: string | null;
  selectedCountry: string | null;
  tooltipPosition: { x: number; y: number } | null;
  zoomLevel: number;
  center: [number, number];
}

export interface MapExport {
  format: 'png' | 'svg' | 'pdf';
  width: number;
  height: number;
  quality?: number; // for PNG
  filename?: string;
}

// API Response Types
export interface WorldMapResponse {
  data: ChoroplethData[];
  metadata: {
    source: string;
    lastUpdated: string;
    totalCountries: number;
    year: number;
  };
  legend: MapLegend;
}

export interface CountryTimeSeries {
  country: string;
  countryCode: string;
  data: Array<{
    year: number;
    value: number;
  }>;
}

// Error Types
export interface MapError {
  code: string;
  message: string;
  details?: any;
}

// Event Types
export interface MapClickEvent {
  country: string;
  coordinates: [number, number];
  data: ChoroplethData;
  event: MouseEvent;
}

export interface MapHoverEvent {
  country: string | null;
  coordinates: [number, number] | null;
  data: ChoroplethData | null;
  event: MouseEvent;
}
