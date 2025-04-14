import React from 'react';
import Chart from 'react-apexcharts';

const Charts = ({ data }) => {
  const chartData = {
    options: {
      chart: { id: "insights-chart" },
      xaxis: { categories: data.map(item => item.country || "Unknown") }
    },
    series: [
      { name: "Intensity", data: data.map(item => item.intensity || 0) },
      { name: "Relevance", data: data.map(item => item.relevance || 0) }
    ]
  };

  return <Chart options={chartData.options} series={chartData.series} type="bar" width="100%" />;
};

export default Charts;
