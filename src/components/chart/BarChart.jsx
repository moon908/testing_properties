import { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);
import supabase from "../../lib/supabase";

const revenue = [200, 120, 150, 180, 220, 250, 280, 300, 320, 350, 380, 400];

export default function SalesChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const { data, error } = await supabase
                    .from("sales")
                    .select("month, amount");

                if (error) {
                    console.error("Supabase error:", error);
                    return;
                }

                console.log("Supabase Bar Data:", data); // Debugging log

                if (data) {
                    setChartData({
                        labels: data.map(d => d.month),
                        datasets: [
                            {
                                label: "Sales",
                                data: data.map(d => d.amount),
                                backgroundColor: "rgba(59, 130, 246, 0.8)", // Blue-500
                                hoverBackgroundColor: "rgba(59, 130, 246, 1)",
                                borderRadius: 4,
                                borderSkipped: false,
                                barThickness: 28,
                            },
                            {
                                label: "Revenue",
                                data: revenue,
                                backgroundColor: "rgba(168, 85, 247, 0.8)", // Purple-500
                                hoverBackgroundColor: "rgba(168, 85, 247, 1)",
                                borderRadius: 4,
                                borderSkipped: false,
                                barThickness: 28,
                            }
                        ]
                    })
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            }
        }
        loadData();
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12,
                    },
                    padding: 20,
                    color: '#475569'
                }
            },
            title: {
                display: true,
                text: "Monthly Performance",
                align: "start",
                font: {
                    family: "'Inter', sans-serif",
                    size: 18,
                    weight: "bold",
                },
                color: "#1e293b",
                padding: { bottom: 20 },
            },
            tooltip: {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                titleColor: "#1e293b",
                bodyColor: "#475569",
                borderColor: "#e2e8f0",
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8,
                titleFont: {
                    family: "'Inter', sans-serif",
                    size: 13
                },
                bodyFont: {
                    family: "'Inter', sans-serif",
                    size: 12
                },
                displayColors: true,
                boxPadding: 4,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 11,
                    },
                    color: '#64748b'
                },
                border: {
                    display: false
                }
            },
            y: {
                border: {
                    display: false
                },
                grid: {
                    color: '#f1f5f9',
                    borderDash: [8, 4],
                },
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 11,
                    },
                    color: '#64748b',
                    padding: 10,
                    callback: function (value) {
                        return '$' + value;
                    }
                }
            }
        },
        layout: {
            padding: 10
        },
        animation: {
            duration: 1000,
            easing: 'easeOutQuart',
        }
    };

    if (!chartData) return (
        <div className="w-full bg-white p-4 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300 flex items-center justify-center h-[300px]">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-4 w-32 bg-slate-200 rounded mb-4"></div>
                <div className="h-40 w-full bg-slate-100 rounded"></div>
            </div>
        </div>
    );

    return (
        <div className="w-full bg-white p-4 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300">
            <div className="h-[300px] w-full">
                <Bar options={options} data={chartData} />
            </div>
        </div>
    );
}
