import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartProps {
  title: string;
  labels: string[];
  lineTitle: string;
  data: number[];
}

const family = 'Roboto';

const Chart = ({ data, labels, lineTitle, title }: ChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
            family,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
            family,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            family,
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          family,
          weight: '400',
        },
      },
    },
    elements: {
      line: {
        borderWidth: 1,
      },
    },
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: lineTitle,
        data,
        borderColor: '#eda1cb',
        backgroundColor: '#5287fb',
      },
    ],
  };
  return <Line options={options} data={lineData} />;
};

export default Chart;
