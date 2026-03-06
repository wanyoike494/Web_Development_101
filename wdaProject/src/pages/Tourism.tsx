export const Tourism = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tourism</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Discover world heritage sites, national parks, and tourism statistics. 
          Explore global travel patterns and cultural destinations.
        </p>
      </div>

      {/* Key Tourism Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Annual Tourists</h3>
          <div className="text-2xl font-bold text-blue-600">1.5B</div>
          <p className="text-sm text-green-600 mt-2">+4.2% annual growth</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">UNESCO Sites</h3>
          <div className="text-2xl font-bold text-purple-600">1,199</div>
          <p className="text-sm text-gray-600 mt-2">World heritage sites</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">National Parks</h3>
          <div className="text-2xl font-bold text-green-600">6,555</div>
          <p className="text-sm text-gray-600 mt-2">Protected areas worldwide</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Tourism Revenue</h3>
          <div className="text-2xl font-bold text-orange-600">$1.7T</div>
          <p className="text-sm text-green-600 mt-2">+6.8% annual growth</p>
        </div>
      </div>

      {/* Tourism Map */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Global Tourism Hotspots</h2>
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
          <p className="text-gray-500">Interactive tourism map will be displayed here</p>
        </div>
      </div>

      {/* Tourism Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Destinations by Region</h2>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <p className="text-gray-500">Regional tourism distribution</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tourism Seasonality</h2>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <p className="text-gray-500">Seasonal travel patterns</p>
          </div>
        </div>
      </div>

      {/* Top Destinations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Most Visited Countries</h2>
        <div className="space-y-3">
          {[
            { rank: 1, country: 'France', visitors: '89.4M', revenue: '$67.2B' },
            { rank: 2, country: 'Spain', visitors: '83.5M', revenue: '$74.8B' },
            { rank: 3, country: 'United States', visitors: '79.3M', revenue: '$214.5B' },
            { rank: 4, country: 'China', visitors: '65.7M', revenue: '$127.3B' },
            { rank: 5, country: 'Italy', visitors: '64.5M', revenue: '$50.3B' },
          ].map((destination) => (
            <div key={destination.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  {destination.rank}
                </div>
                <span className="font-medium text-gray-900">{destination.country}</span>
              </div>
              <div className="flex items-center space-x-6">
                <span className="font-semibold text-gray-900">{destination.visitors}</span>
                <span className="text-sm text-gray-500">{destination.revenue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UNESCO Heritage Sites */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Featured UNESCO World Heritage Sites</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Great Wall of China', country: 'China', year: 1987, type: 'Cultural' },
            { name: 'Machu Picchu', country: 'Peru', year: 1983, type: 'Cultural' },
            { name: 'Great Barrier Reef', country: 'Australia', year: 1981, type: 'Natural' },
            { name: 'Taj Mahal', country: 'India', year: 1983, type: 'Cultural' },
            { name: 'Serengeti National Park', country: 'Tanzania', year: 1981, type: 'Natural' },
            { name: 'Pyramids of Giza', country: 'Egypt', year: 1979, type: 'Cultural' },
          ].map((site, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{site.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{site.country}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {site.type}
                </span>
                <span className="text-xs text-gray-500">Since {site.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
