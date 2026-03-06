// Global type declarations

declare global {
  interface Window {
    // Add any global window properties here
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Environment variables
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_MAPBOX_TOKEN: string;
  readonly VITE_CHART_API_KEY: string;
  readonly VITE_ML_MODEL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Chart data types
export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
}

export interface ChartDataset {
  label: string;
  data: ChartDataPoint[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select' | 'date' | 'textarea';
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// Export types for common usage
export type { PopulationRecord, PopulationTrend, PopulationProjection } from './population.types';
export type { GDPRecord, GDPTrend, GDPForecast } from './gdp.types';
