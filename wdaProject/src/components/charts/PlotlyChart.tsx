import { useEffect, useRef } from 'react';

interface PlotlyDataPoint {
  x: number | string | Date;
  y: number | string | Date;
  z?: number | string | Date;
  text?: string;
  marker?: {
    color?: string;
    size?: number;
    symbol?: string;
  };
}

interface PlotlyTrace {
  x: Array<number | string | Date>;
  y: Array<number | string | Date>;
  z?: Array<number | string | Date>;
  type: 'scatter' | 'bar' | 'histogram' | 'heatmap' | 'surface' | 'mesh3d' | 'scatter3d' | 'pie';
  mode?: 'markers' | 'lines' | 'lines+markers' | 'text';
  name?: string;
  text?: Array<string> | string;
  marker?: {
    color?: string | Array<string>;
    size?: number | Array<number>;
    symbol?: string;
    colorscale?: string;
    showscale?: boolean;
  };
  line?: {
    color?: string;
    width?: number;
    dash?: string;
  };
  fill?: 'none' | 'tozeroy' | 'tozerox' | 'toself' | 'tonexty' | 'tonextx';
  hoverinfo?: string;
  hovertemplate?: string;
}

interface PlotlyLayout {
  title?: string;
  width?: number;
  height?: number;
  showlegend?: boolean;
  legend?: {
    x?: number;
    y?: number;
    orientation?: 'v' | 'h';
    bgcolor?: string;
    bordercolor?: string;
    borderwidth?: number;
  };
  xaxis?: {
    title?: string;
    type?: 'linear' | 'log' | 'date' | 'category';
    autorange?: boolean;
    range?: [number, number];
    showgrid?: boolean;
    gridcolor?: string;
    gridwidth?: number;
    zeroline?: boolean;
    zerolinecolor?: string;
    zerolinewidth?: number;
  };
  yaxis?: {
    title?: string;
    type?: 'linear' | 'log' | 'date' | 'category';
    autorange?: boolean;
    range?: [number, number];
    showgrid?: boolean;
    gridcolor?: string;
    gridwidth?: number;
    zeroline?: boolean;
    zerolinecolor?: string;
    zerolinewidth?: number;
  };
  zaxis?: {
    title?: string;
    type?: 'linear' | 'log' | 'date' | 'category';
    autorange?: boolean;
    range?: [number, number];
    showgrid?: boolean;
    gridcolor?: string;
    gridwidth?: number;
  };
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
  dragmode?: 'zoom' | 'pan' | 'select' | 'lasso' | 'orbit' | 'turntable';
  scene?: {
    xaxis?: any;
    yaxis?: any;
    zaxis?: any;
    camera?: {
      eye?: {
        x: number;
        y: number;
        z: number;
      };
      center?: {
        x: number;
        y: number;
        z: number;
      };
      up?: {
        x: number;
        y: number;
        z: number;
      };
    };
  };
  annotations?: Array<{
    x: number | string;
    y: number | string;
    text: string;
    showarrow?: boolean;
    arrowhead?: number;
    arrowsize?: number;
    arrowwidth?: number;
    arrowcolor?: string;
    ax?: number;
    ay?: number;
  }>;
}

interface PlotlyConfig {
  responsive?: boolean;
  displayModeBar?: boolean;
  displaylogo?: boolean;
  modeBarButtonsToRemove?: string[];
  modeBarButtonsToAdd?: string[];
  toImageButtonOptions?: {
    format?: 'png' | 'svg' | 'jpeg' | 'webp' | 'pdf';
    filename?: string;
    height?: number;
    width?: number;
    scale?: number;
  };
  scrollZoom?: boolean;
  doubleClick?: 'reset' | 'reset+autosize' | false;
  showTips?: boolean;
  locale?: string;
}

interface PlotlyChartProps {
  data: PlotlyTrace[];
  layout?: PlotlyLayout;
  config?: PlotlyConfig;
  onReady?: (figure: any) => void;
  onError?: (error: any) => void;
  className?: string;
}

export const PlotlyChart = ({ 
  data, 
  layout = {}, 
  config = {}, 
  onReady, 
  onError,
  className 
}: PlotlyChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const plotlyRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // This is a simplified implementation
    // In a real app, you would use the actual Plotly.js library
    const renderChart = async () => {
      try {
        // Mock Plotly implementation
        const mockPlotly = {
          newPlot: async (div: HTMLElement, data: any[], layout: any, config?: any) => {
            // Create a simple SVG representation
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', String(layout.width || 800));
            svg.setAttribute('height', String(layout.height || 400));
            svg.setAttribute('viewBox', `0 0 ${layout.width || 800} ${layout.height || 400}`);
            
            // Add background
            const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bg.setAttribute('width', String(layout.width || 800));
            bg.setAttribute('height', String(layout.height || 400));
            bg.setAttribute('fill', layout.paper_bgcolor || '#ffffff');
            svg.appendChild(bg);
            
            // Add title
            if (layout.title) {
              const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
              title.setAttribute('x', String((layout.width || 800) / 2));
              title.setAttribute('y', '30');
              title.setAttribute('text-anchor', 'middle');
              title.setAttribute('font-size', '16');
              title.setAttribute('font-weight', 'bold');
              title.setAttribute('fill', '#374151');
              title.textContent = layout.title;
              svg.appendChild(title);
            }
            
            // Add mock chart content
            const chartGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            chartGroup.setAttribute('transform', `translate(${layout.margin?.l || 50}, ${layout.margin?.t || 50})`);
            
            // Add placeholder text
            const placeholder = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            placeholder.setAttribute('x', String(((layout.width || 800) - (layout.margin?.l || 50) - (layout.margin?.r || 30)) / 2));
            placeholder.setAttribute('y', String(((layout.height || 400) - (layout.margin?.t || 50) - (layout.margin?.b || 40)) / 2));
            placeholder.setAttribute('text-anchor', 'middle');
            placeholder.setAttribute('font-size', '14');
            placeholder.setAttribute('fill', '#9ca3af');
            placeholder.textContent = `Plotly Chart (${data[0]?.type || 'scatter'})`;
            chartGroup.appendChild(placeholder);
            
            svg.appendChild(chartGroup);
            
            // Clear container and add SVG
            div.innerHTML = '';
            div.appendChild(svg);
            
            return { data, layout };
          },
          react: async (div: HTMLElement, data: any[], layout: any, config?: any) => {
            return mockPlotly.newPlot(div, data, layout, config);
          },
          purge: (div: HTMLElement) => {
            div.innerHTML = '';
          },
          resize: (div: HTMLElement) => {
            // Mock resize implementation
          },
        };

        // Clear previous chart
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // Render new chart
        const figure = await mockPlotly.newPlot(
          containerRef.current,
          data,
          {
            width: 800,
            height: 400,
            paper_bgcolor: '#ffffff',
            plot_bgcolor: '#ffffff',
            margin: { l: 50, r: 30, t: 50, b: 40 },
            showlegend: true,
            ...layout,
          },
          {
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
            toImageButtonOptions: {
              format: 'png',
              filename: 'plotly-chart',
              height: 600,
              width: 800,
              scale: 2,
            },
            ...config,
          }
        );

        plotlyRef.current = mockPlotly;
        onReady?.(figure);

      } catch (error) {
        console.error('Plotly chart error:', error);
        onError?.(error);
        
        // Show error state
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 400px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #f9fafb;">
              <div style="text-align: center; color: #6b7280;">
                <div style="font-size: 24px; margin-bottom: 8px;">📊</div>
                <div style="font-weight: 600; margin-bottom: 4px;">Chart Error</div>
                <div style="font-size: 14px;">Unable to render Plotly chart</div>
              </div>
            </div>
          `;
        }
      }
    };

    renderChart();

    // Cleanup
    return () => {
      if (plotlyRef.current && containerRef.current) {
        plotlyRef.current.purge(containerRef.current);
      }
    };
  }, [data, layout, config, onReady, onError]);

  return (
    <div 
      ref={containerRef} 
      className={`plotly-chart-container ${className || ''}`}
      style={{ minHeight: '400px' }}
    />
  );
};
