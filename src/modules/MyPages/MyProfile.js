import React, { Component, useEffect, useState } from "react";
// import './Top_collection.css'
// import { AbstractApi } from "../../constants/LeaderBoardApi";
import copy from "../../assets/images/copy.svg";
import globe from "../../assets/images/web.svg";
import pencil from "../../assets/images/pencil.png";
import randomimage from "../../assets/images/1.jpg";
import "../../assets/styles/Leader.css";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { AbstractApi } from "../../constants/LeaderBoardApi copy";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUserData, AddWalletDetails } from "../../reducers/Action";
import { useDispatch } from "react-redux";
import { addWalletAddress } from "../../services";
import NftCardHome from "../../common/components/NftCardsHome";
import { useSelector } from "react-redux";
import "../../assets/styles/myProfile.css";
import {
  NftCreatedByUser,
  NftLikedByUser,
  NftOwnedByUser,
  NftSellByUser,
} from "../../services/contentMicroservice";
import Spinner from "../../common/components/Spinner";
import NonftText from "../../common/components/NonftText";
import { updateBannerByUserId } from "../../services/UserMicroService";
import SplitWalletAdd from "../../common/components/SplitWalletAdd";
function MyProfile() {
  const defaultCoverpic =
    "https://png.pngtree.com/background/20210714/original/pngtree-blood-drop-halloween-blood-background-black-background-picture-image_1220404.jpg";
  const defaultPic =
    "https://th.bing.com/th/id/R.e1189efa9cd3aee29c0e1f7dbed689bf?rik=YRidGY7NPM2n3A&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2f7ca%2fpeo%2f7capeoboi.png&ehk=MwVRL6ome8bAroWEn5dLYQgaXLxrafgcwcIQX7N48CM%3d&risl=&pid=ImgRaw&r=0";
  const [Nfts, setNfts] = useState([]);
  const [createdNft, setcreatedNft] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [ownedNft, setownedNft] = useState([]);
  const [onSaleNft, setonSaleNft] = useState([]);
  const [likedNft, setlikedNft] = useState([]);

  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  const { walletAddress, loggedInUser } = user;
  const [humburger, setHumburger] = useState(false);
  const ethereum = window.ethereum;
  const [errorMssg, setErrorMssg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(""); // defaultAccount having the wallet address
  console.log("ethereum ", ethereum && ethereum);
  const [checkClick, setcheckClick] = useState(false);
  const [getBalance, setGetBalance] = useState("");
  const dispatch = useDispatch();

  const [typeofProfilePost, setTypeofProfilePost] = useState("on-sale");

  useEffect(() => {
    if (loggedInUser == null) {
      navigate("/my-profile");
      navigate("/add-wallet");
    } else {
      setIsloading(true);
      getCreatedByNft();
      getOwnedByNft();
      getLikedNft();
      getOnSaleNft();

      setIsloading(false);
    }
  }, [window.ethereum, checkClick]);

  // ------------------------------- Calling apis --------------------- to get user data

  const handleCopyToClipboard = () => {
    const { wallet_address } = loggedInUser;
    navigator.clipboard.writeText(`${wallet_address}`);
    // navigator.clipboard.writeText(walletAddressUnquoted);
    // setCopiedText(true);
    toast.success("Text Copied");
    // setTimeout(() => {
    // setCopiedText(false);
    // }, 1000);
  };
  const getCreatedByNft = () => {
    NftCreatedByUser((response) => {
      console.log(response, "myprofile");
      if (response.success) {
        setNfts(response.responseData);
        setcreatedNft(response.responseData);
      } else {
        toast.error(response.msg);
      }
    });
  };

  const getOwnedByNft = () => {
    NftOwnedByUser((response) => {
      console.log(response, "myprofile");
      if (response.success) {
        setownedNft(response.responseData);
      } else {
        toast.error(response.msg);
      }
    });
  };
  const getOnSaleNft = () => {
    NftSellByUser((response) => {
      console.log(response, "myprofile");
      if (response.success) {
        setownedNft(response.responseData);
      } else {
        // toast.error(response.msg);
      }
    });
    // setonSaleNft([]);
  };
  const getLikedNft = () => {
    NftLikedByUser((response) => {
      console.log(response, "myprofile");
      if (response.success) {
        setownedNft(response.responseData);
      } else {
        // toast.error(response.msg);
      }
    });
    // setlikedNft([]);
  };

  // -----------------------

  console.log(Nfts, "myprofilenft");
  const accountChangeHandler = (newAccount) => {
    // getUserBalance(newAccount);
  };

  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then(async (balance) => {
        setGetBalance(ethers.utils.formatEther(balance));
        const user = await addWalletAddress(address);
        dispatch(AddWalletDetails({ address, balance: getBalance }));
        dispatch(addUserData(user));
      })
      .catch((err) => console.log(err));
  };

  // window.ethereum?.on("accountsChanged", accountChangeHandler);
  // -----------------------
  const updateBanner = (e) => {
    console.log(e.target.files[0], "<<<<<<<<<<update fule");
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("files", e.target.files[0]);
    formData.append("fileName", file.name);
    updateBannerByUserId(formData, loggedInUser._id, (res) => {
      if (res.success) {
        toast.success("Banner Updated Successfully");
        window.location.reload(true);
      } else {
        toast.error("Unabale to updated banner");
        window.location.reload(true);
      }
      console.log(res, "<<<<<< updated banner");
    });
  };
  const splitAddress = (address) => {
    const sub = address.substring(0, 2);
    console.log(sub, "<<<split address");
  };
  splitAddress("akshay");

  return (
    <>
      <div>
        <div className="position-relative relative">
          <img
            className="profilecover"
            src={
              loggedInUser?.coverPhoto != ""
                ? loggedInUser?.coverPhoto
                : defaultCoverpic
            }
            alt=""
          />
          <input
            type="file"
            className="pencilicon"
            onChange={updateBanner}
            style={{ border: "5px solid white", zIndex: "99", opacity: "0" }}
          />
          <img className="pencilicon" width="16px" height="16px" src={pencil} />
          <Link to="/edit-profile" className="textdecornone">
            <button className="profileeditbutton">Edit Profile</button>
          </Link>
        </div>
        <div className="profileavatar  absolute">
          <img
            src={loggedInUser?.photo != "" ? loggedInUser?.photo : defaultPic}
            alt=""
            className="user-img"
          />
          {/* <h2>{ethereum && ethereum.selectedAddress}</h2> */}
          {/* <h2>{window.ethereum && defaultAccount}</h2> */}
          {/* {defaultAccount} */}
          <div className="profile-user">{loggedInUser?.userName}</div>
          <div className="add-cover">
            <div className="wallet-address-text">
              {/* {loggedInUser?.wallet_address} */}

              <SplitWalletAdd address={loggedInUser?.wallet_address} />
            </div>
            <img
              style={{
                width: "21.47px",
                height: "21.47px",
                marginLeft: "20px",
              }}
              src={copy}
              alt=""
              onClick={handleCopyToClipboard}
            />
          </div>

          <p className="profile-description">
            {loggedInUser?.bio}
          </p>
          {/* <p style={{ marginBottom: "0px" }}>
            main focus in art is to make digital abstract painting
          </p> */}
          <h6 className="profile-portfolio">
            <img style={{ height: "30px" }} src={globe} alt="" />
            {loggedInUser?.portfolio}
          </h6>
          <Link to="/edit-profile" className="textdecornone">
            <button className="profileeditbuttonatbottom">Edit Profile</button>
          </Link>
        </div>

        {/* <div className="position-absolute absolute2">
      <img style={{height :"30px"}} src={pencil} alt="" />
      </div> */}
        <div className="profileItemContainer">
          <div className="postTypeProfileContainer collectionsales MyProfilesales">
            <div
              className={`postTypeProfile ${
                typeofProfilePost === "on-sale" && "postTypeProfile--active"
              }`}
              // onClick={() => setTypeofProfilePost("on-sale")}
              onClick={() => {
                setNfts(onSaleNft);
                setTypeofProfilePost("on-sale");
              }}
            >
              On sale
            </div>
            <div
              className={`postTypeProfile ${
                typeofProfilePost === "owned" && "postTypeProfile--active"
              }`}
              // onClick={() => setTypeofProfilePost("owned")}
              onClick={() => {
                setNfts(ownedNft);
                setTypeofProfilePost("owned");
              }}
            >
              Owned
            </div>
            <div
              className={`postTypeProfile ${
                typeofProfilePost === "created" && "postTypeProfile--active"
              }`}
              // onClick={() => setTypeofProfilePost("created")}
              onClick={() => {
                setNfts(createdNft);
                setTypeofProfilePost("created");
              }}
            >
              Created
            </div>
            <div
              className={`postTypeProfile ${
                typeofProfilePost === "liked" && "postTypeProfile--active"
              }`}
              // onClick={() => setTypeofProfilePost("liked")}
              onClick={() => {
                setNfts(likedNft);
                setTypeofProfilePost("liked");
              }}
            >
              Liked
            </div>
          </div>
          {/* <hr /> */}
          {/* <div className="profileNftContainer row mx-0 text-center p-0 cards-gap image1"> */}
          <div className="nftTileContainer row ntf_row" style={{justifyContent : "start",}}>
            {/* <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div> */}
            {/* {[...AbstractApi, , ...AbstractApi].map((curElem) => { */}
            {isloading && <Spinner />}
            {(() => {
              if (!isloading && Nfts.length < 1) {
                return <NonftText text="No Nft" />;
              }
            })()}

            {Nfts.map((curElem) => {
              const {
                ipfsUrl,
                name,
                price,
                salesInfo,
                maxPrice,
                maxPrice2,
                daysLeft,
                likesCount,
              } = curElem;
              return (
                <>
                  <NftCardHome nft={curElem} />
                  {/* <div className="col-md-6 col-lg-3  col-sm-12  mt-5 nft_card">
                    <img
                      className="nftTileEachImage"
                      src={ipfsUrl}
                      alt="nft"
                    />
                    <div className="tile__details">
                      <div className="profileNftDetailFirstContainer container__up">
                        <div className="title">{name}</div>
                        <div className="title1">{salesInfo?.price} ETH</div>
                      </div>
                      <div className="profileNftDetailSecondContainer container__down">
                        <div className="">
                          <span
                            style={{
                              color: "#366EEF",
                              fontFamily: "poppins-bold",
                            }}
                          >
                          
                          </span>
                        </div>
                        <div className="">
                          {likesCount}
                        
                          <i
                            style={{ color: "#ef3643" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </>
              );
            })}
          </div>
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

export default MyProfile;
//   https://image.shutterstock.com/image-vector/background-water-droplets-on-surface-260nw-274829663.jpg
