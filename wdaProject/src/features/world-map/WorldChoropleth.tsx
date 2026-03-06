import { useState } from 'react';

export const WorldChoropleth = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">World Population Map</h3>
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from({ length: 25 }, (_, i) => 2000 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center relative">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-gray-600 mb-2">Interactive World Choropleth Map</p>
          <p className="text-sm text-gray-500">Population data for {selectedYear}</p>
          {hoveredCountry && (
            <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
              <p className="font-semibold text-gray-900">{hoveredCountry}</p>
              <p className="text-sm text-gray-600">Population: Loading...</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-200 rounded"></div>
            <span>Low (&lt;10M)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Medium (10M-100M)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-800 rounded"></div>
            <span>High (&gt;100M)</span>
          </div>
        </div>
        <p>Click on countries for detailed information</p>
      </div>
    </div>
  );
};
