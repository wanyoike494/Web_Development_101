// Color scale utilities for data visualization

export interface ColorScale {
  name: string;
  colors: string[];
  type: 'sequential' | 'diverging' | 'categorical';
}

export interface ColorStop {
  value: number;
  color: string;
  label?: string;
}

// Predefined color scales
export const COLOR_SCALES: Record<string, ColorScale> = {
  // Sequential scales
  blue: {
    name: 'Blue',
    colors: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'],
    type: 'sequential',
  },
  green: {
    name: 'Green',
    colors: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'],
    type: 'sequential',
  },
  orange: {
    name: 'Orange',
    colors: ['#fff7ed', '#ffedd5', '#fed7aa', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03'],
    type: 'sequential',
  },
  red: {
    name: 'Red',
    colors: ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'],
    type: 'sequential',
  },
  purple: {
    name: 'Purple',
    colors: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7c3aed', '#6d28d9', '#5b21b6'],
    type: 'sequential',
  },
  
  // Diverging scales
  blue_red: {
    name: 'Blue-Red Diverging',
    colors: ['#2166ac', '#539ecd', '#91bfdb', '#deebf7', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
    type: 'diverging',
  },
  purple_green: {
    name: 'Purple-Green Diverging',
    colors: ['#542788', '#998ec3', '#d8daeb', '#f7f7f7', '#e2f2a2', '#a8ddb5', '#66c2a5', '#3288bd', '#5e4fa2'],
    type: 'diverging',
  },
  
  // Categorical scales
  category10: {
    name: 'Category 10',
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],
    type: 'categorical',
  },
  set3: {
    name: 'Set 3',
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c'],
    type: 'categorical',
  },
  pastel1: {
    name: 'Pastel 1',
    colors: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2', '#b3e2cd'],
    type: 'categorical',
  },
  
  // Scientific color scales
  viridis: {
    name: 'Viridis',
    colors: ['#440154', '#482677', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825', '#fde725'],
    type: 'sequential',
  },
  plasma: {
    name: 'Plasma',
    colors: ['#0d0887', '#41045d', '#6a00a8', '#8f0da4', '#b12a90', '#d55800', '#e68210', '#fca636', '#fdc030', '#f0f921'],
    type: 'sequential',
  },
  inferno: {
    name: 'Inferno',
    colors: ['#000004', '#1a0c26', '#311035', '#4a1437', '#621941', '#7a1e4a', '#92254f', '#aa2c56', '#c2335c', '#da3a5f', '#f14240'],
    type: 'sequential',
  },
} as const;

// Color interpolation functions
export const interpolateColor = (color1: string, color2: string, factor: number): string => {
  // Simple linear interpolation between two colors
  const hex2rgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : { r: 0, g: 0, b: 0 };
  };
  
  const rgb2hex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };
  
  const c1 = hex2rgb(color1);
  const c2 = hex2rgb(color2);
  
  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);
  
  return rgb2hex(r, g, b);
};

// Scale generation functions
export const createColorScale = (
  domain: [number, number],
  colors: string[]
): ((value: number) => string) => {
  return (value: number): string => {
    const clampedValue = Math.max(domain[0], Math.min(domain[1], value));
    const normalizedValue = (clampedValue - domain[0]) / (domain[1] - domain[0]);
    const index = Math.floor(normalizedValue * (colors.length - 1));
    return colors[Math.min(index, colors.length - 1)];
  };
};

export const createDivergingScale = (
  domain: [number, number],
  colors: string[],
  centerValue: number = 0
): ((value: number) => string) => {
  return (value: number): string => {
    const clampedValue = Math.max(domain[0], Math.min(domain[1], value));
    const normalizedValue = (clampedValue - domain[0]) / (domain[1] - domain[0]);
    
    const centerIndex = Math.floor((colors.length - 1) / 2);
    const offset = normalizedValue * centerIndex;
    const index = Math.floor(centerIndex + offset);
    
    return colors[Math.max(0, Math.min(index, colors.length - 1))];
  };
};

// Color utilities
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

export const getColorBrightness = (hex: string): number => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  
  // Relative luminance formula
  return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
};

export const getContrastColor = (backgroundColor: string): 'white' | 'black' => {
  const brightness = getColorBrightness(backgroundColor);
  return brightness > 0.5 ? 'black' : 'white';
};

export const adjustColorOpacity = (hex: string, opacity: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

// Color palette generators
export const generatePalette = (
  baseColor: string,
  count: number,
  variation: 'lightness' | 'saturation' | 'both' = 'both'
): string[] => {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return [baseColor];
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors: string[] = [];
  
  for (let i = 0; i < count; i++) {
    let newHsl = { ...hsl };
    
    if (variation === 'lightness' || variation === 'both') {
      const lightnessFactor = 0.3 + (0.4 * (i / (count - 1)));
      newHsl.l = lightnessFactor;
    }
    
    if (variation === 'saturation' || variation === 'both') {
      const saturationFactor = 0.3 + (0.7 * (i / (count - 1)));
      newHsl.s = saturationFactor;
    }
    
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }
  
  return colors;
};

// Helper functions
const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
    } else if (max === g) {
      h = ((b - r) / delta + 2) * 60;
    } else {
      h = ((r - g) / delta + 4) * 60;
    }
    
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  }
  
  return { h, s, l };
};

const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l * 255;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      
      if (t < 1/6) {
        return p + (q - p) * 6 * t;
      } else if (t < 1/2) {
        return q;
      } else if (t < 2/3) {
        return p + (q - p) * (2/3 - t) * 6;
      } else {
        return p;
      }
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    const sector = Math.floor(h * 6);
    const t = h * 6 - sector;
    
    switch (sector % 6) {
      case 0:
        r = hue2rgb(p, q, t);
        g = hue2rgb(p, q, t + 1/6);
        b = hue2rgb(p, q, t + 2/6);
        break;
      case 1:
        r = hue2rgb(p, q, t + 2/6);
        g = hue2rgb(p, q, t + 3/6);
        b = hue2rgb(p, q, t + 4/6);
        break;
      case 2:
        r = hue2rgb(p, q, t + 4/6);
        g = hue2rgb(p, q, t + 5/6);
        b = hue2rgb(p, q, t);
        break;
      case 3:
        r = hue2rgb(p, q, t);
        g = hue2rgb(p, q, t + 1/6);
        b = hue2rgb(p, q, t + 2/6);
        break;
      case 4:
        r = hue2rgb(p, q, t);
        g = hue2rgb(p, q, t);
        b = hue2rgb(p, q, t + 1/6);
        break;
      case 5:
        r = hue2rgb(p, q, t + 5/6);
        g = hue2rgb(p, q, t);
        b = hue2rgb(p, q, t + 1/6);
        break;
      default:
        r = g = b = 0;
    }
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};
