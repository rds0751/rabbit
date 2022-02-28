import React, { Component, useEffect, useState } from "react";
// import './Top_collection.css'
// import { AbstractApi } from "../../constants/LeaderBoardApi";
import copy from "../../assets/images/copy.png";
import globe from "../../assets/images/globe.png";
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
import { useSelector } from "react-redux";
import "../../assets/styles/myProfile.css";
import {
  NftCreatedByUser,
  NftOwnedByUser,
} from "../../services/contentMicroservice";
import Spinner from "../../common/components/Spinner";
import NonftText from "../../common/components/NonftText";
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
      // navigate("/add-wallet");
      setIsloading(true);
      getCreatedByNft();
      getOwnedByNft();
      setIsloading(false);
    } else {
      getCreatedByNft();
      getOwnedByNft();
    }
  }, [window.ethereum, checkClick]);

  // ------------------------------- Calling apis --------------------- to get user data

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
    // NftOwnedByUser((response) => {
    //   console.log(response, "myprofile");
    //   if (response.success) {
    //     setownedNft(response.responseData);

    //   } else {
    //     toast.error(response.msg);
    //   }
    // });
    setonSaleNft([]);
  };
  const getLikedNft = () => {
    // NftOwnedByUser((response) => {
    //   console.log(response, "myprofile");
    //   if (response.success) {
    //     setownedNft(response.responseData);

    //   } else {
    //     toast.error(response.msg);
    //   }
    // });
    setlikedNft([]);
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
            on
            style={{ border: "5px solid white", zIndex: "99",opacity:"0" }}
          />
          <img className="pencilicon" width="16px" height="16px" src={pencil} />
        </div>
        <div className="position-absolute  absolute">
          <img
            src={loggedInUser?.photo != "" ? loggedInUser?.photo : defaultPic}
            alt=""
          />
          {/* <h2>{ethereum && ethereum.selectedAddress}</h2> */}
          {/* <h2>{window.ethereum && defaultAccount}</h2> */}
          {/* {defaultAccount} */}
          <div className="profile-user">{loggedInUser?.userName}</div>
          <div className="add-cover">
            <div className="wallet-address-text">
              {loggedInUser?.wallet_address}
            </div>
            <img style={{ height: "30px" }} src={copy} alt="" />
          </div>

          <p  style={{ marginTop: "10px", marginBottom: "0px" }}>
            {loggedInUser?.bio}
          </p>
          {/* <p style={{ marginBottom: "0px" }}>
            main focus in art is to make digital abstract painting
          </p> */}
          <h6 style={{ color: "#b1b1b1", marginTop: "12px" }}>
            <img style={{ height: "30px" }} src={globe} alt="" />
            {loggedInUser?.portfolio}
          </h6>
        </div>
        <Link to="/edit-profile">
          <div className="editProfileButton position-absolute absolute1">
            Edit Profile
          </div>
        </Link>
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
          <div className="profileNftContainer row mx-0 text-center image1">
            {/* <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div> */}
            {/* {[...AbstractApi, , ...AbstractApi].map((curElem) => { */}
            {isloading && <Spinner />}
            {(()=>{
              if(!isloading && Nfts.length <1){
                return <NonftText text="No Nft"/>
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
                  <div className="profileNftContainerInner container__tile">
                    <img
                      className="nftTileEachImage"
                      // src={randomimage}
                      src={ipfsUrl}
                      alt="nft"
                    />
                    {/* <img id='like_icon' src={require('../asset//images/Like.png')} /> */}
                    <div className="tile__details">
                      <div className="profileNftDetailFirstContainer container__up">
                        <div className="title">{name}</div>
                        <div className="title1">{salesInfo?.price} ETH</div>
                      </div>
                      <div className="profileNftDetailSecondContainer container__down">
                        <div className="">
                          {/* <span style={{ color: "black" }}>Highest Bid:</span> */}
                          <span
                            style={{
                              color: "#366EEF",
                              fontFamily: "poppins-bold",
                            }}
                          >
                            {" "}
                            {/* {10} */}
                          </span>
                        </div>
                        <div className="">
                          {likesCount}
                          {/* <i className="far fa-clock" style={{ color: "#f54" }}></i> */}
                          <i
                            // onClick={handleLike}
                            className="fa-solid fa-heart"
                            style={{ color: "#ef3643" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className=" col-md-6 col-lg-3  col-sm-12  mt-5 nft_card">
                    <div className="card nft-card-radius border-radius cardmob">
                
                      <img
                        className="nftTileEachImage img-fluid border-radius nft-img-radius card_imgmob"
                        src={randomimage}
                      />
              

                      <div
                        className="nftTileEachDetails card-lower"
                        style={{
                          padding: "0px 14px 0px 12px",
                        }}
                      >
                        <div className="nftTileEachDetailsFirstContainer container__up">
                          <div
                            className="nftTileEachDetailsFirstContainerName"
                            style={{
                              color: "#191919",
                              height: "20px",
                              overflow: "hidden",
                            }}
                          >
                            {title}
                          </div>
                          <span
                            className="nftTileEachDetailsFirstContainerValue"
                            style={{
                              fontSize: "14px",
                              fontWeight: "600px",
                              color: "#16AB6E",
                            }}
                          >
                            {maxPrice2}
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
                            <span className="" style={{ color: "#000" }}>
                              <i
                                className="far fa-clock"
                                style={{ color: "#f54" }}
                              ></i>
                              5 days left
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </>
                // <div className="profileNftContainerInner container__tile">
                //   <img
                //     // id="nft__photo"
                //     className="nftTileEachImage"
                //     src={image}
                //     alt="/"
                //   />
                //   {/* <img id='like_icon' src={require('../asset//images/Like.png')} /> */}
                //   <div className="tile__details">
                //     <div className="profileNftDetailFirstContainer container__up">
                //       <div className="title">{title}</div>
                //       <div className="title1">{price}</div>
                //     </div>
                //     <div className="profileNftDetailSecondContainer container__down">
                //       <div className="">
                //         <span style={{ color: "black" }}>{maxPrice}</span>
                //         <span
                //           style={{
                //             color: "#366EEF",
                //             fontFamily: "poppins-bold",
                //           }}
                //         >
                //           {" "}
                //           {maxPrice2}
                //         </span>
                //       </div>
                //       <div className="">
                //         {daysLeft}{" "}
                //         {/* <i className="far fa-clock" style={{ color: "#f54" }}></i> */}
                //         <i
                //           className="fa-solid fa-heart"
                //           style={{ color: "#ef3643" }}
                //         ></i>
                //       </div>
                //     </div>
                //   </div>
                // </div>
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
