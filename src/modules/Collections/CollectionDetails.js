import React, { useEffect, useState } from "react";
// import './Top_collection.css'
// import { AbstractApi } from "../API/LeaderBoardApi";

import "../../assets/styles/Leader.css";
import "../../assets/styles/collectiondetail.css";
import { Link } from "react-router-dom";
import { AbstractApi } from "../../constants/LeaderBoardApi copy";
import { useParams } from "react-router-dom";
import {
  getCollection,
  getNftsByCollectionId,
} from "../../services/webappMicroservice";
import search from "../../assets/images/search.svg";
import dropdown from "../../assets/images/dropdown.svg";
import NftCardsHome from "../../common/components/NftCardsHome";
import CollDetailCard from "../../common/components/CollDetailCard";

function CollectionDetails() {
  const collectionId = useParams();
  const [collection, setCollection] = useState([]);
  const [statusDrop, setStatusDrop] = useState(false);
  const [priceDrop, setpriceDrop] = useState(false);
  const [sortDrop, setsortDrop] = useState(false);

  const [nfts, setNfts] = useState([]);
  const [checkLike, setcheckLike] = useState(false);
  useEffect(() => {
    getCollection(collectionId.id).then((response) => {
      setCollection(response);
      console.log(response, "<<<<response");
    });
    getNftsByCollectionId(collectionId.id).then((response) => {
      setNfts(response);
      console.log(response, "<<<<< collectionresponse");
    });
  },[]);
  const { imageUrl, coverUrl, name } = collection;
  // const [checkLike, setCheckLike] = useState(false);
  const handleLike = () => {
    setcheckLike(!checkLike);
  };
  return (
    <>
      <div>
        <div className="coldet-banner">
          <img src={coverUrl} alt="" style={{ objectFit: "cover" }} />
        </div>
        <div className="coldet-bio">
          <div className="coldet-avatar">
            <img className="col-avatar" src={imageUrl} alt="" />
          </div>
          <div className="colusername">{name}</div>
          <div className="coluserdes">
            The abstract illusion is a collection of NFT which consist abstract
            patterns that create illusion
          </div>
        </div>

        {/* <li>
          <a
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i style={{ color: "#afafaf" }} className="fas fa-ellipsis-h"></i>
          </a>
          <ul>
            <li>
              <Link to="/Report">
                <i></i> Report
              </Link>
            </li>
          </ul>
        </li> */}
        <div className="collection-body">
          <div className="collfilters">
            <div className="colleftfilter">
              {/* <h1>Top NFT sales</h1> */}
              <div className="searchboxcol">
                <input
                  type="text"
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  className="inputsearch"
                />
                <div>
                  {/* <button type="button" id="button-addon2"> */}
                  <img src={search} className="searchicon" />
                  {/* </button> */}
                </div>
              </div>
              <div
                className="colldrop"
                onClick={() => setStatusDrop(!statusDrop)}
              >
                <div className="statusText">Status</div>
                <div>
                  <img src={dropdown} />
                </div>
                <div
                  className="dropitems "
                  style={{ display: statusDrop ? "block" : "none" }}
                >
                  <div className="dropsingleitem">status 1</div>
                  <div className="dropsingleitem">status 1</div>
                  <div className="dropsingleitem">status 1</div>
                </div>
              </div>
              <div
                className="colldrop"
                onClick={() => setpriceDrop(!priceDrop)}
              >
                <div className="statusText">Price</div>
                <div>
                  <img src={dropdown} />
                </div>
                <div
                  className="dropitems"
                  style={{ display: priceDrop ? "block" : "none" }}
                >
                  <div className="dropsingleitem">status 1</div>
                  <div className="dropsingleitem">status 1</div>
                  <div className="dropsingleitem">status 1</div>
                </div>
              </div>
            </div>
            <div
              className="colldrop sortbydrop"
              onClick={() => setsortDrop(!sortDrop)}
            >
              <div className="statusText">Sort By</div>
              <div>
                <img src={dropdown} />
              </div>
              <div
                className="dropitems "
                style={{ display: sortDrop ? "block" : "none" }}
              >
                <div className="dropsingleitem">status 1</div>
                <div className="dropsingleitem">status 1</div>
                <div className="dropsingleitem">status 1</div>
              </div>
            </div>
          </div>
          {/* <div className="" style={{marginLeft:"40px",}}> */}
          <div   className="nftTileContainer row  ntf_row"
          style={{ justifyContent:"flex-start" }}>
            
            {/* <div className="col-md-3 col-lg-3 col-sm-6/ col-11 images"> */}
            {[...nfts].map((nft) => {
              const { ipfsUrl, name, salesInfo } = nft;
              // return <NftCardsHome nft={nft} />;
              return <CollDetailCard nft={nft} />;
              {
                /* <div className="profileNftContainerInner container__tile">
                    <img className="nftTileEachImage" src={ipfsUrl} alt="/" />
                    <div className="tile__details">
                      <div className="profileNftDetailFirstContainer container__up">
                        <div className="title">{name}</div>
                        <div className="title1">{salesInfo.price} ETH</div>
                      </div>
                      <div className="profileNftDetailSecondContainer container__down">
                        <div className="">
                          <span style={{ color: "black" }}>Highest Bid:</span>
                          <span
                            style={{
                              color: "#366EEF",
                              fontFamily: "poppins-bold",
                            }}
                          >
                            {" "}
                            {10}
                          </span>
                        </div>
                        <div className="">
                          {4}{" "}
                          <i
                            onClick={handleLike}
                            className="fa-solid fa-heart"
                            style={{ color: checkLike ? "#ef3643" : "grey" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div> */
              }

              // <div
              //   className="col-md-3 col-lg-3 col-sm-6 col-11 images collectionmob"
              //   style={{ marginLeft: "35px" }}
              // >
              //   <div className="container__tile">
              //     <img
              //       id="nft__photo"
              //       className="img-fluid"
              //       src={ipfsUrl}
              //       alt="/"
              //     />
              //     {/* <img id='like_icon' src={require('../asset//images/Like.png')} /> */}
              //     <div className="tile__details">
              //       <div className="container__up">
              //         <h6 className="title">{name}</h6>
              //         <h6 className="title1">{salesInfo.price}</h6>
              //       </div>
              //       <div className="container__down">
              //         <h6 className="value__high">
              //           <span style={{ color: "black" }}>10</span>
              //           <span> 20</span>
              //         </h6>
              //         <h6 className="value__k">
              //           5
              //           <i
              //             className="far fa-clock"
              //             style={{ color: "#f54" }}
              //           ></i>
              //           <i
              //             onClick={handleLike}
              //             className="fa-solid fa-heart"
              //             style={{
              //               color: checkLike ? "#ef3643" : "white",
              //               // border: "1px solid black",
              //             }}
              //             // style={{ color: "white" }}
              //           ></i>
              //         </h6>
              //       </div>
              //     </div>
              //   </div>
              // </div>
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default CollectionDetails;
//   https://image.shutterstock.com/image-vector/background-water-droplets-on-surface-260nw-274829663.jpg
