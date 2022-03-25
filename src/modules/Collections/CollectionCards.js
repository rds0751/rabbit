import React, { useState, useEffect } from "react";
import { CollectionTile_Api } from "../../constants/CollectionTile_Api";
import CollectionNftFilter from "../../common/components/CollectionNFtFilter";
import NftToggle from "../../common/components/NftToggle";
import { getCollections } from "../../services/webappMicroservice";
import "../../assets/styles/homeCollectionCards.css";
import "../../assets/styles/collectiondetail.css";
import { getCategories } from "../../services/clientConfigMicroService";
import { getALLCollectionById } from "../../services/contentMicroservice";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Spinner from "../../common/components/Spinner";
import { Link } from "react-router-dom";
import NoItem from "../../assets/images/Noitems.svg"
const queryString = require('query-string');
function Collections_tile() {
  const initialFilterData = {
    sort: "",
    categoryId: "",
    searchByName: "",
  };

  const [collections, setCollections] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterData, setFilterData] = useState(initialFilterData);
  const [visibleBlogs, setVisibleBlogs] = useState(8)

  const [toggleNft, setToggleNft] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await getCategories().then((res) => {
        setCategories(res);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const reqObj = queryString.stringify(filterData);
      await getCollections(reqObj).then((res) => {
        setCollections(res);
        setIsLoading(false);
      });
    }
    fetchData();
  }, [filterData]);

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
  const loadMoreHandler = () => {
    // <div className="spinnerloader">{isloading && <Spinner />}</div>
    setVisibleBlogs(prevVisibleBlogs => prevVisibleBlogs + 4)

  }
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
              {/* <p className="mb-0">Categories </p> */}
              <select
                name="categoryId"
                id="sale"
                onChange={(e) => handleFilter(e)}
                value={filterData.categoryName}
                className="first_select ml_auto dropdown-toggle-ellipsis sort-drop"
                style={{ width: '240px' }}
              >
                <option value="">Categories All</option>
                {Categories.map((item, key) => {
                  return <option value={item._id}>{item.name}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="filter">
            <div className="dropdown" style={{ width: "260px" }}>
              {/* <p className="mb-0">Sort By</p> */}
              <select
                name="sort"
                value={filterData.sort}
                id="sale"
                // className="first_select ml_auto"
                onChange={(e) => handleFilter(e)}
                className="priceRangeDropDown dropdown-toggle-ellipsis sort-drop"
                style={{ width: "260px" }}
              >
                <option value="">Sort By All</option>
                <option value="-1">Recently added</option>
                <option value="3">Items low to high</option>
                <option value="2">Items high to low</option>
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
          {/* nfts.slice(0, visibleBlogs).map((nft) =>  */}

          {collections.slice(0, visibleBlogs).map((collection) => {
            const { _id, imageUrl, name, nftCount } = collection;
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
                          <span className="text-primary">{nftCount}</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
          {collections.length === 0 && (<div>
            <div className="Noitemdiv">
              <img src={NoItem} />
              <p className="textitem">No items available</p>
            </div>
          </div>)}
          {
            visibleBlogs >= collections.length ? "" :
              ( <div style={{textAlignLast: "center"}}><button className="load-more" onClick={loadMoreHandler}>Load More</button></div>
                )
          }

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
