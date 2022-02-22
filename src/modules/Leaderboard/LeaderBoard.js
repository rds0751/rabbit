import React, { useState, useEffect } from "react";
import "../../assets/styles/Leader.css";
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
  console.log("topSellers", topSellers);

  const [topCollections, setTopCollections] = useState([]);

  useEffect(() => {
    getTopCollections().then((response) => setTopCollections(response));
  });
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
    <div>
      <h1 className="leader" style={{ marginBottom: "30px" }}>
        Leaderboard
      </h1>
      {/* 3 Tables */}
      <div className="container">
        <div className="row align-items-start leadercol">
          <div className="col leaderboardTop">
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
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
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
            <Link className="view" to="/TopBidders">
              {" "}
              View More
            </Link>
          </div>
          <div className="col leaderboardTop">
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
                      Monthly
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Yearly
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="leaderboardTopDetails">
              {topSellers.map((curElem) => {
                const { Image, sellerFirstName, sellerLastName, SubHead1, totalPurchasedValue } = curElem;
                return (
                  <>
                    <div className="leaderboardTopDetailsRow">
                      <img src={Image} alt="" />
                      <div className="LeaderboardInsideDetails">
                        <h2>{sellerFirstName}{sellerLastName}</h2>
                        <p>
                          {SubHead1}
                          <span>{totalPurchasedValue}</span>
                        </p>
                      </div>
                    </div>
                    <hr className="hr" />
                  </>
                );
              })}
            </div>
            <Link className="view" to="/top-seller">
              {" "}
              View More
            </Link>
          </div>
          <div className="col leaderboardTop">
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
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="leaderboardTopDetails">
              {topCollections.map((curElem) => {
                const { collectionPhoto, collectionName, SubHead1 } = curElem.items;
                return (
                  <>
                    <div className="leaderboardTopDetailsRow">
                      <img src={collectionPhoto} alt="" />
                      <div className="LeaderboardInsideDetails">
                        <h2>{collectionName}</h2>
                        <p>
                          {SubHead1}
                          <span> {curElem.totalVolume}</span>
                        </p>
                      </div>
                    </div>
                    <hr className="hr" />
                  </>
                );
              })}
            </div>
            <Link className="view" to="/Top_collection">
              {" "}
              View More
            </Link>
          </div>
        </div>

        <div className="card shadow mb-4 leadercolmob">
          <div
            className="card-header py-3"
            style={{ backgroundColor: "#f8f8f8" }}
          >
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
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
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            {PendingAcceptedCreated === "pending" ? (
              <BuildPendingAcceptedRejectedBlock apiData={Pending} />
            ) : (
              <></>
            )}

            {PendingAcceptedCreated === "accepted" ? (
              <BuildPendingAcceptedRejectedBlock apiData={Accepted} />
            ) : (
              <></>
            )}

            {PendingAcceptedCreated === "rejected" ? (
              <BuildPendingAcceptedRejectedBlock apiData={Rejected} />
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="sales">
          <div className="sales1">
            <h1 className="leader1">Top NFT sales</h1>
            <div className="dropdown col btn1">
              <button
                className="btn border dropdown-toggle btn2"
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
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="dropdown col btn1">
            <button
              className="btn border dropdown-toggle btmleaderboard btn2"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort by
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mx-0 text-center justify">
          {/* <div className="col-md-3 col-lg-3 col-sm-6 col-11 images"> */}
          {topNftSales.map((curElem) => {
            const { cdnUrl, name, ownedBy, maxPrice2, daysLeft } =
              curElem;
            return (
              <div className="col-md-3 col-lg-3 col-sm-6 col-11 images">
                <div className="container__tile">
                  <img
                    id="nft__photo"
                    className="img-fluid"
                    src={cdnUrl}
                    alt="/"
                  />
                  {/* <img id='like_icon' src={require('../asset//images/Like.png')} /> */}
                  <div className="tile__details">
                    <div className="container__up">
                      <h6 className="title">{name}</h6>
                    </div>
                    <div className="container__down">
                      <h6 className="value__high">
                        Sold to
                        <span style={{ fontWeight: "bold", color: "black" }}>
                          {ownedBy}
                        </span>
                        for<span>{curElem.biddingDetails.currency}</span>
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
            );
          })}
          {/* My Commit */}
        </div>
        {/* </div> */}

        {/* Top NFT sales */}
      </div>
    </div>
  );
}
const BuildPendingAcceptedRejectedBlock = ({ apiData }) => {
  return (
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
  );
};

export default LeaderBoard;
