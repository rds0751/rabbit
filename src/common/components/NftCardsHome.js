import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Like from "../../assets/images/Like.svg";
import likes from "../../assets/images/likes.svg";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";

import {
  getNfts,
  addLikeNft,
  getNFtsData,
} from "../../services/webappMicroservice";
function NftCardsHome({ nft }) {
  // let history = useHistory();

  const navigate = useNavigate();
  const { user, sideBar } = useSelector((state) => state);
  const { _id, ipfsUrl, name, biddingDetails, salesInfo } = nft;
  const [handleLike, setHandleLike] = useState(true);
  // const currDate = new Date();
  // const endDate = biddingDetails.endDate;
  // const daysleft = new Date(endDate - currDate).getDate() - 1;
  // console.log(daysleft, "<<<daysleft");
  const route = "/nft-information/" + _id;
  const likeNft = (id) => {
    if (user.loggedInUser == null) {
      navigate("/add-wallet");
    }
    // alert("like");

    const data = {
      contentId: id,
      addedBy: user.loggedInUser._id,
    };
    addLikeNft(data);
    setHandleLike(!handleLike);
  };
  const difftime = (timestamp1, timestamp2) => {
    var difference = timestamp1 - timestamp2;
    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

    return daysDifference;
  };
  const currDate = new Date();
  const stamp2 = Date.now(currDate);
  const stamp1 = Date.now(nft.biddingDetails.endDate);
  const days = difftime(stamp1, stamp2);
  // console.log(difftime(stamp1, stamp2),"<<<days");

  return (
    <div className="nftCardEach col-md-6 col-lg-3  col-sm-12  mt-5 nft_card">
      <div className="card nft-card-radius border-radius cardmob h-100">
        <Link to={route} style={{ textDecoration: "none" }}>
          <img
            className="nftTileEachImage  border-radius nft-img-radius card_imgmob"
            src={ipfsUrl}
            alt="nft-img"
          />
        </Link>
        <img
          id="like_icon"
          onClick={() => likeNft(_id)}
          src={handleLike ? Like : likes}
          alt="like"
        />
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
            <span
              className="nftTileEachDetailsFirstContainerValue"
            >
              {`${salesInfo?.price}  ${salesInfo?.currency} ETH`}
            </span>
          </div>
          <div
            className="nftTileEachDetailsSecondContainerValueHighest"
          // style={{ marginLeft: "1em" }}
          >
            <div>
              {" "}
              Highest bid:{" "}
              <span className="font-weight-900">100</span>{" "}
            </div>
            <div>
              <span className="" style={{ color: "#000", marginRight: "4px" }}>
                <i className="far fa-clock" style={{ color: "#f54", fontSize: "13.36px", }}></i>
              </span>
              <span className="poppins-normal blackish font-14">
                {days} days left
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftCardsHome;
