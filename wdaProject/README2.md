wda-project/
│
├── public/
│   └── favicon.svg
│
├── src/
│   │
│   ├── app/                      # App core setup
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── routes.tsx
│   │   │
│   │   └── layout/               # GLOBAL layout components
│   │       ├── MainLayout.tsx
│   │       ├── AuthLayout.tsx
│   │       ├── Sidebar.tsx
│   │       ├── Topbar.tsx
│   │       └── Footer.tsx
│   │
│   ├── pages/                    # Route-level pages only
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Analytics.tsx
│   │   ├── Finance.tsx
│   │   ├── Login.tsx
│   │   └── NotFound.tsx
│   │
│   ├── features/                 # Feature-based architecture
│   │   │
│   │   ├── population/
│   │   │   ├── PopulationChart.tsx
│   │   │   ├── PopulationTable.tsx
│   │   │   ├── population.service.ts
│   │   │   ├── population.types.ts
│   │   │   └── population.hooks.ts
│   │   │
│   │   ├── gdp/
│   │   │   ├── GDPChart.tsx
│   │   │   ├── gdp.service.ts
│   │   │   ├── gdp.types.ts
│   │   │   └── gdp.hooks.ts
│   │   │
│   │   ├── finance-tools/
│   │   │   ├── LoanCalculator.tsx
│   │   │   ├── AmortizationTable.tsx
│   │   │   └── finance.types.ts
│   │   │
│   │   ├── ml-models/
│   │   │   ├── PredictionChart.tsx
│   │   │   └── ml.types.ts
│   │   │
│   │   └── climate/
│   │
│   ├── components/               # Reusable UI components
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── Select.tsx
│   │   │
│   │   ├── charts/               # Shared chart wrappers
│   │   │   ├── LineChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   ├── PieChart.tsx
│   │   │   └── ChartContainer.tsx
│   │   │
│   │   ├── tables/
│   │   │   └── DataTable.tsx
│   │   │
│   │   └── common/
│   │       ├── ErrorState.tsx
│   │       ├── EmptyState.tsx
│   │       └── PageHeader.tsx
│   │
│   ├── hooks/                    # Global reusable hooks
│   │   ├── useFetch.ts
│   │   ├── useDebounce.ts
│   │   ├── useWindowSize.ts
│   │   └── useChartResize.ts
│   │
│   ├── services/                 # API layer
│   │   ├── api.ts
│   │   ├── axiosInstance.ts
│   │   └── endpoints.ts
│   │
│   ├── store/                    # Global state (Zustand/Redux later)
│   │   └── index.ts
│   │
│   ├── types/                    # Global types
│   │   ├── global.d.ts
│   │   ├── api.types.ts
│   │   └── chart.types.ts
│   │
│   ├── utils/                    # Pure helper functions
│   │   ├── formatNumber.ts
│   │   ├── formatCurrency.ts
│   │   ├── constants.ts
│   │   ├── colorScales.ts
│   │   └── helpers.ts
│   │
│   ├── config/                   # App configs
│   │   ├── theme.ts
│   │   └── chartConfig.ts
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │       └── globals.css
│   │
│   └── index.css
│
├── .env
├── .gitignore
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md

