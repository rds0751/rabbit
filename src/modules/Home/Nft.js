import React from "react";
import { Link } from "react-router-dom";
import { Nfts_Tile_Api } from "../../constants/Nfts_Tile_Api";

import "../../assets/styles/custom.css";
import Upper__homepage from "../../common/components/Upper__homepage";
import Lower__homepage from "../../common/components/Lower_homepage";

function NftPage() {
  return (
    <>
      <div className="container">
        <Upper__homepage />
        <Lower__homepage />
        <div
          className="row mob_row"
          style={{ justifyContent: "space-between" }}
        >
          {Nfts_Tile_Api.map((curElem) => {
            const { id, image, title, price, maxPrice, daysLeft } = curElem;
            return (
              <div className="col-md-6 col-lg-3 col-sm-12 mt-5">
                <Link to="/Nft_Information" style={{ textDecoration: "none" }}>
                  <div
                    className="card nft-card-radius border-radius"
                    style={{ marginLeft: "1em" }}
                  >
                    <img
                      className="img-fluid border-radius nft-img-radius nft_card"
                      src={image}
                      // style={{ width: "270px" }}
                    />
                    <img
                      id="like_icon"
                      src={require("../../assets/images/Like.png")}
                    />
                    <div>
                      <div className="container__up">
                        <h6
                          className="font-15 font-weight-700 text-dark"
                          style={{ marginLeft: "1em" }}
                        >
                          {title}
                        </h6>
                        <h6 className="value">{price}</h6>
                      </div>
                      <h6
                        className="value__high font-13 text-dark"
                        style={{ marginLeft: "1em" }}
                      >
                        Highest bid:
                        <span className="font-weight-900">{maxPrice}</span>
                        <span style={{ marginLeft: "2em", color: "#000" }}>
                          <i class="far fa-clock" style={{ color: "#f54" }}></i>
                          {daysLeft} days left
                        </span>
                      </h6>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default NftPage;
