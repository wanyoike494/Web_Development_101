export interface PopulationRecord {
  id: string;
  country: string;
  countryCode: string;
  year: number;
  population: number;
  malePopulation: number;
  femalePopulation: number;
  growthRate: number;
  birthRate: number;
  deathRate: number;
  migrationRate: number;
  urbanPopulation: number;
  ruralPopulation: number;
  populationDensity: number;
  medianAge: number;
  lifeExpectancy: number;
  fertilityRate: number;
}

export interface PopulationTrend {
  country: string;
  data: PopulationRecord[];
  trend: 'increasing' | 'decreasing' | 'stable';
  averageGrowthRate: number;
  projectedPopulation: number;
}

export interface PopulationComparison {
  countries: string[];
  years: number[];
  data: Array<{
    country: string;
    year: number;
    population: number;
    growthRate: number;
  }>;
}

export interface PopulationProjection {
  country: string;
  baseYear: number;
  targetYear: number;
  projectedPopulation: number;
  confidence: 'high' | 'medium' | 'low';
  methodology: string;
  assumptions: string[];
  scenarios: Array<{
    name: string;
    population: number;
    description: string;
  }>;
}

export interface PopulationMetrics {
  totalPopulation: number;
  growthRate: number;
  birthRate: number;
  deathRate: number;
  netMigrationRate: number;
  urbanizationRate: number;
  medianAge: number;
  lifeExpectancy: number;
  fertilityRate: number;
  year: number;
}

export interface PopulationFilters {
  countries?: string[];
  regions?: string[];
  startYear?: number;
  endYear?: number;
  minPopulation?: number;
  maxPopulation?: number;
  growthRateRange?: {
    min: number;
    max: number;
  };
}
