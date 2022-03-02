import React, { useState, useEffect } from "react";
import {
  LeaderBoardApi,
  LeaderBoardApi2,
  LeaderBoardApi3,
} from "../../constants/LeaderBoardApi";
import "../../assets/styles/Leader.css";
import { getTopCollections } from "../../services/sellAndPurchaseMicroService";


function Top_collection() {

  const [topCollections, setTopCollections] = useState([]);

  useEffect(() => {
    getTopCollections().then((response) => setTopCollections(response));
  });
  console.log("topCollections", topCollections);


  return (
    <div
      className="topcollection_mob"
      style={{ marginLeft: "128PX", marginRight: "128px" }}
    >
      {/* <h2>Hello</h2> */}
      <div className="container">
        <div className="row">
          <div className="col">
            <div
              className="Leader_Board_container"
              style={{ marginBottom: "30px" }}
            >
              <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
                Top Collections
              </h1>
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
                  <i className="fas fa-caret-down"></i>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
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
            Owners
          </div>
          <div className="col" style={{ padding: "0px", margin: "0px" }}>
            Items
          </div>
        </div>
      </div>
      {topCollections.map((curElem) => {
        const { collectionPhoto, collectionName, name, volume, owners, items } = curElem.items;
        return (
          <div className="container ">
            <div
              className="row CollectionItem"
              style={{ backgroundColor: "#f8f8f8" }}
            >
              <div className="col">
                <img
                  className="top-img"
                  style={{ width: '42px', height: '42px' }}
                  src={collectionPhoto}
                  alt=""
                />
                <h2>{collectionName}</h2>
              </div>
              <div
                className="col"
                style={{ color: "#818181", fontWeight: "normal" }}
              >
                {" "}
                <span>34 ETH</span>
                {volume}
              </div>
              <div className="col">{owners}</div>
              <div className="col">{curElem.nftCount}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


export default Top_collection;
