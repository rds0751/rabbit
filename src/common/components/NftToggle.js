import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Notification.css";


function NftToggle({ toggleNft }) {
  // const [toggleNft, setToggleNft] = useState(true);

  return (
    <>
      <div id="upper__home" className="">
        <div className="upper__homepage">
          <h1 className="font-20 font-weight-700">Marketplace</h1>
        </div>
        <div className="middle__homepage">
          <div>
            <div className="toggle-container">
              <Link
                className="font-18 text-center toggle-nft"
                style={{
                  textDecoration: "none",
                  width: "108px",
                  color: toggleNft ? "#191919" : "#858585",
                  // color: "#000",
                  fontFamily: toggleNft ? "poppins-semibold" : "poppins",
                }}
                to="/nfts"
              >
                {/* <div onClick={() => setToggleNft(true)}>NFTS</div> */}
                NFTS
              </Link>
            </div>
            <div style={{ paddingTop: toggleNft ? "0px" : '2px' }}>
              <hr style={{ width: "108px", height: toggleNft ? "4px" : "1px", color: toggleNft ? "#366EEF" : '#C7C7C7', opacity: 'inherit' }}
                className="toggle-line" />
            </div>
          </div>
          <div>
            <div className="toggle-container">
              <Link
                // onClick={() => setToggleNft(false)}
                className="font-18 text-center"
                style={{
                  textDecoration: "none",
                  color: !toggleNft ? "#191919" : "#858585",
                  // marginLeft: "2em",
                  width: "120px",
                }}
                to="/collections-tile"
              >
                {/* <div onClick={() => setToggleNft(false)}>Collections</div> */}
                Collections
              </Link>
            </div>
            <div style={{ paddingTop: toggleNft ? "2px" : '0px' }}>
              <hr style={{ width: "118px", height: toggleNft ? "1px" : "4px", color: toggleNft ? "#C7C7C7" : '#366EEF', opacity: 'inherit' }}
                className="toggle-line" /></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NftToggle;
