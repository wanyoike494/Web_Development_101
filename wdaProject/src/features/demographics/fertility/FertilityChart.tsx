import { useState } from 'react';

interface FertilityData {
  country: string;
  countryCode: string;
  year: number;
  fertilityRate: number;
  birthRate: number;
  population: number;
}

interface FertilityChartProps {
  data: FertilityData[];
  title?: string;
  height?: number;
}

export const FertilityChart = ({ data, title = 'Fertility Rate Analysis', height = 400 }: FertilityChartProps) => {
  const [selectedMetric, setSelectedMetric] = useState<'fertilityRate' | 'birthRate'>('fertilityRate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[selectedMetric];
    const bValue = b[selectedMetric];
    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
  });

  const displayData = sortedData.slice(0, 10);
  const maxValue = Math.max(...displayData.map(d => d[selectedMetric]));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex space-x-2">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as 'fertilityRate' | 'birthRate')}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value="fertilityRate">Fertility Rate</option>
            <option value="birthRate">Birth Rate</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            {sortOrder === 'desc' ? '↓ High to Low' : '↑ Low to High'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4" style={{ height }}>
        <div className="space-y-3">
          {displayData.map((country, index) => (
            <div key={country.country} className="flex items-center space-x-4">
              <div className="w-8 text-right text-sm font-medium text-gray-500">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {country.country}
                  </span>
                  <span className="text-sm text-gray-600">
                    {selectedMetric === 'fertilityRate' 
                      ? `${country.fertilityRate.toFixed(2)} children/woman`
                      : `${country.birthRate.toFixed(1)} births/1000 people`
                    }
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(country[selectedMetric] / maxValue) * 100}%` }}
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
            {(displayData.reduce((sum, d) => sum + d[selectedMetric], 0) / displayData.length).toFixed(2)}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-gray-500">Highest</div>
          <div className="font-semibold text-gray-900">
            {displayData[0]?.country}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-gray-500">Lowest</div>
          <div className="font-semibold text-gray-900">
            {displayData[displayData.length - 1]?.country}
          </div>
        </div>
      </div>
    </div>
  );
};
