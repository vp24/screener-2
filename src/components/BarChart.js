import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  // Find iseTableA data
  const iseTableAData = data.find(({ tableID }) => tableID === 'iseTableA').tableData;

  // Extract the rows that you are interested in
  const labels = iseTableAData[0].slice(1);
  const salesData = iseTableAData[1].slice(1).map(value => value.replace(/,/g, ''));
  const netIncomeData = iseTableAData[6].slice(1).map(value => value.replace(/,/g, ''));

  // Prepare data for the chart
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: salesData,
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
      {
        label: 'Net Income',
        data: netIncomeData,
        backgroundColor: 'rgba(255,99,132,0.6)',
      },
    ],
  };

  // Prepare options for the chart
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Income Statement Evolution (ISE) - Sales vs Net Income</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
