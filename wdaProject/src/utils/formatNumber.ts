export const formatNumber = (
  num: number,
  options: {
    decimals?: number;
    style?: 'decimal' | 'currency' | 'percent';
    currency?: string;
    locale?: string;
    compact?: boolean;
  } = {}
): string => {
  const {
    decimals = 2,
    style = 'decimal',
    currency = 'USD',
    locale = 'en-US',
    compact = false,
  } = options;

  try {
    if (compact && Math.abs(num) >= 1000) {
      const compactFormatter = new Intl.NumberFormat(locale, {
        notation: 'compact',
        maximumFractionDigits: decimals,
        style,
        currency: style === 'currency' ? currency : undefined,
      });
      return compactFormatter.format(num);
    }

    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      style,
      currency: style === 'currency' ? currency : undefined,
    });

    return formatter.format(num);
  } catch (error) {
    console.warn('Number formatting failed:', error);
    return num.toString();
  }
};

export const formatPopulation = (population: number): string => {
  if (population >= 1000000000) {
    return `${(population / 1000000000).toFixed(1)}B`;
  } else if (population >= 1000000) {
    return `${(population / 1000000).toFixed(1)}M`;
  } else if (population >= 1000) {
    return `${(population / 1000).toFixed(1)}K`;
  }
  return population.toString();
};

export const formatGDP = (gdp: number, currency: string = 'USD'): string => {
  if (gdp >= 1000000000000) {
    return `${currency} ${(gdp / 1000000000000).toFixed(2)}T`;
  } else if (gdp >= 1000000000) {
    return `${currency} ${(gdp / 1000000000).toFixed(1)}B`;
  } else if (gdp >= 1000000) {
    return `${currency} ${(gdp / 1000000).toFixed(1)}M`;
  }
  return `${currency} ${gdp.toLocaleString()}`;
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatGrowthRate = (rate: number): string => {
  const sign = rate >= 0 ? '+' : '';
  return `${sign}${rate.toFixed(2)}%`;
};

export const formatLargeNumber = (num: number, decimals: number = 1): string => {
  const units = ['', 'K', 'M', 'B', 'T'];
  let unitIndex = 0;
  let scaledNum = num;

  while (scaledNum >= 1000 && unitIndex < units.length - 1) {
    scaledNum /= 1000;
    unitIndex++;
  }

  return `${scaledNum.toFixed(decimals)}${units[unitIndex]}`;
};
