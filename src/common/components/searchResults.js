import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { getNfts, getCollections } from "../../services/webappMicroservice";

const queryString = require("query-string");

function SearchResults() {
  const location = useLocation();
  const searchInput = {
    searchByName: location.state.value,
  }
  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const reqObj = queryString.stringify(searchInput)
      await getNfts(reqObj).then((res) => setNfts(res.nftContent))
      await getCollections(reqObj).then((res) => setCollections(res))
    }
    fetchData();
  }, []);

  return (
    <div className="">
      <p>Search Results for <span>{searchInput.searchByName}</span></p>
    </div>
  )
}

export default SearchResults;