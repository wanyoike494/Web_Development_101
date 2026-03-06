export interface Country {
  code: string;           // ISO 3166-1 alpha-2 code
  code3: string;         // ISO 3166-1 alpha-3 code
  name: string;
  officialName: string;
  sovereignty: string;
  capital: string;
  region: string;
  subregion: string;
  continent: string;
  area: number;           // Square kilometers
  population: number;
  populationDensity: number; // People per square km
  coastline: number;        // Kilometers
  landlocked: boolean;
  independence: string;     // Year of independence
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  languages: Array<{
    code: string;
    name: string;
    official: boolean;
  }>;
  timezones: string[];
  callingCode: string;
  tld: string;             // Top-level domain
  coordinates: {
    latitude: number;
    longitude: number;
  };
  borders: string[];       // Array of country codes
}

export interface CountrySummary {
  code: string;
  name: string;
  region: string;
  population: number;
  gdp?: number;
  area: number;
  capital: string;
}

export interface CountryDetails extends Country {
  // Economic indicators
  gdp: {
    nominal: number;
    ppp: number;
    perCapita: number;
    growthRate: number;
  };
  
  // Demographic indicators
  demographics: {
    birthRate: number;
    deathRate: number;
    fertilityRate: number;
    lifeExpectancy: number;
    medianAge: number;
    urbanPopulation: number;
    ruralPopulation: number;
  };
  
  // Geographic indicators
  geography: {
    forestCoverage: number;
    agriculturalLand: number;
    waterArea: number;
    elevation: {
      min: number;
      max: number;
      average: number;
    };
    climate: {
      type: string;
      averageTemp: number;
      annualRainfall: number;
    };
  };
  
  // Tourism indicators
  tourism: {
    arrivals: number;
    revenue: number;
    worldHeritageSites: number;
    nationalParks: number;
  };
}

export interface CountryTimeSeriesData {
  country: string;
  countryCode: string;
  indicator: string;
  unit: string;
  data: Array<{
    year: number;
    value: number;
    estimated?: boolean;
  }>;
}

export interface CountryComparison {
  countries: CountrySummary[];
  indicator: string;
  year?: number;
  unit: string;
}

// Regional groupings
export interface Region {
  name: string;
  code: string;
  countries: string[];
  area: number;
  population: number;
  gdp?: number;
}

export const REGIONS = {
  AFRICA: 'Africa',
  ASIA: 'Asia',
  EUROPE: 'Europe',
  NORTH_AMERICA: 'North America',
  SOUTH_AMERICA: 'South America',
  OCEANIA: 'Oceania',
  ANTARCTICA: 'Antarctica',
} as const;

export const SUBREGIONS = {
  // Africa
  NORTHERN_AFRICA: 'Northern Africa',
  WESTERN_AFRICA: 'Western Africa',
  EASTERN_AFRICA: 'Eastern Africa',
  CENTRAL_AFRICA: 'Central Africa',
  SOUTHERN_AFRICA: 'Southern Africa',
  
  // Asia
  CENTRAL_ASIA: 'Central Asia',
  EASTERN_ASIA: 'Eastern Asia',
  SOUTHEASTERN_ASIA: 'Southeastern Asia',
  SOUTHERN_ASIA: 'Southern Asia',
  WESTERN_ASIA: 'Western Asia',
  
  // Europe
  NORTHERN_EUROPE: 'Northern Europe',
  WESTERN_EUROPE: 'Western Europe',
  EASTERN_EUROPE: 'Eastern Europe',
  SOUTHERN_EUROPE: 'Southern Europe',
  
  // Americas
  NORTHERN_AMERICA: 'Northern America',
  CENTRAL_AMERICA: 'Central America',
  CARIBBEAN: 'Caribbean',
  SOUTH_AMERICA: 'South America',
  
  // Oceania
  AUSTRALIA_NEW_ZEALAND: 'Australia and New Zealand',
  MELANESIA: 'Melanesia',
  MICRONESIA: 'Micronesia',
  POLYNESIA: 'Polynesia',
} as const;
