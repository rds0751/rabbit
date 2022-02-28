import React, { useEffect, useState } from "react";
// import './Top_collection.css'
// import { AbstractApi } from "../API/LeaderBoardApi";

import "../../assets/styles/Leader.css";
import { Link } from "react-router-dom";
import { AbstractApi } from "../../constants/LeaderBoardApi copy";
import { useParams } from "react-router-dom";
import {
  getCollection,
  getNftsByCollectionId,
} from "../../services/webappMicroservice";

function CollectionDetails() {
  const collectionId = useParams();
  const [collection, setCollection] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [checkLike, setcheckLike] = useState(false);
  useEffect(() => {
    getCollection(collectionId.id).then((response) => setCollection(response));
    getNftsByCollectionId(collectionId.id).then((response) =>
      setNfts(response)
    );
  });
  const { imageUrl, coverUrl, name } = collection;
  const handleLike = () => {
    setcheckLike(!checkLike);
  };
  return (
    <>
      <div>
        <div className="position-relative relative">
          <img src={coverUrl} alt="" />
        </div>
        <div className="position-absolute absolute">
          <img src={imageUrl} alt="" />
          <h2>{name}</h2>
          <p style={{ marginTop: "10px", marginBottom: "0px" }}>
            The abstract illusion is a collection of NFT which consist
          </p>
          <p style={{ marginBottom: "0px" }}>
            abstract patterns that create illusion
          </p>
        </div>

        <li className="nav-item dropdown position-absolute absolutedot list-unstyled">
          <a
            className="nav-link dropdown"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ fontSize: "16px" }}
          >
            <i style={{ color: "#afafaf" }} className="fas fa-ellipsis-h"></i>
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link className="dropdown-item threedot" to="/Report">
                <i
                  style={{ margin: "0px 5px 0px 10px" }}
                  className="fas fa-flag"
                ></i>{" "}
                Report
              </Link>
            </li>
          </ul>
        </li>
        <div className="collectionsales collectionsalesHome">
          <div className="sales1">
            {/* <h1>Top NFT sales</h1> */}
            <div
              className="input-group buying-search-btn"
              style={{ marginLeft: "150px" }}
            >
              <input
                type="text"
                className="form-control border-input input-box-border"
                style={{ marginLeft: "1em", borderRight: "0" }}
                placeholder="Search"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <div className="input-group-append w-25">
                <button
                  className="btn btn-search-secondary border border-search"
                  type="button"
                  id="button-addon2"
                  style={{ borderRadius: "0px 5px 5px 0px" }}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div className="dropdown col col1">
              <button
                className="btn border dropdown-toggle col12"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Status
                <i className="fas fa-caret-down"></i>
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
            <div className="dropdown col col1">
              <button
                className="btn border dropdown-toggle col12"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Price
                <i className="fas fa-caret-down"></i>
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
          <div className="dropdown col col11" style={{ marginRight: "3rem" }}>
            <button
              className="btn border dropdown-toggle col12"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort by
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
        </div>
        <div className="row mx-0 text-center justify">
          {/* <div className="col-md-3 col-lg-3 col-sm-6 col-11 images"> */}
          {nfts.map((nft) => {
            const { ipfsUrl, name, salesInfo } = nft;
            return (
              <div
                className="col-md-3 col-lg-3 col-sm-6 col-11 images collectionmob"
                style={{ marginLeft: "35px" }}
              >
                <div className="container__tile">
                  <img
                    id="nft__photo"
                    className="img-fluid"
                    src={ipfsUrl}
                    alt="/"
                  />
                  {/* <img id='like_icon' src={require('../asset//images/Like.png')} /> */}
                  <div className="tile__details">
                    <div className="container__up">
                      <h6 className="title">{name}</h6>
                      <h6 className="title1">{salesInfo.price}</h6>
                    </div>
                    <div className="container__down">
                      <h6 className="value__high">
                        <span style={{ color: "black" }}>10</span>
                        <span> 20</span>
                      </h6>
                      <h6 className="value__k">
                        5
                        <i
                          className="far fa-clock"
                          style={{ color: "#f54" }}
                        ></i>
                        <i
                          onClick={handleLike}
                          className="fa-solid fa-heart"
                          style={{
                            color: checkLike ? "#ef3643" : "white",
                            // border: "1px solid black",
                          }}
                          // style={{ color: "white" }}
                        ></i>
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

export default CollectionDetails;
//   https://image.shutterstock.com/image-vector/background-water-droplets-on-surface-260nw-274829663.jpg
