import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nfts_Tile_Api } from "../../constants/Nfts_Tile_Api";
// import "../../assets/styles/custom.css";
import "../../assets/styles/Notification.css";
import "../../assets/styles/homenftcard.css";
import NftToggle from "../../common/components/NftToggle";
import Lower__homepage from "../../common/components/HomeNftFilters";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import {
  getNfts,
  addLikeNft,
  getNFtsData,
} from "../../services/webappMicroservice";
import Like from "../../assets/images/Like.svg";
import likes from "../../assets/images/likes.svg";
import { useSelector } from "react-redux";
import Spinner from "../../common/components/Spinner";
import axios from "axios";
import NftCardsHome from "../../common/components/NftCardsHome";
const queryString = require("query-string");
function NftPage() {
  const defaultReq = {
    // type: "fix price",
    // searchByName: name ? name : "",
    // searchByName: "puneet",
    // minPrice: 0,
    // maxPrice: "",
    // --------------------------
    // sort: 0,
    type: "all",
    // searchByName: name ? name : "",
    searchByName: "",
    minPrice: 0,
    maxPrice: "",
  };
  const [nfts, setNfts] = useState([]);
  const { user, sideBar } = useSelector((state) => state);
  const [toggleNft, setToggleNft] = useState(true);
  const [filterType, setFilterType] = useState(defaultReq);
  const [isloading, setIsloading] = useState(false);
  const [type, setType] = useState("");
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("searchByName");

  const [data, setData] = useState(defaultReq);

  const reqObj1 = queryString.stringify(defaultReq);

  useEffect(() => {
    // checkapi();

    setIsloading(true);
    // getNfts(defaultReq).then((response) => {
    getNFtsData(filterType, (res) => {
      // console.log(res, "filterResponse");
      setIsloading(true);
      if (res.success) {
        setNfts(res.responseData.nftContent);
        setIsloading(false);
      } else {
        toast.error("Error While fetching Nfts");
        setIsloading(false);
      }
    });
  }, [filterType]);

  useEffect(() => {
    if (sideBar.navSearchValue != "") {
      getNFtsData(
        { ...defaultReq, searchByName: sideBar.navSearchValue },
        (res) => {
          // console.log(res, "filterResponse");
          setIsloading(true);
          if (res.success) {
            setNfts(res.responseData.nftContent);
            setIsloading(false);
          } else {
            toast.error("Error While fetching Nfts");
            setIsloading(false);
          }
        }
      );
    }
  }, [sideBar.navSearchValue]);

  const handleChange = (e) => {
    setType(e.target.value);
  };
  // ---- handlefilter-----

  const handlefilter = (e) => {
    const { name, value } = e.target;
    setFilterType({ ...filterType, [name]: value });
  };

  // ------------------
  let filteredNfts;
  if (type === "all") {
    filteredNfts = nfts;
  } else if (type === "fix price") {
    filteredNfts = nfts.filter((nft) => nft.type === type);
  } else if (type === "on auction") {
    filteredNfts = nfts.filter((nft) => nft.type === type);
  }

  // ------------------apis
  const checkapi = async () => {
    const url =
      "http://whitelabel-nft-lb-dev-1838936337.us-east-1.elb.amazonaws.com:3002/api/v1/nfts?searchByName=puneet";
    const { data } = await axios.get(
      // url
      "http://whitelabel-nft-lb-dev-1838936337.us-east-1.elb.amazonaws.com:3002/api/v1/nfts",
      {
        params: {
          searchByName: "puneet",
        },
      }
    );
    console.log(data, "<<<checknft");
  };

  const [handleLike, setHandleLike] = useState(true);

  const likeNft = (id) => {
    const data = {
      contentId: id,
      // addedBy: user.addUserData._id,
    };
    addLikeNft(data);
    setHandleLike(!handleLike);
  };

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
                name="type"
                id="sale"
                className="first_select ml_auto"
                placeholder="Sale Type"
                value={filterType.type}
                // onChange={(e) => handleChange(e)}
                onChange={(e) => handlefilter(e)}
                style={{ backgroundColor: "white" }}
              >
                <option value="all">All</option>
                <option value="fix price">Fix price</option>
                <option value="on auction">On auction</option>
              </select>
            </div>
            <div className="mobilenftTilePageSecondSelect dropdown nftTilePageSecondSelect ">
              <select
                name="maxPrice"
                id="sale"
                // className="first_select ml_auto"
                value={filterType.maxPrice}
                className="priceRangeDropDown"
                onChange={(e) => handlefilter(e)}
                style={{ backgroundColor: "white" }}
              >
                <option value="all">Price range</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
          <div className="mobilenftTilePageThirdSelect dropdown sort-drop nftTilePageSecondSelect">
            <select
              name="sort"
              id="sale"
              // className="first_select ml_auto"
              className="priceRangeDropDown"
              style={{ backgroundColor: "white" }}
              onChange={(e) => handlefilter(e)}
              value={filterType.sort}
            >
              <option value="all">Sort By</option>
              <option value="recently added">Recently Added</option>
              <option value="recently sold">Recently Sold</option>
            </select>
          </div>
        </div>
        <div
          className="nftTileContainer row  ntf_row"
          // className="nftTileContainer gird-container  ntf_row"
          style={{ justifyContent: "space-between" }}
        >
          <div className="spinnerloader">{isloading && <Spinner />}</div>

          {nfts.map((nft) => {
            const { _id, ipfsUrl, name, biddingDetails, salesInfo } = nft;
            const route = "nft-information/" + _id;

            // const { startDate, endDate } = biddingDetails;
            // const time_difference = endDate.getTime() - startDate.getTime();
            // const days_difference = time_difference / (1000 * 60 * 60 * 24);

            return (
              <>
                <NftCardsHome nft={nft} />
              </>
              // <div className=" col-md-6 col-lg-3  col-sm-12  mt-5 nft_card">
              //   <div className="card nft-card-radius border-radius cardmob">
              //     <Link to={route} style={{ textDecoration: "none" }}>
              //       <img
              //         className="nftTileEachImage img-fluid border-radius nft-img-radius card_imgmob"
              //         src={ipfsUrl}
              //       />
              //     </Link>
              //     <img
              //       id="like_icon"
              //       onClick={() => likeNft(_id)}
              //       // src={require("../../assets/images/Like.png")}
              //       // src={require("../../assets/images/Like.svg")}
              //       src={handleLike ? Like : likes}
              //     />
              //     <div
              //       className="nftTileEachDetails card-lower"
              //       style={{
              //         padding: "0px 14px 0px 12px",
              //       }}
              //     >
              //       <div className="nftTileEachDetailsFirstContainer container__up">
              //         <div
              //           className="nftTileEachDetailsFirstContainerName"
              //           style={{
              //             color: "#191919",
              //             height: "20px",
              //             overflow: "hidden",
              //           }}
              //         >
              //           {name}
              //         </div>
              //         <span
              //           className="nftTileEachDetailsFirstContainerValue"
              //           style={{
              //             fontSize: "14px",
              //             fontWeight: "600px",
              //             color: "#16AB6E",
              //           }}
              //         >
              //           {salesInfo?.price + salesInfo?.currency}
              //         </span>
              //       </div>
              //       <div
              //         className="nftTileEachDetailsSecondContainerValueHighest"
              //         // style={{ marginLeft: "1em" }}
              //       >
              //         <div>
              //           {" "}
              //           {/* Highest bid:{" "}
              //           <span className="font-weight-900">100</span>{" "} */}
              //         </div>
              //         <div>
              //           <span className="" style={{ color: "#000" }}>
              //             <i
              //               className="far fa-clock"
              //               style={{ color: "#f54" }}
              //             ></i>
              //             5 days left
              //           </span>
              //         </div>
              //       </div>
              //     </div>
              //   </div>
              // </div>
            );
          })}
          <div className=" col-md-6 col-lg-3  col-sm-12  mt-5 nft_card">
            <div className="card nft-card-radius border-radius cardmob">
              {/* <Link to={route} style={{ textDecoration: "none" }}> */}
                <img
                  className="nftTileEachImage img-fluid border-radius nft-img-radius card_imgmob"
                  // src={ipfsUrl}
                />
              {/* </Link> */}
              <img
                id="like_icon"
                // onClick={() => likeNft(_id)}
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
                    {/* {name} */}
                  </div>
                  <span
                    className="nftTileEachDetailsFirstContainerValue"
                    style={{
                      fontSize: "14px",
                      fontWeight: "600px",
                      color: "#16AB6E",
                    }}
                  >
                    {/* {salesInfo?.price + salesInfo?.currency} */}dfdf
                  </span>
                </div>
                <div
                  className="nftTileEachDetailsSecondContainerValueHighest"
                  // style={{ marginLeft: "1em" }}
                >
                  <div>
                    {" "}
                    {/* Highest bid:{" "}
            <span className="font-weight-900">100</span>{" "} */}
                  </div>
                  <div>
                    <span className="" style={{ color: "#000" }}>
                      <i className="far fa-clock" style={{ color: "#f54" }}></i>
                      5 days left
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-md-6 col-lg-3  col-sm-12  mt-5 nft_card">
            <div className="card nft-card-radius border-radius cardmob">
              {/* <Link to={route} style={{ textDecoration: "none" }}> */}
                <img
                  className="nftTileEachImage img-fluid border-radius nft-img-radius card_imgmob"
                  // src={ipfsUrl}
                />
              {/* </Link> */}
              <img
                id="like_icon"
                // onClick={() => likeNft(_id)}
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
                    {/* {name} */}
                  </div>
                  <span
                    className="nftTileEachDetailsFirstContainerValue"
                    style={{
                      fontSize: "14px",
                      fontWeight: "600px",
                      color: "#16AB6E",
                    }}
                  >
                    {/* {salesInfo?.price + salesInfo?.currency} */}dfdf
                  </span>
                </div>
                <div
                  className="nftTileEachDetailsSecondContainerValueHighest"
                  // style={{ marginLeft: "1em" }}
                >
                  <div>
                    {" "}
                    {/* Highest bid:{" "}
            <span className="font-weight-900">100</span>{" "} */}
                  </div>
                  <div>
                    <span className="" style={{ color: "#000" }}>
                      <i className="far fa-clock" style={{ color: "#f54" }}></i>
                      5 days left
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default NftPage;
