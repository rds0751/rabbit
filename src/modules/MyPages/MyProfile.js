import React, { Component, useEffect, useState } from "react";
// import './Top_collection.css'
// import { AbstractApi } from "../../constants/LeaderBoardApi";
import copy from "../../assets/images/copy.svg";
import globe from "../../assets/images/web.svg";
import pencil from "../../assets/images/Edit.svg";
import randomimage from "../../assets/images/1.jpg";
import "../../assets/styles/Leader.css";
import { Link } from "react-router-dom";
import profileImage from "../../assets/images/ProfileReplace.svg";
import coverImage from "../../assets/images/Component.svg";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { AbstractApi } from "../../constants/LeaderBoardApi copy";
import "react-toastify/dist/ReactToastify.css";
import { addUserData, AddWalletDetails } from "../../reducers/Action";
import { useDispatch } from "react-redux";
import { addWalletAddress } from "../../services";
import NftCardHome from "../../common/components/NftCardsHome";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
import NoItem from "../../assets/images/Noitems.svg";
import Snackbar from '@mui/material/Snackbar';
import Styled from "styled-components";


const CustomSnack = styled(Snackbar)`
// @media only screen and (min-width:0px) and  (max-width:599px){

//       top: 153px !important;
//       left: auto !important;


//   }


@media (min-width: 969px){
position: absolute !important;
    top: 458px !important;
    left: 58% !important;
}

  @media only screen and (min-width:770px) and  (max-width:968px){
    position: absolute !important;
    top: 454px !important;
    left: auto !important;
    right: 226px !important;


}
@media only screen and (min-width:521px) and  (max-width:769px){
  position: absolute !important;
  top: 423px !important;
  left: auto !important;
  right: 140px !important;



}
@media only screen and (min-width:0px) and  (max-width:520px){
  position: absolute !important;
  top: 388px !important;
    left: auto !important;
    right: 46px !important;



}
  `



function MyProfile() {
  let { user } = useSelector((state) => state);
  let { loggedInUser } = user;

  if (loggedInUser) {
    localStorage.setItem("userId", loggedInUser._id);
  }
  let userId = loggedInUser ? loggedInUser._id : localStorage.userId;

  if (user) {
    localStorage.setItem("loggedInDetails", user.loggedInUser);
  }
  if (loggedInUser == null) {
    loggedInUser = localStorage.getItem("loggedInDetails");
  }

  // const defaultCoverpic =
  //   "https://png.pngtree.com/background/20210714/original/pngtree-blood-drop-halloween-blood-background-black-background-picture-image_1220404.jpg";
  // const defaultPic =
  //   "https://th.bing.com/th/id/R.e1189efa9cd3aee29c0e1f7dbed689bf?rik=YRidGY7NPM2n3A&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2f7ca%2fpeo%2f7capeoboi.png&ehk=MwVRL6ome8bAroWEn5dLYQgaXLxrafgcwcIQX7N48CM%3d&risl=&pid=ImgRaw&r=0";

  const [Nfts, setNfts] = useState([]);
  const [createdNft, setcreatedNft] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [ownedNft, setownedNft] = useState([]);
  const [onSaleNft, setonSaleNft] = useState([]);
  const [likedNft, setlikedNft] = useState([]);

  const navigate = useNavigate();
  const { walletAddress } = user;
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

    // setNfts(onSaleNft);
    // setTypeofProfilePost("on-sale");
  }, [window.ethereum, checkClick]);

  // ------------------------------- Calling apis --------------------- to get user data

  // const handleCopyToClipboard = () => {
  //   const { wallet_address } = loggedInUser;
  //   navigator.clipboard.writeText(`${wallet_address}`);
  //   // navigator.clipboard.writeText(walletAddressUnquoted);
  //   // setCopiedText(true);
  //   toast.success("Text Copied");
  //   // setTimeout(() => {
  //   // setCopiedText(false);
  //   // }, 1000);
  // };

  const isDataCopied = () => {
    // walletTogglePopup(false);

    // toast.success("Copied");
  };


  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };


  const getCreatedByNft = () => {
    NftCreatedByUser((response) => {
      console.log(response, "myprofile");
      if (response.success) {
        // setNfts(response.responseData);
        setcreatedNft(response.responseData);
      } else {
        toast.error(response.msg);
      }
    }, userId);
  };
  const getOwnedByNft = () => {
    NftOwnedByUser((response) => {
      console.log(response, "myprofile");
      if (response.success) {
        setownedNft(response.responseData);
      } else {
        toast.error(response.msg);
      }
    }, userId);
  };
  const getOnSaleNft = () => {
    NftSellByUser((response) => {
      console.log(response, "myprofile");
      if (response.success) {
        setonSaleNft(response.responseData);
        setNfts(response.responseData);
        setTypeofProfilePost("on-sale");
      } else {
        toast.error(response.msg);
      }
    }, userId);
    // setonSaleNft([]);
  };
  const getLikedNft = () => {
    NftLikedByUser((response) => {
      console.log(response, "likednft");
      if (response.success) {
        setlikedNft(response.responseData);
      } else {
        toast.error(response.msg);
      }
    }, userId);
    // setlikedNft([]);
  };

  // -----------------------

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

  let array = [];
  return (
    <>
      <div>
        <div className="position-relative relative hover-cls">
          <img
            className="profilecover"
            src={
              loggedInUser?.coverPhoto != ""
                ? loggedInUser?.coverPhoto
                : coverImage
            }
            alt=""
          />
          <input
            type="file"
            className="pencilicon"
            onChange={updateBanner}
            title=" "
            style={{ border: "5px solid white", zIndex: "99", opacity: "0" }}
          />
          <img className="pencilicon" width="16px" height="16px" src={pencil} />
          <Link to="/edit-profile" className="textdecornone">
            <button className="profileeditbutton">Edit Profile</button>
          </Link>
        </div>
        <Link to="/edit-profile" className="editTextAnchor">
        <span className="edit-text">Edit</span>
        </Link>
        <div className="profileavatar  absolute">
          <img
            src={loggedInUser?.photo != "" ? loggedInUser?.photo : profileImage}
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

              <p className="addressText"><SplitWalletAdd address={loggedInUser?.wallet_address} /></p>
            </div>
            <CopyToClipboard text={walletAddress?.address}>
            <button  className="copy-button"        onClick={handleClick({
          vertical: 'top',
          horizontal: 'center',
        })}>
              <img
                src={copy}
                className="copyButton"
                alt=""
                onClick={isDataCopied}
              /></button>
            </CopyToClipboard>
            <CustomSnack
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Copied"
        key={vertical + horizontal}
        autoHideDuration={2000}
        className="custom-snack"
      />
          </div>

          <p className="profile-description">{loggedInUser?.bio}</p>
          {/* <p style={{ marginBottom: "0px" }}>
            main focus in art is to make digital abstract painting
          </p> */}
          <h6 className="profile-portfolio">
            <img className="globalImg" src={globe} alt="" />
            {loggedInUser?.portfolio}
          </h6>
          <Link to="/edit-profile" className="bottombutton">
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
                console.log(ownedNft, "<<<<<<ownedNft");
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
                for (let i = 0; i < likedNft.length; i++) {
                  array.push(likedNft[i].userLikedNfts);
                }
                setNfts(array);
                //setNfts(likedNft[1].userLikedNfts);
                //setNfts(likedNft.map((nft)=>nft.userLikedNfts))
                console.log(array, "<<<<<<likedNft");
                console.log(likedNft[0].userLikedNfts, "<<<<<<likedNft");
                setTypeofProfilePost("liked");
              }}
            >
              Liked
            </div>
          </div>
          {/* <hr /> */}
          {/* <div className="profileNftContainer row mx-0 text-center p-0 cards-gap image1"> */}
          <div
            className="nftTileContainer row ntf_row"
            style={{ justifyContent: "start" }}
          >
            {/* <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div> */}
            {/* {[...AbstractApi, , ...AbstractApi].map((curElem) => { */}

            {isloading && <Spinner />}
            {(() => {
              if (!isloading && Nfts.length < 1) {
                return (
                  <div>
                    <div className="Noitemdiv">
                      <img src={NoItem} />
                      <p className="textitem">No items available</p>
                    </div>
                  </div>
                );
              }
            })()}

            {Nfts.map((curElem) => {
              console.log("<<<nfts", Nfts);

              const {
                cdnUrl,
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
    </>
  );
}

export default MyProfile;
//   https://image.shutterstock.com/image-vector/background-water-droplets-on-surface-260nw-274829663.jpg
