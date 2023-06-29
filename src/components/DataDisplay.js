import React from 'react';
import '../App.css';

const DataDisplay = ({ data }) => {
  // Define excluded rows for each table
  const excludedRows = {
    valuationTable: [7, 11, 13],
    iseTableA: [2, 3, 5, 11, 13],
  };

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
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  };

  return (
    data.map(({ tableID, tableData }) => {
      // Filter out excluded rows
      if (excludedRows[tableID]) {
        tableData = tableData.filter((_, rowIndex) => !excludedRows[tableID].includes(rowIndex));
      }

      // Limit the number of rows for the Balance Sheet table
      if (tableID === 'bsTable') {
        tableData = tableData.slice(0, 3);
      }
      
      return (
        <div key={tableID}>
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
      );
    })
  );
};

export default DataDisplay;
