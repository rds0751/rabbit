import React from "react";
import { Link } from "react-router-dom";
import buying from "../../../assets/images/buying.png";
import selling from "../../../assets/images/selling.png";
import creating from "../../../assets/images/creation.png";
import adding from "../../../assets/images/adding.png";
function HelpCenter() {
  return (
    <div>
      <div className="container font-bold">
        <h1
          style={{
            fontSize: "20px",
            marginTop: "50px",
            fontWeight: "bold",
            marginBottom: "68px",
          }}
        >
          Help center
        </h1>
        <div className="row helprow_mob" style={{marginBottom:"150px"}}>
          <div className="col-sm-6 col-lg-3 col-md-5 col-12 ">
            <div
              className="card shadow"
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                width: "280px",
              }}
            >
              <div className="card-body">
                <img src={buying} style={{ width: "50px" }} />
                <Link
                  to="/buying"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <h5
                    className="card-title font-16 font-weight-700"
                    style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                  >
                    Buying
                  </h5>
                </Link>
                <p className="card-text font-14">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-5 col-lg-3 col-sm-6 col-11 ">
            <div
              className="card shadow"
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                width: "280px",
              }}
            >
              <div className="card-body">
                <img src={selling} style={{ width: "60px" }} />
                <h5
                  className="card-title font-16 font-weight-700"
                  style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                >
                  <Link
                    to="/fixed-price"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    Selling
                  </Link>
                </h5>
                <p className="card-text font-14">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-5 col-lg-3 col-sm-6 col-11 ">
            <div
              className="card shadow"
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                width: "280px",
              }}
            >
              <div className="card-body">
                <img src={creating} style={{ width: "43px" }} />
                <h5
                  className="card-title font-16 font-weight-700"
                  style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                >
                  <Link
                    to="/Highest_Bid"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    Creating Collection
                  </Link>
                </h5>
                <p className="card-text font-14">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-5 col-lg-3 col-sm-6 col-11 ">
            <div
              className="card shadow"
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                width: "280px",
              }}
            >
              <div className="card-body">
                <img src={adding} style={{ width: "44px" }} />
                <h5
                  className="card-title font-16 font-weight-700"
                  style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                >
                  Adding NFT's
                </h5>
                <p className="card-text font-14">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
