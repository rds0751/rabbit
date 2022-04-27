import React, { useState } from "react";
import { Link } from "react-router-dom";
import Like from "../../assets/images/Like.svg";
import likes from "../../assets/images/likes.svg";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../../assets/styles/common.css";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { addLikeNft } from "../../services/webappMicroservice";
function LikedNfts({ nft }) {
  const { user } = useSelector((state) => state);
  const { _id, cdnUrl, name, salesInfo ,compressedURL} = nft;
  const [handleLike, setHandleLike] = useState(true);
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
      toast.error("Not logged in");
      // navigate("/add-wallet");
    }
  };

  const difftime = (timestamp1, timestamp2) => {
    var difference = timestamp1 - timestamp2;
    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    return daysDifference;
  };

  let showDateSection = true;
  let message = "";

  if (nft?.biddingDetails?.endDate) {
    const currDate = new Date();
    const currentDate = Date.now(currDate);
    const endDate = nft?.biddingDetails?.endDate;
    let endDateTimeStamp = Math.floor(new Date(endDate).getTime());
    const days =
      endDateTimeStamp == currentDate
        ? 1
        : difftime(endDateTimeStamp, currentDate);
    message = endDateTimeStamp < currentDate ? "Expired" : `${days} days left`;
  } else {
    showDateSection = false;
  }

  let [imageLoading, setImageLoading] = useState({
    src: cdnUrl,
    loaded: false,
  });

  const onImageLoad = () => {
    setImageLoading({ ...imageLoading, loaded: true });
  };

  return (
    <div className="nftCardEach col-md-6 col-lg-3  col-sm-12  mt-5 nft_card">
      <div className="card nft-card-radius border-radius cardmob h-100">
        <Link to={route} style={{ textDecoration: "none" }}>
          <div className="image-container">
            <img
              className="nftTileEachImage  border-radius nft-img-radius card_imgmob"
              src={compressedURL}
              alt="nft-img"
              onLoad={onImageLoad}
              onMouseDown={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
            />

            {!imageLoading.loaded && (
              <div className="loaderNft ">
                <ShimmerThumbnail className="thumbnail" fitOnFrame={true} rounded />;
              </div>
            )}
          </div>
        </Link>
        <span>
          <img
            id="like_icon"
            src={handleLike ? likes : Like}
            alt="like"
            onClick={() => likeNft(_id)}
          />
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
              }}
            >
              {name}
            </div>
            <span className="nftTileEachDetailsFirstContainerValue">
              {`${salesInfo?.price}  ${salesInfo?.currency}`}
            </span>
          </div>
          <div className="nftTileEachDetailsSecondContainerValueHighest">
            <div>
              {showDateSection ? (
                <span
                  className=""
                  style={{ color: "#000", marginRight: "4px" }}
                >
                  <i
                    className="far fa-clock"
                    style={{ color: "#f54", fontSize: "13.36px" }}
                  ></i>

                  <span className="poppins-normal blackish font-14">
                    &nbsp;{message}
                  </span>
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LikedNfts;
