import { useState } from 'react';

interface PopulationData {
  year: number;
  population: number;
  growthRate: number;
}

interface PopulationLineChartProps {
  data: PopulationData[];
  title?: string;
  height?: number;
}

export const PopulationLineChart = ({ data, title = 'Population Over Time', height = 400 }: PopulationLineChartProps) => {
  const [selectedMetric, setSelectedMetric] = useState<'population' | 'growthRate'>('population');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedMetric('population')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              selectedMetric === 'population'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Population
          </button>
          <button
            onClick={() => setSelectedMetric('growthRate')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              selectedMetric === 'growthRate'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Growth Rate
          </button>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg" style={{ height }}>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-gray-600">
              {selectedMetric === 'population' ? 'Population line chart' : 'Growth rate line chart'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Showing {data.length} data points from {data[0]?.year} to {data[data.length - 1]?.year}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Statistics */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="bg-white p-3 rounded border border-gray-200">
          <div className="text-gray-500">Start Value</div>
          <div className="font-semibold text-gray-900">
            {selectedMetric === 'population' 
              ? data[0]?.population?.toLocaleString() 
              : `${data[0]?.growthRate?.toFixed(2)}%`
            }
          </div>
        </div>
        <div className="bg-white p-3 rounded border border-gray-200">
          <div className="text-gray-500">End Value</div>
          <div className="font-semibold text-gray-900">
            {selectedMetric === 'population' 
              ? data[data.length - 1]?.population?.toLocaleString() 
              : `${data[data.length - 1]?.growthRate?.toFixed(2)}%`
            }
          </div>
        </div>
        <div className="bg-white p-3 rounded border border-gray-200">
          <div className="text-gray-500">Total Change</div>
          <div className="font-semibold text-gray-900">
            {selectedMetric === 'population' 
              ? `${((data[data.length - 1]?.population! - data[0]?.population!) / data[0]?.population! * 100).toFixed(1)}%`
              : `${(data[data.length - 1]?.growthRate! - data[0]?.growthRate!).toFixed(2)}pp`
            }
          </div>
        </div>
      </div>
    </div>
  );
};
