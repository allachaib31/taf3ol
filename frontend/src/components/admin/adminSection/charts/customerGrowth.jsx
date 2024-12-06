// src/components/CustomerGrowth.js
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

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Legend, Tooltip);

const CustomerGrowth = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Customers',
                data: [50, 100, 200, 300, 400, 550, 700, 850, 1000, 1200, 1350, 1500],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                fill: true,
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
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Customers',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
            },
        },
    };

    return (
        <div className="p-4">
            <Line data={data} options={options} />
        </div>
    );
};

export default CustomerGrowth;
