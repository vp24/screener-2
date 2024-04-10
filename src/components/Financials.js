import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import StockName from "./StockName";
import Pr10TextsDisplay from "./Pr10TextsDisplay";

const formatNumber = (value) => {
  if (typeof value === 'string') {
    const number = Number(value.replace(/,/g, ''));
    if (!isNaN(number)) {
      return number.toLocaleString('en-US');
    }
  }
  return value;
};

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
    <Box my={4}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h5" component="div">
          <strong>
            {mkCapLabel}: {formatNumber(valuationTable[1]?.[lastThreeYears[0]])}
          </strong>
        </Typography>
      </Box>
      <Box textAlign="center" mb={4}>
        <Pr10TextsDisplay pr10Texts={data.map(({ pr10Text }) => pr10Text)} />
      </Box>
      <Box mb={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Financials
        </Typography>
        <Grid container spacing={2}>
          {lastThreeYears.map((index, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Box bgcolor="#f9f9f9" p={2} borderRadius={4}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {valuationTable[0][index]}
                </Typography>
                <Typography variant="body1">
                  <strong>{netSalesLabel}</strong>: {formatNumber(iseTableA[1]?.[index])}
                </Typography>
                <Typography variant="body1">
                  <strong>{netIncomeLabel}</strong>: {formatNumber(iseTableA[6]?.[index])}
                </Typography>
                <Typography variant="body1">
                  <strong>{netCashLabel}</strong>: {formatNumber(bsTable[2]?.[index])}
                </Typography>
                <Typography variant="body1">
                  <strong>{netDebtLabel}</strong>: {formatNumber(bsTable[1]?.[index])}
                </Typography>
                <Typography variant="body1">
                  <strong>{peRatioLabel}</strong>: {valuationTable[3]?.[index]}
                </Typography>
                <Typography variant="body1">
                  <strong>{yieldLabel}</strong>: {valuationTable[4]?.[index]}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box textAlign="center">
        <Typography variant="h5" component="div">
          <strong>
            {mkCapLabel}: {formatNumber(valuationTable[1]?.[lastThreeYears[0]])}
          </strong>
        </Typography>
      </Box>
    </Box>
  );
};

export default Financials;