import React from "react";
import { Link } from "react-router-dom";
function HelpCenter() {
  return (
    <div>
      <h1 style={{ fontSize: "20px", marginTop: "50px", marginLeft: "50px" }}>
        Help center
      </h1>

      <div class="row">
        <div class="col-sm-6 col-lg-3 col-md-5 col-12 p-5">
          <div className="card" style={{ cursor: "pointer" }}>
            <div class="card-body">
              <i
                class="fas fa-tag"
                style={{
                  color: "#366EEF",
                  transform: "scale(2)",
                  marginLeft: "15px",
                  marginBottom: "15px",
                }}
              ></i>
              <Link
                to="/Buying"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h5 class="card-title" style={{ marginBottom: "0.5rem" }}>
                  Buying
                </h5>
              </Link>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-5 col-lg-3 col-sm-6 col-11 p-5">
          <div class="card" style={{ cursor: "pointer" }}>
            <div class="card-body">
              <i
                class="fas fa-hand-holding-usd"
                style={{
                  color: "#366EEF",
                  transform: "scale(2)",
                  marginLeft: "15px",
                  marginBottom: "15px",
                }}
              ></i>
              <h5 class="card-title" style={{ marginBottom: "0.5rem" }}>
                Selling
              </h5>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-5 col-lg-3 col-sm-6 col-11 p-5">
          <div class="card" style={{ cursor: "pointer" }}>
            <div class="card-body">
              <i
                class="fas fa-th-large"
                style={{
                  color: "#366EEF",
                  transform: "scale(2)",
                  marginLeft: "15px",
                  marginBottom: "15px",
                }}
              ></i>
              <h5 class="card-title" style={{ marginBottom: "0.5rem" }}>
                Creating Collection
              </h5>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-5 col-lg-3 col-sm-6 col-11 p-5">
          <div class="card" style={{ cursor: "pointer" }}>
            <div class="card-body">
              <i
                class="fas fa-image"
                style={{
                  color: "#366EEF",
                  transform: "scale(2)",
                  marginLeft: "15px",
                  marginBottom: "15px",
                }}
              ></i>
              <h5 class="card-title" style={{ marginBottom: "0.5rem" }}>
                Adding NFT's
              </h5>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
