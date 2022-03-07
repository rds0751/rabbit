import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import { getPricingHistory } from "../../services/webappMicroservice";
import { useParams } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-family: 'poppins-bold';
  font-size: 16px;
  line-height: 25px;
  color: #000000;
  margin-bottom:23px;
`;
const FilterContainer = styled.div`
  display: flex;
  margin-bottom:20px;
`;
const Select = styled.select`
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  width: 108px;
  height:42px;
  padding: 5px;
  font-family: 'poppins-medium';
  font-size: 14px;
  line-height: 21px;
  color: #191919;
  background-color:#fff;
`;
const Option = styled.option`
  font-size: 14px;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  background: #ffffff;
  color: #366eef;
  font-size: 14px;
  margin-left: 16px;
  padding: 0px 5px 0px 5px;
  width:108px;
  height:42px;
  font-family: 'poppins-medium';
  font-size: 14px;
  line-height: 21px;
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

  useEffect(() => {
    getPricingHistory()
  })

  return (
    <MainContainer className="pricing-history">
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
        <Table aria-label="simple table" style={{tableLayout:"auto", width:"100%"}}>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#191919", fontWeight: "bold" }}>
                Event
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "#191919", fontWeight: "bold" }}
              >
                Price
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "#191919", fontWeight: "bold" }}
              >
                From
              </TableCell>
              <TableCell
                align="center"
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
                <TableCell component="td" scope="row">
                  {row.Event}
                </TableCell>
                <TableCell align="center">{row.Price}</TableCell>
                <TableCell align="center">{row.From}</TableCell>
                <TableCell align="center">{row.To}</TableCell>
                <TableCell align="right">{row.Date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainContainer>
  );
}
