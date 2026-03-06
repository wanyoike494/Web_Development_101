export const Geography = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Geography</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Explore geographic data including land area, climate patterns, forest coverage, 
          and natural features across the globe.
        </p>
      </div>

      {/* Key Geographic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Land Area</h3>
          <div className="text-2xl font-bold text-green-600">148.9M km²</div>
          <p className="text-sm text-gray-600 mt-2">29.2% of Earth's surface</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Forest Coverage</h3>
          <div className="text-2xl font-bold text-green-600">31.2%</div>
          <p className="text-sm text-red-600 mt-2">-3.1% since 1990</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Water Area</h3>
          <div className="text-2xl font-bold text-blue-600">361M km²</div>
          <p className="text-sm text-gray-600 mt-2">70.8% of Earth's surface</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Protected Areas</h3>
          <div className="text-2xl font-bold text-purple-600">15.7%</div>
          <p className="text-sm text-green-600 mt-2">+2.3% since 2010</p>
        </div>
      </div>

      {/* World Map */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Geographic Features Map</h2>
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
          <p className="text-gray-500">Interactive geographic map will be displayed here</p>
        </div>
      </div>

      {/* Geographic Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Climate Zones</h2>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <p className="text-gray-500">Climate zone distribution</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Land Use Distribution</h2>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <p className="text-gray-500">Land use pie chart</p>
          </div>
        </div>
      </div>

      {/* Country Rankings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Largest Countries by Land Area</h2>
        <div className="space-y-3">
          {[
            { rank: 1, country: 'Russia', area: '17.1M km²', percentage: '11.5%' },
            { rank: 2, country: 'Canada', area: '9.98M km²', percentage: '6.7%' },
            { rank: 3, country: 'China', area: '9.60M km²', percentage: '6.4%' },
            { rank: 4, country: 'United States', area: '9.52M km²', percentage: '6.4%' },
            { rank: 5, country: 'Brazil', area: '8.52M km²', percentage: '5.7%' },
          ].map((country) => (
            <div key={country.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  {country.rank}
                </div>
                <span className="font-medium text-gray-900">{country.country}</span>
              </div>
              <div className="flex items-center space-x-6">
                <span className="font-semibold text-gray-900">{country.area}</span>
                <span className="text-sm text-gray-500">{country.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
