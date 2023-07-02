import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import "./DataDisplay.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: '10px', /* Adjust padding for mobile */
    textAlign: 'center', /* Center the text for mobile */
  },
  padding: '20px', /* Adjust padding for larger screens */
  textAlign: 'center', /* Center the text for larger screens */
  borderRight: '1px solid rgba(224, 224, 224, 1)',
  '&:last-child': {
    borderRight: 'none',
  },
}));


const DataDisplay = ({ data }) => {
  const excludedRows = {
    valuationTable: [7, 11, 13],
    iseTableA: [2, 3, 5, 11, 13],
  };

  const convertToSuperscript = (label) => {
    return label.replace(/(\S+)\s?(\d+)/g, (_, text, number) => {
      const superscriptMap = {
        0: "⁰",
        1: "¹",
        2: "²",
        3: "³",
        4: "⁴",
        5: "⁵",
        6: "⁶",
        7: "⁷",
        8: "⁸",
        9: "⁹",
      };
      return text + (superscriptMap[number] || "");
    });
  };

  const capitalize = (label) => {
    return label
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  };

  return (
    <div className="data-table-container">
      {data.map(({ tableID, tableData }) => {
        if (excludedRows[tableID]) {
          tableData = tableData.filter(
            (_, rowIndex) => !excludedRows[tableID].includes(rowIndex)
          );
        }

        if (tableID === "bsTable") {
          tableData = tableData.slice(0, 3);
        }

        const tableTitle =
          tableID === "valuationTable"
            ? "Valuation"
            : tableID === "iseTableA"
            ? "Income Statement Evolution"
            : "Balance Sheet";

        return (
          <TableContainer component={Paper} key={tableID}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}>
              <Typography variant="subtitle1" gutterBottom component="div">
                {tableTitle}
              </Typography>
            </Box>
            <Table>
              <TableBody>
                {tableData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                      let displayCell = cell.includes("Fiscal Period")
                        ? "Year"
                        : cell;
                      return (
                        <StyledTableCell
                          key={cellIndex}
                          className={
                            "custom-table-cell " +
                            (cellIndex === 0 ? "bold small-font" : "small-font")
                          }>
                          {cellIndex === 0
                            ? capitalize(convertToSuperscript(displayCell))
                            : displayCell}
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      })}
    </div>
  );
};

export default DataDisplay;
