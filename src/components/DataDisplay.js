import React from 'react';
import '../App.css';

const DataDisplay = ({ data }) => {
  // Convert numbers in labels to superscript
  const convertToSuperscript = (label) => {
    return label.replace(/(\S+)\s?(\d+)/g, (_, text, number) => {
      const superscriptMap = {
        "0": "⁰",
        "1": "¹",
        "2": "²",
        "3": "³",
        "4": "⁴",
        "5": "⁵",
        "6": "⁶",
        "7": "⁷",
        "8": "⁸",
        "9": "⁹",
      };
      return text + (superscriptMap[number] || "");
    });
  };

  const capitalize = (label) => {
    return label
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  };

  return (
    data.map(({ tableID, tableData }) => (
      <div key={tableID}>
        <p></p>
        <table className="data-table">
          <caption>{tableID === 'valuationTable' ? 'Valuation' : (tableID === 'iseTableA' ? 'Income Statement Evolution (Annual data)' : 'Balance Sheet (Annual data)')}</caption>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className={cellIndex === 0 ? 'bold' : ''}>
                    {cellIndex === 0 ? capitalize(convertToSuperscript(cell)) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))
  );
};

export default DataDisplay;
