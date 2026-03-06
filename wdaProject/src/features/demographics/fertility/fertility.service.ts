import { apiService } from '../../../services/api';
import { endpoints } from '../../../services/endpoints';

export interface FertilityData {
  country: string;
  countryCode: string;
  year: number;
  fertilityRate: number;
  birthRate: number;
  deathRate: number;
  population: number;
  femalePopulation: number;
  age15to19: number;
  age20to24: number;
  age25to29: number;
  age30to34: number;
  age35to39: number;
  age40to44: number;
  age45to49: number;
}

export interface FertilityTrend {
  country: string;
  countryCode: string;
  data: Array<{
    year: number;
    fertilityRate: number;
    birthRate: number;
  }>;
  trend: 'increasing' | 'decreasing' | 'stable';
  averageFertilityRate: number;
  replacementLevel: boolean;
}

export interface FertilityComparison {
  countries: Array<{
    country: string;
    countryCode: string;
    fertilityRate: number;
    birthRate: number;
    rank: number;
    region: string;
    replacementLevel: boolean;
  }>;
  year: number;
  metric: 'fertilityRate' | 'birthRate';
}

export interface FertilityProjection {
  country: string;
  countryCode: string;
  projections: Array<{
    year: number;
    fertilityRate: number;
    scenario: 'low' | 'medium' | 'high';
  }>;
  methodology: string;
  assumptions: string[];
}

export interface FertilityAgeGroup {
  ageGroup: string;
  fertilityRate: number;
  birthRate: number;
  population: number;
  percentage: number;
}

class FertilityService {
  async getFertilityData(country?: string, year?: number): Promise<FertilityData[]> {
    return apiService.get<FertilityData[]>(`/demographics/fertility${country ? `?country=${country}` : ''}${year ? `&year=${year}` : ''}`);
  }

  async getFertilityTrends(countryCode: string, startYear: number, endYear: number): Promise<FertilityTrend> {
    return apiService.get<FertilityTrend>(
      `/demographics/fertility/trends/${countryCode}?startYear=${startYear}&endYear=${endYear}`
    );
  }

  async getFertilityComparison(year: number, countries?: string[]): Promise<FertilityComparison> {
    const params = new URLSearchParams();
    if (countries) {
      params.append('countries', countries.join(','));
    }
    
    return apiService.get<FertilityComparison>(
      `/demographics/fertility/comparison/${year}?${params.toString()}`
    );
  }

  async getFertilityProjections(countryCode: string, targetYear: number): Promise<FertilityProjection> {
    return apiService.get<FertilityProjection>(
      `/demographics/fertility/projections/${countryCode}?targetYear=${targetYear}`
    );
  }

  async getTopCountries(metric: 'fertilityRate' | 'birthRate', limit: number = 10): Promise<Array<{
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
      `/demographics/fertility/top?metric=${metric}&limit=${limit}`
    );
  }

  async getFertilityStats(): Promise<{
    averageFertilityRate: number;
    averageBirthRate: number;
    replacementLevelCountries: number;
    totalCountries: number;
    lowestFertility: {
      country: string;
      rate: number;
    };
    highestFertility: {
      country: string;
      rate: number;
    };
    lastUpdated: string;
  }> {
    return apiService.get('/demographics/fertility/stats');
  }

  async getFertilityByAgeGroup(countryCode: string, year: number): Promise<FertilityAgeGroup[]> {
    return apiService.get<FertilityAgeGroup[]>(
      `/demographics/fertility/age-groups/${countryCode}?year=${year}`
    );
  }

  async getReplacementLevelStatus(countryCode: string, year: number): Promise<{
    country: string;
    countryCode: string;
    year: number;
    fertilityRate: number;
    replacementLevel: number;
    isAboveReplacement: boolean;
    gap: number;
    trend: 'improving' | 'declining' | 'stable';
  }> {
    return apiService.get(
      `/demographics/fertility/replacement-level/${countryCode}?year=${year}`
    );
  }

  // Helper methods
  calculateReplacementLevelGap(fertilityRate: number, replacementLevel: number = 2.1): number {
    return fertilityRate - replacementLevel;
  }

  isAboveReplacementLevel(fertilityRate: number, replacementLevel: number = 2.1): boolean {
    return fertilityRate >= replacementLevel;
  }

  getFertilityCategory(rate: number): 'very-low' | 'low' | 'medium' | 'high' | 'very-high' {
    if (rate < 1.5) return 'very-low';
    if (rate < 2.1) return 'low';
    if (rate < 3.0) return 'medium';
    if (rate < 4.0) return 'high';
    return 'very-high';
  }

  formatFertilityRate(rate: number): string {
    return `${rate.toFixed(2)} children per woman`;
  }

  formatBirthRate(rate: number): string {
    return `${rate.toFixed(1)} births per 1,000 people`;
  }

  calculatePopulationGrowth(fertilityRate: number, deathRate: number): number {
    return fertilityRate - deathRate;
  }

  getAgeGroupContribution(ageGroups: FertilityAgeGroup[]): Array<{
    ageGroup: string;
    contribution: number;
    rate: number;
  }> {
    const totalBirths = ageGroups.reduce((sum, group) => sum + (group.birthRate * group.population), 0);
    
    return ageGroups.map(group => ({
      ageGroup: group.ageGroup,
      contribution: totalBirths > 0 ? (group.birthRate * group.population) / totalBirths * 100 : 0,
      rate: group.fertilityRate,
    }));
  }
}

export const fertilityService = new FertilityService();
export default fertilityService;
