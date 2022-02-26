import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(Price, Expiration, From) {
  return { Price, Expiration, From };
}

const rows = [
  createData("0.32 Eth", "in 5 days", "Ravi"),
  createData("0.32 Eth", "in 5 days", "Ravi"),
  createData("0.32 Eth", "in 5 days", "Ravi"),  
];

export default function ListingsTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" style={{tableLayout:"fixed", width:"100%"}}>
        <TableHead>
          <TableRow>
            <TableCell style={{color:"#191919", fontWeight:"bold"}}>Price</TableCell>
            <TableCell align="center" style={{color:"#191919", fontWeight:"bold"}}>Expiration</TableCell>
            <TableCell align="right" style={{color:"#191919", fontWeight:"bold"}}>From</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Price}
              </TableCell>
              <TableCell align="center">{row.Expiration}</TableCell>
              <TableCell align="right" style={{color:"#366EEF"}}>{row.From}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}