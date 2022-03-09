import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
// import "../../"
function NftToggle({ toggleNft }) {
  // const [toggleNft, setToggleNft] = useState(true);

  return (
    <>
      <div id="upper__home" className="">
        <div className="upper__homepage">
          <h1 className="font-20 font-weight-700">Marketplace</h1>
        </div>
        <div className="middle__homepage">
          <Link
            className="font-18 text-center"
            style={{
              textDecoration: "none",
              width: "108px",
              color: toggleNft ? "#191919" : "#858585",
              // color: "#000",
              borderBottom: toggleNft
                ? "8px solid #366EEF"
                : "1px solid #C7C7C7",
              borderBottomRightRadius: "10px",
              borderTopRightRadius: "10px",
              fontFamily: toggleNft ? "poppins-semibold" : "poppins",
              paddingBottom: "12px",
            }}
            to="/"
          >
            {/* <div onClick={() => setToggleNft(true)}>NFTS</div> */}
            NFTS
          </Link>
          <Link
            // onClick={() => setToggleNft(false)}
            className="font-18 text-center"
            style={{
              textDecoration: "none",
              color: !toggleNft ? "#191919" : "#858585",
              // marginLeft: "2em",
              width: "120px",
              borderBottom: !toggleNft
                ? "4px solid #366EEF"
                : "1px solid #C7C7C7",
              fontFamily: !toggleNft ? "poppins-semibold" : "poppins",
              paddingBottom: "12px",
            }}
            to="/collections-tile"
          >
            {/* <div onClick={() => setToggleNft(false)}>Collections</div> */}
            Collections
          </Link>
        </div>
      </div>
    </>
  );
}

export default NftToggle;
