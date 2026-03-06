export const Demographics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Demographics</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Explore global population dynamics, age structures, fertility rates, and demographic transitions 
          across countries and regions.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">World Population</h3>
          <div className="text-2xl font-bold text-blue-600">8.1 Billion</div>
          <p className="text-sm text-green-600 mt-2">+1.0% annual growth</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Global Fertility Rate</h3>
          <div className="text-2xl font-bold text-purple-600">2.4</div>
          <p className="text-sm text-gray-600 mt-2">Children per woman</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Life Expectancy</h3>
          <div className="text-2xl font-bold text-green-600">72.6 years</div>
          <p className="text-sm text-green-600 mt-2">+5.2 years since 2000</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Urban Population</h3>
          <div className="text-2xl font-bold text-orange-600">56.2%</div>
          <p className="text-sm text-gray-600 mt-2">Living in urban areas</p>
        </div>
      </div>

      {/* Population Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Population Growth Trend</h2>
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <p className="text-gray-500">Population line chart will be displayed here</p>
        </div>
      </div>

      {/* Demographic Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Age Structure Analysis</h2>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <p className="text-gray-500">Population pyramid chart</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Fertility Rates by Region</h2>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <p className="text-gray-500">Regional fertility comparison</p>
          </div>
        </div>
      </div>

      {/* Country Rankings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Countries by Population</h2>
        <div className="space-y-3">
          {[
            { rank: 1, country: 'China', population: '1.425B', percentage: '17.8%' },
            { rank: 2, country: 'India', population: '1.428B', percentage: '17.9%' },
            { rank: 3, country: 'United States', population: '339M', percentage: '4.2%' },
            { rank: 4, country: 'Indonesia', population: '277M', percentage: '3.5%' },
            { rank: 5, country: 'Pakistan', population: '240M', percentage: '3.0%' },
          ].map((country) => (
            <div key={country.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  {country.rank}
                </div>
                <span className="font-medium text-gray-900">{country.country}</span>
              </div>
              <div className="flex items-center space-x-6">
                <span className="font-semibold text-gray-900">{country.population}</span>
                <span className="text-sm text-gray-500">{country.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
