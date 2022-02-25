import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  color: #000000;
  font-size: 16px;
  font-weight: bold;
`;
const FilterContainer = styled.div`
  display: flex;
`;
const Select = styled.select`
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  width: 100px;
  padding: 5px;
`;
const Option = styled.option`
  font-size: 14px;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  background: #ffffff;
  color: #366eef;
  font-size: 14px;
  margin-left: 16px;
  padding: 0px 5px 0px 5px;
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #366eef;
`;

function createData(Event, Price, From, To, Date) {
  return { Event, Price, From, To, Date };
}

const rows = [
  createData("List", "0.32ETH", "Ravi", "John", "25Feb"),
  createData("Buy", "0.32ETH", "Ravi", "John", "25Feb"),
  createData("price", "0.32ETH", "Ravi", "John", "25Feb"),
];

export default function PricingHistoryComponentTable() {
  const [list, setEvent] = useState(false);
  const [price, setPrice] = useState(false);
  const [buy, setBuy] = useState(false);

  const handleChange = (e) => {
    if (e.target.value === "list") {
      setEvent(!list);
    } else if (e.target.value === "price") {
      setPrice(!price);
    } else if (e.target.value === "buy") {
      setBuy(!buy);
    }
  };

  const closeFilter = (key) => {
    if (key === "list") {
      setEvent(!list);
    } else if (key === "price") {
      setPrice(!price);
    } else if (key === "buy") {
      setBuy(!buy);
    }
  };

  return (
    <MainContainer>
      <Title>Activities</Title>
      <FilterContainer>
        <Select name="filter" onChange={(e) => handleChange(e)}>
          <Option>Filter</Option>
          <Option value="list">List</Option>
          <Option value="price">Price</Option>
          <Option value="buy">Buy</Option>
        </Select>
        {list ? (
          <Filter>
            <span style={{ marginRight: "10px" }}>List</span>
            <Button onClick={() => closeFilter("list")}>
              <i class="fa-solid fa-xmark"></i>
            </Button>
          </Filter>
        ) : (
          ""
        )}
        {price ? (
          <Filter>
            <span style={{ marginRight: "10px" }}>Price</span>
            <Button onClick={() => closeFilter("price")}>
              <i class="fa-solid fa-xmark"></i>
            </Button>
          </Filter>
        ) : (
          ""
        )}
        {buy ? (
          <Filter>
            <span style={{ marginRight: "10px" }}>Buy</span>
            <Button onClick={() => closeFilter("buy")}>
              <i class="fa-solid fa-xmark"></i>
            </Button>
          </Filter>
        ) : (
          ""
        )}
      </FilterContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#191919", fontWeight: "bold" }}>
                Event
              </TableCell>
              <TableCell
                align="right"
                style={{ color: "#191919", fontWeight: "bold" }}
              >
                Price
              </TableCell>
              <TableCell
                align="right"
                style={{ color: "#191919", fontWeight: "bold" }}
              >
                From
              </TableCell>
              <TableCell
                align="right"
                style={{ color: "#191919", fontWeight: "bold" }}
              >
                To
              </TableCell>
              <TableCell
                align="right"
                style={{ color: "#191919", fontWeight: "bold" }}
              >
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Event}
                </TableCell>
                <TableCell align="right">{row.Price}</TableCell>
                <TableCell align="right">{row.From}</TableCell>
                <TableCell align="right">{row.To}</TableCell>
                <TableCell align="right">{row.Date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainContainer>
  );
}
