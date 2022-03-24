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
import NoItem from "../../assets/images/Noitems.svg"

function CollectionDetails() {
  const collectionId = useParams();
  const [collection, setCollection] = useState([]);
  const [statusDrop, setStatusDrop] = useState(false);
  const [priceDrop, setpriceDrop] = useState(false);
  const [sortDrop, setsortDrop] = useState(false);

  const [nfts, setNfts] = useState([]);
  const [checkLike, setcheckLike] = useState(false);
  useEffect(() => {
    // console.log("000000000dddddddd",collectionId)
    getCollection(collectionId.id).then((response) => {
      setCollection(response);
      console.log(response, "<<<<response");
    });
    getNftsByCollectionId(collectionId.id).then((response) => {
      setNfts(response);
      console.log(response, "<<<<< collectionresponse");
    });
  }, []);
  const { imageUrl, coverUrl, name, description } = collection;
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
            {description}
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
                  <div className="dropsingleitem">All</div>
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
                  <div className="dropsingleitem">All</div>
                  <div className="dropsingleitem">status 1</div>
                  <div className="dropsingleitem">status 1</div>
                </div>
              </div>
              <div
                className="colldrop ms-auto"
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
                  <div className="dropsingleitem">All</div>
                  <div className="dropsingleitem">status 1</div>
                  <div className="dropsingleitem">status 1</div>
                </div>
              </div>
            </div>
            
          </div>
          <div className="nftTileContainer row cards-gap ntf_row">

            {nfts.lenght>1 ? (
              [...nfts].map((nft) => {
                const { ipfsUrl, name, salesInfo } = nft;
                return <CollDetailCard nft={nft} />;
  
              })

            ):(
              <div>
              <div className="Noitemdiv">
                <img src={NoItem}/>
                <p className="textitem">No items available</p>
                </div>
              </div>

            )}
           
            {}
            
          </div>
        </div>
      </div>
    </>
  );
}

export default CollectionDetails;
