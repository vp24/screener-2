import React from "react";
import "./Financials.css";
import StockName from "./StockName";
import Pr10TextsDisplay from './Pr10TextsDisplay';

const Financials = ({ data, scrapedLink }) => {
  const findTable = (id) =>
    data.find((item) => item.tableID === id)?.tableData || [];

  const valuationTable = findTable("valuationTable");
  const iseTableA = findTable("iseTableA");
  const bsTable = findTable("bsTable");

  const allYears = valuationTable[0] ? valuationTable[0].slice(1) : [];
  const latestThreeYears = allYears.slice(-3);

  const convertToSuperscript = (label) => {
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
    return label.replace(/([a-zA-Z]+)\s?(\d+)/g, (_, text, number) => text + (superscriptMap[number] || ""));
  };

  const capitalize = (label) => {
    return label.split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
  };

  const formatLabel = (label) => capitalize(convertToSuperscript(label));

  const labels = {
    mkCap: formatLabel(valuationTable[1]?.[0] === "Capitalization" ? "Mkt Cap" : valuationTable[1]?.[0]),
    peRatio: formatLabel(valuationTable[3]?.[0]),
    yield: formatLabel(valuationTable[4]?.[0]),
    netSales: formatLabel(iseTableA[1]?.[0]),
    netIncome: formatLabel(iseTableA[6]?.[0]),
    netDebt: formatLabel(bsTable[1]?.[0]),
    netCash: formatLabel(bsTable[2]?.[0]),
  };

  return (
    <div>
      <div className="mkt-cap">
        <h3><strong>{labels.mkCap}: {valuationTable[1]?.[6]}</strong></h3>
      </div>
      <div className="center">
        <Pr10TextsDisplay pr10Texts={data.map(({ pr10Text }) => pr10Text)} />
      </div>
      <div className="financials">
        <h2>Financials</h2>
        <div className="financials-grid">
          {latestThreeYears.map((year, i) => (
            <div key={i}>
              <h3>{year}</h3>
              <p><strong>{labels.netSales}</strong>: {iseTableA[1]?.[allYears.length - 3 + i]}</p>
              <p><strong>{labels.netIncome}</strong>: {iseTableA[6]?.[allYears.length - 3 + i]}</p>
              <p><strong>{labels.netCash}</strong>: {bsTable[2]?.[allYears.length - 3 + i]}</p>
              <p><strong>{labels.netDebt}</strong>: {bsTable[1]?.[allYears.length - 3 + i]}</p>
              <p><strong>{labels.peRatio}</strong>: {valuationTable[3]?.[allYears.length - 3 + i]}</p>
              <p><strong>{labels.yield}</strong>: {valuationTable[4]?.[allYears.length - 3 + i]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Financials;
