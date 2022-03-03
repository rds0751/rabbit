import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Like from "../../assets/images/Like.svg";
import likes from "../../assets/images/likes.svg";
import { useSelector } from "react-redux";

import {
  getNfts,
  addLikeNft,
  getNFtsData,
} from "../../services/webappMicroservice";
function NftCardsHome({ nft }) {
  const navigate = useNavigate();
  const { user, sideBar } = useSelector((state) => state);
  const { _id, ipfsUrl, name, biddingDetails, salesInfo } = nft;
  const [handleLike, setHandleLike] = useState(true);

  const route = "nft-information/" + _id;
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

  return (
    <div className=" col-md-6 col-lg-3  col-sm-12  mt-5 nft_card">
      <div className="card nft-card-radius border-radius cardmob">
        <Link to={route} style={{ textDecoration: "none" }}>
          <img
            className="nftTileEachImage  border-radius nft-img-radius card_imgmob"
            src={ipfsUrl}
          />
        </Link>
        <img
          id="like_icon"
          onClick={() => likeNft(_id)}
          src={handleLike ? Like : likes}
        />
        <div
          className="nftTileEachDetails card-lower"
          style={{
            padding: "0px 14px 0px 12px",
          }}
        >
          <div className="nftTileEachDetailsFirstContainer container__up">
            <div
              className="nftTileEachDetailsFirstContainerName poppins-normal bold-bold font-16"
              style={{
                color: "#191919",
                // height: "20px",
                overflow: "hidden",
              }}
            >
              {name}
            </div>
            <span
              className="nftTileEachDetailsFirstContainerValue poppins-normal bold-600"
              style={{
                fontSize: "14px",
                fontWeight: "600px",
                color: "#16AB6E",
              }}
            >
              {`${salesInfo?.price}  ${salesInfo?.currency}`}
            </span>
          </div>
          <div
            className="nftTileEachDetailsSecondContainerValueHighest"
            // style={{ marginLeft: "1em" }}
          >
            <div>
              {" "}
              {/* Highest bid:{" "}
            <span className="font-weight-900">100</span>{" "} */}
            </div>
            <div>
              <span className="" style={{ color: "#000", marginRight: "4px" }}>
                <i className="far fa-clock" style={{ color: "#f54" }}></i>
              </span>
              <span className="poppins-normal blackish font-14">
                5 days left
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftCardsHome;
