import React from 'react';
import './YahooDataComponent.css';

const YahooDataComponent = ({ yahooData }) => {
  const { epsTrend, growthEstimates } = yahooData;
  
  // Separate column headers and row data
  const epsTrendColumns = epsTrend.slice(0, 4);
  const epsTrendData = epsTrend.slice(4);

  const epsTrendRows = ["Current Estimate", "7 Days Ago", "30 Days Ago", "60 Days Ago", "90 Days Ago"];
  const growthEstimateRows = ["Current Qtr.", "Next Qtr.", "Current Year", "Next Year", "Next 5 Years (per annum)", "Past 5 Years (per annum)"];

  return (
    <div>
    <h2>Estimates and Revisions</h2>
      
      <h3>EPS Trend</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
            {epsTrendColumns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {epsTrendRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className='label-bold'>{row}</td>
              {epsTrendColumns.map((column, columnIndex) => (
                <td key={columnIndex}>{epsTrendData[rowIndex * epsTrendColumns.length + columnIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <h3>Growth Estimates</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
            <th>% Estimates</th>
          </tr>
        </thead>
        <tbody>
          {growthEstimateRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className='label-bold'>{row}</td>
              <td>{growthEstimates[rowIndex]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YahooDataComponent;
