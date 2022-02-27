import React, { Component, useEffect, useState } from "react";
// import './Top_collection.css'
// import { AbstractApi } from "../../constants/LeaderBoardApi";
import copy from "../../assets/images/copy.png";
import globe from "../../assets/images/globe.png";
import pencil from "../../assets/images/pencil.png";
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
function MyProfile() {
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
    }
  }, [window.ethereum, checkClick]);

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
            src="https://png.pngtree.com/background/20210714/original/pngtree-blood-drop-halloween-blood-background-black-background-picture-image_1220404.jpg"
            alt=""
          />
        </div>
        <div className="position-absolute absolute">
          <img
            src="https://th.bing.com/th/id/R.e1189efa9cd3aee29c0e1f7dbed689bf?rik=YRidGY7NPM2n3A&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2f7ca%2fpeo%2f7capeoboi.png&ehk=MwVRL6ome8bAroWEn5dLYQgaXLxrafgcwcIQX7N48CM%3d&risl=&pid=ImgRaw&r=0"
            alt=""
          />
          {/* <h2>{ethereum && ethereum.selectedAddress}</h2> */}
          {/* <h2>{window.ethereum && defaultAccount}</h2> */}
          {/* {defaultAccount} */}
          <div className="profile-user">User Name</div>
          <div className="add-cover">
            <div className="wallet-address-text">{walletAddress?.address}</div>
            <img style={{ height: "30px" }} src={copy} alt="" />
          </div>

          <p style={{ marginTop: "10px", marginBottom: "0px" }}>
            Hi my name is TechieArt I am an artist based in New York my
          </p>
          <p style={{ marginBottom: "0px" }}>
            main focus in art is to make digital abstract painting
          </p>
          <h6 style={{ color: "#b1b1b1", marginTop: "12px" }}>
            <img style={{ height: "30px" }} src={globe} alt="" />
            Dribbie.com
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
              onClick={() => setTypeofProfilePost("on-sale")}
            >
              On sale
            </div>
            <div
              className={`postTypeProfile ${
                typeofProfilePost === "owned" && "postTypeProfile--active"
              }`}
              onClick={() => setTypeofProfilePost("owned")}
            >
              Owned
            </div>
            <div
              className={`postTypeProfile ${
                typeofProfilePost === "created" && "postTypeProfile--active"
              }`}
              onClick={() => setTypeofProfilePost("created")}
            >
              Created
            </div>
            <div
              className={`postTypeProfile ${
                typeofProfilePost === "liked" && "postTypeProfile--active"
              }`}
              onClick={() => setTypeofProfilePost("liked")}
            >
              Liked
            </div>
          </div>
          {/* <hr /> */}
          <div className="profileNftContainer row mx-0 text-center image1">
            {AbstractApi.map((curElem) => {
              const { image, title, price, maxPrice, maxPrice2, daysLeft } =
                curElem;
              return (
                <div className="profileNftContainerInner container__tile">
                  <img
                    id="nft__photo"
                    className="nftTileEachImage"
                    src={image}
                    alt="/"
                  />
                  {/* <img id='like_icon' src={require('../asset//images/Like.png')} /> */}
                  <div className="tile__details">
                    <div className="profileNftDetailFirstContainer container__up">
                      <div className="title">{title}</div>
                      <div className="title1">{price}</div>
                    </div>
                    <div className="profileNftDetailSecondContainer container__down">
                      <div className="">
                        <span style={{ color: "black" }}>{maxPrice}</span>
                        <span
                          style={{
                            color: "#366EEF",
                            fontFamily: "poppins-bold",
                          }}
                        >
                          {" "}
                          {maxPrice2}
                        </span>
                      </div>
                      <div className="">
                        {daysLeft}{" "}
                        {/* <i className="far fa-clock" style={{ color: "#f54" }}></i> */}
                        <i
                          className="fa-solid fa-heart"
                          style={{ color: "#ef3643" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
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
