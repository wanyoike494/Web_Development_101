export interface GDPRecord {
  id: string;
  country: string;
  countryCode: string;
  year: number;
  gdp: number;
  gdpPerCapita: number;
  gdpGrowthRate: number;
  gdpNominal: number;
  gdpPPP: number;
  inflationRate: number;
  unemploymentRate: number;
  sectors: {
    agriculture: {
      value: number;
      percentage: number;
      growthRate: number;
    };
    industry: {
      value: number;
      percentage: number;
      growthRate: number;
    };
    services: {
      value: number;
      percentage: number;
      growthRate: number;
    };
  };
  trade: {
    exports: number;
    imports: number;
    tradeBalance: number;
  };
  governmentDebt: number;
  fiscalDeficit: number;
}

export interface GDPTrend {
  country: string;
  data: GDPRecord[];
  trend: 'growing' | 'declining' | 'stable';
  averageGrowthRate: number;
  volatility: number;
  projectedGDP: number;
}

export interface GDPComparison {
  countries: string[];
  years: number[];
  data: Array<{
    country: string;
    year: number;
    gdp: number;
    gdpPerCapita: number;
    growthRate: number;
  }>;
}

export interface GDPForecast {
  country: string;
  baseYear: number;
  targetYear: number;
  forecastedGDP: number;
  confidence: 'high' | 'medium' | 'low';
  methodology: string;
  assumptions: string[];
  scenarios: Array<{
    name: string;
    gdp: number;
    description: string;
  }>;
}

export interface GDPMetrics {
  totalGDP: number;
  averageGrowthRate: number;
  averageGDPPerCapita: number;
  inflationRate: number;
  unemploymentRate: number;
  debtToGDPRatio: number;
  year: number;
}

export interface GDPFilters {
  countries?: string[];
  regions?: string[];
  startYear?: number;
  endYear?: number;
  minGDP?: number;
  maxGDP?: number;
  growthRateRange?: {
    min: number;
    max: number;
  };
  sectors?: Array<'agriculture' | 'industry' | 'services'>;
}

export interface EconomicIndicator {
  name: string;
  value: number;
  unit: string;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}
