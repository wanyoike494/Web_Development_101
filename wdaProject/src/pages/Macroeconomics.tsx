export const Macroeconomics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Macroeconomics</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Analyze global economic indicators including GDP, inflation, trade balances, 
          and monetary policies across countries and regions.
        </p>
      </div>

      {/* Key Economic Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Global GDP</h3>
          <div className="text-2xl font-bold text-green-600">$105.0T</div>
          <p className="text-sm text-green-600 mt-2">+3.1% annual growth</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Global Inflation</h3>
          <div className="text-2xl font-bold text-orange-600">4.2%</div>
          <p className="text-sm text-red-600 mt-2">+0.8% from last year</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Trade Volume</h3>
          <div className="text-2xl font-bold text-blue-600">$25.3T</div>
          <p className="text-sm text-green-600 mt-2">+5.2% annual growth</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">FDI Inflows</h3>
          <div className="text-2xl font-bold text-purple-600">$1.8T</div>
          <p className="text-sm text-gray-600 mt-2">Foreign direct investment</p>
        </div>
      </div>

      {/* GDP Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Global GDP Growth Trend</h2>
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <p className="text-gray-500">GDP growth chart will be displayed here</p>
        </div>
      </div>

      {/* Economic Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Inflation by Region</h2>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <p className="text-gray-500">Regional inflation comparison</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Trade Balance Analysis</h2>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <p className="text-gray-500">Import/export balance chart</p>
          </div>
        </div>
      </div>

      {/* Economic Rankings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Economies by GDP</h2>
        <div className="space-y-3">
          {[
            { rank: 1, country: 'United States', gdp: '$25.5T', percentage: '24.3%' },
            { rank: 2, country: 'China', gdp: '$19.4T', percentage: '18.5%' },
            { rank: 3, country: 'Japan', gdp: '$4.2T', percentage: '4.0%' },
            { rank: 4, country: 'Germany', gdp: '$4.1T', percentage: '3.9%' },
            { rank: 5, country: 'India', gdp: '$3.7T', percentage: '3.5%' },
          ].map((economy) => (
            <div key={economy.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  {economy.rank}
                </div>
                <span className="font-medium text-gray-900">{economy.country}</span>
              </div>
              <div className="flex items-center space-x-6">
                <span className="font-semibold text-gray-900">{economy.gdp}</span>
                <span className="text-sm text-gray-500">{economy.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
