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
  // This function gets the year from the table's header
  const getYearFromTable = (table, index) => table[0]?.[index];
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
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  };
  // applying capitalize and convertToSuperscript to labels
  mkCapLabel = capitalize(convertToSuperscript(mkCapLabel));
  peRatioLabel = capitalize(convertToSuperscript(peRatioLabel));
  yieldLabel = capitalize(convertToSuperscript(yieldLabel));
  netSalesLabel = capitalize(convertToSuperscript(netSalesLabel));
  netIncomeLabel = capitalize(convertToSuperscript(netIncomeLabel));
   netDebtLabel = capitalize(convertToSuperscript(netDebtLabel));
   netCashLabel = capitalize(convertToSuperscript(netCashLabel));

   // Get the indices of the last three columns/years
   const lastThreeYears = [-3, -2, -1].map((offset) => valuationTable[0].length + offset);

   return (
     <div>
       <div className="mkt-cap">
         <h3>
           <strong>
             {mkCapLabel}: {valuationTable[1]?.[lastThreeYears[0]]}
           </strong>
         </h3>
       </div>
       <div className="center">
         <Pr10TextsDisplay pr10Texts={data.map(({ pr10Text }) => pr10Text)} />
       </div>
       <div className="financials">
         <h2>Financials</h2>
         <div className="financials-grid">
           {lastThreeYears.map((index, i) => (
             <div key={i}>
               <h3>{valuationTable[0][index]}</h3>
               <p>
                 <strong>{netSalesLabel}</strong>: {iseTableA[1]?.[index]}
               </p>
               <p>
                 <strong>{netIncomeLabel}</strong>: {iseTableA[6]?.[index]}
               </p>
               <p>
                 <strong>{netCashLabel}</strong>: {bsTable[2]?.[index]}
               </p>
               <p>
                 <strong>{netDebtLabel}</strong>: {bsTable[1]?.[index]}
               </p>
               <p>
                 <strong>{peRatioLabel}</strong>: {valuationTable[3]?.[index]}
               </p>
               <p>
                 <strong>{yieldLabel}</strong>: {valuationTable[4]?.[index]}
               </p>
             </div>
           ))}
         </div>
       </div>
       <div className="mkt-cap">
         <h3>
           <strong>
             {mkCapLabel}: {valuationTable[1]?.[lastThreeYears[0]]}
           </strong>
         </h3>
       </div>
     </div>
   );
 };

 export default Financials;