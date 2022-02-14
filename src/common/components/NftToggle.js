import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

function NftToggle() {
  const [toggleNft, setToggleNft] = useState(true);

  return (
    <>
      <div id="upper__home" className="container">
        <div className="upper__homepage">
          <h1 className="font-20 font-weight-700 mt-4">Marketplace</h1>
        </div>
        <div className="middle__homepage">
          <Link
            className="font-18 font-weight-700 text-center"
            style={{
              textDecoration: "none",
              width: "80px",
              color: toggleNft ? "black" : "#848482",
              // color: "#000",
              borderBottom: toggleNft
                ? "3px solid #3399ff"
                : "3px solid #848482",
            }}
            to="/"
          >
            <div onClick={() => setToggleNft(true)}>NFTS</div>
          </Link>
          <Link
            onClick={() => setToggleNft(false)}
            className="font-18 font-weight-700 text-center"
            style={{
              textDecoration: "none",
              color: !toggleNft ? "black" : "#848482",
              // marginLeft: "2em",
              width: "140px",
              borderBottom: !toggleNft
                ? "3px solid #3399ff"
                : "3px solid #848482",
            }}
            to="/collections-tile"
          >
            <div onClick={() => setToggleNft(false)}>Collections</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NftToggle;
