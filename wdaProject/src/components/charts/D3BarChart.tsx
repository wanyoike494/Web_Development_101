import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  category: string;
  value: number;
  label?: string;
}

interface D3BarChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  color?: string;
  orientation?: 'vertical' | 'horizontal';
  showGrid?: boolean;
  showValues?: boolean;
  animated?: boolean;
}

export const D3BarChart = ({
  data,
  width = 800,
  height = 400,
  margin = { top: 20, right: 30, bottom: 40, left: 50 },
  color = '#3b82f6',
  orientation = 'vertical',
  showGrid = true,
  showValues = true,
  animated = true,
}: D3BarChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous content

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = orientation === 'vertical' 
      ? d3.scaleBand()
          .domain(data.map(d => d.category))
          .range([0, innerWidth])
          .padding(0.1)
      : d3.scaleLinear()
          .domain([0, d3.max(data, d => d.value) || 0])
          .range([0, innerWidth]);

    const yScale = orientation === 'vertical'
      ? d3.scaleLinear()
          .domain([0, d3.max(data, d => d.value) || 0])
          .range([innerHeight, 0])
      : d3.scaleBand()
          .domain(data.map(d => d.category))
          .range([0, innerHeight])
          .padding(0.1);

    // Create main group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add grid lines
    if (showGrid) {
      if (orientation === 'vertical') {
        g.append('g')
          .attr('class', 'grid grid--horizontal')
          .attr('transform', `translate(0,0)`)
          .call(d3.axisLeft(yScale)
            .tickSize(-innerWidth)
            .tickFormat(() => '')
          );
      } else {
        g.append('g')
          .attr('class', 'grid grid--vertical')
          .attr('transform', `translate(0,${innerHeight})`)
          .call(d3.axisBottom(xScale)
            .tickSize(-innerHeight)
            .tickFormat(() => '')
          );
      }
    }

    // Add axes
    if (orientation === 'vertical') {
      g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale));

      g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(yScale));
    } else {
      g.append('g')
        .attr('class', 'axis axis--x')
        .call(d3.axisBottom(xScale));

      g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(yScale));
    }

    // Add bars
    const bars = g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('fill', color)
      .attr('stroke', 'none');

    if (orientation === 'vertical') {
      bars
        .attr('x', d => xScale(d.category) || 0)
        .attr('y', innerHeight)
        .attr('width', xScale.bandwidth())
        .attr('height', 0)
        .on('mouseover', function(event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('opacity', 0.8);
          
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
            <div><strong>${d.category}</strong></div>
            <div>${d.value.toLocaleString()}</div>
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
            .attr('opacity', 1);
          
          d3.select('.tooltip').remove();
        });

      if (animated) {
        bars.transition()
          .duration(800)
          .delay((d, i) => i * 50)
          .attr('y', d => yScale(d.value) || 0)
          .attr('height', d => innerHeight - (yScale(d.value) || 0));
      } else {
        bars
          .attr('y', d => yScale(d.value) || 0)
          .attr('height', d => innerHeight - (yScale(d.value) || 0));
      }

      // Add values on top of bars
      if (showValues) {
        g.selectAll('.value')
          .data(data)
          .enter().append('text')
          .attr('class', 'value')
          .attr('x', d => (xScale(d.category) || 0) + xScale.bandwidth() / 2)
          .attr('y', d => (yScale(d.value) || 0) - 5)
          .attr('text-anchor', 'middle')
          .attr('font-size', '12px')
          .attr('fill', '#374151')
          .text(d => d.value.toLocaleString());
      }
    } else {
      bars
        .attr('x', 0)
        .attr('y', d => yScale(d.category) || 0)
        .attr('width', 0)
        .attr('height', yScale.bandwidth())
        .on('mouseover', function(event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('opacity', 0.8);
          
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
            <div><strong>${d.category}</strong></div>
            <div>${d.value.toLocaleString()}</div>
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
            .attr('opacity', 1);
          
          d3.select('.tooltip').remove();
        });

      if (animated) {
        bars.transition()
          .duration(800)
          .delay((d, i) => i * 50)
          .attr('x', d => xScale(d.value) || 0);
      } else {
        bars
          .attr('x', d => xScale(d.value) || 0);
      }

      // Add values at end of bars
      if (showValues) {
        g.selectAll('.value')
          .data(data)
          .enter().append('text')
          .attr('class', 'value')
          .attr('x', d => (xScale(d.value) || 0) + 5)
          .attr('y', d => (yScale(d.category) || 0) + yScale.bandwidth() / 2)
          .attr('dy', '0.35em')
          .attr('font-size', '12px')
          .attr('fill', '#374151')
          .text(d => d.value.toLocaleString());
      }
    }

  }, [data, width, height, margin, color, orientation, showGrid, showValues, animated]);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="d3-bar-chart"
      />
    </div>
  );
};
