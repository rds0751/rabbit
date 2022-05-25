import React, { useEffect, useState } from "react";
import playImage from "../../assets/images/Play.svg";
import pauseImage from "../../assets/images/Pause.svg";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../assets/styles/homepage.css";
import Wallet from "../../assets/images/Wallet-home.svg";
import Sale from "../../assets/images/Sale.svg";
import NFTs from "../../assets/images/NFTs.svg";
import Collection from "../../assets/images/Collection-home.svg";
import Category from "../../assets/images/Category.svg";
import Activity from "../../assets/images/Activity.svg";
import Easy from "../../assets/images/Easy.svg";
import Offers from "../../assets/images/Offers.svg";
import Stats from "../../assets/images/Stats.svg";
import userDefault from "../../assets/images2/profile.png";
import { RedirectTo } from "../../reducers/Action";
import Ethereum from "../../assets/images/ether.svg";
import Polygon from "../../assets/images/ploygon.svg";
import Binance from "../../assets/images/binance.svg";
// import { Link, useLocation } from "react-router-dom";
// import Card from '@mui/material/Card';
import Avatar from "@mui/material/Avatar";
// import Button from '@mui/material/Button'
import { ShimmerThumbnail } from "react-shimmer-effects";
import {
  getNfts,
  addLikeNft,
  getNFtsData,
} from "../../services/webappMicroservice";
import { toast } from "react-toastify";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { fetchPalletsColor } from "../../utility/global";

import defaultCover from "../../assets/images/bannerLoader.png";
import Skeleton from "react-loading-skeleton";
import NftCards from "./NftCards";

let preivewFiles = ["video/mp4", "audio/mpeg"];

const NftCardsHome = (props) => {
  const [nfts, setNfts] = useState([]);
  const customize = useSelector((state) => state.customize);
  const nft = props.nft;
  const loader = props.loader;
  let [imageLoading, setImageLoading] = useState({
    src: nfts?.compressedURL,
    loaded: false,
  });

  const [videoDisplay, setVideoDisplay] = useState(false);
  let route;
  if (nft.hasOwnProperty("contentId") && nft.contentId != "") {
    route = "/nft-information/" + nft.contentId;
  } else {
    route = "/nft-information/" + nft._id;
  }
  const x = () => {
    console.log(videoDisplay);
    setVideoDisplay(!videoDisplay);
    console.log(videoDisplay);
  };
  const onImageLoad = () => {
    setImageLoading({ ...imageLoading, loaded: true });
  };
  const blockchainCheck = (blockchain) => {
    switch (blockchain) {
      case "Ethereum":
        return <img className="currency-sign" src={Ethereum}></img>;
      case "Polygon":
        return <img className="currency-sign" src={Polygon}></img>;
      case "Binance":
        return <img className="currency-sign" src={Binance}></img>;
      default:
        return "";
    }
  };
  return (
    <Card>
      <div className="homePageContainer">
        {loader ? (
          <Skeleton className="remove-border" width="100%" height="273px" />
        ) : (
          <>
            {preivewFiles.includes(nft.fileExtension) ? (
              <>
              {nft.fileExtension.includes("video") && (
                  <>
                  <Link to={route} style={{ textDecoration: "none" }}>
                  <Card.Img
                    variant="top"
                    src={nft?.previewImage}
                    onLoad={onImageLoad}
                    style={{ display: videoDisplay ? "none" : "block" }}
                    onMouseDown={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </Link>

                <div style={{ display: videoDisplay ? "block" : "none",background:"grey"}}>
                  <ReactPlayer
                    className="react-player"
                    controls={false}
                    playing={videoDisplay}
                    width="100%"
                    height={273}
                    url={nft?.cdnUrl}
                  />
                </div>
                <div onClick={x} className="musicIcon">
                  <img src={videoDisplay ? pauseImage : playImage}></img>
                </div>
                </>

              )}
               {nft.fileExtension.includes("audio") && (
                   <>
                <Link to={route} style={{ textDecoration: "none" }}>
                  <Card.Img
                    variant="top"
                    src={nft?.previewImage}
                    onLoad={onImageLoad}
                    onMouseDown={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </Link>

                <div style={{ display: videoDisplay ? "block" : "none" }}>
                  <ReactPlayer
                    className="react-player"
                    controls={false}
                    playing={videoDisplay}
                    width="100%"
                    height={0}
                    url={nft?.cdnUrl}
                  />
                </div>
                <div onClick={x} className="musicIcon">
                  <img src={videoDisplay ? pauseImage : playImage}></img>
                </div>
                   </>
               )}
                

                {/* <div
        onClick={x}
        className="musicIcon"
        style={{ display: videoDisplay ? "none":"block"}}
      >
        <img src={playImage}></img>
      </div> */}
               
              </>
            ) : (
              <Link to={route} style={{ textDecoration: "none" }}>
                <Card.Img
                  variant="top"
                  src={
                    nft.hasOwnProperty("compressedURL")
                      ? nft?.compressedURL
                      : nft.link
                  }
                  onLoad={onImageLoad}
                  onMouseDown={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Link>
            )}
          </>
        )}
        {/* {!imageLoading.loaded && (
        <div className="homeNftShimmer">
          <ShimmerThumbnail
            className="thumbnail-homepage-shimmer"
            fitOnFrame={true}
            rounded
          />
        </div>
      )} */}
      </div>

      <Card.Body className="smallCard-details">
        <div className="d-flex align-items-center media">
          <div className="flex-shrink-0">
            {loader ? (
              <Skeleton circle="true" width="38px" height="38px" />
            ) : (
              <img
                src={
                  nft.hasOwnProperty("creator")
                    ? nft.creator.hasOwnProperty("compressedURL")
                      ? nft?.creator?.compressedURL !== ""
                        ? nft?.creator?.compressedURL
                        : userDefault
                      : userDefault
                    : userDefault
                }
                width="38px"
                height="38px"
                className="profile-img"
                onMouseDown={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              />
            )}
          </div>
          <div className="flex-grow-1 ms-2 card1">
            <h3 className="title homePageNft text-truncate">
              {loader ? (
                <Skeleton count={2} width={"80px"} />
              ) : (
                <Link
                  title={nft?.name}
                  to={"/nft-information/" + nft?._id}
                  style={{ textDecoration: "none", color: `#585858` }}
                >
                  {nft?.name}
                </Link>
              )}
              <br />
              {loader === false ? (
                <Link
                  title={
                    nft.collectionName
                      ? nft.collectionName
                      : "Anafto Collection"
                  }
                  style={{
                    textDecoration: "none",
                    color: `${fetchPalletsColor(
                      customize?.appearance?.colorPalette
                    )}`,
                  }}
                  to={`/collection-details/${
                    nft?.collectionId
                      ? nft?.collectionId
                      : "62823cab6df787009ba1882b"
                  }`}
                >
                  {nft.collectionName
                    ? nft.collectionName
                    : "Anafto Collection"}
                </Link>
              ) : null}
            </h3>

            {/* {let n = nft?.description.split(' ')} */}
            {nft.hasOwnProperty("blockchain") ? (
              <span className="nftTileEachDetailsFirstContainerValue">
                {loader ? (
                  <Skeleton width={"80px"} height={"20px"} />
                ) : (
                  <>
                    {blockchainCheck(nft?.blockchain)}
                    {`${nft?.salesInfo?.price}  ${nft?.salesInfo?.currency}`}
                  </>
                )}
              </span>
            ) : null}
            {/* <p className="description">{nft?.description}</p> */}
          </div>
        </div>

        {/* <div className="flex-grow-1 ms-2 card1 card-collection">
      {
        loader ? <Skeleton width="200px" /> :
          <Link style={{ color: `${fetchPalletsColor(customize?.appearance?.colorPalette)}` }} to={`/collection-details/${nft?.collectionId ? nft?.collectionId : '62823cab6df787009ba1882b'}`}>
            {nft.collectionName ? nft.collectionName : "Anafto Collection"}
          </Link>
      }
    </div> */}
      </Card.Body>
    </Card>
  );
};

export default NftCardsHome;
