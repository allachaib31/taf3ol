// src/components/OrderStatistics.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
} from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const OrderStatistics = () => {
    const data = {
        labels: ['2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan', '7 Jan', '8 Jan'],
        datasets: [
            {
                label: 'Order',
                data: [1000, 800, 900, 700, 800, 500, 1000],
                backgroundColor: '#3b82f6',
            },
            {
                label: 'Sales',
                data: [300, 250, 300, 200, 250, 150, 300],
                backgroundColor: '#6366f1',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-4">
            <Bar data={data} options={options} />
        </div>
    );
};

export default OrderStatistics;
