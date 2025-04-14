import React, { useEffect, useState } from "react";

import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const API_BASE_URL = "http://localhost:5000";

const CountryCharts = () => {
    const [barChartData, setBarChartData] = useState(null);
    const [pieChartData, setPieChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCountryData();
    }, []);

    const fetchCountryData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/data`);
            const data = response.data;

            if (!data || data.length === 0) {
                setError("No country data available.");
                return;
            }

            const countryCounts = data.reduce((acc, item) => {
                if (item.country) {
                    acc[item.country] = (acc[item.country] || 0) + 1;
                }
                return acc;
            }, {});

            const labels = Object.keys(countryCounts);
            const values = Object.values(countryCounts);

            setBarChartData({
                labels,
                datasets: [
                    {
                        label: "Occurrences per Country",
                        data: values,
                        backgroundColor: "rgba(52, 152, 219, 0.7)",
                        borderColor: "rgba(52, 152, 219, 1)",
                        borderWidth: 1,
                        borderRadius: 5,
                        maxBarThickness: 50,
                    }
                ]
            });

            setPieChartData({
                labels,
                datasets: [
                    {
                        label: "Percentage Distribution",
                        data: values,
                        backgroundColor: [
                            "#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#9b59b6",
                            "#34495e", "#16a085", "#e67e22", "#1abc9c", "#c0392b"
                        ],
                        borderWidth: 1
                    }
                ]
            });
        } catch (error) {
            console.error("Error fetching country data:", error);
            setError("Failed to load country data.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Country-Based Data</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {isLoading && <p>Loading...</p>}
            
            <div className="chart-container">
                <h3>Occurrences per Country</h3>
                {barChartData && <Bar data={barChartData} options={{ responsive: true }} />}
            </div>
            
            <div className="chart-container">
                <h3>Percentage Distribution of Countries</h3>
                {pieChartData && <Pie data={pieChartData} options={{ responsive: true }} />}
            </div>
        </div>
    );
};

export default CountryCharts;
