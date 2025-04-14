import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import "./DashboardContent.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const API_BASE_URL = "http://localhost:5000";

const DashboardContent = () => {
    const [chartData, setChartData] = useState(null);
    const [likelihoodData, setLikelihoodData] = useState(null);
    const [relevanceData, setRelevanceData] = useState(null);
    const [yearData, setYearData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        end_year: "",
        topic: "",
        sector: "",
        region: "",
        pestle: "",
        source: "",
        swot: "",
        country: "",
        city: "",
    });
    const [filterOptions, setFilterOptions] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        fetchFilterOptions();
        fetchData();
    }, [filters]);

    const fetchFilterOptions = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/data`);
            const data = response.data;
            
            const uniqueValues = (key) => [...new Set(data.map(item => item[key]).filter(Boolean))];
            
            setFilterOptions({
                end_year: uniqueValues("end_year"),
                topic: uniqueValues("topic"),
                sector: uniqueValues("sector"),
                region: uniqueValues("region"),
                pestle: uniqueValues("pestle"),
                source: uniqueValues("source"),
                swot: uniqueValues("swot"),
                country: uniqueValues("country"),
                city: uniqueValues("city"),
            });
        } catch (error) {
            console.error("Error fetching filter options:", error);
        }
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError("");
            const response = await axios.get(`${API_BASE_URL}/data`, { params: filters });
            
            if (!response.data || response.data.length === 0) {
                setChartData(null);
                setLikelihoodData(null);
                setRelevanceData(null);
                setYearData(null);
                setError("No data available for the selected filters.");
                return;
            }

            const labels = response.data.map(item => item.topic || "Unknown");
            const intensities = response.data.map(item => item.intensity || 0);
            const likelihoods = response.data.map(item => item.likelihood || 0);
            const relevances = response.data.map(item => item.relevance || 0);
            const years = response.data.map(item => item.end_year || "Unknown");

            setChartData({
                labels,
                datasets: [
                    {
                        label: "Intensity by Topic",
                        data: intensities,
                        backgroundColor: "rgba(52, 152, 219, 0.7)",
                        borderColor: "rgba(52, 152, 219, 1)",
                        borderWidth: 1,
                        borderRadius: 5,
                        maxBarThickness: 50,
                    }
                ]
            });

            setLikelihoodData({
                labels,
                datasets: [
                    {
                        label: "Likelihood by Topic",
                        data: likelihoods,
                        borderColor: "rgba(231, 76, 60, 1)",
                        backgroundColor: "rgba(231, 76, 60, 0.2)",
                        borderWidth: 2,
                        pointRadius: 4,
                        fill: true,
                    }
                ]
            });

            setRelevanceData({
                labels,
                datasets: [
                    {
                        label: "Relevance by Topic",
                        data: relevances,
                        backgroundColor: "rgba(46, 204, 113, 0.7)",
                        borderColor: "rgba(46, 204, 113, 1)",
                        borderWidth: 1,
                        borderRadius: 5,
                        maxBarThickness: 50,
                    }
                ]
            });

            const yearCounts = years.reduce((acc, year) => {
                acc[year] = (acc[year] || 0) + 1;
                return acc;
            }, {});

            setYearData({
                labels: Object.keys(yearCounts),
                datasets: [
                    {
                        label: "Occurrences by Year",
                        data: Object.values(yearCounts),
                        borderColor: "rgba(255, 165, 0, 1)",
                        backgroundColor: "rgba(255, 165, 0, 0.5)",
                        borderWidth: 2,
                        pointRadius: 4,
                        fill: true,
                    }
                ]
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load data. Please try again.");
            setChartData(null);
            setLikelihoodData(null);
            setRelevanceData(null);
            setYearData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="dashboard">
            <h2>Data Insights</h2>
            <div className="filters">
                {Object.keys(filters).map((filterKey) => (
                    <div className="filter-item" key={filterKey}>
                        <label>{filterKey.replace("_", " ").toUpperCase()}</label>
                        <select name={filterKey} value={filters[filterKey]} onChange={handleFilterChange}>
                            <option value="">All</option>
                            {filterOptions[filterKey]?.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            <div className="chart-container">
                <div className="chart-title">Intensity by Topic</div>
                {chartData && <Bar data={chartData} options={{ responsive: true }} />}
            </div>
            <div className="chart-container">
                <div className="chart-title">Likelihood by Topic</div>
                {likelihoodData && <Line data={likelihoodData} options={{ responsive: true }} />}
            </div>
            <div className="chart-container">
                <div className="chart-title">Relevance by Topic</div>
                {relevanceData && <Bar data={relevanceData} options={{ responsive: true }} />}
            </div>
            <div className="chart-container">
                <div className="chart-title">Occurrences by Year</div>
                {yearData && <Line data={yearData} options={{ responsive: true }} />}
            </div>
           
        </div>
        
    );
};

export default DashboardContent;
