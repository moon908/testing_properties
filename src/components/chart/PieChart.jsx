import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";
import supabase from "../../lib/supabase";

ChartJS.register(ArcElement, Tooltip, Legend, Title);


export default function PieChart() {
    const [pieData, setPieData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data, error } = await supabase
                    .from("sales")
                    .select("month, amount")

                if (error) {
                    console.log(error)
                    return;
                }

                console.log("Supabase Pie Data", data)

                if (data) {
                    setPieData({
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
        fetchData();
    }, []);

    if (!pieData) return (
        <div className="w-full bg-white p-4 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300 flex items-center justify-center h-[300px]">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-4 w-32 bg-slate-200 rounded mb-4"></div>
                <div className="h-40 w-full bg-slate-100 rounded"></div>
            </div>
        </div>
    );
    return (
        <div className="w-full bg-white p-4 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300">
            <div className="h-[250px] w-full flex items-center justify-center">
                <Pie data={pieData} />
            </div>
        </div>
    );
}
