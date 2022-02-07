import React, { Component } from "react";
import { Link } from "react-router-dom";

function Upper__homepage() {
  return (
    <>
      <div id="upper__home" className="container">
        <div className="upper__homepage">
          <h1 className="font-20 font-weight-700 mt-4">Marketplace</h1>
        </div>

        <div className="middle__homepage">
          <Link
            className="font-18 font-weight-700"
            style={{ textDecoration: "none", color: "#000" }}
            to="/nfts"
          >
            NFTS
          </Link>
          <Link
            className="font-18 font-weight-700"
            style={{
              textDecoration: "none",
              color: "#000",
              marginLeft: "2em",
            }}
            to="/Collections_tile"
          >
            Collections
          </Link>
        </div>
      </div>
    </>
  );
}

export default Upper__homepage;
