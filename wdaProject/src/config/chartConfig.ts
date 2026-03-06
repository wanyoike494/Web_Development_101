export interface ChartDefaults {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    grid: string;
    text: string;
    background: string;
  };
  fonts: {
    family: string;
    size: {
      title: number;
      axis: number;
      legend: number;
      tooltip: number;
    };
  };
  dimensions: {
    width: number;
    height: number;
    margin: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
  animation: {
    duration: number;
    easing: string;
  };
  interaction: {
    hover: {
      enabled: boolean;
      radius: number;
      backgroundColor: string;
    };
    click: {
      enabled: boolean;
    };
    zoom: {
      enabled: boolean;
      wheel: boolean;
      pan: boolean;
    };
  };
  legend: {
    display: boolean;
    position: 'top' | 'bottom' | 'left' | 'right';
    backgroundColor?: string;
  };
  tooltip: {
    enabled: boolean;
    backgroundColor: string;
    titleColor: string;
    bodyColor: string;
    borderColor: string;
    borderWidth: number;
  };
  grid: {
    display: boolean;
    color: string;
    lineWidth: number;
    borderDash?: number[];
  };
  axes: {
    x: {
      display: boolean;
      title?: string;
      grid?: boolean;
    };
    y: {
      display: boolean;
      title?: string;
      grid?: boolean;
    };
  };
}

export const defaultChartConfig: ChartDefaults = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#6366f1',
    grid: '#e5e7eb',
    text: '#374151',
    background: '#ffffff',
  },
  fonts: {
    family: 'Inter, system-ui, -apple-system, sans-serif',
    size: {
      title: 16,
      axis: 12,
      legend: 12,
      tooltip: 12,
    },
  },
  dimensions: {
    width: 800,
    height: 400,
    margin: {
      top: 20,
      right: 30,
      bottom: 40,
      left: 50,
    },
  },
  animation: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  interaction: {
    hover: {
      enabled: true,
      radius: 4,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    },
    click: {
      enabled: true,
    },
    zoom: {
      enabled: false,
      wheel: false,
      pan: false,
    },
  },
  legend: {
    display: true,
    position: 'top',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  tooltip: {
    enabled: true,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    titleColor: '#ffffff',
    bodyColor: '#ffffff',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
  },
  grid: {
    display: true,
    color: '#e5e7eb',
    lineWidth: 1,
    borderDash: [],
  },
  axes: {
    x: {
      display: true,
      grid: true,
    },
    y: {
      display: true,
      grid: true,
    },
  },
};

// Chart type specific configurations
export const lineChartConfig = {
  ...defaultChartConfig,
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2,
      borderCapStyle: 'round' as const,
      borderJoinStyle: 'round' as const,
      fill: false,
    },
    point: {
      radius: 3,
      hoverRadius: 5,
      borderWidth: 1,
      hitRadius: 10,
    },
  },
};

export const barChartConfig = {
  ...defaultChartConfig,
  elements: {
    bar: {
      borderRadius: 4,
      borderWidth: 0,
    },
  },
  indexAxis: 'x' as const,
  barPercentage: 0.8,
  categoryPercentage: 0.8,
};

export const pieChartConfig = {
  ...defaultChartConfig,
  elements: {
    arc: {
      borderWidth: 2,
      borderAlign: 'center' as const,
    },
  },
  rotation: 0,
  circumference: 360,
  cutout: 0,
};

export const scatterChartConfig = {
  ...defaultChartConfig,
  elements: {
    point: {
      radius: 5,
      hoverRadius: 7,
      borderWidth: 1,
    },
  },
};

export const areaChartConfig = {
  ...defaultChartConfig,
  elements: {
    line: {
      ...lineChartConfig.elements.line,
      fill: true,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    },
  },
};

// Responsive configurations
export const responsiveChartConfig = {
  small: {
    ...defaultChartConfig,
    dimensions: {
      ...defaultChartConfig.dimensions,
      width: 400,
      height: 300,
    },
    fonts: {
      ...defaultChartConfig.fonts,
      size: {
        ...defaultChartConfig.fonts.size,
        title: 14,
        axis: 10,
        legend: 10,
        tooltip: 10,
      },
    },
  },
  medium: {
    ...defaultChartConfig,
    dimensions: {
      ...defaultChartConfig.dimensions,
      width: 600,
      height: 400,
    },
  },
  large: {
    ...defaultChartConfig,
    dimensions: {
      ...defaultChartConfig.dimensions,
      width: 1000,
      height: 500,
    },
  },
};

// Color schemes for charts
export const chartColorSchemes = {
  population: ['#3b82f6', '#10b981', '#059669', '#047857'],
  gdp: ['#10b981', '#22c55e', '#f59e0b', '#ef4444'],
  temperature: ['#3b82f6', '#06b6d4', '#f59e0b', '#ef4444'],
  precipitation: ['#06b6d4', '#3b82f6', '#10b981', '#059669'],
  categorical: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#f97316'],
  sequential: ['#f0f9ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af'],
  diverging: ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#06b6d4', '#3b82f6'],
};

// Export utilities
export const exportFormats = {
  png: {
    mimeType: 'image/png',
    extension: '.png',
    quality: 0.9,
  },
  jpg: {
    mimeType: 'image/jpeg',
    extension: '.jpg',
    quality: 0.8,
  },
  svg: {
    mimeType: 'image/svg+xml',
    extension: '.svg',
  },
  pdf: {
    mimeType: 'application/pdf',
    extension: '.pdf',
  },
  csv: {
    mimeType: 'text/csv',
    extension: '.csv',
  },
  json: {
    mimeType: 'application/json',
    extension: '.json',
  },
};

// Accessibility configurations
export const accessibilityConfig = {
  contrast: {
    minimum: 4.5,
    enhanced: 7.0,
  },
  fontSize: {
    minimum: 12,
    preferred: 14,
  },
  colorBlindness: {
    protanopia: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
    deuteranopia: ['#3b82f6', '#06b6d4', '#f59e0b', '#ef4444'],
    tritanopia: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'],
  },
};
