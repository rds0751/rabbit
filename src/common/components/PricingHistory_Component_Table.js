import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function PricingHistory_Component_Table() {
  return (
    <>
      <h5 className="font-weight-900 font-16">Pricing History</h5>
      <div className="row">
        <div className="col-lg-3 col-sm-4">
          <select
            style={{
              width: "100px",
              height: "35px",
              borderRadius: "5px",
            }}
          >
            <option>Filter</option>
            <option>Events</option>
            <option>Price</option>
            <option>Date</option>
          </select>
        </div>
        <div className="col-lg-3 col-sm-4">
          <button
            className="text-sky font-15"
            style={{
              width: "100px",
              height: "35px",
              borderRadius: "5px",
              borderColor: "#366EEF",
              backgroundColor: "#fff",
            }}
          >
            Bids <CloseIcon style={{ fontSize: "18px", marginLeft: "1.5em" }} />
          </button>
        </div>
        <div className="col-lg-3 col-sm-4">
          <button
            className="text-sky font-15"
            style={{
              width: "100px",
              height: "35px",
              borderRadius: "5px",
              borderColor: "#366EEF",
              backgroundColor: "#fff",
            }}
          >
            List <CloseIcon style={{ fontSize: "18px", marginLeft: "1.5em" }} />
          </button>
        </div>
        <div className="col-lg-3 col-sm-4">
          <button
            className="text-sky font-15"
            style={{
              width: "100px",
              height: "35px",
              borderRadius: "5px",
              borderColor: "#366EEF",
              backgroundColor: "#fff",
            }}
          >
            Offer <CloseIcon style={{ fontSize: "18px", marginLeft: "1em" }} />
          </button>
        </div>
      </div>
      <div
        className="row mt-4 font-15 font-weight-900"
        style={{ backgroundColor: "#FBFBFB", padding: "10px" }}
      >
        <div className="col-3">Event</div>
        <div className="col-2">Price</div>
        <div className="col-2">From</div>
        <div className="col-3">To</div>
        <div className="col-2">Date</div>
      </div>
      <div
        className="border mt-2 pricingtable_mob"
        style={{ width: "550px", marginLeft: "-0.7em" }}
      >
        <div className="row font-14" style={{ padding: "10px" }}>
          <div className="col-3 border-bottom">List</div>
          <div className="col-2 border-bottom">0.09 ETH</div>
          <div className="col-2 border-bottom">CreatX</div>
          <div className="col-3 border-bottom">Beeple</div>
          <div className="col-2 border-bottom">1 July</div>
        </div>
        <div className="row font-14" style={{ padding: "10px" }}>
          <div className="col-3 border-bottom">List</div>
          <div className="col-2 border-bottom">0.09 ETH</div>
          <div className="col-2 border-bottom">CreatX</div>
          <div className="col-3 border-bottom">Beeple</div>
          <div className="col-2 border-bottom">1 July</div>
        </div>
        <div className="row font-14" style={{ padding: "10px" }}>
          <div className="col-3 border-bottom">List</div>
          <div className="col-2 border-bottom">0.09 ETH</div>
          <div className="col-2 border-bottom">CreatX</div>
          <div className="col-3 border-bottom">Beeple</div>
          <div className="col-2 border-bottom">1 July</div>
        </div>
        <div className="row font-14" style={{ padding: "10px" }}>
          <div className="col-3">List</div>
          <div className="col-2">0.09 ETH</div>
          <div className="col-2">CreatX</div>
          <div className="col-3">Beeple</div>
          <div className="col-2">1 July</div>
        </div>
      </div>
    </>
  );
}

export default PricingHistory_Component_Table;
