import { style } from "@mui/system";
import React, { Component, useState, useEffect } from "react";
import "../../assets/styles/Leader.css";
// import './Top_collection.css'
import {
  LeaderBoardApi,
  LeaderBoardApi2,
  LeaderBoardApi3,
  LeaderBoardApi4,
  LeaderBoardApi5,
} from "../../constants/LeaderBoardApi";
import { getTopSellers } from "../../services/sellAndPurchaseMicroService";

function TopSeller() {

  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    getTopSellers().then((response) => setTopSellers(response));
  });
  console.log("topSellers", topSellers);


  return (
    <div
      className="topselller_mob"
      style={{ marginLeft: "128PX", marginRight: "128px" }}
    >
      {/* <h2>Hello</h2> */}
      <div className="container">
        <div className="row">
          <div className="col" style={{padding:"0"}}>
            <div
              className="Leader_Board_container "
              style={{ marginBottom: "30px" }}
            >
              <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Top Sellers</h1>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  placeholder="All"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  Weekly
                 <img src={require("../../assets/images/downarrow.png")} style={{marginLeft:"39px"}}/>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                  <li>
                    <a className="dropdown-item" href="#">
                      Weekly
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Monthly
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Yearly
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container CollectionHeading">
        <div className="row">
          <div className="col" 
          // style={{ paddingLeft: "40px" }}
          >
            Name
          </div>
          <div className="col" style={{ padding: "0px", margin: "0px" }}>
            Volume
          </div>
          <div className="col" style={{ padding: "0px", margin: "0px" }}>
            Items sold
          </div>
        </div>
      </div>
      {topSellers.map((curElem) => {
        const { Image, sellerFirstName, sellerLastName, itemssold, totalPurchasedValue } = curElem;
        return (
          <div className="container ">
            <div
              className="row CollectionItem"
              style={{ backgroundColor: "#f8f8f8" }}
            >
              <div className="col">
                {" "}
                <img
                  className="top-img" style={{ width: '42px', height: '42px' }} src={Image}
                  alt=""
                />
                <h2>{sellerFirstName}{sellerLastName}</h2>
              </div>
              <div
                className="col"
                style={{ color: "#818181", fontWeight: "normal" }}
              >
                {" "}
                <span className="ethCurrencySeller"> ETH</span>
                ({"$"+totalPurchasedValue})
              </div>
              <div className="col">{itemssold}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default TopSeller;
