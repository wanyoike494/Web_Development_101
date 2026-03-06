import { useState, useEffect, useRef } from 'react';

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export const useChart = (initialData: ChartData) => {
  const [data, setData] = useState<ChartData>(initialData);
  const chartRef = useRef<any>(null);

  const updateData = (newData: Partial<ChartData>) => {
    setData(prev => ({
      ...prev,
      ...newData,
    }));
  };

  const addDataPoint = (label: string, values: number[]) => {
    setData(prev => ({
      labels: [...prev.labels, label],
      datasets: prev.datasets.map((dataset, index) => ({
        ...dataset,
        data: [...dataset.data, values[index] || 0],
      })),
    }));
  };

  const removeDataPoint = (index: number) => {
    setData(prev => ({
      labels: prev.labels.filter((_, i) => i !== index),
      datasets: prev.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.filter((_, i) => i !== index),
      })),
    }));
  };

  const exportChart = () => {
    if (chartRef.current) {
      const canvas = chartRef.current.canvas;
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'chart.png';
      link.href = url;
      link.click();
    }
  };

  return {
    data,
    chartRef,
    updateData,
    addDataPoint,
    removeDataPoint,
    exportChart,
  };
};
