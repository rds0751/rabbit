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
import styled from "styled-components";
import dropdown from "../../assets/images/dropdown.svg";
import {Button} from "react-bootstrap"
// const Select = styled.select`
// appearance:none;
// background-image:url(/images/Fixed.png)
// `;

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
    alert(id);
    const data = {
      contentId: id,
      // addedBy:loggedInUser?._id,
      // addedBy: user.addUserData._id,
    };
    addLikeNft(data);
    setHandleLike(!handleLike);
  };

  const [statusDrop, setStatusDrop] = useState(false);

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
                className="first_select dropdown-toggle-ellipsis"
                placeholder="Sale Type"
                value={filterType.type}
                // onChange={(e) => handleChange(e)}
                onChange={(e) => handlefilter(e)}
                style={{ backgroundColor: "white" }}
              >
                <option value="all">All</option>
                <option value="fix price">Fix Price</option>
                <option value="on auction">On auction</option>
              </select>
            </div>
            <div className="mobilenftTilePageSecondSelect dropdown nftTilePageSecondSelect">
              <p className="mb-0 sale-type">Price range</p>
              <div className="filter-drop">
                <div onClick={() => setStatusDrop(!statusDrop)} className="d-flex justify-content-between w-100">
                  <div className="text">All</div>
                  <div>
                    <img src={dropdown} />
                  </div>
                </div>
                <div 
                  className="filter-item"
                  style={{ display: statusDrop ? "block" : "none" }}
                >
                  <form>
                    <div className="row mb-3 align-items-center">
                      <div className="col-5">
                        <input type="number" className="form-control" placeholder="Min"/> 
                      </div>
                      <div className="col-2 text-center">
                        <span className="to">to</span>
                      </div>
                      <div className="col-5">
                        <input type="number" className="form-control" placeholder="Max"/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                      <Button variant="outline-primary">Clear</Button>
                      </div>
                      <div className="col-6">
                      <Button variant="outline-primary">Apply</Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* <select
                name="maxPrice"
                id="sale"
                // className="first_select ml_auto"
                value={filterType.maxPrice}
                className="priceRangeDropDown dropdown-toggle-ellipsis"
                onChange={(e) => handlefilter(e)}
                style={{ backgroundColor: "white" }}
              >
                <option value="all">Price range</option>
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>*/}
            </div>
          </div>
          {/* <select className="sort-drop-down">
            <option>Option 1</option>
            <option>Option 2</option>
          </select> */}
          <div className="mobilenftTilePageThirdSelect dropdown sort-drop price-range-dropdown">
            <select
              name="sort"
              id="sale"
              // className="first_select ml_auto"
              className="priceRangeDropDown dropdown-toggle-ellipsis"
              style={{ backgroundColor: "white" }}
              onChange={(e) => handlefilter(e)}
              value={filterType.sort}
            >
              <option value="all">Sort By</option>
              <option value="1">Recently Added</option>
              <option value="2">Recently Sold</option>
            </select>
          </div>
        </div>
        <div
          className="nftTileContainer row   ntf_row"
          // className="nftTileContainer gird-container  ntf_row"
          style={{ justifyContent: "start" }}
        >
          <div className="spinnerloader">{isloading && <Spinner />}</div>

          {nfts.map((nft) => {
            const { _id, ipfsUrl, name, biddingDetails, salesInfo } = nft;
            // console.log("[[[[[[[",biddingDetails.minPrice)
            const route = "nft-information/" + _id;

            return (
              <>
                <NftCardsHome nft={nft} />
              </>
            );
          })}
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
