export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">World Data Analysis</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Comprehensive visualization and analysis of global demographic, economic, 
              and geographic data from authoritative sources worldwide.
            </p>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="text-md font-medium mb-4">Data Sources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>World Bank</li>
              <li>United Nations</li>
              <li>International Monetary Fund</li>
              <li>World Health Organization</li>
              <li>UNESCO</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-md font-medium mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Interactive World Maps</li>
              <li>Population Analytics</li>
              <li>Economic Indicators</li>
              <li>Geographic Data</li>
              <li>Tourism Statistics</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-md font-medium mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>GitHub Repository</li>
              <li>Data API Documentation</li>
              <li>Research Papers</li>
              <li>Contact Team</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 World Data Analysis. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Data License
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
