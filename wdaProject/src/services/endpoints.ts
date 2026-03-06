// API Endpoint Configuration
export const API_ENDPOINTS = {
  // Base endpoints
  BASE: '/api',
  VERSION: '/v1',
  
  // World Map endpoints
  WORLD_MAP: {
    GEOMETRY: '/world-map/geometry',
    DATA: '/world-map/:indicator',
    INDICATORS: '/world-map/indicators',
    COUNTRIES: '/world-map/countries/:countryCode/:indicator',
  },
  
  // Demographics endpoints
  DEMOGRAPHICS: {
    POPULATION: '/demographics/population',
    FERTILITY: '/demographics/fertility',
    AGE_STRUCTURE: '/demographics/age-structure',
    MORTALITY: '/demographics/mortality',
    MIGRATION: '/demographics/migration',
  },
  
  // Macroeconomics endpoints
  MACROECONOMICS: {
    GDP: '/macroeconomics/gdp',
    GNP: '/macroeconomics/gnp',
    PPP: '/macroeconomics/ppp',
    INFLATION: '/macroeconomics/inflation',
    TRADE: '/macroeconomics/trade',
    DEBT: '/macroeconomics/debt',
  },
  
  // Geography endpoints
  GEOGRAPHY: {
    LAND_AREA: '/geography/land-area',
    FOREST_COVERAGE: '/geography/forest-coverage',
    SEA_AREA: '/geography/sea-area',
    CLIMATE_DATA: '/geography/climate',
    TOPOGRAPHY: '/geography/topography',
  },
  
  // Tourism endpoints
  TOURISM: {
    ARRIVALS: '/tourism/arrivals',
    NATIONAL_PARKS: '/tourism/national-parks',
    WORLD_HERITAGE: '/tourism/world-heritage',
    REVENUE: '/tourism/revenue',
    EMPLOYMENT: '/tourism/employment',
  },
  
  // Country endpoints
  COUNTRIES: {
    LIST: '/countries',
    DETAILS: '/countries/:code',
    INDICATORS: '/countries/:code/indicators',
    TIME_SERIES: '/countries/:code/indicators/:indicator',
  },
  
  // Metadata endpoints
  METADATA: {
    SOURCES: '/metadata/sources',
    INDICATORS: '/metadata/indicators',
    UPDATES: '/metadata/updates',
    LAST_UPDATED: '/metadata/last-updated',
  },
} as const;

// Helper function to build endpoint URLs
export const buildEndpoint = (path: string, params?: Record<string, string | number>): string => {
  let endpoint = path;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      endpoint = endpoint.replace(`:${key}`, String(value));
    });
  }
  
  return endpoint;
};

// Export commonly used endpoint builders
export const endpoints = {
  worldMap: {
    geometry: () => API_ENDPOINTS.WORLD_MAP.GEOMETRY,
    data: (indicator: string, year?: number) => 
      buildEndpoint(API_ENDPOINTS.WORLD_MAP.DATA, { indicator }) + (year ? `?year=${year}` : ''),
    indicators: () => API_ENDPOINTS.WORLD_MAP.INDICATORS,
    countries: (countryCode: string, indicator: string) =>
      buildEndpoint(API_ENDPOINTS.WORLD_MAP.COUNTRIES, { countryCode, indicator }),
  },
  
  demographics: {
    population: (country?: string, year?: number) => {
      let endpoint = API_ENDPOINTS.DEMOGRAPHICS.POPULATION;
      const params = new URLSearchParams();
      if (country) params.append('country', country);
      if (year) params.append('year', String(year));
      return params.toString() ? `${endpoint}?${params.toString()}` : endpoint;
    },
    fertility: () => API_ENDPOINTS.DEMOGRAPHICS.FERTILITY,
    ageStructure: () => API_ENDPOINTS.DEMOGRAPHICS.AGE_STRUCTURE,
  },
  
  macroeconomics: {
    gdp: (country?: string, year?: number) => {
      let endpoint = API_ENDPOINTS.MACROECONOMICS.GDP;
      const params = new URLSearchParams();
      if (country) params.append('country', country);
      if (year) params.append('year', String(year));
      return params.toString() ? `${endpoint}?${params.toString()}` : endpoint;
    },
    inflation: () => API_ENDPOINTS.MACROECONOMICS.INFLATION,
  },
  
  countries: {
    list: () => API_ENDPOINTS.COUNTRIES.LIST,
    details: (code: string) => buildEndpoint(API_ENDPOINTS.COUNTRIES.DETAILS, { code }),
    indicators: (code: string) => buildEndpoint(API_ENDPOINTS.COUNTRIES.INDICATORS, { code }),
    timeSeries: (code: string, indicator: string) => 
      buildEndpoint(API_ENDPOINTS.COUNTRIES.TIME_SERIES, { code, indicator }),
  },
  
  metadata: {
    sources: () => API_ENDPOINTS.METADATA.SOURCES,
    indicators: () => API_ENDPOINTS.METADATA.INDICATORS,
    lastUpdated: () => API_ENDPOINTS.METADATA.LAST_UPDATED,
  },
};
