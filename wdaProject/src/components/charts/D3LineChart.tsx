import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  x: number | string;
  y: number;
  label?: string;
}

interface D3LineChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  color?: string;
  strokeWidth?: number;
  showGrid?: boolean;
  showDots?: boolean;
  curve?: d3.CurveFactory;
}

export const D3LineChart = ({
  data,
  width = 800,
  height = 400,
  margin = { top: 20, right: 30, bottom: 40, left: 50 },
  color = '#3b82f6',
  strokeWidth = 2,
  showGrid = true,
  showDots = true,
  curve = d3.curveMonotoneX,
}: D3LineChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous content

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x) as [number, number])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y) as [number, number])
      .range([innerHeight, 0]);

    // Create line generator
    const line = d3.line<DataPoint>()
      .x(d => xScale(d.x as number))
      .y(d => yScale(d.y))
      .curve(curve);

    // Create main group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add grid lines
    if (showGrid) {
      // Horizontal grid lines
      g.append('g')
        .attr('class', 'grid grid--horizontal')
        .attr('transform', `translate(0,0)`)
        .call(d3.axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
        );

      // Vertical grid lines
      g.append('g')
        .attr('class', 'grid grid--vertical')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale)
          .tickSize(-innerHeight)
          .tickFormat(() => '')
        );
    }

    // Add axes
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(yScale));

    // Add line path
    g.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', strokeWidth)
      .attr('d', line);

    // Add dots
    if (showDots) {
      g.selectAll('.dot')
        .data(data)
        .enter().append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.x as number))
        .attr('cy', d => yScale(d.y))
        .attr('r', 4)
        .attr('fill', color)
        .on('mouseover', function(event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', 6);
          
          // Show tooltip
          const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('background', 'rgba(0, 0, 0, 0.8)')
            .style('color', 'white')
            .style('padding', '8px')
            .style('border-radius', '4px')
            .style('font-size', '12px')
            .style('pointer-events', 'none')
            .style('opacity', 0);
          
          tooltip.html(`
            <div>${d.label || `X: ${d.x}`}</div>
            <div><strong>${d.y.toLocaleString()}</strong></div>
          `);
          
          tooltip.transition()
            .duration(200)
            .style('opacity', 1);
        })
        .on('mousemove', function(event) {
          d3.select('.tooltip')
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseout', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', 4);
          
          d3.select('.tooltip').remove();
        });
    }

  }, [data, width, height, margin, color, strokeWidth, showGrid, showDots, curve]);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="d3-line-chart"
      />
    </div>
  );
};
