import { useState } from 'react';

interface GNPData {
  country: string;
  countryCode: string;
  year: number;
  gnp: number;
  gnpPerCapita: number;
  netIncome: number;
}

interface GNPChartProps {
  data: GNPData[];
  title?: string;
  height?: number;
}

export const GNPChart = ({ data, title = 'GNP Analysis', height = 400 }: GNPChartProps) => {
  const [metric, setMetric] = useState<'gnp' | 'gnpPerCapita' | 'netIncome'>('gnp');
  const [year, setYear] = useState(2024);

  const filteredData = data.filter(d => d.year === year);
  const sortedData = [...filteredData].sort((a, b) => b[metric] - a[metric]).slice(0, 10);
  const maxValue = Math.max(...sortedData.map(d => d[metric]));

  const formatValue = (value: number) => {
    if (metric === 'gnp') {
      return `$${(value / 1000000000000).toFixed(2)}T`;
    } else if (metric === 'gnpPerCapita') {
      return `$${(value / 1000).toFixed(1)}K`;
    } else {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex space-x-2">
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value as 'gnp' | 'gnpPerCapita' | 'netIncome')}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value="gnp">Total GNP</option>
            <option value="gnpPerCapita">GNP Per Capita</option>
            <option value="netIncome">Net Income</option>
          </select>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            {Array.from({ length: 25 }, (_, i) => 2000 + i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4" style={{ height }}>
        <div className="space-y-3">
          {sortedData.map((country) => (
            <div key={country.country} className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {country.country}
                  </span>
                  <span className="text-sm text-gray-600">
                    {formatValue(country[metric])}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(country[metric] / maxValue) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
