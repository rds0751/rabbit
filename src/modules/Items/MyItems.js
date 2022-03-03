import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Image from "../../assets/images/1.jpg";
import "../../assets/styles/Myitems.css";
import UpperMyItems from "../../common/components/UpperMyItems";

function MyItems() {
  const [activeInActive, setActiveInActive] = useState("active");
  const [toggleSelect, setToggleSelect] = useState(true);
  return (
    <>
      <div className="myItemspage">
        {/* ----- Toggle Upper Part */}
        <div className="my-item-container">
          <div className="">
            <h1 className="poppins-normal bold-600 font-20 blackish">
              My Items
            </h1>
          </div>

          <div className="toggle-items">
            <div
              onClick={() => setToggleSelect(false)}
              className="font-16 bold-bold poppins-normal"
              style={{
                color: !toggleSelect ? "#191919" : "#828282",
                borderBottom: !toggleSelect ? "3px solid #366EEF" : "none",
              }}
            >
              Single
            </div>
            <div
              onClick={() => setToggleSelect(true)}
              className="font-16 bold-bold poppins-normal"
              style={{
                marginLeft: "18px",
                color: toggleSelect ? "#191919" : "#828282",
                borderBottom: toggleSelect ? "3px solid #366EEF" : "none",
              }}
            >
              Collections
            </div>
          </div>
          <button type="submit" className="add-item-button p-0 bord-rad-4">
            Add Item
          </button>
        </div>

        {/* ----------- */}

        {!toggleSelect && (
          <div style={{ marginTop: "40.12px" }}>
            <div className=" col-md-6 col-lg-3  col-sm-12 nft_card my-item-card">
              <div className="card nft-card-radius border-radius cardmob">
                {/* <Link to={route} style={{ textDecoration: "none" }}> */}
                <img
                  className="nftTileEachImage img-fluid border-radius nft-img-radius card_imgmob"
                  src={Image}
                />
                {/* </Link> */}
                <img id="like_icon" />
                <div
                  className="nftTileEachDetails card-lower"
                  style={{
                    padding: "0px 14px 0px 12px",
                  }}
                >
                  <div className="nftTileEachDetailsFirstContainer container__up">
                    <div
                      className="nftTileEachDetailsFirstContainerName"
                      style={{
                        color: "#191919",
                        height: "20px",
                        overflow: "hidden",
                      }}
                    >
                      Abstract
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {toggleSelect && (
          <div className="collectionCardEach col-md-6 col-lg-3 col-sm-12 mt-5">
            {/* <Link to={route}> */}
            <div
              className=" nft-card-radius collection-card border-radius pt-4 cardmob"
              style={{ backgroundColor: "#F8F8F8" }}
              // style={{ marginLeft: "1em", backgroundColor: "#F8F8F8" }}
            >
              <div className="text-center">
                <img
                  className="img-fluid border-radius collection-img-card-radius collection_imgmob"
                  src={Image}
                  style={{
                    width: "100px",
                    height: "100px",
                    textDecoration: "none",
                  }}
                />
              </div>
              <div className="text-center pt-3">
                <p
                  className="collectionCardEachName text-center font-weight-900"
                  style={{ color: "#191919" }}
                >
                  Name
                </p>
                <p className="collectionCardEachTotalitems">
                  <span className=" font-14 text-dark">
                    Total Items:2
                    <span className="text-primary"></span>
                  </span>
                </p>
              </div>
            </div>
            {/* </Link> */}
          </div>
        )}
      </div>
    </>
  );
}

export default MyItems;
