import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Like from "../../assets/images/Like.svg";
import Ethereum from "../../assets/images/ether.svg";
import Polygon from "../../assets/images/ploygon.svg";
import Binance from "../../assets/images/binance.svg";
import likes from "../../assets/images/likes.svg";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../../assets/styles/common.css"
import { ShimmerThumbnail } from "react-shimmer-effects";
import {
  getNfts,
  addLikeNft,
  getNFtsData,
} from "../../services/webappMicroservice";
import { fetchPalletsColor } from "../../utility/global";
import Skeleton from "react-loading-skeleton";
function NftCardsHome({ nft, appearance, loader }) {
  // let history = useHistory();

  const navigate = useNavigate();
  const { user, sideBar } = useSelector((state) => state);
  const { _id, cdnUrl, name, biddingDetails, salesInfo, isLiked, compressedURL, blockchain, collectionName, collectionId } = nft;
  const [handleLike, setHandleLike] = useState(true);
  // const currDate = new Date();
  // const endDate = biddingDetails.endDate;
  // const daysleft = new Date(endDate - currDate).getDate() - 1;
  // console.log(daysleft, "<<<daysleft");
  const route = "/nft-information/" + _id;
  const likeNft = (id) => {
    if (user?.loggedInUser?._id) {
      const data = {
        contentId: id,
        addedBy: user?.loggedInUser?._id,
      };
      addLikeNft(data);
      setHandleLike(!handleLike);
    } else {
      toast.error("Not logged in")
    }
  };
  // const difftime = (timestamp1, timestamp2) => {
  //   var difference = timestamp1 - timestamp2;
  //   var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

  //   return daysDifference;
  // };
  // const currDate = new Date();
  // const stamp2 = Date.now(currDate);
  // const stamp1 = Date.now(nft.biddingDetails.endDate);
  // const days = difftime(stamp1, stamp2);
  // console.log(difftime(stamp1, stamp2),"<<<days");


  const difftime = (timestamp1, timestamp2) => {
    var difference = timestamp1 - timestamp2;
    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

    return daysDifference;
  };

  let showDateSection = true;

  let message = '';

  if (nft?.biddingDetails?.endDate) {
    const currDate = new Date();

    const currentDate = Date.now(currDate);

    const endDate = nft?.biddingDetails?.endDate;

    let endDateTimeStamp = Math.floor(new Date(endDate).getTime());

    const days = (endDateTimeStamp == currentDate) ? 1 : difftime(endDateTimeStamp, currentDate);

    message = (endDateTimeStamp < currentDate) ? "Expired" : `${days} days left`;

  } else {
    showDateSection = false;
  }

  let [imageLoading, setImageLoading] = useState({ src: cdnUrl, loaded: false })

  const onImageLoad = () => {
    setImageLoading({ ...imageLoading, loaded: true });
  }

  const blockchainCheck = (blockchain) => {
    switch (blockchain) {
      case 'Ethereum':
        return <img className="currency-sign" src={Ethereum}></img>
      case 'Polygon':
        return <img className="currency-sign" src={Polygon}></img>
      case 'Binance':
        return <img className="currency-sign" src={Binance}></img>
      default:
        return '';
    }

  }

  return (
    <div className="nftCardEach col-md-6 col-lg-3  col-sm-12  mt-5 nft_card">
      <div className="card nft-card-radius border-radius cardmob h-100">
        <Link to={route} style={{ textDecoration: "none" }}>
          <div className="image-container">
            {
              loader ? <Skeleton height={`187px`} /> :
                <img
                  className="nftTileEachImage  border-radius nft-img-radius card_imgmob"
                  src={compressedURL}
                  alt="nft-img"
                  onLoad={onImageLoad}
                  onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
            }

            {!imageLoading.loaded && (
              <div className="loaderNft ">
                <ShimmerThumbnail className="thumbnail" fitOnFrame={true} rounded />
              </div>
            )}

          </div>
        </Link>



        <span >
          {isLiked ? (
            <img
              id="unlike_icon"
              src={handleLike ? likes : Like}
              alt="like"
              onClick={() => likeNft(_id)}
            />

          ) : (
            <img
              id="like_icon"
              src={handleLike ? Like : likes}
              alt="like"
              onClick={() => likeNft(_id)}
            />

          )}
        </span>
        <div
          className="nftTileEachDetails card-lower"
          style={{
            padding: "0px 12px 0px 14px",
          }}
        >
          <div className="nftTileEachDetailsFirstContainer container__up">
            <div
              className="nftTileEachDetailsFirstContainerName poppins-normal bold-bold font-16"
              style={{
                color: "#191919",
                overflow: "hidden",
                width: "58%",
              }}
              title={name}
            >
              {loader ? <Skeleton /> : name}
            </div>
            {
              loader ? <Skeleton width={`80px`} /> :
                <span
                  className="nftTileEachDetailsFirstContainerValue"
                >
                  {blockchainCheck(blockchain)}
                  {`${salesInfo?.price}  ${salesInfo?.currency}`}
                </span>
            }
          </div>
          <div className="collectionName" title={collectionName ? collectionName : "Anafto Collection"}>

            {
              loader ? <Skeleton width={`200px`} /> :
                <Link
                  style={{ textDecoration: 'none', color: `${fetchPalletsColor(appearance.colorPalette)}` }}
                  to={
                    '/collection-details/' + collectionId
                  }
                >
                  {undefined !== collectionName &&
                    collectionName.length > 30 ? collectionName.slice(0, 30) + "..." : (collectionName?.length === 0 ? "Anafto Collection" : collectionName)}

                </Link>
            }
          </div>

          <div
            className="nftTileEachDetailsSecondContainerValueHighest"
          // style={{ marginLeft: "1em" }}
          >
            {/* <div>
              {" "}
              Highest bid:{" "}
              <span className="font-weight-900">100</span>{" "}
            </div> */}
            <div>
              {(showDateSection) ? <span className="" style={{ color: "#000", marginRight: "4px" }}>
                <i className="far fa-clock" style={{ color: "#f54", fontSize: "13.36px" }}></i>

                <span className="poppins-normal blackish font-14">
                  &nbsp;{message}
                </span>
              </span> : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftCardsHome;
