import React, { useState } from "react";
import { Link } from "react-router-dom";

function HomeNftFilters() {
  return (
    <>
      <div className="lower__homepage" style={{ width: "100%" }}>
        <div id="filters filter-large" className="filter">
          <div className="dropdown">
            <div style={{ textDecoration: "none", color: "black" }}>
              <button
                className="btn btn-secondary dropdown-toggle dropbtm_mob"
                // type="button"
                // id="dropdownMenuButton1"
                // data-bs-toggle="dropdown"
                // aria-expanded="false"
                placeholder="All"
                style={{
                  // width: "100%",
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid #ddd",
                }}
              >
                Sale type
                <i className="fas fa-caret-down"></i>
              </button>
            </div>
          </div>
          <div className="dropdown ">
            <div style={{ textDecoration: "none", color: "black" }}>
              <button
                className="btn btn-secondary dropdown-toggle dropbtm_mob"
                // type="button"
                // id="dropdownMenuButton2"
                // data-bs-toggle="dropdown"
                // aria-expanded="false"
                style={{
                  // width: "100%",
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid #ddd",
                }}
              >
                Price range
                <i className="fas fa-caret-down"></i>
              </button>
            </div>
            {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
            </ul> */}
          </div>
        </div>
        <div className="dropdown">
          <div style={{ textDecoration: "none", color: "black" }}>
            <button
              className="btn btn-secondary dropdown-toggle dropbtm_mob"
              // type="button"
              // id="dropdownMenuButton3"
              // data-bs-toggle="dropdown"
              // aria-expanded="false"
              style={{
                // width: "100%",
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ddd",
              }}
            >
              Sort by
              <i className="fas fa-caret-down"></i>
            </button>
          </div>
          {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
          </ul> */}
        </div>
      </div>
    </>
  );
}

export default HomeNftFilters;
