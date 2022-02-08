import React, { Component } from "react";
// import './Top_collection.css'
import {
  LeaderBoardApi,
  LeaderBoardApi2,
  LeaderBoardApi3,
  LeaderBoardApi4,
  LeaderBoardApi5,
} from "../../constants/LeaderBoardApi";


export class TopSeller extends Component {
  render() {
    return (
      <div className="topselller_mob" style={{ marginLeft: "128PX", marginRight: "128px" }}>
        {/* <h2>Hello</h2> */}
        <div className="Leader_Board_container" style={{marginBottom : "30px"}}>
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
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between"
              }}
            >
              Weekly
              <i class="fas fa-caret-down"></i>
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
       

        <div class="container CollectionHeading">
          <div class="row">
            <div class="col" style={{paddingLeft : "40px"}}>Name</div>
            <div class="col" style={{padding:"0px",margin:"0px"}}>Volume</div>
            <div class="col" style={{padding:"0px",margin:"0px"}}>Items sold</div>
          </div>
        </div>
        {LeaderBoardApi5.map((curElem) => {
              const { name, volume, itemssold } = curElem;
              return (
        <div class="container ">
          <div class="row CollectionItem" style={{ backgroundColor: "#f8f8f8"}}>
            <div class="col"> <img
                      className="rounded-circle"
                      src="https://earncashto.com/wp-content/uploads/2021/06/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
                      alt="/"
                     
                    /><h2> {name}</h2>
                    </div>
            <div class="col" style={{color: "#818181" , fontWeight: "normal"}}>  <span>34 ETH</span>
                    {volume}</div>
            <div class="col">{itemssold}</div>
          </div>
        </div>
         );
        })}
      </div>
    );
  }
}
export default TopSeller;
