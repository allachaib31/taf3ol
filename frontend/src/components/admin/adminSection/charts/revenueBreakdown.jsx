// src/components/RevenueBreakdown.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const RevenueBreakdown = () => {
    const data = {
        labels: ['Subscriptions', 'One-time Purchases', 'Services'],
        datasets: [
            {
                label: 'Revenue',
                data: [50000, 30000, 20000],
                backgroundColor: ['#4f46e5', '#3b82f6', '#22c55e'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `$${context.raw.toLocaleString()}`,
                },
            },
        },
    };

    return (
        <div className="p-4 flex justify-center">
            <div className="w-[10rem] sm:w-[30rem] sm:h-[30rem]"> {/* Controls the size of the Doughnut chart */}
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default RevenueBreakdown;
