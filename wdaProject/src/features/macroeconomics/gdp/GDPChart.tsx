import { useState } from 'react';

interface GDPData {
  country: string;
  countryCode: string;
  year: number;
  gdp: number;
  gdpPerCapita: number;
  growthRate: number;
}

interface GDPChartProps {
  data: GDPData[];
  title?: string;
  height?: number;
}

export const GDPChart = ({ data, title = 'GDP Analysis', height = 400 }: GDPChartProps) => {
  const [metric, setMetric] = useState<'gdp' | 'gdpPerCapita' | 'growthRate'>('gdp');
  const [year, setYear] = useState(2024);

  const filteredData = data.filter(d => d.year === year);
  const sortedData = [...filteredData].sort((a, b) => b[metric] - a[metric]).slice(0, 10);
  const maxValue = Math.max(...sortedData.map(d => d[metric]));

  const formatValue = (value: number) => {
    if (metric === 'gdp') {
      return `$${(value / 1000000000000).toFixed(2)}T`;
    } else if (metric === 'gdpPerCapita') {
      return `$${(value / 1000).toFixed(1)}K`;
    } else {
      return `${value.toFixed(2)}%`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex space-x-2">
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value as 'gdp' | 'gdpPerCapita' | 'growthRate')}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value="gdp">Total GDP</option>
            <option value="gdpPerCapita">GDP Per Capita</option>
            <option value="growthRate">Growth Rate</option>
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
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(country[metric] / maxValue) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-gray-500">Average</div>
          <div className="font-semibold text-gray-900">
            {formatValue(sortedData.reduce((sum, d) => sum + d[metric], 0) / sortedData.length)}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-gray-500">Highest</div>
          <div className="font-semibold text-gray-900">
            {sortedData[0]?.country}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-gray-500">Total Countries</div>
          <div className="font-semibold text-gray-900">
            {sortedData.length}
          </div>
        </div>
      </div>
    </div>
  );
};
