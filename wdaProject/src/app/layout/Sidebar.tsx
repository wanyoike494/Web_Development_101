import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Demographics', href: '/demographics', icon: '👥' },
    { name: 'Macroeconomics', href: '/macroeconomics', icon: '📊' },
    { name: 'Geography', href: '/geography', icon: '🌍' },
    { name: 'Tourism', href: '/tourism', icon: '✈️' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-8">World Data Analysis</h2>
        
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-12 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Data Sources</h3>
          <p className="text-sm text-gray-600">
            World Bank, UN, IMF, and other international organizations
          </p>
        </div>
      </div>
    </div>
  );
};
