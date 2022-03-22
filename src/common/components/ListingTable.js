import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from "styled-components";

function createData(Price, Expiration, From) {
  return { Price, Expiration, From };
}
const TableDown = styled(Table)`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c8c8c8;
  border-radius: 0px 0px 3px 3px;
  opacity: 1;
  table-layout: fixed;
  width: 100%;
`;
const TableUp = styled(Table)`
  height: 0px;
  table-layout: fixed;
  width: 100%;
  margin-bottom: 8px;
`;
const rows = [
  // createData("0.32 Eth", "in 5 days", "Ravi"),
  // createData("0.32 Eth", "in 5 days", "Ravi"),
  // createData("0.32 Eth", "in 5 days", "Ravi"),  
];

export default function ListingsTable() {
  return (
    <TableContainer component={Paper} elevation={0}>
      <TableUp aria-label="simple table" >
        <thead>
          <tr>
            <th>Price</th>
            <th >Expiration</th>
            <th >From</th>
          </tr>
        </thead>
        </TableUp>
        <TableDown aria-label="simple table">
        {rows.length > 0 ? 
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <td component="td" scope="row">
                {row.Price}
              </td>
              <td >{row.Expiration}</td>
              <td  style={{color:"#366EEF"}}>{row.From}</td>
            </tr>
          ))}
        </tbody>
                  :           <div className="no-data m33 ">
                  <p>No information available</p>
                  </div>}
      </TableDown>
    </TableContainer>
  );
}