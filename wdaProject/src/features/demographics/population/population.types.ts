export interface PopulationRecord {
  country: string;
  countryCode: string;
  year: number;
  population: number;
  growthRate: number;
  birthRate: number;
  deathRate: number;
  fertilityRate: number;
  lifeExpectancy: number;
  urbanPopulation: number;
  ruralPopulation: number;
  medianAge: number;
  dependencyRatio: number;
}

export interface PopulationTrend {
  country: string;
  countryCode: string;
  data: Array<{
    year: number;
    population: number;
    growthRate: number;
    birthRate?: number;
    deathRate?: number;
  }>;
  trend: 'increasing' | 'decreasing' | 'stable';
  averageGrowthRate: number;
  projectedPopulation?: number;
}

export interface PopulationComparison {
  countries: Array<{
    country: string;
    countryCode: string;
    population: number;
    growthRate: number;
    fertilityRate: number;
    lifeExpectancy: number;
    rank: number;
    region: string;
  }>;
  year: number;
  metric: 'population' | 'growthRate' | 'fertilityRate' | 'lifeExpectancy';
}

export interface PopulationProjection {
  country: string;
  countryCode: string;
  projections: Array<{
    year: number;
    population: number;
    scenario: 'low' | 'medium' | 'high';
    confidenceInterval?: {
      lower: number;
      upper: number;
    };
  }>;
  methodology: string;
  assumptions: string[];
}

export interface PopulationMetrics {
  totalPopulation: number;
  averageGrowthRate: number;
  averageFertilityRate: number;
  averageLifeExpectancy: number;
  urbanizationRate: number;
  medianAge: number;
  dependencyRatio: number;
  lastUpdated: string;
  source: string;
}

export interface PopulationFilters {
  countries?: string[];
  regions?: string[];
  yearRange?: {
    start: number;
    end: number;
  };
  populationRange?: {
    min: number;
    max: number;
  };
  growthRateRange?: {
    min: number;
    max: number;
  };
}

export interface PopulationAgeGroup {
  ageGroup: string;
  minAge: number;
  maxAge: number;
  population: number;
  percentage: number;
  male: number;
  female: number;
}

export interface PopulationDensity {
  country: string;
  countryCode: string;
  year: number;
  population: number;
  area: number; // Square kilometers
  density: number; // People per square km
  rank: number;
  category: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
}

export interface PopulationPyramid {
  country: string;
  countryCode: string;
  year: number;
  ageGroups: Array<{
    ageGroup: string;
    male: number;
    female: number;
    total: number;
    malePercentage: number;
    femalePercentage: number;
  }>;
  totalPopulation: number;
  malePopulation: number;
  femalePopulation: number;
  sexRatio: number; // Males per 100 females
}

export interface PopulationMigration {
  country: string;
  countryCode: string;
  year: number;
  netMigration: number;
  immigration: number;
  emigration: number;
  migrationRate: number; // Per 1000 population
  topOriginCountries?: Array<{
    country: string;
    count: number;
  }>;
  topDestinationCountries?: Array<{
    country: string;
    count: number;
  }>;
}

export interface PopulationUrbanization {
  country: string;
  countryCode: string;
  year: number;
  urbanPopulation: number;
  ruralPopulation: number;
  totalPopulation: number;
  urbanizationRate: number;
  urbanGrowthRate: number;
  ruralGrowthRate: number;
  projectedUrbanization?: Array<{
    year: number;
    urbanizationRate: number;
  }>;
}

// Query and response types
export interface PopulationQuery {
  countries?: string[];
  year?: number;
  startYear?: number;
  endYear?: number;
  metrics?: string[];
  format?: 'json' | 'csv' | 'xml';
}

export interface PopulationResponse<T = any> {
  success: boolean;
  data: T;
  metadata: {
    source: string;
    lastUpdated: string;
    totalRecords: number;
    pageNumber?: number;
    pageSize?: number;
  };
  errors?: string[];
}

// Chart data types
export interface PopulationChartData {
  labels: Array<string | number>;
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }>;
}

export interface PopulationMapData {
  country: string;
  countryCode: string;
  value: number;
  year: number;
  color?: string;
  metadata?: {
    rank: number;
    change: number;
    changePercent: number;
  };
}

// Form and validation types
export interface PopulationFormData {
  country: string;
  year: number;
  population: number;
  growthRate: number;
  birthRate: number;
  deathRate: number;
  fertilityRate: number;
  lifeExpectancy: number;
}

export interface PopulationFormError {
  field: keyof PopulationFormData;
  message: string;
  code: string;
}

// Export and import types
export interface PopulationExportConfig {
  format: 'csv' | 'json' | 'xlsx' | 'pdf';
  countries?: string[];
  yearRange?: {
    start: number;
    end: number;
  };
  metrics?: string[];
  includeProjections?: boolean;
}

export interface PopulationImportResult {
  totalRecords: number;
  successful: number;
  failed: number;
  errors: Array<{
    row: number;
    field: string;
    message: string;
  }>;
}
