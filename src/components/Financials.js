import React from "react";
import "./Financials.css";

const Financials = ({ data }) => {
  const findTable = (id) =>
    data.find((item) => item.tableID === id)?.tableData || [];

  const valuationTable = findTable("valuationTable");
  const iseTableA = findTable("iseTableA");
  const bsTable = findTable("bsTable");

  let mkCapLabel = valuationTable[1]?.[0];
  if (mkCapLabel === "Capitalization") {
    mkCapLabel = "Mkt Cap";
  }
  let peRatioLabel = valuationTable[3]?.[0];
  let yieldLabel = valuationTable[4]?.[0];
  let netSalesLabel = iseTableA[1]?.[0];
  let netIncomeLabel = iseTableA[6]?.[0];
  let netDebtLabel = bsTable[1]?.[0];
  let netCashLabel = bsTable[2]?.[0];

  // Convert numbers in labels to superscript
  const convertToSuperscript = (label) => {
    return label.replace(/([a-zA-Z]+)\s?(\d+)/g, (_, text, number) => {
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

  mkCapLabel = capitalize(convertToSuperscript(mkCapLabel));
  peRatioLabel = capitalize(convertToSuperscript(peRatioLabel));
  yieldLabel = capitalize(convertToSuperscript(yieldLabel));
  netSalesLabel = capitalize(convertToSuperscript(netSalesLabel));
  netIncomeLabel = capitalize(convertToSuperscript(netIncomeLabel));
  netDebtLabel = capitalize(convertToSuperscript(netDebtLabel));
  netCashLabel = capitalize(convertToSuperscript(netCashLabel));

  const mkCap = valuationTable[1]?.[6];
  const peRatio2023 = valuationTable[3]?.[6];
  const yield2023 = valuationTable[4]?.[6];
  const netSales2023 = iseTableA[1]?.[6];
  const netIncome2023 = iseTableA[6]?.[6];
  const netDebt2023 = bsTable[1]?.[6];
  const netCash2023 = bsTable[2]?.[6];

  const peRatio2024 = valuationTable[3]?.[7];
  const yield2024 = valuationTable[4]?.[7];
  const netSales2024 = iseTableA[1]?.[7];
  const netIncome2024 = iseTableA[6]?.[7];
  const netDebt2024 = bsTable[1]?.[7];
  const netCash2024 = bsTable[2]?.[7];

  const peRatio2025 = valuationTable[3]?.[8];
  const yield2025 = valuationTable[4]?.[8];
  const netSales2025 = iseTableA[1]?.[8];
  const netIncome2025 = iseTableA[6]?.[8];
  const netDebt2025 = bsTable[1]?.[8];
  const netCash2025 = bsTable[2]?.[8];

  return (
    <div className="financials">
      <h2>Financials</h2>
      <div className="financials-grid">
        <div>
          <h3>2023</h3>
          <p><strong>{netSalesLabel}</strong>: {netSales2023}</p>
          <p><strong>{netIncomeLabel}</strong>: {netIncome2023}</p>
          <p><strong>{netCashLabel}</strong>: {netCash2023}</p>
          <p><strong>{netDebtLabel}</strong>: {netDebt2023}</p>
          <p><strong>{peRatioLabel}</strong>: {peRatio2023}</p>
          <p><strong>{yieldLabel}</strong>: {yield2023}</p>
        </div>
        <div>
          <h3>2024</h3>
          <p><strong>{netSalesLabel}</strong>: {netSales2024}</p>
          <p><strong>{netIncomeLabel}</strong>: {netIncome2024}</p>
          <p><strong>{netCashLabel}</strong>: {netCash2024}</p>
          <p><strong>{netDebtLabel}</strong>: {netDebt2024}</p>
          <p><strong>{peRatioLabel}</strong>: {peRatio2024}</p>
          <p><strong>{yieldLabel}</strong>: {yield2024}</p>
        </div>
        <div>
          <h3>2025</h3>
          <p><strong>{netSalesLabel}</strong>: {netSales2025}</p>
          <p><strong>{netIncomeLabel}</strong>: {netIncome2025}</p>
          <p><strong>{netCashLabel}</strong>: {netCash2025}</p>
          <p><strong>{netDebtLabel}</strong>: {netDebt2025}</p>
          <p><strong>{peRatioLabel}</strong>: {peRatio2025}</p>
          <p><strong>{yieldLabel}</strong>: {yield2025}</p>
        </div>
      </div>
      <div className="mkt-cap">
        <h3>{mkCapLabel}</h3>
        <p>{mkCap}</p>
      </div>
    </div>
  );
};

export default Financials;
