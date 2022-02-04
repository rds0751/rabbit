import React from "react";
import { Link } from "react-router-dom";
import buying from "../../../assets/images/buying.png";
import selling from "../../../assets/images/selling.png";
import creating from "../../../assets/images/creation.png";
import adding from "../../../assets/images/adding.png";
function HelpCenter() {
  return (
    <div>
      <div className="container">
        <h1 style={{ fontSize: "20px", marginTop: "50px", }}>
          Help center
        </h1>
        <div class="row  helprow_mob">
          <div class="col-sm-6 col-lg-3 col-md-5 col-12 p-5">
            <div
              className="card shadow"
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                width: "280px",
              }}
            >
              <div class="card-body">
                <img
                  src={buying}
                  style={{ width: "50px", marginLeft: "-8px" }}
                />
                <Link
                  to="/Buying"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <h5
                    class="card-title font-16 font-weight-700"
                    style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                  >
                    Buying
                  </h5>
                </Link>
                <p class="card-text font-14">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-5 col-lg-3 col-sm-6 col-11 p-5">
            <div
              class="card shadow"
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                width: "280px",
              }}
            >
              <div class="card-body">
                <img
                  src={selling}
                  style={{ width: "60px", marginLeft: "-8px" }}
                />
                <h5
                  class="card-title font-16 font-weight-700"
                  style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                >
                  <Link
                    to="/Fixed_Price"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    Selling
                  </Link>
                </h5>
                <p class="card-text font-14">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-5 col-lg-3 col-sm-6 col-11 p-5">
            <div
              class="card shadow"
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                width: "280px",
              }}
            >
              <div class="card-body">
                <img
                  src={creating}
                  style={{ width: "43px", marginLeft: "-8px" }}
                />
                <h5
                  class="card-title font-16 font-weight-700"
                  style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                >
                  <Link
                    to="/Highest_Bid"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    Creating Collection
                  </Link>
                </h5>
                <p class="card-text font-14">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-5 col-lg-3 col-sm-6 col-11 p-5">
            <div
              class="card shadow"
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                width: "280px",
              }}
            >
              <div class="card-body">
                <img
                  src={adding}
                  style={{ width: "44px", marginLeft: "-8px" }}
                />
                <h5
                  class="card-title font-16 font-weight-700"
                  style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                >
                  Adding NFT's
                </h5>
                <p class="card-text font-14">
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
