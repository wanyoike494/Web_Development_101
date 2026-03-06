export interface ChartDataPoint {
  x: number | string;
  y: number;
  label?: string;
  metadata?: Record<string, any>;
}

export interface ChartDataset {
  label: string;
  data: ChartDataPoint[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
  pointRadius?: number;
  pointHoverRadius?: number;
}

export interface ChartData {
  labels: Array<number | string>;
  datasets: ChartDataset[];
}

export interface ChartAxis {
  type: 'x' | 'y';
  position: 'left' | 'right' | 'top' | 'bottom';
  title?: string;
  min?: number;
  max?: number;
  grid?: {
    display: boolean;
    color?: string;
    lineWidth?: number;
  };
  ticks?: {
    display: boolean;
    color?: string;
    fontSize?: number;
    callback?: (value: number | string, index: number, values: Array<number | string>) => string;
  };
}

export interface ChartTooltip {
  enabled: boolean;
  mode?: 'single' | 'multi' | 'nearest' | 'index' | 'point';
  backgroundColor?: string;
  titleColor?: string;
  bodyColor?: string;
  borderColor?: string;
  borderWidth?: number;
  callbacks?: {
    title?: (context: any) => string;
    label?: (context: any) => string;
    afterLabel?: (context: any) => string;
    beforeLabel?: (context: any) => string;
  };
}

export interface ChartLegend {
  display: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  labels?: {
    fontColor?: string;
    fontSize?: number;
    usePointStyle?: boolean;
    boxWidth?: number;
    padding?: number;
    generateLabels?: (chart: any) => string[];
  };
}

export interface ChartAnimation {
  duration: number;
  easing?: 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic';
  onComplete?: () => void;
  onProgress?: (animation: any) => void;
}

export interface BaseChartConfig {
  type: 'line' | 'bar' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'radar' | 'polarArea';
  responsive: boolean;
  maintainAspectRatio: boolean;
  aspectRatio?: number;
  plugins?: {
    tooltip?: ChartTooltip;
    legend?: ChartLegend;
    zoom?: {
      pan?: {
        enabled: boolean;
        mode: 'x' | 'y' | 'xy';
      };
      zoom?: {
        enabled: boolean;
        mode: 'x' | 'y' | 'xy';
        wheel?: {
          enabled: boolean;
        };
      };
    };
  };
  animation?: ChartAnimation;
  scales?: {
    x?: ChartAxis;
    y?: ChartAxis;
  };
}

export interface LineChartConfig extends BaseChartConfig {
  type: 'line';
  elements?: {
    line?: {
      tension?: number;
      borderWidth?: number;
      borderCapStyle?: 'butt' | 'round' | 'square';
      borderDash?: number[];
      borderDashOffset?: number;
      borderJoinStyle?: 'miter' | 'round' | 'bevel';
      fill?: boolean;
      backgroundColor?: string;
      borderColor?: string;
    };
    point?: {
      radius?: number;
      hoverRadius?: number;
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
      hitRadius?: number;
      hoverBorderWidth?: number;
    };
  };
}

export interface BarChartConfig extends BaseChartConfig {
  type: 'bar';
  elements?: {
    bar?: {
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
      borderSkipped?: boolean;
      borderRadius?: number;
    };
  };
  indexAxis?: 'x' | 'y';
  barPercentage?: number;
  categoryPercentage?: number;
}

export interface PieChartConfig extends BaseChartConfig {
  type: 'pie' | 'doughnut';
  elements?: {
    arc?: {
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
      borderAlign?: 'center' | 'inner' | 'outer';
    };
  };
  rotation?: number;
  circumference?: number;
  cutout?: number | string;
}

export interface ChartExportOptions {
  format: 'png' | 'jpg' | 'svg' | 'pdf';
  width?: number;
  height?: number;
  backgroundColor?: string;
  filename?: string;
  quality?: number; // For jpg/png
}

export interface ChartInteractionEvent {
  type: 'click' | 'hover' | 'mouseout';
  element: any;
  datasetIndex: number;
  index: number;
  value: any;
  label: any;
  position?: {
    x: number;
    y: number;
  };
}

// Chart types for different libraries
export interface D3ChartSelection {
  data: ChartData;
  width: number;
  height: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  colorScale?: (value: number) => string;
}

export interface PlotlyChartConfig {
  data: any[];
  layout?: {
    title?: string;
    width?: number;
    height?: number;
    showlegend?: boolean;
    legend?: {
      x?: number;
      y?: number;
      orientation?: 'v' | 'h';
    };
    xaxis?: any;
    yaxis?: any;
    margin?: {
      l?: number;
      r?: number;
      t?: number;
      b?: number;
      pad?: number;
    };
    paper_bgcolor?: string;
    plot_bgcolor?: string;
    hovermode?: 'x' | 'y' | 'closest' | false;
    dragmode?: 'zoom' | 'pan' | 'select' | 'lasso' | 'orbit';
  };
  config?: {
    responsive?: boolean;
    displayModeBar?: boolean;
    displaylogo?: boolean;
    toImageButtonOptions?: {
      format?: 'png' | 'svg' | 'jpeg' | 'webp';
      filename?: string;
      height?: number;
      width?: number;
      scale?: number;
    };
  };
  frames?: any[];
}
