import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nfts_Tile_Api } from "../../constants/Nfts_Tile_Api";

import "../../assets/styles/custom.css";
import NftToggle from "../../common/components/NftToggle";
import Lower__homepage from "../../common/components/HomeNftFilters";
import { getNfts, addLikeNft } from "../../services/webappMicroservice";
import Like from "../../assets/images/Like.svg";
import likes from "../../assets/images/likes.svg";
import { useSelector } from "react-redux";

const queryString = require('query-string');
function NftPage() {
  const [nfts, setNfts] = useState([]);
  const { user } = useSelector((state) => state);

  const search = useLocation().search;
  const name = new URLSearchParams(search).get('searchByName');

  const defaultReq = {
    type: "all",
    searchByName: name? name : "",
    minPrice: 0,
    maxPrice: "",
  }

  const [data, setData] = useState(defaultReq);
  
  const reqObj1 = queryString.stringify(defaultReq);

  useEffect(() => {
    getNfts(reqObj1).then((response) => setNfts(response.nftContent));
  });

  const handleChange = (e) => {
    setData({...data,[e.target.name]:e.target.value})
    const reqObj2 = queryString.stringify(data)
    getNfts(reqObj2).then((response) => setNfts(response.nftContent));
    setData(defaultReq)
  }

  const [handleLike, setHandleLike] = useState(true);

  const likeNft = (id) => {
    const data = {
      contentId: id,
      // addedBy: user.addUserData._id,
    }
    addLikeNft(data)
    setHandleLike(!handleLike)
  }
  
  return (
    <>
      <div className="container ntf_div">
        <NftToggle />
        {/* <Lower__homepage /> */}
        <div className="lower__homepage" style={{ width: "100%" }}>
        <div id="filters filter-large" className="filter">
          <div className="dropdown">
              <p className="mb-0">Sale type</p>
              <select name="type" id="sale" className="first_select ml_auto"
              onChange={(e) => handleChange(e)}>
                <option value="all">All</option>
                <option value="fix price">Fix price</option>
                <option value="on auction">On auction</option>
              </select>
          </div>          
          <div className="dropdown second_select">
              <select name="sale" id="sale" className="w-100">
                <option value="all">Price range</option>
                <option value="2">2</option>
              </select>
          </div>
        </div>
        <div className="filter">
          <div className="dropdown ml_auto" id="sort_mobile">
                <select name="sale" id="sale" className="w-100">
                  <option value="all">Sort by</option>
                  <option value="2">2</option>
                </select>
            </div>
        </div>
        
      </div>
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
                  <div className="card nft-card-radius border-radius cardmob">
                    <Link to={route} style={{ textDecoration: "none" }}>
                      <img
                        className="img-fluid border-radius nft-img-radius card_imgmob"
                        src={ipfsUrl}
                        // src={require("../../assets/images")}
                        // style={{ width: "270px" }}
                      />
                    </Link>
                    <img
                      id="like_icon"
                      onClick={() => likeNft(_id)}
                      // src={require("../../assets/images/Like.png")}
                      // src={require("../../assets/images/Like.svg")}
                      src={handleLike ? Like : likes}
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
