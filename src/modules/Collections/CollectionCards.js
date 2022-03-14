import React, { useState, useEffect } from "react";
// import { CollectionTile_Api } from "../API/CollectionTile_Api";
import { CollectionTile_Api } from "../../constants/CollectionTile_Api";
import CollectionNftFilter from "../../common/components/CollectionNFtFilter";
import NftToggle from "../../common/components/NftToggle";
import { getCollections } from "../../services/webappMicroservice";
import "../../assets/styles/homeCollectionCards.css";
import "../../assets/styles/collectiondetail.css";
import { getCategories } from "../../services/UserMicroService";
import { getALLCollectionById } from "../../services/contentMicroservice";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Spinner from "../../common/components/Spinner";
import { Link } from "react-router-dom";

function Collections_tile() {
  const initialFilterData = {
    sort: 1,
    categoryId: "",
    searchByName: "",
  };

  const [collections, setCollections] = useState([]);
  console.log("<<<<<<<<collections", collections);


  const [Categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterData, setFilterData] = useState(initialFilterData);
  const [toggleNft, setToggleNft] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCollections().then((response) => {
      setCollections(response);

      setIsLoading(false);
    });
    getCategories((res) => {
      setCategories(res.responseData);
      console.log(res, "<<<<<<categories");
    });
  }, []);

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilterData({ ...filterData, [name]: value });
  };

  const getCollectionById = (collectionId) => {
    // alert("called");
    setIsLoading(true);
    // ----get all nfts by collection--------
    getALLCollectionById(collectionId, (res) => {
      if (res.success) {
        setCollections(res.responseData);
        console.log(res, "<<<<<<<<collections", collections);
        setIsLoading(false);
      } else {
        toast.error("Error While Fetching Data");
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <div className="ntf_div">
        <NftToggle toggleNft={toggleNft} />
        {/* <Lower__homepage /> */}
        {/* <CollectionNftFilter /> */}
        {/* -------------Nft Filter */}
        <div className="lower__homepage" style={{ width: "100%" }}>
          <div id="filters filter-large" className="filter">
            <div className="mobilenftTilePageFirstSelect dropdown">
              <p className="mb-0">Categories </p>
              <select
                name="categoryName"
                id="sale"
                onChange={(e) => getCollectionById(e.target.value)}
                value={filterData.categoryName}
                className="first_select ml_auto"
              >
                <option value="">All</option>
                {Categories.map((item, key) => {
                  return <option value={item._id}>{item.name}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="filter">
            <div className="mobilenftTilePageThirdSelect dropdown sort-drop nftTilePageSecondSelect">
              <p className="mb-0">Sort By </p>
              <select
                name="sort"
                value={filterData.sort}
                id="sale"
                // className="first_select ml_auto"
                onChange={(e) => handleFilter(e)}
                className="priceRangeDropDown"
              >
                <option value="all">All</option>
                <option value="recently added">Recently Added</option>
                <option value="recently sold">Recently Sold</option>
              </select>
            </div>
          </div>
        </div>
        {/* --------------- */}
        <div
          className="nftTileContainer row  ntf_row mob_row"
          style={{ justifyContent: "start" }}
        >
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {isLoading && <Spinner />}
            {(() => {
              if (!isLoading && collections.length == 0) {
                return (
                  <span style={{ fontWeight: "bold" }}>No Collections</span>
                );
              }
            })()}
          </div>
          {collections.map((collection) => {
            const { _id, imageUrl, name, nfts } = collection;
            const route = "/collection-details/" + _id;
            return (
              <div className="collectionCardEach col-md-6 col-lg-3 col-sm-12 mt-5 nft_card">
                <Link to={route}>
                  <div
                    className=" nft-card-radius collection-card border-radius pt-4 cardmob"
                    style={{ backgroundColor: "#F8F8F8" }}
                  // style={{ marginLeft: "1em", backgroundColor: "#F8F8F8" }}
                  >
                    <div className="text-center">
                      <img
                        className="img-fluid border-radius collection-img-card-radius collection_imgmob"
                        src={imageUrl}
                        style={{
                          width: "100px",
                          height: "100px",
                          textDecoration: "none",
                        }}
                      />
                    </div>
                    <div className="text-center pt-3">
                      <p
                        className="collectionCardEachName text-center font-weight-900"
                        style={{ color: "#191919" }}
                      >
                        {name}
                      </p>
                      <p className="collectionCardEachTotalitems">
                        <span className=" font-14 text-dark">
                          Total Items:
                          <span className="text-primary">{nfts.length}</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
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

export default Collections_tile;
