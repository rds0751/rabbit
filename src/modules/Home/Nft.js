import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nfts_Tile_Api } from "../../constants/Nfts_Tile_Api";
// import "../../assets/styles/custom.css";
import "../../assets/styles/Notification.css";
import "../../assets/styles/homenftcard.css";
import NftToggle from "../../common/components/NftToggle";
import Lower__homepage from "../../common/components/HomeNftFilters";
import { getNfts, addLikeNft } from "../../services/webappMicroservice";
import Like from "../../assets/images/Like.svg";
import likes from "../../assets/images/likes.svg";
import { useSelector } from "react-redux";

const queryString = require("query-string");
function NftPage() {
  const [nfts, setNfts] = useState([]);
  const { user } = useSelector((state) => state);
<<<<<<< HEAD
const { loggedInUser, walletAddress } = user;

=======
  const [toggleNft, setToggleNft] = useState(true);
  const [type, setType] = useState("");
>>>>>>> d421b2b1325883763ac560ea376dcc38a8112630
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("searchByName");

  const defaultReq = {
    type: "all",
    searchByName: name ? name : "",
    minPrice: 0,
    maxPrice: "",
  };

  const [data, setData] = useState(defaultReq);

  const reqObj1 = queryString.stringify(defaultReq);

  useEffect(() => {
    getNfts(reqObj1).then((response) => setNfts(response.nftContent));
  });

  const handleChange = (e) => {
    setType(e.target.value);
  };

  let filteredNfts;
  if (type === "all") {
    filteredNfts = nfts;
  } else if (type === "fix price") {
    filteredNfts = nfts.filter((nft) => nft.type === type);
  } else if (type === "on auction") {
    filteredNfts = nfts.filter((nft) => nft.type === type);
  }

  const [handleLike, setHandleLike] = useState(true);

  const likeNft = (id) => {
    alert(id)
    const data = {
      contentId: id,
      addedBy:loggedInUser?._id,
      // addedBy: user.addUserData._id,
<<<<<<< HEAD
    }
    const res=addLikeNft(data)
    console.log("sssss",res)

// console.log("kkkkkkkkkkkkkkkkk",blockchainRes)
    setHandleLike(!handleLike)
  }
  
=======
    };
    addLikeNft(data);
    setHandleLike(!handleLike);
  };

>>>>>>> d421b2b1325883763ac560ea376dcc38a8112630
  return (
    <>
      {/* <div className="container ntf_div"> */}
      <div className="ntf_div">
        <NftToggle toggleNft={toggleNft} />
        {/* <Lower__homepage /> */}
        <div className="lower__homepage" style={{ width: "100%" }}>
          <div id="filters filter-large" className="filter">
            <div className="mobilenftTilePageFirstSelect dropdown">
              <p className="mb-0 sale-type">Sale type</p>
              <select
                name="sale"
                id="sale"
                className="first_select ml_auto"
                placeholder="Sale Type"
                onChange={(e) => handleChange(e)}
                style={{ backgroundColor: "white" }}
              >
                <option value="options">All</option>
                <option value="options">Fix price</option>
                <option value="options">On auction</option>
              </select>
            </div>
            <div className="mobilenftTilePageSecondSelect dropdown nftTilePageSecondSelect ">
              <select
                name="sale"
                id="sale"
                // className="first_select ml_auto"
                className="priceRangeDropDown"
                style={{ backgroundColor: "white" }}
              >
                <option value="all">Price range</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
          <div className="mobilenftTilePageThirdSelect dropdown sort-drop nftTilePageSecondSelect">
            <select
              name="sale"
              id="sale"
              // className="first_select ml_auto"
              className="priceRangeDropDown"
              style={{ backgroundColor: "white" }}
            >
              <option value="all">Sort By</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
        <div
          className="nftTileContainer row  ntf_row"
          style={{ justifyContent: "space-between" }}
        >
          {nfts.map((nft,index) => {
            const { _id, ipfsUrl, name, biddingDetails, salesInfo } = nft;
            // console.log("[[[[[[[",biddingDetails.minPrice)
            const route = "nft-information/" + _id;

            // const { startDate, endDate } = biddingDetails;
            // const time_difference = endDate.getTime() - startDate.getTime();
            // const days_difference = time_difference / (1000 * 60 * 60 * 24);

            return (
<<<<<<< HEAD
              <div className=" col-md-6 col-lg-3 col-sm-12 mt-5 nft_card">
                <div >
                  <div className="card nft-card-radius border-radius cardmob">
                    <Link to={route} style={{ textDecoration: "none" }}>
                      <img
                        className="img-fluid border-radius nft-img-radius card_imgmob"
                        src={ipfsUrl}
                        // src={require("../../assets/images")}
                        // style={{ width: "270px" }}
                      />
                    </Link>
                    {index}
                    <img
                      id="like_icon"
                      key={index}
                      onClick={() => likeNft(_id)}
                      // src={require("../../assets/images/Like.png")}
                      // src={require("../../assets/images/Like.svg")}
                        src={handleLike ? Like : likes}
=======
              <div className=" col-md-6 col-lg-3  col-sm-12  mt-5 nft_card">
                <div className="card nft-card-radius border-radius cardmob">
                  <Link to={route} style={{ textDecoration: "none" }}>
                    <img
                      className="nftTileEachImage img-fluid border-radius nft-img-radius card_imgmob"
                      src={ipfsUrl}
>>>>>>> d421b2b1325883763ac560ea376dcc38a8112630
                    />
                  </Link>
                  <img
                    id="like_icon"
                    onClick={() => likeNft(_id)}
                    // src={require("../../assets/images/Like.png")}
                    // src={require("../../assets/images/Like.svg")}
                    src={handleLike ? Like : likes}
                  />
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
                        {name}
                      </div>
                      <span
                        className="nftTileEachDetailsFirstContainerValue"
                        style={{
                          fontSize: "14px",
                          fontWeight: "600px",
                          color: "#16AB6E",
                        }}
                      >
<<<<<<< HEAD
                        Highest bid:
                        <span className="font-weight-900">{biddingDetails.minPrice}</span>
                        <span
                          className="dayleft_mob"
                          style={{ marginLeft: "2em", color: "#000" }}
                        >
=======
                        {salesInfo?.price + salesInfo?.currency}
                      </span>
                    </div>
                    <div
                      className="nftTileEachDetailsSecondContainerValueHighest"
                      // style={{ marginLeft: "1em" }}
                    >
                      <div>
                        {" "}
                        Highest bid:{" "}
                        <span className="font-weight-900">100</span>{" "}
                      </div>
                      <div>
                        <span className="" style={{ color: "#000" }}>
>>>>>>> d421b2b1325883763ac560ea376dcc38a8112630
                          <i
                            className="far fa-clock"
                            style={{ color: "#f54" }}
                          ></i>
                          5 days left
                        </span>
                      </div>
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
