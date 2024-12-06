// src/components/SalesOverview.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';

// Register the necessary components, including PointElement
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Legend, Tooltip);

const SalesOverview = () => {
  const data = {
    labels: ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'],
    datasets: [
      {
        label: 'Sales',
        data: [5000, 10000, 15000, 12000, 10000, 18000, 12000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
      },
      {
        label: 'Profit',
        data: [5, 10, 15, 8, 10, 18, 7],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        fill: true,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        position: 'left',
      },
      y1: {
        beginAtZero: true,
        position: 'right',
      },
    },
  };

  return (
    <div className="p-4">
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesOverview;
