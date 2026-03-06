import { apiService } from '../../../services/api';

export interface GDPData {
  country: string;
  countryCode: string;
  year: number;
  gdp: number;
  gdpPerCapita: number;
  growthRate: number;
  sector: {
    agriculture: number;
    industry: number;
    services: number;
  };
}

class GDPService {
  async getGDPData(country?: string, year?: number): Promise<GDPData[]> {
    return apiService.get<GDPData[]>(`/macroeconomics/gdp${country ? `?country=${country}` : ''}${year ? `&year=${year}` : ''}`);
  }

  async getGDPTrends(countryCode: string, startYear: number, endYear: number): Promise<any> {
    return apiService.get(`/macroeconomics/gdp/trends/${countryCode}?startYear=${startYear}&endYear=${endYear}`);
  }

  async getGDPComparison(year: number): Promise<any> {
    return apiService.get(`/macroeconomics/gdp/comparison/${year}`);
  }

  async getTopGDPs(limit: number = 10): Promise<any> {
    return apiService.get(`/macroeconomics/gdp/top?limit=${limit}`);
  }
}

export const gdpService = new GDPService();
