import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../../assets/styles/Leader.css";

function PricingHistoryComponentTable() {
  return (
    <>
      <h5 className="font-weight-900 font-16">Pricing History</h5>
      <div className="row no-gutters  ">
        <div className=" col-lg-3 col-sm-4">
          <select
            id="filter_mobile"
            style={{
              width: "100px",
              fontSize: "14px",
              height: "37px",
              borderRadius: "5px",
            }}
          >
            <option>Filter</option>
            <option>Events</option>
            <option>Price</option>
            <option>Date</option>
          </select>
        </div>
        <div className=" col-lg-3 col-sm-4">
          <button
            className="text-sky text-start font-15"
            id="choice_mobile"
            style={{
              width: "90px",
              height: "35px",
              fontSize: "14px",
              borderRadius: "5px",
              borderColor: "#366EEF",
              backgroundColor: "#fff",
            }}
          >
            Bids <CloseIcon style={{ fontSize: "18px", marginLeft: "1.8em" }} />
          </button>
        </div>
        <div className=" col-lg-3 col-sm-4">
          <button
            className="text-sky text-start font-15"
            style={{
              width: "90px",
              height: "35px",
              fontSize: "14px",

              borderRadius: "5px",
              borderColor: "#366EEF",
              backgroundColor: "#fff",
            }}
          >
            List <CloseIcon style={{ fontSize: "18px", marginLeft: "1.8em" }} />
          </button>
        </div>
        <div className=" col-lg-3 col-sm-4">
          <button
            className="text-sky text-start font-15"
            style={{
              width: "90px",
              height: "35px",
              borderRadius: "5px",
              fontSize: "14px",

              borderColor: "#366EEF",
              backgroundColor: "#fff",
            }}
          >
            Offer{" "}
            <CloseIcon style={{ fontSize: "18px", marginLeft: "1.6em" }} />
          </button>
        </div>
      </div>
      {/* </div> */}
      <div
        className="row no-gutters mt-3 font-15 font-weight-900"
        style={{ backgroundColor: "#FBFBFB", padding: "10px" }}
      >
        <div className=" col-3">Event</div>
        <div className=" col-2">Price</div>
        <div className=" col-2">From</div>
        <div className=" col-3">To</div>
        <div className=" col-2">Date</div>
      </div>
      <div
        className="border mt-2 pricingtable_mob"
        style={{ width: "550px", marginLeft: "-0.7em" }}
      >
        <div className="row no-gutters font-14" style={{ padding: "10px" }}>
          <div className=" col-3 border-bottom">List</div>
          <div className=" col-2 border-bottom">0.09 ETH</div>
          <div className=" col-2 border-bottom">CreatX</div>
          <div className=" col-3 border-bottom">Beeple</div>
          <div className=" col-2 border-bottom">1 July</div>
        </div>
        <div className="row no-gutters font-14" style={{ padding: "10px" }}>
          <div className=" col-3 border-bottom">List</div>
          <div className=" col-2 border-bottom">0.09 ETH</div>
          <div className=" col-2 border-bottom">CreatX</div>
          <div className=" col-3 border-bottom">Beeple</div>
          <div className=" col-2 border-bottom">1 July</div>
        </div>
        <div className="row no-gutters font-14" style={{ padding: "10px" }}>
          <div className=" col-3 border-bottom">List</div>
          <div className=" col-2 border-bottom">0.09 ETH</div>
          <div className=" col-2 border-bottom">CreatX</div>
          <div className=" col-3 border-bottom">Beeple</div>
          <div className=" col-2 border-bottom">1 July</div>
        </div>
        {/* <div className="row no-gutters font-14" style={{ padding: "10px" }}>
          <div className="col-3">List</div>
          <div className="col-2">0.09 ETH</div>
          <div className="col-2">CreatX</div>
          <div className="col-3">Beeple</div>
          <div className="col-2">1 July</div>
        </div> */}
      </div>
    </>
  );
}

export default PricingHistoryComponentTable;
