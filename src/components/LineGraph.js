import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph = ({ data }) => {
  // Find iseTableA data
  const iseTableAData = data.find(({ tableID }) => tableID === 'iseTableA').tableData;

  // Extract the rows that you are interested in
  const labels = iseTableAData[0].slice(1);
  const netMarginData = iseTableAData[7].slice(1).map(value => value.replace(/[%,]/g, ''));

  // Prepare data for the chart
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Net Margin',
        data: netMarginData,
        backgroundColor: 'rgba(255,99,132,0.6)',
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
    ],
  };

  // Prepare options for the chart
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value, index, values) {
            return value + '%';
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Income Statement Evolution (ISE) - Net Margin</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineGraph;
