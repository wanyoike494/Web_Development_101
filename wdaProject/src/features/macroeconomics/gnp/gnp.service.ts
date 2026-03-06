import { apiService } from '../../../services/api';

export interface GNPData {
  country: string;
  countryCode: string;
  year: number;
  gnp: number;
  gnpPerCapita: number;
  netIncome: number;
}

class GNPService {
  async getGNPData(country?: string, year?: number): Promise<GNPData[]> {
    return apiService.get<GNPData[]>(`/macroeconomics/gnp${country ? `?country=${country}` : ''}${year ? `&year=${year}` : ''}`);
  }
}

export const gnpService = new GNPService();
