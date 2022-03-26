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
import NoItem from "../../assets/images/Noitems.svg";
import { Button } from "react-bootstrap";
import Spinner from "../../common/components/Spinner";

const queryString = require('query-string');

function CollectionDetails() {
  const defaultFilter = {
    searchByName: "",
    status: "",
    sortBy: "",
    minPrice: "",
    maxPrice: "",
  }
  const collectionId = useParams();
  const [collection, setCollection] = useState([]);
  const [statusDrop, setStatusDrop] = useState(false);
  const [priceDrop, setPriceDrop] = useState(false);
  const [sortDrop, setSortDrop] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [checkLike, setcheckLike] = useState(false);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState(defaultFilter);
  const sortOptions = ["Recently added", "Price high to low", "Price low to high"]
  const statusOptions = ["Open for sale", "New"]
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      await getCollection(collectionId.id).then((res) => {
        setCollection(res);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const reqObj = queryString.stringify(filter);
      await getNftsByCollectionId(collectionId.id, reqObj).then((res) => {
        setNfts(res.nftContent);
        setIsLoading(false);
      });
    }
    fetchData();
  }, [filter]);

  const { _id, imageUrl, coverUrl, name, description } = collection;
  const handleLike = () => {
    setcheckLike(!checkLike);
  };

  const onSortHandle = (e) => {
    setSort(e.target.textContent)
    if (e.target.textContent === "Recently added") {
      setFilter({...filter, "sort": 1})
    } else if (e.target.textContent === "Price high to low"){
      setFilter({...filter, "sort": 2})
    } else {
      setFilter({...filter, "sort": 3})
    }
  }
  const onStatusHandle = (e) => {
    setStatus(e.target.textContent)
    if (e.target.textContent === "New") {
      setFilter({...filter, "status": "new"})
    } else {
      setFilter({...filter, "status": "onsale"})
    }
  }

  const setPrice = () => {
    setFilter({...filter, "minPrice": minPrice, "maxPrice": maxPrice})
    setPriceDrop(!priceDrop)
  }

  const clearValues = () => {
    setMinPrice("")
    setMaxPrice("")
  }

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
              <div className="searchboxcol">
                <input
                  type="text"
                  name="searchByName"
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  className="inputsearch"
                  onChange = {(e) => setFilter({...filter, "searchByName":e.target.value })}
                />
                <div>
                  {/* <button type="button" id="button-addon2"> */}
                  <img src={search} className="searchicon" />
                  {/* </button> */}
                </div>
              </div>
              <div className="colldrop"  onClick= {e => setStatusDrop(!statusDrop)}>
                <div className="statusText">
                  {status? status : "Status"}
                </div>
                <div><img src={dropdown} /></div>                
                {statusDrop && (
                  <div className="dropitems">
                    {statusOptions.map((option) => (
                      <div className="dropsingleitem" onClick={e => {onStatusHandle(e)}} >{option}</div>
                    ))}
                </div>
                )}

              </div>
              <div className="colldrop" style={{width:"200px"}}>
                <div className="statusText">
                  Price range All
                </div>
                <div><img src={dropdown} alt="arrow" onClick= {e => setPriceDrop(!priceDrop)}/></div>                
                {priceDrop && (
                  <div className="dropitems" style={{width:"200px"}}>
                    <div className="row mb-3 align-items-center">
                      <div className="col-5">
                        <input type="number"
                        className="form-control"
                        placeholder="Min"
                        name="minPrice"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      </div>
                      <div className="col-2 text-center">
                        <span className="to">to</span>
                      </div>
                      <div className="col-5">
                        <input type="number"
                        className="form-control"
                        placeholder="Max"
                        name="maxPrice"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)} />
                      </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Button variant="outline-primary" onClick={clearValues}>Clear</Button>
                    </div>
                    <div className="col-6">
                      <Button variant="outline-primary" onClick={setPrice}>Apply</Button>
                    </div>
                  </div>
                </div>
                )}

              </div>            
              <div className="colldrop ms-auto"  onClick= {e => setSortDrop(!sortDrop)}>
                <div className="statusText">
                  {sort? sort : "Sort By"}
                </div>
                <div><img src={dropdown} /></div>                
                {sortDrop && (
                  <div className="dropitems">
                    {sortOptions.map((option) => (
                      <div className="dropsingleitem" onClick={e => {onSortHandle(e)}} >{option}</div>
                    ))}
                </div>
                )}

              </div>  
              </div>        
          </div>
          <div className="nftTileContainer row cards-gap ntf_row">
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              {isLoading ? <Spinner /> :
                (nfts.length === 0 && (
                <div className="Noitemdiv">
                  <img src={NoItem} />
                  <p className="textitem">No items available</p>
                </div>
              ))}
            </div>

            {nfts.length > 0 && (
              nfts.map((nft) => {
                return <CollDetailCard nft={nft} />;  
              })
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default CollectionDetails;
