import React from 'react';
import { Chart } from 'chart.js/auto'
import { Bar, Line } from "react-chartjs-2";




const CombinedChart = ({ data }) => {
  // Find iseTableA data
  const iseTableAData = data.find(({ tableID }) => tableID === 'iseTableA').tableData;

  // Extract the rows that you are interested in
  const labels = iseTableAData[0].slice(1);
  const salesData = iseTableAData[1].slice(1).map(value => value.replace(/,/g, ''));
  const netIncomeData = iseTableAData[6].slice(1).map(value => value.replace(/,/g, ''));
  const netMarginData = iseTableAData[7].slice(1).map(value => value.replace(/[%,]/g, ''));

  // Prepare data for the chart
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: salesData,
        backgroundColor: 'rgba(75,192,192,0.6)',
        yAxisID: 'y1', // Associate with the first y-axis
      },
      {
        label: 'Net Income',
        data: netIncomeData,
        backgroundColor: 'rgba(255,99,132,0.6)',
        yAxisID: 'y1', // Associate with the first y-axis
      },
      {
        label: 'Net Margin',
        data: netMarginData,
        borderColor: 'rgba(255,99,132,1)',
        type: 'line',
        fill: false,
        yAxisID: 'y2', // Associate with the second y-axis
      },
    ],
  };

 // Prepare options for the chart
 const chartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(tooltipItem) {
          const dataset = tooltipItem.chart.data.datasets[tooltipItem.datasetIndex];
          const currentValue = dataset.data[tooltipItem.parsed.x];
          return dataset.label + ': ' + currentValue;
        },
        title: function(tooltipItem) {
          return 'Year: ' + tooltipItem[0].chart.data.labels[tooltipItem[0].parsed.x];
        },
      },
    },
  },
  scales: {
    y1: {
      type: 'linear',
      display: true,
      position: 'left',
      beginAtZero: true,
    },
    y2: {
      type: 'linear',
      display: true,
      position: 'right',
      beginAtZero: true,
      ticks: {
        callback: function(value, index, values) {
          return value + '%';
        },
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

  return (
    <div>
      <h2>Income Statement Evolution</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default CombinedChart;
