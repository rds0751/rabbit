import React, { useEffect, useState ,useRef} from "react";
import { Link, useLocation } from "react-router-dom";
import { Nfts_Tile_Api } from "../../constants/Nfts_Tile_Api";
// import "../../assets/styles/custom.css";
import "../../assets/styles/Notification.css";
import "../../assets/styles/homenftcard.css";
import NftToggle from "../../common/components/NftToggle";
import Lower__homepage from "../../common/components/HomeNftFilters";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import {
  getNfts,
  addLikeNft,
  getNFtsData,
} from "../../services/webappMicroservice";
import Like from "../../assets/images/Like.svg";
import likes from "../../assets/images/likes.svg";
import { useSelector } from "react-redux";
import Spinner from "../../common/components/Spinner";
import axios from "axios";
import NftCardsHome from "../../common/components/NftCardsHome";
// import styled from "styled-components";
import dropdown from "../../assets/images/dropdown.svg";
import { Button } from "react-bootstrap";
import NoItem from "../../assets/images/Noitems.svg";
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
  min-width: 260px;
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
  min-width: 260px;
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
  font-family: poppins-medium;
  font-size: 14px;

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
    width: 100%;
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


// const Select = styled.select`
// appearance:none;
// background-image:url(/images/Fixed.png)
// `;

const queryString = require("query-string");
function NftPage(props) {
  console.log(props, "sachin");
  const defaultReq = {
    // type: "fix price",
    // searchByName: name ? name : "",
    // searchByName: "puneet",
    // minPrice: 0,

    // maxPrice: "",
    // --------------------------
    // sort: 0,
    // type: "allprice",
    // searchByName: name ? name : "",
    searchByName: "",
    // minPrice: 0,
    // maxPrice: "",
    sort: -1,
  };
  const [nfts, setNfts] = useState([]);
  const { user, sideBar } = useSelector((state) => state);
  const [toggleNft, setToggleNft] = useState(true);
  const [minPrice, setminPrice] = useState("0");
  const [visibleBlogs, setVisibleBlogs] = useState(8)
  const ref = useRef()


  // const [skipItem, setSkipItem] = useState("");
  // const [itemLimit, setItemLimit] = useState(10);

  // const [prevskipItem, setPrevskipItem] = useState(0);



  const [maxPrice, setmaxPrice] = useState();

  const [filterType, setFilterType] = useState({
    sort : 'all',
  });
  const [isloading, setIsloading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [type, setType] = useState("");
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("searchByName");

  const [data, setData] = useState(defaultReq);

  const reqObj1 = queryString.stringify(defaultReq);

  useEffect(() => {
    // checkapi();
if(minPrice.length > 0){
    setIsloading(true);
    // getNfts(defaultReq).then((response) => {
    getNFtsData(filterType, (res) => {
      // console.log(res, "filterResponse");
      setIsloading(true);
      if (res.success) {

        // prevArray => [...prevArray, newValue]
        setNfts(res.responseData.nftContent);
        // setNfts([nfts,res.responseData.nftContent]);
        setIsloading(false);
      } else {
        toast.error(res.message);
        setIsloading(false);
      }
    });
  }
  else{
    toast.error("min price should'nt be incorrect or empty");
  }}, [filterType]);

  useEffect(() => {
    if (sideBar.navSearchValue != "") {
      getNFtsData(
        { ...defaultReq, searchByName: sideBar.navSearchValue },
        (res) => {
          // console.log(res, "filterResponse");
          setIsloading(true);
          if (res.success) {
            setNfts(res.responseData.nftContent);
            setIsloading(false);
          } else {
            toast.error("Error While fetching Nfts");
            setIsloading(false);
          }
        }
      );
    }
  }, [sideBar.navSearchValue]);
  // -----------------------------
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isMenuOpen])
  //---------------------------------------------------------------------------------------------------

  const handleChange = (e) => {
    setType(e.target.value);
  };
  // const setMinPr = (e) => {
  //   setminPrice(e.target.value);
  // };
  // const setMaxPr = (e) => {

  //   setmaxPrice(e.target.value);
  // };
  // ---- handlefilter-----
  const handlePriceFilter = (e) => {
    // alert(evt.target)
    // alert(maxPrice)
    // if(minPrice.length<=0)
    // setminPrice("0")
    // setFilterType({ ...filterType, [name]: value });
    // console.log("kkkkkkkkkkkk",{ })
    setFilterType({ ...filterType, minPrice: minPrice, maxPrice: maxPrice });
  };
  const clearPriceFilter = (e) => {
    // alert(evt.target)
    // alert(maxPrice)
    // setFilterType({ ...filterType, [name]: value });
    setmaxPrice("");
    setminPrice("0");
    setFilterType({ ...filterType, minPrice: "", maxPrice: "" });

    // console.log("kkkkkkkkkkkk",{ ...filterType, "minPrice": "","maxPrice": "" })
  };
  const handlefilter = (e) => {
    // const { name, value } = e;
    // alert(name)
    // alert(value)
    //setFilterType({ ...filterType, [name]: value });
    setFilterType({ ...filterType, 'sort': e });
    //console.log(e, 'sorting.......');
  };
  // console.log("mfmmfmfmfmfm",nfts)
  // ------------------
  let filteredNfts;
  if (type === "all") {
    filteredNfts = nfts;
  } else if (type === "fix price") {
    filteredNfts = nfts.filter((nft) => nft.type === type);
  } else if (type === "on auction") {
    filteredNfts = nfts.filter((nft) => nft.type === type);
  }

  // ------------------apis
  const checkapi = async () => {
    const url =
      "http://whitelabel-nft-lb-dev-1838936337.us-east-1.elb.amazonaws.com:3002/api/v1/nfts?searchByName=puneet";
    const { data } = await axios.get(
      // url
      "http://whitelabel-nft-lb-dev-1838936337.us-east-1.elb.amazonaws.com:3002/api/v1/nfts",
      {
        params: {
          searchByName: "puneet",
        },
      }
    );
    console.log(data, "<<<checknft");
  };

  const [handleLike, setHandleLike] = useState(true);

  const likeNft = (id) => {
    alert(id);
    const data = {
      contentId: id,
      // addedBy:loggedInUser?._id,
      // addedBy: user.addUserData._id,
    };
    addLikeNft(data);
    setHandleLike(!handleLike);
  };

  const [statusDrop, setStatusDrop] = useState(false);

  const buttonfilter = (e) => {
    handlePriceFilter(e);
    setStatusDrop(false);

  }
  const loadMoreHandler = () => {
    <div className="spinnerloader">{isloading && <Spinner />}</div>
    setVisibleBlogs(prevVisibleBlogs => prevVisibleBlogs + 4)

  }
console.log("jjjjjjjjjjjjjjjjjj",isloading)
  return (
    <>
      {/* <div className="container ntf_div"> */}
      <div className="ntf_div">
        <NftToggle toggleNft={toggleNft} />
        {/* <Lower__homepage /> */}
        <div className="lower__homepage" style={{ width: "100%" }}>
          <div
            id="filters filter-large"
            className="filter"
            style={{ gap: "30px" }}
          >
            {/* <div className="mobilenftTilePageFirstSelect dropdown">
              <p className="mb-0 sale-type">Sale type</p>
              <select
                name="type"
                id="sale"
                className="first_select dropdown-toggle-ellipsis"
                placeholder="Sale Type"
                value={filterType.type}
                // onChange={(e) => handleChange(e)}
                onChange={(e) => handlefilter(e)}
                style={{ backgroundColor: "white" }}
              >
                <option value="all">All</option>
                <option value="fix price">Fix Price</option>
                <option value="on auction">On auction</option>
              </select>
            </div> */}

            <div className="mobilenftTilePageSecondSelect dropdown"  ref={ref} style={{ border: '1px solid #d2d2d2', padding: '9px 12px 9px 12px' }}>
              <p className="mb-0 sale-type">Price range</p>
              <div className="filter-drop">
                <div
                  onClick={() => setIsMenuOpen(oldState => !oldState)}
                  className="d-flex justify-content-between w-100"
                >
                  <div className="text">All</div>
                  <div>
                    <img
                      src={dropdown}
                      style={{ height: "17px", marginLeft: "8px" }}
                    />
                  </div>
                </div>
                <div
                  className="filter-item"
                  style={{ display: isMenuOpen  ? "block" : "none" }}
                >
                  {/* <form onSubmit={handleSubmit}> */}
                  <div className="row mb-3 align-items-center">
                    <div className="col-5">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setminPrice(e.target.value)}
                      />
                    </div>
                    <div className="col-2 text-center">
                      <span className="to">to</span>
                    </div>
                    <div className="col-5">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setmaxPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Button
                        type="submit"
                        onClick={(e) => clearPriceFilter(e)}
                        variant="outline-primary"
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="col-6">
                      <Button onClick={(e) => buttonfilter(e)} variant="outline-primary">Apply</Button>
                    </div>
                  </div>
                  {/* </form> */}
                </div>
              </div>
              {/* <select
                name="maxPrice"
                id="sale"
                // className="first_select ml_auto"
                value={filterType.maxPrice}
                className="priceRangeDropDown dropdown-toggle-ellipsis"
                onChange={(e) => handlefilter(e)}
                style={{ backgroundColor: "white" }}
              >
                <option value="all">Price range</option>
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>*/}
            </div>
          </div>
          {/* <select className="sort-drop-down">
            <option>Option 1</option>
            <option>Option 2</option>
          </select> */}
          <div className="mobilenftTilePageThirdSelect dropdown price-range-dropdown">
            {/* <select
              name="sort"
              id="sale"
              // className="first_select ml_auto"
              className="priceRangeDropDown dropdown-toggle-ellipsis sort-drop"
              placeholder="Sort By"
              style={{ backgroundColor: "white" }}
              onChange={(e) => handlefilter(e)}
              value={filterType.sort}
            >
              <option value="all">Sort By All</option>
              <option value="-1">Ascending Order</option>
              <option value="1">Descending Order</option>
            </select> */}

            <CustomSelect
              name="sort"
              id="sale"
              onChange={(e) => handlefilter(e)}
              value={filterType.sort}
              defaultValue="all"
              >
              <StyledOption value="all" hidden>Sort By All</StyledOption>
              <StyledOption value="all" >All</StyledOption>
              <StyledOption value="-1">Ascending Order</StyledOption>
              <StyledOption value="1">Descending Order</StyledOption>
            </CustomSelect>
          </div>
        </div>
        <div
          className="nftTileContainer row   ntf_row"
          // className="nftTileContainer gird-container  ntf_row"
          style={{ justifyContent: "start" }}
        >


          <div className="spinnerloader">
            {isloading ? <Spinner /> :
              (nfts.length === 0 && (
                <div className="Noitemdiv">
                  <img src={NoItem} />
                  <p className="textitem">No items available</p>
                </div>
            ))}
          </div>

          {nfts.length > 0 && (
            //  const cardComponent = blogs.slice(0, visibleBlogs).map((blog, i) => 
            nfts.slice(0, visibleBlogs).map((nft) => {
              return (
                <>
                  <NftCardsHome nft={nft} />
                </>
              );
            })
          )}
          {
            visibleBlogs >= nfts.length ? ( visibleBlogs >= nfts.length)?  <div style={{ textAlignLast: "center" }}><button  className="endButton"> End </button></div>:"":
              (
                <div style={{ textAlignLast: "center" }}><button className="load-more" onClick={loadMoreHandler}>Load More</button></div>)
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

export default NftPage;
