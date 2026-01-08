import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

// Register Chart.js components including Filler for area effects
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);
import { useState, useEffect } from "react";

import supabase from "../../lib/supabase";

export default function LineChart() {
    const [lineData, setLineData] = useState(null)

    useEffect(() => {
        async function lineChartData() {
            try {
                const { data, error } = await supabase
                    .from("sales")
                    .select("month, amount");

                if (error) {
                    console.log(error);
                    return;
                }

                console.log("Supabase Line Data", data);

                if (data) {
                    setLineData({
                        labels: data.map(d => d.month),
                        datasets: [
                            {
                                label: "sales",
                                data: data.map(d => d.amount)
                            }
                        ]
                    })
                }

            } catch (error) {
                console.log(error)
            }
        }
        lineChartData();
    }, [])


    if (!lineData) return (
        <div className="w-full bg-white p-4 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300 flex items-center justify-center h-[300px]">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-4 w-32 bg-slate-200 rounded mb-4"></div>
                <div className="h-40 w-full bg-slate-100 rounded"></div>
            </div>
        </div>
    );

    return (
        <div className="w-full bg-white p-4 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300">
            <div className="h-[250px] w-full">
                <Line data={lineData} />
            </div>
        </div>
    );
}
