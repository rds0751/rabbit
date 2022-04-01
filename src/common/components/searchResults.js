import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { getNfts, getCollections } from "../../services/webappMicroservice";
import { getCategories } from "../../services/clientConfigMicroService";
import style from "styled-components";
import dropdown from "../../assets/images/dropdown.svg";
import Carousel from "react-elastic-carousel";
import { Button } from "react-bootstrap";
import CollDetailCard from "../../common/components/CollDetailCard";

// MUI select code
import SelectUnstyled, {
  selectUnstyledClasses,
} from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
const MainContainer = style.div`
padding: 0px !important;
width: 86.66%;
box-sizing: border-box;
margin: 0px auto;
`;
const Heading = style.h3`
  padding-top: 36px;
  font-size: 20px;
  font-weight: 600;
`;
const SpanText = style.span`
  color: #366eef;
  font-weight: 600;
`;
const CollTitle = style.h3`
  padding-top: 46px;
  font-size: 18px;
  font-weight: 600;
`;
const FiltersDiv = style.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top:34px;
  @media screen and (max-width:700px){
    flex-direction:column;
  }
`;
const CarouselDiv = style.div`
  margin-top:42px;
`;
const Item = style.div`
background-color:#F8F8F8;
border-radius: 13px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height:310px;
width: 326px;
color:#191919;
margin:10px;
`;
const CollName = style.p`
font-size:16px;
font-weight: bold;
padding-top:26px;
`;
const ItemsText = style.p`
font-size:14px;
`;
const Count = style.span`
color:#366EEF;
`;
const PriceFilter = style.div`
display: flex;
align-items: baseline;
border-radius: 4px;
width: 250px;
font-size: 14px;
border: 1px solid rgb(210, 210, 210);
padding: 9px 12px;
cursor: pointer;
position: relative;
height:42px;
`;
const PriceText = style.p`
font-size: 14px;
font-weight: 600;
`;
const PriceDropdown = style.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 52%;
padding: 0% 1% 0% 5%;
position: relative;
`;
const DropdownDiv = style.div`
display: flex !important;
justify-content: space-between!important;
width: 100%!important;
`;
const AllText = style.p`
font-size: 14px;
color: #858585;
`;
const DropDownIcon = style.img`
height: 17px;
margin-left: 8px;
`;
const Div = style.div`
display: flex;
`;
const InputDiv = style.div`
position: absolute;
top: 45px;
left: -94px;
border-top: none;
width: 279px;
z-index: 1;
background: #FFFFFF;
box-shadow: 0px 3px 6px #0000001f;
border: 1px solid #F4F4F4;
border-radius: 4px;
padding: 12px;
`;
const NftsDiv = style.div`
display: flex;
justify-content: start;
margin-bottom: 50px;
margin-left: 0px;
margin-right: 0px;
gap: calc(16% / 3.02022);
`;

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

const queryString = require("query-string");

function SearchResults() {
  const location = useLocation();

  const initialCollectionsReq = {
    searchByName: location.state.value,
    sort: "",
    categoryId: "",
  };
  const initialNftsReq = {
    searchByName: location.state.value,
    minPrice: "",
    maxPrice: "",
    sort: "",
  };

  const [collectionsReq, setCollectionsReq] = useState(initialCollectionsReq);
  const [nftsReq, setNftsReq] = useState(initialNftsReq);
  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [statusDrop, setStatusDrop] = useState(false);

  const handleCategoryId = (e) => {
    setCollectionsReq({ ...collectionsReq, categoryId: e });
  };
  const handleCollectionSort = (e) => {
    setCollectionsReq({ ...collectionsReq, sort: e });
  };
  const handleNftSort = (e) => {
    setNftsReq({ ...nftsReq, sort: e });
  };
  const handlePriceFilter = (e) => {
    setNftsReq({ ...nftsReq, minPrice: minPrice, maxPrice: maxPrice });
    setStatusDrop(false);
  };
  const clearPriceFilter = (e) => {
    setMaxPrice("");
    setMinPrice("");
    setNftsReq({ ...nftsReq, minPrice: "", maxPrice: "" });
  };
  const handleDropdown = () => {
    setStatusDrop(!statusDrop);
  };

  useEffect(() => {
    async function fetchData() {
      await getCategories().then((res) => {
        setCategories(res);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    let isFetched = true;
    async function fetchData() {
      console.log("before", collections)
      const reqObj = queryString.stringify(collectionsReq);
      const result = await getCollections(reqObj);
      if (isFetched) {
        console.log("Entered")
        setCollections(result);
      }
      console.log("after", collections)
    }
    fetchData().catch(console.error);
    return () => isFetched = false;
  }, [collectionsReq]);

  useEffect(() => {
    async function fetchData() {
      const reqObj = queryString.stringify(nftsReq);
      await getNfts(reqObj).then((res) => setNfts(res.nftContent));
    }
    fetchData();
  }, [nftsReq]);

  return (
    <MainContainer>
      <Heading>
        Search Results for &nbsp;
        <SpanText>{location.state.value}</SpanText>
      </Heading>
      {collections.length > 0 && (
        <>
          <CollTitle>Collections</CollTitle>
          <FiltersDiv>
            <CustomSelect
              name="categoryId"
              onChange={(e) => handleCategoryId(e)}
              value={collectionsReq.categoryId}
              defaultValue=""
            >
              <StyledOption value="" hidden>
                Categories All
              </StyledOption>
              <StyledOption value="">All</StyledOption>
              {Categories.map((item, index) => {
                return (
                  <StyledOption value={item._id} key={index}>{item.name}</StyledOption>
                );
              })}
            </CustomSelect>
            <CustomSelect
              name="sort"
              onChange={(e) => handleCollectionSort(e)}
              value={collectionsReq.sort}
              defaultValue=""
            >
              <StyledOption value="" hidden>
                Sort By All
              </StyledOption>
              <StyledOption value="">All</StyledOption>
              <StyledOption value="-1">Recently added</StyledOption>
              <StyledOption value="3">Items low to high</StyledOption>
              <StyledOption value="2">Items high to low</StyledOption>
            </CustomSelect>
          </FiltersDiv>
          <CarouselDiv>
            <Carousel breakPoints={breakPoints}>
              {collections.map((collection) => {
                const { _id, imageUrl, name, nftCount } = collection;
                const route = "/collection-details/" + _id;
                return (
                  <Link to={route} key={_id} style={{ textDecoration: "none" }}>
                    <Item>
                      <img
                        src={imageUrl}
                        alt=""
                        style={{
                          width: "138px",
                          height: "138px",
                          borderRadius: "171px",
                        }}
                      />
                      <CollName>{name}</CollName>
                      <ItemsText>
                        Total Items:&nbsp;<Count>{nftCount}</Count>
                      </ItemsText>
                    </Item>
                  </Link>
                );
              })}
            </Carousel>
          </CarouselDiv>
        </>
      )}

      {nfts.length > 0 && (
        <>
          <CollTitle>Nfts</CollTitle>
          <FiltersDiv>
            <Div>
              <PriceFilter>
                <PriceText>Price range</PriceText>
                <PriceDropdown>
                  <DropdownDiv onClick={handleDropdown}>
                    <AllText>All</AllText>
                    <Div>
                      <DropDownIcon src={dropdown} alt="" />
                    </Div>
                  </DropdownDiv>
                  <InputDiv style={{ display: statusDrop ? "block" : "none" }}>
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
                        >
                          Clear
                        </Button>
                      </div>
                      <div className="col-6">
                        <Button
                          onClick={(e) => handlePriceFilter(e)}
                          variant="outline-primary"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </InputDiv>
                </PriceDropdown>
              </PriceFilter>
            </Div>
            <CustomSelect
              name="sort"
              onChange={(e) => handleNftSort(e)}
              value={nftsReq.sort}
              defaultValue=""
            >
              <StyledOption value="" hidden>
                Sort By All
              </StyledOption>
              <StyledOption value="all">All</StyledOption>
              <StyledOption value="-1">Ascending Order</StyledOption>
              <StyledOption value="1">Descending Order</StyledOption>
            </CustomSelect>
          </FiltersDiv>
          <NftsDiv>
            {nfts.length > 0 &&
              nfts.map((nft, index) => {
                return (
                  <>
                    <CollDetailCard nft={nft} key={index} />
                  </>
                );
              })}
          </NftsDiv>
        </>
      )}
    </MainContainer>
  );
}

export default SearchResults;
