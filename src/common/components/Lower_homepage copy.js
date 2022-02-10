import React from "react";
import {Link} from "react-router-dom";

function Lower_homepage() {
  return (
    <>
      <div className="lower__homepage container">
        <div id="filters">
          <div class="dropdown">
          <Link to="/Menu" style={{textDecoration:"none", color:"black"}}>
            <button
              class="btn btn-secondary dropdown-toggle dropbtm_mob"
              // type="button"
              // id="dropdownMenuButton1"
              // data-bs-toggle="dropdown"
              // aria-expanded="false"
              placeholder="All"
              style={{
                width: "100%",
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ddd",
              }}
              >
          
              Sale type
              <i class="fas fa-caret-down"></i>
            </button>
            </Link>
          </div>
          <div class="dropdown ">
          <Link to="/Menu" style={{textDecoration:"none", color:"black"}}>
            <button
              class="btn btn-secondary dropdown-toggle dropbtm_mob1"
              // type="button"
              // id="dropdownMenuButton2"
              // data-bs-toggle="dropdown"
              // aria-expanded="false"
              style={{
                width: "100%",
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ddd",
              }}
              >
          
              Price range
              <i class="fas fa-caret-down"></i>
            </button>
            </Link>
            {/* <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul> */}
          </div>
        </div>
        <div class="dropdown">
        <Link to="/Menu" style={{textDecoration:"none", color:"black"}}>
          <button
            class="btn btn-secondary dropdown-toggle dropbtm_mob2"
            // type="button"
            // id="dropdownMenuButton3"
            // data-bs-toggle="dropdown"
            // aria-expanded="false"
            style={{
              width: "100%",
              backgroundColor: "white",
              color: "black",
              border: "1px solid #ddd",
            }}
          >
          
            Sort by
            <i class="fas fa-caret-down"></i>
          </button>
          </Link>
          {/* <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a class="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul> */}
        </div>
      </div>
    </>
  );
}

export default Lower_homepage;
