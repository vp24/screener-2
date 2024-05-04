import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const YahooDataComponent = ({ yahooData }) => {
  const { epsTrend, growthEstimates } = yahooData;

  const epsTrendColumns = epsTrend.slice(0, 4);
  const epsTrendData = epsTrend.slice(4);

  const epsTrendRows = ["Current Estimate", "7 Days Ago", "30 Days Ago", "60 Days Ago", "90 Days Ago"];
  const growthEstimateRows = ["Current Qtr.", "Next Qtr.", "Current Year", "Next Year", "Next 5 Years (per annum)", "Past 5 Years (per annum)"];

  return (
    <Box my={4}>
      <Typography variant="h4" component="h2" gutterBottom>
        Estimates and Revisions
      </Typography>

      <Typography variant="h5" component="h3" gutterBottom>
        EPS Trend
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {epsTrendColumns.map((column, index) => (
                <TableCell key={index}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {epsTrendRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{row}</TableCell>
                {epsTrendColumns.map((column, columnIndex) => (
                  <TableCell key={columnIndex}>
                    {epsTrendData[rowIndex * epsTrendColumns.length + columnIndex]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" component="h3" gutterBottom mt={4}>
        Growth Estimates
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>% Estimates</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {growthEstimateRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{row}</TableCell>
                <TableCell>{growthEstimates[rowIndex]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  </TableContainer>
    </Box>
  );
};

export default YahooDataComponent;