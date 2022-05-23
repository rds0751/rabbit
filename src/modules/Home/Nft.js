import React, { useEffect, useState, useRef } from "react";
import "../../assets/styles/Notification.css";
import "../../assets/styles/homenftcard.css";
import NftToggle from "../../common/components/NftToggle";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { getNFtsData } from "../../services/webappMicroservice";
import { useSelector } from "react-redux";
import Spinner from "../../common/components/Spinner";
import NftCardsHome from "../../common/components/NftCardsHome";
import dropdown from "../../assets/images/dropdown.svg";
import { Button } from "react-bootstrap";
import NoItem from "../../assets/images/Noitems.svg";

import { fetchPalletsColor } from "../../utility/global"
// MUI select code
import SelectUnstyled, {
  selectUnstyledClasses,
} from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";
import Select from "react-select";
import Skeleton from "react-loading-skeleton";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: poppins-medium;
  font-size: 14px;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 260px;
  background: url(${dropdown});
  background-position: 95%;
  background-repeat: no-repeat;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 0.25rem;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: #191919;

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]};
  }

  @media only screen and (max-width:767px) {
    width:100%;
  }
  `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: poppins-medium;
  font-size: 14px;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 260px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid #F4F4F4;
  border-radius: 0.25em;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;

  @media only screen and (max-width:767px) {
    width:100%;
  }
  `
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
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
  @media only screen and (max-width: 767px) {
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

const options = [
  { value: "-1", label: "Recently added" },
  { value: "3", label: "Price: Low to High" },
  { value: "2", label: "Price: High to Low" },
  { value: "1", label: "Oldest" },
];

function NftPage(props) {
  const { user } = useSelector((state) => state);
  const { loggedInUser } = user;
  const appearance = useSelector(state => state.customize.appearance);
  const [limit, setLimit] = useState(16)
  const [filterReq, setFilterReq] = useState({
    minPrice: "",
    maxPrice: "",
    sort: "-1",
    userId: loggedInUser?._id,
    limit: limit,
  });
  const [nfts, setNfts] = useState([]);
  const [toggleNft, setToggleNft] = useState(true);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState();
  const [visibleBlogs, setVisibleBlogs] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (user?.loggedInUser !== null) {
      setFilterReq({ ...filterReq, userId: loggedInUser?._id });
    }
  }, [loggedInUser]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      await getNFtsData(filterReq, (res) => {
        setIsLoading(true);
        if (res.success) {
          setNfts(res.responseData.nftContent);
          setIsLoading(false);
        } else {
          toast.error(res.message);
          setIsLoading(false);
        }
      });
    }
    fetchData();
  }, [filterReq, limit]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  const handlePriceFilter = (e) => {
    setIsMenuOpen(false);
    setFilterReq({ ...filterReq, minPrice: minPrice, maxPrice: maxPrice });
  };
  const clearPriceFilter = (e) => {
    setMaxPrice("");
    setMinPrice("0");
    setFilterReq({ ...filterReq, minPrice: "", maxPrice: "" });
  };
  const handleSort = (e) => {
    setFilterReq({ ...filterReq, sort: e });
  };

  const loadMoreHandler = () => {
    <div className="spinnerloader">{isLoading && <Spinner />}</div>;
    // setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 4);
    setLimit((prevLimit) => prevLimit + 16);
    setFilterReq({ ...filterReq, limit: limit });
  };

  const handleLoadOut = (e, type = false) => {
    const button = e.target;

    button.style.color = fetchPalletsColor(appearance.colorPalette);

    if (type) button.style.background = '#ffffff'
    else button.style.background = '#edf2fd 0% 0% no-repeat padding-box'
  }

  const handleLoadHover = (e) => {
    const button = e.target;

    button.style.color = "#ffffff";
    button.style.background = fetchPalletsColor(appearance.colorPalette);
  }


  return (
    <>
      <div className="ntf_div">
        <NftToggle toggleNft={toggleNft} appearance={appearance} loader={props.loaderState} />
        <div className="lower__homepage" style={{ width: "100%" }}>
          {
            props.loaderState ? <Skeleton width={`250px`} height={`36px`} /> :
              <div
                id="filters filter-large"
                className="filter"
                style={{ gap: "30px" }}
              >
                <div
                  className="mobilenftTilePageSecondSelect dropdown"
                  ref={ref}
                  style={{
                    border: "1px solid #d2d2d2",
                    padding: "9px 12px 9px 12px",
                  }}
                >
                  <p className="mb-0 sale-type">Price range</p>
                  <div className="filter-drop">
                    <div
                      onClick={() => setIsMenuOpen((oldState) => !oldState)}
                      className="d-flex justify-content-between w-100"
                    >
                      <div className="text">All</div>
                      <div>
                        <img
                          alt=""
                          src={dropdown}
                          style={{ height: "17px", marginLeft: "8px" }}
                        />
                      </div>
                    </div>
                    <div
                      className="filter-item"
                      style={{ display: isMenuOpen ? "block" : "none" }}
                    >
                      <div className="row mb-3 align-items-center">
                        <div className="col-5">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
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
                            onChange={(e) => setMaxPrice(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <Button
                            type="submit"
                            onClick={(e) => clearPriceFilter(e)}
                            variant="outline-primary"
                            onMouseOver={(e) => handleLoadHover(e)} onMouseOut={(e) => handleLoadOut(e, true)}
                            style={{ color: `${fetchPalletsColor(appearance.colorPalette)}`, border: `1px solid ${fetchPalletsColor(appearance.colorPalette)}` }}
                          >
                            Clear
                          </Button>
                        </div>
                        <div className="col-6">
                          <Button
                            onClick={(e) => handlePriceFilter(e)}
                            variant="outline-primary"
                            onMouseOver={(e) => handleLoadHover(e)} onMouseOut={(e) => handleLoadOut(e, true)}
                            style={{ color: `${fetchPalletsColor(appearance.colorPalette)}`, border: `1px solid ${fetchPalletsColor(appearance.colorPalette)}` }}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          }
          {/* <div className="mobilenftTilePageThirdSelect"> */}
          {
            props.loaderState ? <Skeleton width={`250px`} height={`36px`} /> :
              <Select
                className="select-element"
                onChange={(e) => handleSort(e.value)}
                options={options}
                placeholder="Sort by"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    neutral50: "#191919", // Placeholder color
                  },
                })}
              />
          }
          {/* <CustomSelect
              name="sort"
              id="sale"
              onChange={(e) => handleSort(e)}
              value={filterReq.sort}
              defaultValue="all"
            >
              <StyledOption value="-1" hidden>Sort By</StyledOption>
              <StyledOption value="1">Ascending Order</StyledOption>
              <StyledOption value="-1">Descending Order</StyledOption>
            </CustomSelect> */}
          {/* </div> */}
        </div>
        <div
          className="nftTileContainer row   ntf_row"
          style={{ justifyContent: "start" }}
        >
          <div className="spinnerloader">
            {isLoading ? (
              <Spinner />
            ) : (
              nfts.length === 0 && (
                <div className="Noitemdiv">
                  <img className="no-image" src={NoItem} alt="No-items" />
                  <p className="textitem">No items available</p>
                </div>
              )
            )}
          </div>

          {nfts.length > 0 &&
            nfts.map((nft) => {
              return (
                <>
                  <NftCardsHome nft={nft} appearance={appearance} loader={props.loaderState} />
                </>
              );
            })}
          <div style={{ textAlign: "center" }}>
            {
              props.loaderState ? <Skeleton className="load-more" style={{background: '#ededed'}} /> :
                <button onMouseOver={(e) => handleLoadHover(e)} onMouseOut={(e) => handleLoadOut(e)} style={{ color: `${fetchPalletsColor(appearance.colorPalette)}` }} className="load-more" onClick={loadMoreHandler}>
                  Load More
                </button>
            }
          </div>
          {/* {visibleBlogs >= nfts.length ? (
            visibleBlogs >= nfts.length && !isLoading ? (
              <div style={{ textAlignLast: "center" }}>
                <button className="endButton"> End </button>
              </div>
            ) : (
              ""
            )
          ) : (
            <div style={{ textAlignLast: "center"}}>
              <button onMouseOver={(e)=>handleLoadHover(e)} onMouseOut={(e)=>handleLoadOut(e)} style={{color: `${fetchPalletsColor(appearance.colorPalette)}`}} className="load-more" onClick={loadMoreHandler}>
                Load More
              </button>
            </div>
          )} */}
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
