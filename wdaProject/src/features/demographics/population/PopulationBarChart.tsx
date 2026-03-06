import { useState } from 'react';

interface CountryPopulation {
  country: string;
  population: number;
  percentage: number;
  rank: number;
}

interface PopulationBarChartProps {
  data: CountryPopulation[];
  title?: string;
  height?: number;
  maxItems?: number;
}

export const PopulationBarChart = ({ 
  data, 
  title = 'Population by Country', 
  height = 400,
  maxItems = 10 
}: PopulationBarChartProps) => {
  const [sortBy, setSortBy] = useState<'population' | 'alphabetical'>('population');
  const [showAll, setShowAll] = useState(false);

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'population') {
      return b.population - a.population;
    } else {
      return a.country.localeCompare(b.country);
    }
  });

  const displayData = showAll ? sortedData : sortedData.slice(0, maxItems);
  const maxPopulation = Math.max(...displayData.map(d => d.population));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setSortBy('population')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              sortBy === 'population'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            By Population
          </button>
          <button
            onClick={() => setSortBy('alphabetical')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              sortBy === 'alphabetical'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            A-Z
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4" style={{ height }}>
        <div className="h-full overflow-y-auto">
          {displayData.map((country, index) => (
            <div key={country.country} className="flex items-center space-x-4 mb-3">
              <div className="w-8 text-right text-sm font-medium text-gray-500">
                {country.rank}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {country.country}
                  </span>
                  <span className="text-sm text-gray-600">
                    {country.population.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(country.population / maxPopulation) * 100}%` }}
                  />
                </div>
              </div>
              <div className="w-16 text-right text-sm text-gray-500">
                {country.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {data.length > maxItems && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            {showAll ? `Show Top ${maxItems}` : `Show All ${data.length} Countries`}
          </button>
        </div>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-4 gap-4 text-sm">
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-gray-500">Countries Shown</div>
          <div className="font-semibold text-gray-900">{displayData.length}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-gray-500">Total Population</div>
          <div className="font-semibold text-gray-900">
            {displayData.reduce((sum, d) => sum + d.population, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-gray-500">Average</div>
          <div className="font-semibold text-gray-900">
            {Math.round(displayData.reduce((sum, d) => sum + d.population, 0) / displayData.length).toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-gray-500">Largest</div>
          <div className="font-semibold text-gray-900">
            {displayData[0]?.country}
          </div>
        </div>
      </div>
    </div>
  );
};
