import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          World Data Analysis
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Explore comprehensive global data through interactive visualizations. 
          From demographics to economics, geography to tourism - understand our world through data.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link 
          to="/demographics" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Demographics</h3>
          <p className="text-gray-600 text-sm">
            Population dynamics, age structure, fertility rates, and demographic transitions
          </p>
        </Link>

        <Link 
          to="/macroeconomics" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Macroeconomics</h3>
          <p className="text-gray-600 text-sm">
            GDP, inflation, trade balances, and economic indicators worldwide
          </p>
        </Link>

        <Link 
          to="/geography" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Geography</h3>
          <p className="text-gray-600 text-sm">
            Land area, climate data, forest coverage, and geographic features
          </p>
        </Link>

        <Link 
          to="/tourism" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <div className="text-4xl mb-4">✈️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tourism</h3>
          <p className="text-gray-600 text-sm">
            World heritage sites, national parks, and tourism statistics
          </p>
        </Link>
      </div>

      {/* Interactive World Map Preview */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive World Map</h2>
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <p className="text-gray-600 mb-4">Interactive world choropleth map</p>
            <Link 
              to="/" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Map
            </Link>
          </div>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Population</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">8.1 Billion</div>
          <p className="text-sm text-gray-600">Current world population with +1% annual growth</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Countries Covered</h3>
          <div className="text-3xl font-bold text-green-600 mb-2">195</div>
          <p className="text-sm text-gray-600">All UN member states with comprehensive data</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Points</h3>
          <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
          <p className="text-sm text-gray-600">Indicators across multiple domains updated regularly</p>
        </div>
      </div>
    </div>
  );
};
