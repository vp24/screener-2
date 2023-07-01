import React from 'react';
import './DataDisplay.css';

const DataDisplay = ({ data }) => {
  const excludedRows = {
    valuationTable: [7, 11, 13],
    iseTableA: [2, 3, 5, 11, 13],
  };

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

  const isMobile = window.innerWidth <= 768;

  return (
    <div>
      {data.map(({ tableID, tableData }) => {
        if (excludedRows[tableID]) {
          tableData = tableData.filter((_, rowIndex) => !excludedRows[tableID].includes(rowIndex));
        }

        if (tableID === 'bsTable') {
          tableData = tableData.slice(0, 3);
        }

        return (
          <div key={tableID} className="table-scroll">
            <table className="data-table">
              <caption>{tableID === 'valuationTable' ? 'Valuation' : (tableID === 'iseTableA' ? 'Income Statement Evolution (Annual data)' : 'Balance Sheet (Annual data)')}</caption>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                      if (isMobile && cellIndex === 1) {
                        return null;
                      }
                      let displayCell = cell.includes("Fiscal Period") ? "Year" : cell;
                      return (
                        <td key={cellIndex} className={cellIndex === 0 ? 'bold small-font' : 'small-font'}>
                          {cellIndex === 0 ? capitalize(convertToSuperscript(displayCell)) : displayCell}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default DataDisplay;
