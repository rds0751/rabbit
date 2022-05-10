import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import Mint from "../../assets/images/Mint.svg";
import Transfer from "../../assets/images/Transfer.svg";
import Sale from "../../assets/images/Sale2.svg";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Information from "../../assets/images/No-Info-Icon.svg";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import styled from "styled-components";
import SplitFrom from "./splitFrom";
import Snackbar from "@mui/material/Snackbar";
import SplitTo from "./splitTo";
import {
  getActivities,
  getPricingHistory,
} from "../../services/webappMicroservice";
import moment from "moment";
import { NoBackpackSharp } from "@mui/icons-material";
import { Divider } from "@mui/material";
import "../../assets/styles/Leader.css";
import { Tooltip } from "@material-ui/core";

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
const TableContainerCustom = styled(TableContainer)`
  height: 218px !important;
  ::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
`;
const TableUp = styled(Table)`
  height: 0px;
  table-layout: auto;
  width: 100%;
  margin-bottom: 8px;
`;
const TableCustom = styled(Table)`
  display: table;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  min-width: 525px !important;
`;
const TableDiv = styled.div`
  height: 220px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c8c8c8;
  border-radius: 0px 0px 3px 3px;
  opacity: 1;
`;
const CustomSnack = styled(Snackbar)`
  @media (min-width: 992px) {
    position: absolute !important;
    top: 1159px !important;
    right: auto !important;
    left: 372px !important;

    min-width: 112px !important;
  }
  @media only screen and (min-width: 0px) and (max-width: 991px) {
    position: absolute !important;
    top: 1872px !important;
    left: auto !important;

    min-width: 112px !important;
  }
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
  let [dataCopied,setDataCopied]=useState(true);
  let [dataCopiedTo,setDataCopiedTo]=useState(true);
  // const [type, setType] = useState(defaultReq);
  const [type, setType] = useState([]);

  useEffect(() => {
    // const reqObj = queryString.stringify(type);

    getActivities(type, id).then((response) => setActivities(response));
  }, [type]);

  const handleChange = (e) => {
    setType((oldArray) => [...type, `${e?.target?.value}`]);
    console.log("testing", type);
  };

  // const handleChange = (e) => {
  // console.log(e,"eee")

  //   setType({ ...type, [e.target.name]: e.target.value });
  //   console.log(type,2222)
  //   if (e.target.value === "list") {
  //     setEvent(!list);
  //   } else if (e.target.value === "price") {
  //     setPrice(!price);
  //   } else if (e.target.value === "buy") {
  //     setBuy(!buy);
  //   } else if (e.target.value === "minted") {
  //     setMinted(!minted);
  //   }
  //   console.log(type,1111)
  // };
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
  const isDataCopied = () => {
    // walletTogglePopup(false);
    // toast.success("Text Copied");
  };
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  useEffect(() => {
    getPricingHistory();
  }, []);

  const [value, setvalue] = useState("");
  // useEffect(() => {

  // }, [type]);
  const handleOnchange = (val) => {
    // setvalue(val)
    setType((type) => [`${val}`]);
  };
  console.log(activities, "val");

  const options = [
    { label: "List", value: "list" },
    { label: "Buy", value: "buy" },
    { label: "Minted", value: "minted" },
    // { label:  'Option 4', value:  'option_4'  },
  ];

  let toArray = [];

  return (
    <MainContainer className="pricing-history">
      <Title>Activities</Title>
      <FilterContainer>
        <MultiSelect
          name="type"
          onChange={handleOnchange}
          // onChange={() =>  handleOnchange();}}
          placeholder="filter"
          options={options}
        />
      </FilterContainer>
      <CustomSnack
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Copied"
        key={vertical + horizontal}
        autoHideDuration={2000}
        className="custom-snack"
      />
      <TableDiv>
        {activities.length > 0 ? (
          <TableContainerCustom component={Paper} elevation={0}>
            <TableCustom
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      color: "#191919",
                      fontWeight: "bold",
                      background: "#FBFBFB ",
                    }}
                  >
                    Event
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#191919",
                      fontWeight: "bold",
                      background: "#FBFBFB ",
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#191919",
                      fontWeight: "bold",
                      background: "#FBFBFB ",
                    }}
                  >
                    From
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#191919",
                      fontWeight: "bold",
                      background: "#FBFBFB ",
                    }}
                  >
                    To
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#191919",
                      fontWeight: "bold",
                      // textAlign: "center",
                    }}
                  >
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody style={{ border: "1px solid greeen !important" }}>
                {activities.map((row) => {
                  return (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #C8C8C8",
                        }}
                        component="td"
                        scope="row"
                      >
                        {row.type === "list" ? (
                          <img className="table-icon" src={Sale}></img>
                        ) : row.type == "minted" ? (
                          <img className="table-icon" src={Mint}></img>
                        ) : row.type == "transfer" || "buy" ? (
                          <img className="table-icon" src={Transfer}></img>
                        ) : (
                          ""
                        )}
                        {row.type}

                        {console.log(row.type, "row.type")}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "1px solid #C8C8C8",
                        }}
                      >
                        {row.price}
                      </TableCell>

                      
                        <TableCell
                          style={{
                            borderBottom: "1px solid #C8C8C8",
                          }}
                          onClick={()=>{
                            setDataCopied(false)
                            setTimeout(()=>{
                              setDataCopied(true);
                            },1000);
                          }}
                        >
                          {" "}
                          <CopyToClipboard text={row?.walletAddress}>
                             <span className="Activity-From">
                              {row.userName ? (
                                row.userName.substr(0, 6)
                              ) : (
                                <SplitFrom address={row.walletAddress} />
                              )}
                               <span className="activityTooltip">
                               {dataCopied ? "copy to clipboard" : "copied" }
                                 </span>
                               </span>
                          </CopyToClipboard>
                        </TableCell>
                   

                      {/* <Tooltip
                        title={
                          row?.to[0]?.wallet_address
                            ? row?.to[0]?.wallet_address
                            : "--"
                        }
                      > */}
                        <TableCell
                          style={{
                            borderBottom: "1px solid #C8C8C8",
                          }}
                          onClick={()=>{
                            setDataCopiedTo(false)
                            setTimeout(()=>{
                              setDataCopiedTo(true);
                            },1000);
                          }}
                        >
                        <CopyToClipboard text={row?.to[0]?.wallet_address} >
                        <span className="Activity-From">
                            {/* <button
                              className="copy-button"
                              onClick={handleClick({
                                vertical: "top",
                                horizontal: "right",
                              })}
                            > 
                             {console.log(row, "username")}
                            */}
                         
                          {row?.to.length > 0 ? (
                            row?.to[0]?.userName ? (
                              row?.to[0]?.userName.substr(0, 7)
                            ) : (
                              <span>
                              <SplitTo address={row?.to[0]?.wallet_address} />
                              <span className="activityTooltip">
                              {dataCopiedTo ? "copy to clipboard" : "copied" }
                                </span>
                                </span>
                            )
                          ) : (
                            "---"
                          )}
                         

                        {/* </button> */}
                        </span>
                       </CopyToClipboard>
                        </TableCell>
                      {/* </Tooltip> */}
                      <TableCell
                        style={{
                          borderBottom: "1px solid #C8C8C8",
                          // textAlign: "center"
                        }}
                      >
                        {moment(row.createdAt).format("DD MMM YYYY")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </TableCustom>
          </TableContainerCustom>
        ) : (
          <div className="no-data no-data-found ">
            <img src={Information}></img>
            <p>No information available</p>
          </div>
        )}
      </TableDiv>
    </MainContainer>
  );
}
