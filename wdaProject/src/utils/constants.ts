// API Constants
export const API_ENDPOINTS = {
  POPULATION: '/population',
  GDP: '/gdp',
  FINANCE: '/finance',
  CALCULATORS: '/calculators',
  ML_PREDICTIONS: '/ml-predictions',
} as const;

// Chart Constants
export const CHART_COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#10B981',
  SUCCESS: '#059669',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#6366F1',
  GRAY: '#6B7280',
  LIGHT_GRAY: '#F3F4F6',
} as const;

export const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  DOUGHNUT: 'doughnut',
  AREA: 'area',
  SCATTER: 'scatter',
} as const;

// Data Constants
export const DEFAULT_YEAR = new Date().getFullYear();
export const MIN_YEAR = 1950;
export const MAX_YEAR = 2050;
export const YEARS_RANGE = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MIN_YEAR + i);

// Country/Region Constants
export const REGIONS = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
  'Antarctica',
] as const;

export const TOP_COUNTRIES = [
  'China',
  'India',
  'United States',
  'Indonesia',
  'Pakistan',
  'Brazil',
  'Nigeria',
  'Bangladesh',
  'Russia',
  'Mexico',
] as const;

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 5,
} as const;

// Validation Constants
export const VALIDATION = {
  MIN_POPULATION: 0,
  MAX_POPULATION: 10000000000,
  MIN_GDP: 0,
  MAX_GDP: 100000000000000,
  MIN_GROWTH_RATE: -100,
  MAX_GROWTH_RATE: 100,
} as const;

// Date Constants
export const DATE_FORMATS = {
  SHORT: 'MM/dd/yyyy',
  MEDIUM: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  ISO: 'yyyy-MM-dd',
} as const;

// Storage Constants
export const STORAGE_KEYS = {
  THEME: 'wda-theme',
  LANGUAGE: 'wda-language',
  COUNTRY_PREFERENCES: 'wda-country-prefs',
  CHART_PREFERENCES: 'wda-chart-prefs',
  USER_SETTINGS: 'wda-user-settings',
} as const;

// Animation Constants
export const ANIMATION = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
  },
} as const;

// Breakpoint Constants
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  DATA_NOT_FOUND: 'Data not found.',
  INVALID_INPUT: 'Invalid input provided.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Unauthorized access.',
  FORBIDDEN: 'Access forbidden.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  DATA_LOADED: 'Data loaded successfully.',
  DATA_SAVED: 'Data saved successfully.',
  DATA_DELETED: 'Data deleted successfully.',
  CALCULATION_COMPLETE: 'Calculation completed successfully.',
} as const;
