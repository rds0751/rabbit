import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Information from "../../assets/images/No-Info-Icon.svg";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import {
  getActivities,
  getPricingHistory,
} from "../../services/webappMicroservice";
import moment from "moment";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-family: "poppins-bold";
  font-size: 16px;
  line-height: 25px;
  color: #000000;
  margin-bottom: 23px;
`;
const FilterContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 20px;
`;
const Select = styled.select`
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  width: 108px;
  height: 42px;
  padding: 5px;
  font-family: "poppins-medium";
  font-size: 14px;
  line-height: 21px;
  color: #191919;
  background-color: #fff;
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
  width: 108px;
  height: 42px;
  font-family: "poppins-medium";
  font-size: 14px;
  line-height: 21px;
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #366eef;
`;
const TableDown = styled(Table)`
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 0px 0px 3px 3px;
  opacity: 1;
  table-layout: auto;
  width: 100%;
  height: auto;
`;
const TableUp = styled(Table)`
  height: 0px;
  table-layout: auto;
  width: 100%;
  margin-bottom: 8px;
`;
const TableDiv = styled.div`
  height: 218px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c8c8c8;
  border-radius: 0px 0px 3px 3px;
  opacity: 1;
`;
function createData(Event, Price, From, To, Date) {
  return { Event, Price, From, To, Date };
}

const rows = [
  // createData("List", "0.32ETH", "Ravi", "John", "25Feb"),
  // createData("Buy", "0.32ETH", "Ravi", "John", "25Feb"),
  // createData("price", "0.32ETH", "Ravi", "John", "25Feb"),
];
const queryString = require("query-string");
export default function PricingHistoryComponentTable(props) {
  const id = props.id;
  const defaultReq = {
    type: "",
  };
  const [list, setEvent] = useState(false);
  const [price, setPrice] = useState(false);
  const [buy, setBuy] = useState(false);
  const [minted, setMinted] = useState(false);
  const [activities, setActivities] = useState("");
  const [type, setType] = useState(defaultReq);

  useEffect(() => {
    const reqObj = queryString.stringify(type);
    getActivities(reqObj, id).then((response) => setActivities(response));
  }, [type]);
  console.log(activities, "11111");

  const handleChange = (e) => {
    setType({ ...type, [e.target.name]: e.target.value });
    if (e.target.value === "list") {
      setEvent(!list);
    } else if (e.target.value === "price") {
      setPrice(!price);
    } else if (e.target.value === "buy") {
      setBuy(!buy);
    } else if (e.target.value === "minted") {
      setMinted(!minted);
    }
  };
  // const handleChange = (e) => {
  //   if (e.target.value === "list") {
  //     setEvent(!list);
  //   } else if (e.target.value === "price") {
  //     setPrice(!price);
  //   } else if (e.target.value === "buy") {
  //     setBuy(!buy);
  //   } else if (e.target.value === "minted") {
  //     setMinted(!minted);
  //   }
  // };

  const closeFilter = (key) => {
    if (key === "list") {
      setEvent(!list);
    } else if (key === "price") {
      setPrice(!price);
    } else if (key === "buy") {
      setBuy(!buy);
    } else if (key === "minted") {
      setMinted(!minted);
    }
  };

  useEffect(() => {
    getPricingHistory();
  }, []);
  return (
    <MainContainer className="pricing-history">
      <Title>Activities</Title>
      <FilterContainer>
        <Select
          className="selectfixing4"
          name="type"
          onChange={(e) => handleChange(e)}
        >
          <Option>Filter</Option>
          <Option value="list">List</Option>
          <Option value="price">Price</Option>
          <Option value="buy">Buy</Option>
          <Option value="minted">Minted</Option>
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
        {minted ? (
          <Filter>
            <span style={{ marginRight: "10px" }}>Minted</span>
            <Button onClick={() => closeFilter("minted")}>
              <i class="fa-solid fa-xmark"></i>
            </Button>
          </Filter>
        ) : (
          ""
        )}
      </FilterContainer>
      <TableContainer component={Paper} elevation={0}>
        <TableUp aria-label="simple table">
          <thead>
            <tr>
              <th style={{ color: "#191919", fontWeight: "bold" }}>Event</th>
              <th style={{ color: "#191919", fontWeight: "bold" }}>Price</th>
              <th style={{ color: "#191919", fontWeight: "bold" }}>From</th>
              <th style={{ color: "#191919", fontWeight: "bold" }}>To</th>
              <th
                style={{
                  color: "#191919",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Date
              </th>
            </tr>
          </thead>
        </TableUp>
        <TableDiv>
          <TableDown aria-label="simple table">
            {activities.length > 0 ? (
              <tbody className="table-bodymousec">
                {activities.map((row) => (
                  <tr
                    style={{ height: "0px !important" }}
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="table-row"
                  >
                    <td
                      style={{
                        textAlign: "left",
                        borderBottom: "1px solid #C8C8C8",width: "55px"
                      }}
                      component="td"
                      scope="row"
                    >
                      {row.type}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        borderBottom: "1px solid #C8C8C8",
                        width: "149px",
                      }}
                    >
                      {row.price}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        borderBottom: "1px solid #C8C8C8",
                        width: "85px",
                      }}
                    >
                      {row.userName.substr(0, 6)}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        borderBottom: "1px solid #C8C8C8",
                        width: "119px",
                      }}
                    >
                      -
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        borderBottom: "1px solid #C8C8C8",
                        width: "109px",
                      }}
                    >
                      {moment(row.createdAt).format("DD MMM ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <div className="no-data no-data-found ">
                <img src={Information}></img>
                <p>No information available</p>
              </div>
            )}
          </TableDown>
        </TableDiv>
      </TableContainer>
    </MainContainer>
  );
}
