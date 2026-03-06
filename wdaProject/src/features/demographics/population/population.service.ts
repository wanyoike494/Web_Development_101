import { apiService } from '../../../services/api';
import { endpoints } from '../../../services/endpoints';

export interface PopulationData {
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
}

export interface PopulationTrend {
  country: string;
  countryCode: string;
  data: Array<{
    year: number;
    population: number;
    growthRate: number;
  }>;
}

export interface PopulationComparison {
  countries: Array<{
    country: string;
    countryCode: string;
    population: number;
    growthRate: number;
    rank: number;
  }>;
  year: number;
}

export interface PopulationProjection {
  country: string;
  countryCode: string;
  projections: Array<{
    year: number;
    population: number;
    scenario: 'low' | 'medium' | 'high';
  }>;
}

class PopulationService {
  async getPopulationData(country?: string, year?: number): Promise<PopulationData[]> {
    return apiService.get<PopulationData[]>(endpoints.demographics.population(country, year));
  }

  async getPopulationTrends(countryCode: string, startYear: number, endYear: number): Promise<PopulationTrend> {
    return apiService.get<PopulationTrend>(
      `/demographics/population/trends/${countryCode}?startYear=${startYear}&endYear=${endYear}`
    );
  }

  async getPopulationComparison(year: number, countries?: string[]): Promise<PopulationComparison> {
    const params = new URLSearchParams();
    if (countries) {
      params.append('countries', countries.join(','));
    }
    
    return apiService.get<PopulationComparison>(
      `/demographics/population/comparison/${year}?${params.toString()}`
    );
  }

  async getPopulationProjections(countryCode: string, targetYear: number): Promise<PopulationProjection> {
    return apiService.get<PopulationProjection>(
      `/demographics/population/projections/${countryCode}?targetYear=${targetYear}`
    );
  }

  async getTopCountries(metric: 'population' | 'growthRate' | 'fertilityRate', limit: number = 10): Promise<Array<{
    country: string;
    countryCode: string;
    value: number;
    rank: number;
  }>> {
    return apiService.get<Array<{
      country: string;
      countryCode: string;
      value: number;
      rank: number;
    }>>(
      `/demographics/population/top?metric=${metric}&limit=${limit}`
    );
  }

  async getPopulationStats(): Promise<{
    totalPopulation: number;
    averageGrowthRate: number;
    averageFertilityRate: number;
    averageLifeExpectancy: number;
    urbanizationRate: number;
    lastUpdated: string;
  }> {
    return apiService.get('/demographics/population/stats');
  }

  async getPopulationByAgeGroup(countryCode: string, year: number): Promise<Array<{
    ageGroup: string;
    population: number;
    percentage: number;
  }>> {
    return apiService.get<Array<{
      ageGroup: string;
      population: number;
      percentage: number;
    }>>(
      `/demographics/population/age-groups/${countryCode}?year=${year}`
    );
  }

  async getPopulationDensity(countryCode: string, year: number): Promise<{
    country: string;
    countryCode: string;
    year: number;
    population: number;
    area: number;
    density: number;
    rank: number;
  }> {
    return apiService.get(
      `/demographics/population/density/${countryCode}?year=${year}`
    );
  }

  // Helper methods for data processing
  calculateGrowthRate(current: number, previous: number): number {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  }

  calculateDoublingTime(growthRate: number): number | null {
    if (growthRate <= 0) return null;
    return 70 / growthRate; // Rule of 70
  }

  formatPopulation(population: number): string {
    if (population >= 1000000000) {
      return `${(population / 1000000000).toFixed(2)}B`;
    } else if (population >= 1000000) {
      return `${(population / 1000000).toFixed(2)}M`;
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(1)}K`;
    }
    return population.toString();
  }

  getPopulationScale(population: number): 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'massive' {
    if (population < 100000) return 'tiny';
    if (population < 1000000) return 'small';
    if (population < 10000000) return 'medium';
    if (population < 100000000) return 'large';
    if (population < 1000000000) return 'huge';
    return 'massive';
  }
}

export const populationService = new PopulationService();
export default populationService;
