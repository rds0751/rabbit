import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import styled from "styled-components";

const TableDown = styled(Table)`
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 0px 0px 3px 3px;
  opacity: 1;
  table-layout: fixed;
  width: 100%;
  height: auto;
`;
const TableUp = styled(Table)`
  height: 0px;
  table-layout: fixed;
  width: 100%;
  margin-bottom: 8px;
`;
const TableDiv = styled.div`
  height: 288px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c8c8c8;
  border-radius: 0px 0px 3px 3px;
  opacity: 1;
  
`;
const TableContainerCustom = styled(TableContainer)`
  height: 288px !important;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c8c8c8;
  border-radius: 0px 0px 3px 3px;
  opacity: 1;
  ::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
`;

export default function DetailPage(props) {
  const nft = props.nft;

  console.log(props.nft.blockchain, props.length, nft, nft?.length, "<<<props");
  return (
    <TableContainerCustom elevation={0}>
      {/* <TableDiv> */}
        <TableDown aria-label="simple table">
          <tbody>
            <tr sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <td
                style={{
                  border: "none",
                  width: "34%",
                  font: "normal normal 600 14px/21px Poppins",
                  paddingTop: "19px",
                  paddingLeft: "20px",
                }}
                component="td"
                scope="row"
              >
                Contract address
              </td>
              <td style={{ border: "none",paddingTop:"20px" }}>{nft?.contractAddress}</td>
            </tr>
            <tr sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <td
                component="td"
                scope="row"
                style={{
                  border: "none",
                  width: "34%",
                  font: "normal normal 600 14px/21px Poppins",
                  paddingTop: "20px",
                  paddingLeft: "20px",
                }}
              >
                Token ID
              </td>
              <td style={{ border: "none",paddingTop:"20px"}}>{nft?.tokenId}</td>
            </tr>
            <tr sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <td
                component="td"
                scope="row"
                style={{
                  border: "none",
                  width: "34%",
                  font: "normal normal 600 14px/21px Poppins",
                  paddingTop: "20px",
                  paddingLeft: "20px",
                }}
              >
                Token Standard
              </td>
              <td style={{ border: "none",paddingTop:"20px"  }}>-</td>
            </tr>
            <tr sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <td
                component="td"
                scope="row"
                style={{
                  border: "none",
                  width: "34%",
                  font: "normal normal 600 14px/21px Poppins",
                  paddingTop: "20px",
                  paddingLeft: "20px",
                }}
              >
                Blockchain
              </td>
              <td style={{ border: "none",paddingTop:"20px"  }}>{nft?.blockchain}</td>
            </tr>
          </tbody>
        </TableDown>
      {/* </TableDiv> */}
    </TableContainerCustom>
  );
}
