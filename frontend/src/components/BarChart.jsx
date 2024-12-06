import React, { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from "recoil";
import { path, monthAtom } from "./Atom";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = () => {
    const [month, setMonth] = useRecoilState(monthAtom);
    const setPath = useSetRecoilState(path);
    const [data, setData] = useState([]);

    useEffect(() => {
        setPath(["/visualize", "/statistics"]);
    }, [setPath]);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:3000/api/v1/user/priceRange?month=${month}`);
            if (response.ok) {
                const data = await response.json();
                setData(data);
            } else {
                console.error("Error fetching data");
            }
        }
        fetchData();
    }, [month]);
    return (
        <div className="chart-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '70vh' }}>
            <div style={{ width: '80%', height: '100%' }}>
                <h1 className="text-3xl font-semibold text-center">
                    Bar Chart Stats -
                    <select name="month" id="month" className="p-2 bg-transparent" value={month} onChange={(e) => setMonth(e.target.value)}>
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                            <option key={month} value={month} className='text-sm'>{month}</option>
                        ))}
                    </select>
                </h1>
                <Bar
                    data={{
                        labels: Array.from({ length: 10 }, (_, i) => `Range ${i + 1}`),
                        datasets: [
                            {
                                label: 'Number of Occurrences',
                                data: data.priceRanges,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Price Range Occurrences',
                            },
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                },
                            },
                            y: {
                                grid: {
                                    display: false,
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default BarChart;