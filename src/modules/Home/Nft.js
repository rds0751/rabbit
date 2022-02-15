import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nfts_Tile_Api } from "../../constants/Nfts_Tile_Api";

import "../../assets/styles/custom.css";
import NftToggle from "../../common/components/NftToggle";
import Lower__homepage from "../../common/components/HomeNftFilters";
import { getNfts } from "../../services/webappMicroservice";

function NftPage() {
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    getNfts().then((response) => setNfts(response));
  }, []);
  console.log(nfts,"<<<< nfts")
  return (
    <>
      <div className="container ntf_div">
        <NftToggle />
        <Lower__homepage />
        <div
          className="row mob_row ntf_row"
          style={{ justifyContent: "space-between" }}
        >
          {nfts.map((nft) => {
            const { _id, ipfsUrl, name, biddingDetails, salesInfo } = nft;
            const route = "nft-information/" + _id;
            // const { startDate, endDate } = biddingDetails;
            // const time_difference = endDate.getTime() - startDate.getTime();
            // const days_difference = time_difference / (1000 * 60 * 60 * 24);

            return (
              <div className=" col-md-6 col-lg-3 col-sm-12 mt-5 nft_card">
                <div>
                  <Link to={route} style={{ textDecoration: "none" }}>
                    <div className="card nft-card-radius border-radius cardmob">
                      <img
                        className="img-fluid border-radius nft-img-radius card_imgmob"
                        src={ipfsUrl}
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
                            {name}
                          </h6>
                          <h6 className="value">
                            {salesInfo?.price + salesInfo?.currency}
                          </h6>
                        </div>
                        <h6
                          className="value__high font-13 text-dark"
                          style={{ marginLeft: "1em" }}
                        >
                          Highest bid:
                          <span className="font-weight-900">100</span>
                          <span
                            className="dayleft_mob"
                            style={{ marginLeft: "2em", color: "#000" }}
                          >
                            <i
                              className="far fa-clock"
                              style={{ color: "#f54" }}
                            ></i>
                            5 days left
                          </span>
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default NftPage;
