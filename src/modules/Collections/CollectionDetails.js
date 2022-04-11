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

// MUI select code
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: poppins-medium;
  font-size: 14px;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 200px;
  background: url(${dropdown});
  background-position: 95%;
  background-repeat: no-repeat;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.25rem;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: #191919;

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  @media only screen and (max-width:767px) {
    width:100%;
    margin-top:16px;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: poppins-medium;
  font-size: 14px;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 200px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid #F4F4F4;
  border-radius: 0.25em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;

  @media only screen and (max-width:767px) {
    width:100%;
  }
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.25em;
  cursor: pointer;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
  @media only screen and (max-width:767px) {
    width:100%;
  }
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

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

  const setPrice = () => {
    setFilter({...filter, "minPrice": minPrice, "maxPrice": maxPrice})
    setPriceDrop(!priceDrop)
  }

  const clearValues = () => {
    setMinPrice("")
    setMaxPrice("")
  }

  const handleStatus = (e) => {
    setFilter({ ...filter, 'status': e });
  };

  const handleSort = (e) => {
    setFilter({ ...filter, 'sort': e });
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
                  <img src={search} className="searchicon" />
                </div>
              </div>
              <div className="colldrop" >
                <div className="statusText">
                  Price range
                </div>
                <div><img src={dropdown} alt="arrow" onClick= {e => setPriceDrop(!priceDrop)}/></div>                
                {priceDrop && (
                  <div className="dropitems">
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
                    <div className="col-5">
                      <Button variant="outline-primary" onClick={clearValues} className="clear-btn">Clear</Button>
                    </div>
                    <div className="col-2"></div>
                    <div className="col-5">
                      <Button variant="outline-primary" onClick={setPrice} className="clear-btn">Apply</Button>
                    </div>
                  </div>
                </div>
                )}

              </div>
              <div>
                <CustomSelect
                  name="status"
                  onChange={(e) => handleStatus(e)}
                  value={filter.status}
                  defaultValue=""
                >
                  <StyledOption value="" hidden>Status</StyledOption>
                  <StyledOption value="" >All</StyledOption>
                  <StyledOption value="onsale" >Open for sale</StyledOption>
                  <StyledOption value="new">New</StyledOption>
                </CustomSelect>
              </div>              
              <div className="ms-md-auto">
                <CustomSelect
                  name="sort"
                  onChange={(e) => handleSort(e)}
                  value={filter.sort}
                  defaultValue=""
                >
                  <StyledOption value="" hidden>Sort By All</StyledOption>
                  <StyledOption value="" >All</StyledOption>
                  <StyledOption value="1">Recently added</StyledOption>
                  <StyledOption value="2">Price: High to Low</StyledOption>
                  <StyledOption value="3">Price: Low to High</StyledOption>                
                </CustomSelect>
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
