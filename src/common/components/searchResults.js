import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getNfts, getCollections } from "../../services/webappMicroservice";
import { getCategories } from "../../services/clientConfigMicroService";
import style from "styled-components";
import dropdown from "../../assets/images/dropdown.svg";
import Carousel from "react-elastic-carousel";

// MUI select code
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
]
const MainContainer = style.div`
  margin: 0px 80px;
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
margin:16px;
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
  
  const searchInput = {
    searchByName: location.state.value,
  };
  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [Categories, setCategories] = useState([]);

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
      const reqObj = queryString.stringify(searchInput);
      await getNfts(reqObj).then((res) => setNfts(res.nftContent));
      await getCollections(reqObj).then((res) => setCollections(res));
    }
    fetchData();
  }, []);
  console.log("salle", collections)
  return (
    <MainContainer>
      <Heading>
        Search Results for &nbsp;
        <SpanText>{searchInput.searchByName}</SpanText>
      </Heading>
      <CollTitle>Collections</CollTitle>
      <FiltersDiv>
        <CustomSelect
          name="categoryId"
          id="sale"
          // onChange={(e) => handleFilter(e)}
          // value={filterData.categoryName}
          defaultValue=""
        >
          <StyledOption value="" hidden>
            Categories All
          </StyledOption>
          <StyledOption value="">All</StyledOption>
          {Categories.map((item, key) => {
            return <StyledOption value={item._id}>{item.name}</StyledOption>;
          })}
        </CustomSelect>
        <CustomSelect
                name="sort"
                id="sale"
                // onChange={(e) => handlefilter(e)}
                // value={filterData.sort}
                defaultValue=""
                >
                <StyledOption value="" hidden>Sort By All</StyledOption>
                <StyledOption value="" >All</StyledOption>
                <StyledOption value="-1">Recently added</StyledOption>
                <StyledOption value="3">Items low to high</StyledOption>
                <StyledOption value="2">Items high to low</StyledOption>
              </CustomSelect>
      </FiltersDiv>
      <CarouselDiv>
        <Carousel breakPoints={breakPoints}>
          {collections.map((collection) => {
            const {imageUrl, name, nftCount} = collection
            return(
              <Item>
                <img src={imageUrl} alt=""
                 style={{width:"138px",
                  height:"138px",
                  borderRadius:"171px",
                  }} />
                <CollName>{name}</CollName>
                <ItemsText>Total Items:&nbsp;<Count>{nftCount}</Count></ItemsText>
              </Item>
            )
          })}
        </Carousel>
      </CarouselDiv>
      <CollTitle>Nfts</CollTitle>
      
    </MainContainer>
  );
}

export default SearchResults;
