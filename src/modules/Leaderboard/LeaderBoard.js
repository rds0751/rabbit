import React, { useState, useEffect } from "react";
import "../../assets/styles/Leader.css";
import "../../assets/styles/Notification.css";
import "../../assets/styles/custom.css";
import "../../assets/styles/homenftcard.css";
import { Link } from "react-router-dom";
import {
  LeaderBoardApi,
  LeaderBoardApi2,
  LeaderBoardApi3,
  Pending,
  Accepted,
  Rejected,
} from "../../constants/LeaderBoardApi";
import { getTopSellers } from "../../services/sellAndPurchaseMicroService";
import { getTopCollections } from "../../services/sellAndPurchaseMicroService";
import { getTopNftSales } from "../../services/webappMicroservice";

function LeaderBoard() {

  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    getTopSellers().then((response) => setTopSellers(response));
  });
  var limitSellers = topSellers.slice(0, 4)
  console.log("topSellers", topSellers);

  const [topCollections, setTopCollections] = useState([]);

  useEffect(() => {
    getTopCollections().then((response) => setTopCollections(response));
  });
  var limitCollections = topCollections.slice(0, 4)
  console.log("topCollections", topCollections);

  const [topNftSales, setTopNftSales] = useState([]);

  useEffect(() => {
    getTopNftSales().then((response) => setTopNftSales(response));
  });
  console.log("topNftSales", topNftSales);




  // const [state, setState] = useState(LeaderBoardApi);
  const [PendingAcceptedCreated, setPendingAcceptedCreated] =
    useState("pending");
  const [state, setState] = useState(LeaderBoardApi);
  return (
    <div className="container leader-container" >
      <h1 className="leader">
        Leaderboard
      </h1>
      {/* 3 Tables */}
      <div className="container5">
        <div className="row leaderboard-big g-0" style={{ gap: '4%' }}>
          <div className="col leaderboardTop" style={{ backgroundColor: '#F8F8F8 !important' }}>
            <div className="card h-100">
              <div className="card-body p-0">
                <div className="leaderboardTitle">
                  <div className="col" style={{ fontSize: "16px" }}>
                    Top Buyers
                  </div>
                  <div className="dropdown col leaderboardDropdown">
                    <button
                      className="btn border dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Weekly
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Weekly
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Monthly
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Yearly
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="leaderboardTopDetails">
                  {LeaderBoardApi.map((curElem) => {
                    const { Image, Heading, SubHead1, SubHead2 } = curElem;
                    return (
                      <>
                        <div className="leaderboardTopDetailsRow">
                          <img src={Image} alt="" />
                          <div className="LeaderboardInsideDetails">
                            <h2>{Heading}</h2>
                            <p>
                              {SubHead1}
                              <span>{SubHead2}</span>
                            </p>
                          </div>
                        </div>
                        <hr className="hr" />
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="view-more">
                <Link className="view" to="/top-bidder">
                  {" "}
                  View More
                </Link>
              </div>
            </div>
          </div>
          <div className="col leaderboardTop">
            <div className="card h-100">
              <div className="card-body p-0">
                <div className="leaderboardTitle">
                  <div className="col" style={{ fontSize: "16px" }}>
                    Top Seller
                  </div>
                  <div className="dropdown col leaderboardDropdown">
                    <button
                      className="btn border dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Weekly
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Weekly
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Monthly
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Yearly
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="leaderboardTopDetails">
                  {limitSellers.map((curElem) => {
                    const { Image, sellerFirstName, sellerLastName, SubHead1, totalPurchasedValue } = curElem;
                    return (
                      <>
                        <div className="leaderboardTopDetailsRow">
                          <img className="top-img" src={Image} alt="" />


                          <div className="LeaderboardInsideDetails">
                            <h2>{sellerFirstName}{sellerLastName}</h2>
                            <p style={{ display: 'flex' }}>
                              ETH
                              <span>({totalPurchasedValue})</span>
                            </p>

                          </div>
                        </div>
                        <hr className="hr" />
                      </>
                    );
                  })}
                </div>
                {topSellers.length === 0 && (<div>
                  <h1>No Data Found</h1>
                </div>)}
              </div>
              <div className="view-more">
                <Link className="view" to="/top-seller">
                  {" "}
                  View More
                </Link>
              </div>
            </div>
          </div>
          <div className="col leaderboardTop">
            <div className="card h-100">
              <div className="card-body p-0">
                <div className="leaderboardTitle">
                  <div className="col" style={{ fontSize: "16px" }}>
                    Top Collections
                  </div>
                  <div className="dropdown col leaderboardDropdown">
                    <button
                      className="btn border dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Weekly
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Weekly
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Monthly
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Yearly
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="leaderboardTopDetails">
                  {limitCollections.map((curElem) => {
                    const { collectionPhoto, collectionName, nftCount } = curElem.items;
                    return (
                      <>
                        <div className="leaderboardTopDetailsRow">
                          <img className="top-img" src={collectionPhoto} alt="" />
                          <div className="LeaderboardInsideDetails">
                            <h2>{collectionName}</h2>
                            <p style={{ display: 'flex' }}>
                              {curElem.nftCount}
                              &nbsp;items
                            </p>
                          </div>
                        </div>
                        <hr className="hr" />
                      </>
                    );
                  })}
                </div>
                {topCollections.length === 0 && (<div>
                  <h1>No Data Found</h1>
                </div>)}
              </div>
              <div className="view-more">
                <Link className="view" to="/top-collection">
                  {" "}
                  View More
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="card-small  mb-4 leadercolmob">
          <div
            className="card-header py-3"
            style={{ backgroundColor: "#f8f8f8" }}
          >
            <ul className="nav nav-pills" id="pills-tab" role="tablist" style={{ justifyContent: "space-between" }}>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="pills-pending-tab"
                  data-toggle="pill"
                  href="#pills-pending"
                  role="tab"
                  aria-controls="pills-pending"
                  aria-selected="true"
                  style={{ fontSize: "13px" }}
                  onClick={() => setPendingAcceptedCreated("pending")}
                >
                  Top Bidders
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-accepted-tab"
                  data-toggle="pill"
                  href="#pills-accepted"
                  role="tab"
                  aria-controls="pills-accepted"
                  aria-selected="false"
                  style={{ fontSize: "13px" }}
                  onClick={() => setPendingAcceptedCreated("accepted")}
                >
                  Top Sellers
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-rejected-tab"
                  data-toggle="pill"
                  href="#pills-rejected"
                  role="tab"
                  aria-controls="pills-rejected"
                  aria-selected="false"
                  style={{ fontSize: "13px" }}
                  onClick={() => setPendingAcceptedCreated("rejected")}
                >
                  Top Collections
                </a>
              </li>
            </ul>
            {/* <!-- <input type="text" id="search_criteria" className="form-control" onkeyup="hashtagsearch_criteria(this.value)"
    placeholder="Search for hashtag.."> --> */}
          </div>
          <div
            className="dropdown col leaderboardDropdown"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            <button
              className="btn border dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: "100%", textAlign: "start", margin: "0rem 1rem" }}
            >
              Weekly
              <i className="fas fa-caret-down"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  Weekly
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Monthly
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Yearly
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div>
              {PendingAcceptedCreated === "pending" ? (
                <BuildPendingAcceptedRejectedBlock apiData={Pending} />
              ) : (
                <>
                </>
              )}

            </div>
            <div>
              {PendingAcceptedCreated === "accepted" ? (
                <BuildAcceptedBlock apiData={topSellers} />
              ) : (
                <>
                </>
              )}
            </div>
            <div>

              {PendingAcceptedCreated === "rejected" ? (
                <BuildRejectedBlock apiData={topCollections} />
              ) : (
                <>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="topNft-section">
          <div className="filters-cont">
            <label for="topNft-sales" className="fs-20 fw-sb c-b pb-16 d-sm-block d-md-none">Top NFT sales</label>            
            <div className="d-flex align-items-center">
              <label for="topNft-sales" className="fs-20 fw-sb c-b pr-12 d-none d-sm-none d-md-block">Top NFT sales</label>
              <select id="topNft-sales" name="topNfts" className="sales-selector fs-14 fw-m c-b">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">yearly</option>
              </select>
            </div>
            <div>
              <select name="sortBy" className="sort-selector fs-14 c-b">
                <option>Sort by</option>
                <option value="">option1</option>
                <option value="">option2</option>
              </select>
            </div>
          </div>
          <div className="nfts-cont row ntf_row">
            {/* <div className="col-md-3 col-lg-3 col-sm-6 col-11 images"> */}
            {topNftSales.map((curElem) => {
              const { cdnUrl, name, ownedBy, maxPrice2, daysLeft } =
                curElem;
              return (
                <div className="nftCard col-md-6 col-lg-3 col-sm-12 nft_card card-mar">
                  <div className="card nft-card-radius border-radius cardmob">
                    <img
                      // id="nft__photo"
                      className="nftTileEachImage  border-radius nft-img-radius card_imgmob"
                      src={cdnUrl}
                      alt="nft"
                      onError="this.onerror=null;this.src='/images/image.svg';"
                    />
                    {/* <img id='like_icon' src={require('../asset//images/')} /> */}
                    <div className="nftTileEachDetails card-lower"
                      style={{
                        padding: "0px 14px 0px 12px",
                      }}>
                      <div className="tile__details">
                        <div className="container__up" style={{ paddingTop: '10px' }}>
                          <h6 className="title">{name}</h6>
                        </div>
                        <div className="container__down">
                          <h6 className="value__high" style={{ margin: 'inherit' }}>
                            Sold to&nbsp;
                            <span style={{ fontWeight: "bold", color: "black" }}  >
                              {(String(ownedBy).length >= 7) ? (!ownedBy ? " " : (String(ownedBy).substring(0, 8) + "...")) : (String(ownedBy) === undefined ? "" : ownedBy)}
                            </span>
                            &nbsp;for<span> &nbsp;{curElem.biddingDetails.currency}</span>
                          </h6>
                          <h6 className="value__k">
                            {daysLeft}{" "}
                            {/* <i className="far fa-clock" style={{ color: "#f54" }}></i> */}
                            <i
                              className="fa-solid fa-heart"
                              style={{ color: "#ef3643" }}
                            ></i>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* My Commit */}
          </div>
      </div>
        {/* </div> */}

        {/* Top NFT sales */}
    </div>
  );
}
const BuildPendingAcceptedRejectedBlock = ({ apiData }) => {
  return (
    <div>
      <div className="leaderboardTopDetails">
        {apiData.map((curElem) => {
          const { Image, Heading, SubHead1, SubHead2 } = curElem;
          return (
            <>
              <div className="leaderboardTopDetailsRow">
                <img src={Image} alt="" />
                <div className="LeaderboardInsideDetails">
                  <h2>{Heading}</h2>
                  <p>
                    {SubHead1}
                    <span>{SubHead2}</span>
                  </p>
                </div>
              </div>
              <hr className="hr" />
            </>
          );
        })}
      </div>
      <div className="view-more">
        <Link className="view" to="/top-bidder" style={{ paddingBottom: "inherit" }}>
          {" "}
          View More
        </Link>
      </div>
    </div>
  );
};
const BuildAcceptedBlock = ({ apiData }) => {
  return (
    <div>
      <div className="leaderboardTopDetails">
        {apiData.map((curElem) => {
          const { Image, sellerFirstName, sellerLastName, SubHead2, totalPurchasedValue } = curElem;
          return (
            <>
              <div className="leaderboardTopDetailsRow">
                <img className="top-img" src={Image} alt="" />
                <div className="LeaderboardInsideDetails">
                  <h2>{sellerFirstName}{sellerLastName}</h2>
                  <p style={{ display: 'flex' }}>
                    ETH
                    <span>{totalPurchasedValue}</span>
                  </p>
                </div>
              </div>
              <hr className="hr" />
            </>
          );
        })}
      </div>
      {apiData.length === 0 && (<div>
        <h1>No Data Found</h1>
      </div>)}
      <div className="view-more">
        <Link className="view" to="/top-seller" style={{ paddingBottom: "inherit" }}>
          {" "}
          View More
        </Link>
      </div>
    </div>
  );
};
const BuildRejectedBlock = ({ apiData }) => {
  return (
    <div>
      <div className="leaderboardTopDetails">
        {apiData.map((curElem) => {
          const { collectionPhoto, collectionName, nftCount } = curElem;
          return (
            <>
              <div className="leaderboardTopDetailsRow">
                <img className="top-img" src={collectionPhoto} alt="" />
                <div className="LeaderboardInsideDetails">
                  <h2>{collectionName}</h2>
                  <p style={{ display: 'flex' }}>
                    {curElem.nftCount}&nbsp;items
                  </p>
                </div>
              </div>
              <hr className="hr" />
            </>
          );
        })}
      </div>
      {apiData.length === 0 && (<div>
        <h1>No Data Found</h1>
      </div>)}
      <div className="view-more">
        <Link className="view" to="/top-collection" style={{ paddingBottom: "inherit" }}>
          {" "}
          View More
        </Link>
      </div>
    </div>
  );
};

export default LeaderBoard;
