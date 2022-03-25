import React, { useState, useEffect } from "react";

import "../../assets/styles/Leader.css";

import "../../assets/styles/Notification.css";

import "../../assets/styles/custom.css";

import "../../assets/styles/homenftcard.css";
import NoProfile from "../../assets/images/NoProfile.svg";


import { Link } from "react-router-dom";

import {

  LeaderBoardApi,

  LeaderBoardApi2,

  LeaderBoardApi3,

  Pending,

  Accepted,

  Rejected,

} from "../../constants/LeaderBoardApi";

import { Oval } from "react-loader-spinner";

import { getTopSellers } from "../../services/sellAndPurchaseMicroService";

import { getTopCollections, getTopBuyers } from "../../services/sellAndPurchaseMicroService";

import { getTopNftSales } from "../../services/webappMicroservice";
import Spinner from "../../common/components/Spinner";

const queryString = require("query-string");


//import { borderRadius } from "@mui/system";



function LeaderBoard() {

  const [topNftSales, setTopNftSales] = useState([]);


  const [topSellers, setTopSellers] = useState([]);



  // useEffect(async () => {

  //   await getTopSellers().then((response) => setTopSellers(response));

  // }, []);



  var limitSellers = topSellers.slice(0, 4)

  console.log("topSellers", topSellers);

  const [topBuyers, setTopBuyers] = useState([]);






  const [topCollections, setTopCollections] = useState([]);

  const queryString = require("query-string");

  const [buyerDuration, setBuyerDuration] = useState({

    duration: "all",

  });
  const [NFTDuration, setNFTDuration] = useState({

    duration: "all",

  });

  const [sellerDuration, setSellerDuration] = useState({

    duration: "all",

  });

  const [collectionDuration, setCollectionDuration] = useState({

    duration: "all",

  });

  const buyerReqObj = queryString.stringify(buyerDuration);
  const NFTReqObj = queryString.stringify(NFTDuration);


  const sellerReqObj = queryString.stringify(sellerDuration);

  const collectionReqObj = queryString.stringify(collectionDuration);

  useEffect(async () => {

    await getTopBuyers(buyerReqObj).then((response) => setTopBuyers(response));

  }, [buyerDuration]);



  var limitBuyers = topBuyers.slice(0, 4)

  console.log("topBuyers", topBuyers);


  useEffect(async () => {

    await getTopSellers(sellerReqObj).then((response) => setTopSellers(response));

  }, [sellerDuration]);





  useEffect(async () => {

    await getTopCollections(collectionReqObj).then((response) => setTopCollections(response));

  }, [collectionDuration]);

  var limitCollections = topCollections.slice(0, 4)

  console.log("topCollesssssssssssssssctions", topCollections);



  // const [topNftSales, setTopNftSales] = useState([]);



  useEffect(async () => {

    await getTopNftSales(NFTReqObj).then((response) => setTopNftSales(response));

  }, [NFTDuration]);

  console.log("topNftSales", topNftSales);




  // const [state, setState] = useState(LeaderBoardApi);

  const [PendingAcceptedCreated, setPendingAcceptedCreated] =

    useState("pending");

  const [state, setState] = useState(LeaderBoardApi);



  const ChangeCollectionDuration = (e) => {

    setCollectionDuration(

      { ...collectionDuration, [e.target.name]: e.target.value }

    );

  }

  const ChangeSellerDuration = (e) => {

    setSellerDuration(

      { ...sellerDuration, [e.target.name]: e.target.value }

    );

  }
  const ChangeBuyerDuration = (e) => {

    setBuyerDuration(

      { ...buyerDuration, [e.target.name]: e.target.value }

    );

  }
  const ChangeNFTDuration = (e) => {

    setNFTDuration(

      { ...buyerDuration, [e.target.name]: e.target.value }

    );

  }



  return (

    <div className="container

     leader-container" >

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

                  <select className="top-dropdown" onChange={(e) => ChangeBuyerDuration(e)} name="duration">

                    <option value="all" >All</option>

                    <option value="weekly">Weekly</option>

                    <option value="monthly">Monthly</option>

                    <option value="yearly">Yearly</option>

                  </select>

                  {/* <div className="dropdown col leaderboardDropdown">

                    <button

                      className="btn border dropdown-toggle"

                      type="button"

                      id="dropdownMenuButton1"

                      data-bs-toggle="dropdown"

                      aria-expanded="false"

                    >

                      Weekly

                    </button>

                    <select

                      className="dropdown-menu"

                      aria-labelledby="dropdownMenuButton1"

                    >

                      <option>

                        <a className="dropdown-item" href="#">

                          Weekly

                        </a>

                      </option>

                      <option>

                        <a className="dropdown-item" href="#">

                          Monthly

                        </a>

                      </option>

                      <option>

                        <a className="dropdown-item" href="#">

                          Yearly

                        </a>

                      </option>

                    </select>

                  </div> */}

                </div>

                <div className="leaderboardTopDetails">

                  {limitBuyers.map((curElem) => {

                    { console.log("jjjjjjjjjjjjjjjj", curElem.buyer) }

                    const { cdnUrl, firstName, SubHead1, SubHead2, buyer, volume } = curElem;

                    // var result = parseFloat(precise);

                    var precise = volume.toPrecision(4);

                    var result = parseFloat(precise);



                    return (

                      <>

                        <div className="leaderboardTopDetailsRow">

                          {buyer.photo == "" || !buyer.photo ? (

                            <img

                              className="top-img" style={{ width: '71px', height: '71px' }} src={NoProfile}

                              alt=""

                            />



                          ) : (

                            <img

                              className="top-img" style={{ width: '71px', height: '71px' }} src={buyer.photo}

                              alt=""

                            />



                          )}




                          <div className="descriptiontopSeller">



                            {buyer.userName == "" ? (


                              <h2 className="sellerName"> <Link style={{ textDecoration: "null" }} to={"/user-profile/"+buyer._id}>{buyer.wallet_address.substring(0, 4)}...{buyer.wallet_address.slice(buyer.wallet_address.length - 4)}</Link></h2>

                            ) : (

                              <h2 className="sellerName"> <Link style={{ textDecoration: "null" }} to={"/user-profile/"+buyer._id}>{buyer.userName}</Link> </h2>

                            )}



                            <p className="volumeData">

                              {result} ETH

                              {/* <span className="ethValue">({"$"})</span> */}

                            </p>



                          </div>

                        </div>

                        <hr className="hr" />

                      </>

                    );

                  })}

                </div>

                {topBuyers.length === 0 && (

                  <div className="spinnerloader">{<Spinner />}



                  </div>)}

              </div>

              <div className="card-footer view-more">

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

                    Top Sellers

                  </div>

                  <select className="top-dropdown" name="duration" onChange={(e) => ChangeSellerDuration(e)}>

                    <option value="all">All</option>

                    <option value="weekly">Weekly</option>

                    <option value="monthly">Monthly</option>

                    <option value="yearly">Yearly</option>

                  </select>

                  {/* <div className="dropdown col leaderboardDropdown">

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

                  </div> */}

                </div>

                <div className="leaderboardTopDetails">

                  {limitSellers.map((curElem) => {

                    // {console.log("jjjjjjjjjjjjjjjj",curElem.)}

                    const { cdnUrl, sellerFirstName, sellerLastName, SubHead1, totalPurchasedValue, volume, topSellers } = curElem;

                    var precise = volume.toPrecision(4);

                    var result = parseFloat(precise);

                    return (

                      <>

                        <div className="leaderboardTopDetailsRow">

                          {topSellers.photo == "" || !topSellers.photo ? (

                            <img

                              className="top-img" style={{ width: '71px', height: '71px' }} src={NoProfile}

                              alt=""

                            />



                          ) : (

                            <img

                              className="top-img" style={{ width: '71px', height: '71px' }} src={topSellers.photo}

                              alt=""

                            />



                          )}




                          <div className="descriptiontopSeller">



                            {topSellers.userName == "" ? (

                              <h2 className="sellerName"> <Link to={"/user-profile/"+topSellers._id}>{topSellers.wallet_address.substring(0, 4)}...{topSellers.wallet_address.slice(topSellers.wallet_address.length - 4)}</Link></h2>

                            ) : (

                              <h2 className="sellerName"><Link to={"/user-profile/"+topSellers._id}>{topSellers.userName}</Link></h2>

                            )}



                            <p className="volumeData">

                              {result} ETH

                              {/* <span className="ethValue">({"$"})</span> */}

                            </p>



                          </div>

                        </div>

                        <hr className="hr" />

                      </>

                    );

                  })}

                </div>

                {topSellers.length === 0 && (

                  <div className="spinnerloader">{<Spinner />}


                  </div>)}

              </div>

              <div className="card-footer view-more">

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

                  <select className="top-dropdown" name="duration" onChange={(e) => ChangeCollectionDuration(e)}>

                    <option value='all'>All</option>

                    <option value='weekly'>Weekly</option>

                    <option value='monthly'>Monthly</option>

                    <option value='yearly'>Yearly</option>

                  </select>



                  {/* <div className="dropdown col leaderboardDropdown">

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

                  </div> */}

                </div>

                <div className="leaderboardTopDetails">

                  {limitCollections.map((curElem, index) => {
                    // console.log("ddddddddddddddd", curElem.collection[index].name)
                    const { collection, items, collectionPhoto } = curElem;
                    // var precise = totalVolume.toPrecision(4);

                    // var result = parseFloat(precise);
                    return (

                      <>


                        <div className="leaderboardTopDetailsRow">

                          {collection[0].imageUrl == "" || !collection[0].imageUrl ? (

                            <img

                              className="top-img" style={{ width: '71px', height: '71px' }} src={NoProfile}

                              alt=""

                            />



                          ) : (

                            <img

                              className="top-img" style={{ width: '71px', height: '71px' }} src={collection[0].imageUrl}

                              alt=""

                            />



                          )}




                          <div className="descriptiontopSeller">



                            {collection[0].name == "" || !collection[0].name ? (

                              <h2 className="sellerName"> <Link style={{ textDecoration: "null" }} to={"/collection-details/" + collection[0]._id}>{collection[0].contractAddress.substring(0, 4)}...{collection[0].contractAddress.slice(collection[0].contractAddress.length - 4)}</Link></h2>

                            ) : (

                              <h2 className="sellerName"><Link style={{ textDecoration: "null" }} to={"/collection-details/" + collection[0]._id}>{collection[0].name}</Link></h2>

                            )}

                            <p className="volumeData">

                              {items} items

                              {/* <span className="ethValue">({"$"})</span> */}

                            </p>





                          </div>

                        </div>

                        <hr className="hr" />


                      </>

                    );

                  })}

                </div>

                {limitCollections.length === 0 && (<div>

                  <div className="spinnerloader">{<Spinner />}


                  </div>

                </div>)}

              </div>

              <div className="card-footer view-more">

                <Link className="view" to="/top-collection">

                  {" "}

                  View More

                </Link>

              </div>

            </div>

          </div>

        </div>



        <div className="card-small  mb-4 leadercolmob">

          <div

            className="card-header"

            style={{ backgroundColor: "#f8f8f8", padding: "inherit", borderTopLeftRadius: '13px', borderTopRightRadius: '13px', border: 'none' }}

          >

            <ul className="small-nav nav nav-pills" id="pills-tab" role="tablist" style={{ borderBottom: "1px solid #D8D8D8", paddingTop: "20px", height: '66px' }}>

              <li className="nav-item">

                <a

                  className="nav-link active"

                  id="pills-pending-tab"

                  data-toggle="pill"

                  href="#pills-pending"

                  role="tab"

                  aria-controls="pills-pending"

                  aria-selected="true"
                  style={{ borderRadius: 'inherit', paddingLeft: '20px' }}
                  onClick={() => setPendingAcceptedCreated("pending")}

                >

                  Top Buyers
                  <hr style={{ width: "150%", marginLeft: '-20px', height: 'auto', opacity: 'inherit' }} />
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
                  style={{ borderRadius: 'inherit' }}
                  onClick={() => setPendingAcceptedCreated("accepted")}

                >

                  Top Sellers

                  <hr style={{ width: "173%", marginLeft: '-25px', height: 'auto', opacity: 'inherit' }} />

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
                  style={{ borderRadius: 'inherit' }}
                  onClick={() => setPendingAcceptedCreated("rejected")}

                >

                  Top Collections

                  <hr style={{ width: "125%", height: 'auto', opacity: 'inherit', marginLeft: "-14px" }} />

                </a>

              </li>

            </ul>

            {/* <!-- <input type="text" id="search_criteria" className="form-control" onkeyup="hashtagsearch_criteria(this.value)"

    placeholder="Search for hashtag.."> --> */}

          </div>

          <select className="small-leaderboard-dropdown" name="duration" onChange={(e) => ChangeCollectionDuration(e)} >

            <option value='all'>All</option>

            <option value='weekly'>Weekly</option>

            <option value='monthly'>Monthly</option>

            <option value='yearly'>Yearly</option>

          </select>

          <div className="small-leaderboard-body" style={{ padding: 'none !important' }}>

            <div>

              {PendingAcceptedCreated === "pending" ? (

                <BuildPendingAcceptedRejectedBlock apiData={limitBuyers} />

              ) : (

                <>

                </>

              )}



            </div>

            <div>

              {PendingAcceptedCreated === "accepted" ? (

                <BuildAcceptedBlock apiData={limitSellers} />

              ) : (

                <>

                </>

              )}

            </div>

            <div>



              {PendingAcceptedCreated === "rejected" ? (

                <BuildRejectedBlock apiData={limitCollections} />

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

            <select id="topNft-sales" className="sales-selector fs-14 fw-m" onChange={(e) => ChangeNFTDuration(e)} name="duration">

              <option value="all">All</option>

              <option value="weekly">Weekly</option>

              <option value="monthly">Monthly</option>

              <option value="yearly">yearly</option>

            </select>

          </div>

        </div>

        <div className="nfts-cont row ntf_row">

          {/* <div className="col-md-3 col-lg-3 col-sm-6 col-11 images"> */}

          {topNftSales.map((curElem) => {
            console.log("kggggggggggggggggggg",curElem)

            const { cdnUrl, name, owner, maxPrice2, daysLeft, likes, _id, content } =

              curElem;

            const route = "/nft-information/" + _id;

            return (

              <div className="nftCard col-md-6 col-lg-3 col-sm-12 nft_card card-mar">

                <div className="card nft-card-radius border-radius cardmob">



                  <Link to={route} style={{ textDecoration: "none" }}>

                    <img

                      // id="nft__photo"

                      className="nftTileEachImage  border-radius nft-img-radius card_imgmob"

                      src={content.cdnUrl}

                      alt="nft"

                      onError="this.onerror=null;this.src='/images/image.svg';"

                    />

                  </Link>

                  {/* <img id='like_icon' src={require('../asset//images/')} /> */}

                  <div className="nftTileEachDetails card-lower"

                    style={{

                      padding: "0px 14px 0px 12px",

                    }}>

                    <div className="tile__details">

                      <div className="container__up" style={{ paddingTop: '4px' }}>

                        <h6 className="sellerName1"><Link style={{ textDecoration: "null" }} to={route}>{content.name}</Link></h6>

                      </div>

                      <div className="container__down">

                        <h6 className="value__high" style={{ margin: 'inherit' }}>

                          Sold to&nbsp;

                          <span className="namesold"  >
                            {/* {buyer.wallet_address.slice(buyer.wallet_address.length - 4)} */}

                            {(String(owner[0].wallet_address).length >= 7) ? (!owner[0].wallet_address ? " " : (String(owner[0].wallet_address).substring(0, 4) + "..." + String(owner[0].wallet_address).slice(String(owner[0].wallet_address).length - 4))) : (String(owner[0].wallet_address) === undefined ? "" : owner[0].wallet_address)}

                          </span>

                          &nbsp;for<span className="ethCurrency">&nbsp; {(content.salesInfo.price)}&nbsp;{(content.salesInfo.currency).toUpperCase()}</span>

                        </h6>

                        <div style={{ display: "flex", height: "auto", marginTop: "3px" }}>

                          <h6 className="value__k">

                            {/* {daysLeft}{" "} */}

                            {likes.length}{" "}

                            {/* <i className="far fa-clock" style={{ color: "#f54" }}></i> */}




                          </h6>

                          <div style={{ background: "#FFFFFF 0% 0% no-repeat padding-box", border: "1px solid #FFFFFF", borderRadius: "22px", width: "19px", height: "19px", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "8.38px" }}>

                            <i

                              className="fa-solid fa-heart"

                              style={{ color: "#ef3643" }}

                            ></i>

                          </div>



                        </div>



                      </div>

                    </div>

                  </div>

                </div>


              </div>


            );

          })}

          {/* My Commit */}

        </div>
        {topNftSales.length === 0 && (<div>

          <div className="spinnerloader">{<Spinner />}


          </div>

        </div>)}
      </div>

      {/* </div> */}



      {/* Top NFT sales */}

    </div>

  );

}

const BuildPendingAcceptedRejectedBlock = ({ apiData }) => {
  // console.log("ppppppppppppppppppp", apiData)
  return (

    <div>

      <div className="leaderboardTopDetails">

        {apiData.map((curElem) => {

          const { cdnUrl, firstName, SubHead1, SubHead2, buyer, volume } = curElem;
          var precise = volume.toPrecision(4);

          var result = parseFloat(precise);
          return (

            <>

              <div className="leaderboardTopDetailsRow">

                {buyer.photo == "" || !buyer.photo ? (

                  <img

                    className="top-img" style={{ width: '71px', height: '71px' }} src={NoProfile}

                    alt=""

                  />



                ) : (

                  <img

                    className="top-img" style={{ width: '71px', height: '71px' }} src={buyer.photo}

                    alt=""

                  />



                )}


                <div className="LeaderboardInsideDetails">


                  {buyer.userName == "" ? (


                    <h2 className="sellerName"> <Link style={{ textDecoration: "null" }} to={"/user-profile/"+buyer._id}>{buyer.wallet_address.substring(0, 4)}...{buyer.wallet_address.slice(buyer.wallet_address.length - 4)}</Link></h2>

                  ) : (

                    <h2 className="sellerName"> <Link style={{ textDecoration: "null" }} to={"/user-profile/"+buyer._id}>{buyer.userName}</Link> </h2>

                  )}


                  <p className="volumeData">
                    {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
                    {result} ETH

                    {/* <span className="ethValue">({"$"})</span> */}

                    <span className="ethValue">{SubHead2}</span>

                  </p>

                </div>

              </div>

              <hr className="hr" />

            </>

          );

        })}

      </div>
      {apiData.length === 0 && (

        <div className="spinnerloader">{<Spinner />}



        </div>)}

      <div className="card-footer view-more">

        <Link className="view" to="/top-bidder">

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

          const { Image, sellerFirstName, sellerLastName, SubHead2, totalPurchasedValue, volume, topSellers } = curElem;

          var precise = volume.toPrecision(4);

          var result = parseFloat(precise);

          return (

            <>

              <div className="leaderboardTopDetailsRow">




                {topSellers.photo == "" || !topSellers.photo ? (

                  <img

                    className="top-img" style={{ width: '71px', height: '71px' }} src={NoProfile}

                    alt=""

                  />



                ) : (

                  <img

                    className="top-img" style={{ width: '71px', height: '71px' }} src={topSellers.photo}

                    alt=""

                  />



                )}


                <div className="descriptiontopSeller">



                  {topSellers.userName == "" ? (

                    <h2 className="sellerName"> <Link to={"/user-profile/"+topSellers._id}>{topSellers.wallet_address.substring(0, 4)}...{topSellers.wallet_address.slice(topSellers.wallet_address.length - 4)}</Link></h2>

                  ) : (

                    <h2 className="sellerName"><Link to={"/user-profile/"+topSellers._id}>{topSellers.userName}</Link></h2>

                  )}



                  <p className="volumeData">

                    {result} ETH

                    {/* <span className="ethValue">({"$"})</span> */}

                  </p>



                </div>

              </div>

              <hr className="hr" />

            </>

          );

        })}

      </div>

      {apiData.length === 0 && (

        <div className="spinnerloader">{<Spinner />}


        </div>)}

      <div className="card-footer view-more">

        <Link className="view" to="/top-seller">

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

          const { collection, items, collectionPhoto } = curElem;

          return (

            <>

              <div className="leaderboardTopDetailsRow">

                {collection[0].imageUrl == "" || !collection[0].imageUrl ? (

                  <img

                    className="top-img" style={{ width: '71px', height: '71px' }} src={NoProfile}

                    alt=""

                  />



                ) : (

                  <img

                    className="top-img" style={{ width: '71px', height: '71px' }} src={collection[0].imageUrl}

                    alt=""

                  />



                )}


                <div className="LeaderboardInsideDetails">

                  {collection[0].name == "" || !collection[0].name ? (

                    <h2 className="sellerName"> <Link style={{ textDecoration: "null" }} to={"/collection-details/" + collection[0]._id}>{collection[0].contractAddress.substring(0, 4)}...{collection[0].contractAddress.slice(collection[0].contractAddress.length - 4)}</Link></h2>

                  ) : (

                    <h2 className="sellerName"><Link style={{ textDecoration: "null" }} to={"/collection-details/" + collection[0]._id}>{collection[0].name}</Link></h2>

                  )}

                  <p style={{ display: 'flex' }}>

                    {items} items

                  </p>

                </div>

              </div>

              <hr className="hr" />

            </>

          );

        })}

      </div>

      {apiData.length === 0 && (

        <div className="spinnerloader">{<Spinner />}
        </div>)}

      <div className="card-footer view-more">

        <Link className="view" to="/top-collection">

          {" "}

          View More

        </Link>

      </div>

    </div>

  );

};



export default LeaderBoard;