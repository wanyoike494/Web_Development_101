import { useState } from 'react';

interface AgeGroup {
  ageGroup: string;
  male: number;
  female: number;
  total: number;
  malePercentage: number;
  femalePercentage: number;
}

interface AgePyramidProps {
  data: AgeGroup[];
  title?: string;
  height?: number;
}

export const AgePyramid = ({ data, title = 'Population Age Structure', height = 400 }: AgePyramidProps) => {
  const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all');
  const [showPercentages, setShowPercentages] = useState(false);

  const maxValue = Math.max(
    ...data.map(d => Math.max(d.male, d.female))
  );

  const getBarWidth = (value: number) => {
    return showPercentages ? (value / 100) * 50 : (value / maxValue) * 50;
  };

  const getDisplayValue = (value: number, total: number) => {
    if (showPercentages) {
      return `${((value / total) * 100).toFixed(1)}%`;
    }
    return value.toLocaleString();
  };

  const totalPopulation = data.reduce((sum, d) => sum + d.total, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex space-x-2">
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value as 'all' | 'male' | 'female')}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">All Genders</option>
            <option value="male">Male Only</option>
            <option value="female">Female Only</option>
          </select>
          <button
            onClick={() => setShowPercentages(!showPercentages)}
            className={`px-3 py-1 border rounded-md text-sm ${
              showPercentages 
                ? 'bg-blue-100 border-blue-300 text-blue-700' 
                : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            {showPercentages ? '%' : 'Count'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6" style={{ height }}>
        <div className="relative h-full">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-400 transform -translate-x-1/2"></div>
          
          {/* Age pyramid bars */}
          <div className="space-y-1 h-full">
            {data.map((group, index) => {
              const maleWidth = getBarWidth(group.male);
              const femaleWidth = getBarWidth(group.female);
              
              return (
                <div key={group.ageGroup} className="flex items-center h-8">
                  {/* Male bars (left side) */}
                  {(selectedGender === 'all' || selectedGender === 'male') && (
                    <div className="flex items-center justify-end flex-1 pr-2">
                      <div
                        className="bg-blue-500 h-6 rounded-r transition-all duration-300"
                        style={{ width: `${maleWidth}%` }}
                        title={`Male: ${getDisplayValue(group.male, totalPopulation)}`}
                      />
                    </div>
                  )}
                  
                  {/* Age group label */}
                  <div className="w-20 text-center text-sm font-medium text-gray-700">
                    {group.ageGroup}
                  </div>
                  
                  {/* Female bars (right side) */}
                  {(selectedGender === 'all' || selectedGender === 'female') && (
                    <div className="flex items-center flex-1 pl-2">
                      <div
                        className="bg-pink-500 h-6 rounded-l transition-all duration-300"
                        style={{ width: `${femaleWidth}%` }}
                        title={`Female: ${getDisplayValue(group.female, totalPopulation)}`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="absolute top-2 right-2 flex space-x-4 text-xs">
            {(selectedGender === 'all' || selectedGender === 'male') && (
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Male</span>
              </div>
            )}
            {(selectedGender === 'all' || selectedGender === 'female') && (
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-pink-500 rounded"></div>
                <span>Female</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 text-sm">
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-gray-500">Total Population</div>
          <div className="font-semibold text-gray-900">
            {totalPopulation.toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-gray-500">Male Population</div>
          <div className="font-semibold text-blue-600">
            {data.reduce((sum, d) => sum + d.male, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-gray-500">Female Population</div>
          <div className="font-semibold text-pink-600">
            {data.reduce((sum, d) => sum + d.female, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-gray-500">Sex Ratio</div>
          <div className="font-semibold text-gray-900">
            {((data.reduce((sum, d) => sum + d.male, 0) / data.reduce((sum, d) => sum + d.female, 0)) * 100).toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};
