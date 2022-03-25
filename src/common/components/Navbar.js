import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getNFtsData } from "../../services/webappMicroservice";
import { NavDropdown } from "react-bootstrap";
// import './Navbar.css'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/styles/Notification.css";
import {
  addUserData,
  AddWalletDetails,
  ManageNotiSideBar,
  ManageWalletSideBar,
  RedirectTo,
  searchNav,
} from "../../reducers/Action";
import { ethers } from "ethers";
import "../../assets/styles/topNavBar.css";

import Menu from "./Menu";
import { CheckUserByWalletAddress } from "../../services/UserMicroService";
import NftPage  from "../../modules/Home/Nft"
// import "../../assets/st.css";
const queryString = require('query-string');
function Navbar() {
  const navigate = useNavigate();
  const [humburger, setHumburger] = useState(false);
  const [searchInput, setSearchInput] = useState({
    searchByName : ""
  });
  const [toggleEffect, setToggleEffect] = useState(false);
  const [errorMssg, setErrorMssg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null); // defaultAccount having the wallet address
  const [checkClick, setcheckClick] = useState(false);
  const [getBalance, setGetBalance] = useState(null);
  const dispatch = useDispatch();
  const { user, sideBar } = useSelector((state) => state);
  const { userDetails, loggedInUser, walletAddress } = user;
  const { isOpenNoti, isOpenWallet } = sideBar;
  const [isloading, setIsloading] = useState(false);
  // const [filterType, setFilterType] = useState(defaultReq);
  const [showResults, setShowResults] = useState(false)
  const [data, setData] = useState()
  useEffect(() => {
    if (loggedInUser == null) {
      connectMetamask();
    }
  }, [toggleEffect]);

  //  ---------------------------------
  const isMetaMaskConnected = async () => {
    if (!window.ethereum) return Promise.reject("Please install metamask");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
  };

  const connectMetamask = async () => {
    if (window.ethereum) {
      await isMetaMaskConnected().then((connected) => {
        if (connected) {
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((newAccount) => {
              const address = newAccount[0];
              window.ethereum
                .request({
                  method: "eth_getBalance",
                  params: [address, "latest"],
                })
                .then((wallet_balance) => {
                  const balance = ethers.utils.formatEther(wallet_balance);
                  dispatch(
                    AddWalletDetails({
                      address,
                      balance,
                    })
                  );
                  CheckUserByWalletAddress(address, (res) => {
                    dispatch(addUserData(res));
                    localStorage.setItem("WHITE_LABEL_TOKEN", res.token);
                    setToggleEffect(!toggleEffect);
                  });
                });
            })
            .catch((e) => {
              console.log(e, "<<< error ");
            });
        } else {
          return null;
        }
      });
    } else {
    }
  };
  const accountChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount[0]);
    getUserBalance(newAccount[0]);
    dispatch(AddWalletDetails({ address: newAccount[0], balance: getBalance }));
    CheckUserByWalletAddress(newAccount[0], (res) => {
      dispatch(addUserData(res));
      localStorage.setItem("WHITE_LABEL_TOKEN", res.token);
      setToggleEffect(!toggleEffect);
    });
  };
  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setGetBalance(ethers.utils.formatEther(balance));
        console.log(getBalance, "<<< balance");
      });
  };

  window.ethereum?.on("accountsChanged", accountChangeHandler);
  let location = useLocation();
  
  const manageNavigation = (name) => {
    if (name == "myitems") {
      dispatch(ManageNotiSideBar(false));
      dispatch(ManageWalletSideBar(false));
      if (walletAddress == null) {
        dispatch(RedirectTo("myitems"));
        navigate("/add-wallet");
        toast.error("Connect your wallet");
      } else {
        navigate("/my-items");
      }
    }
    if (name == "create") {
      dispatch(ManageNotiSideBar(false));
      dispatch(ManageWalletSideBar(false));
      if (walletAddress == null) {
        dispatch(RedirectTo("create"));
        navigate("/add-wallet");
        toast.error("Connect your wallet");
      } else {
        navigate("/create-nft");
      }
    }
    if (name == "profile") {
      dispatch(ManageNotiSideBar(false));
      dispatch(ManageWalletSideBar(false));
      if (walletAddress == null) {
        dispatch(RedirectTo("profile"));
        navigate("/add-wallet");
        toast.error("Connect your wallet");
        // navigate("/my-profile");
      } else {
        navigate("/my-profile");
      }
    }
  };
  const handleHamburger = () => {
    if (!humburger) {
      setHumburger(true);
    } else {
      setHumburger(false);
    }
  };
  const handleWalletClick = () => {
    if (walletAddress == null) {
      navigate("/add-wallet");
      toast.error("Connect your wallet");
    } else {
      dispatch(ManageWalletSideBar(!isOpenWallet));
      dispatch(ManageNotiSideBar(false));
      document.body.style.overflow = !isOpenWallet ? "hidden" : "visible";
    }
  };
  const handleNotiSideBar = () => {
    console.log(isOpenNoti, "<<<isopen noti");
    if (loggedInUser == null) {
      navigate("/add-wallet");
      toast.error("Connect your wallet");
    } else {
      dispatch(ManageNotiSideBar(!isOpenNoti));
      dispatch(ManageWalletSideBar(false));
      document.body.style.overflow = !isOpenNoti ? "hidden" : "visible";
    }
  };
  //------------------------------------------------------------

  useEffect(() => {
    // checkapi();
    // const reqObj = queryString.stringify(searchInput);

    setIsloading(true);
    // getNfts(defaultReq).then((response) => {
    getNFtsData(searchInput, (res) => {
      // console.log(res, "filterResponse");
      setIsloading(true);
      if (res.success) {
        setData(res.responseData.nftContent);
        setIsloading(false);
      } else {
        toast.error("Error While fetching Nfts");
        setIsloading(false);
      }
    });
  }, [searchInput]);




  //-----------------------------------------------------------------
  // useEffect(() => {
  //   const reqObj = queryString.stringify(searchInput);
  //   console.log("jffffffffffffffffff",reqObj)
  //   getNFtsData(reqObj).then((response) => 
  //   setData(response.responseData.nftContent)
  //   );
  // }, [searchInput]);

  const handleSearch = () => {
    if (searchInput.trim() != "") dispatch(searchNav(searchInput));
  };
  // useEffect(() => {
  //   // checkapi();
  //   const reqObj = queryString.stringify(type);
  //   setIsloading(true);
  //   // getNfts(defaultReq).then((response) => {
  //   getNFtsData( (searchBy , r) => {
  //     // console.log(res, "filterResponse");
  //     setIsloading(true);
  //     if (res.success) {

  //       setNfts(res.responseData.nftContent);
  //       setIsloading(false);
  //     } else {
  //       toast.error("Error While fetching Nfts");
  //       setIsloading(false);
  //     }
  //   });
  // });



console.log("kkkkkkkkkkkkkkkkkk",data)


  const closeWalletAndNoti = () => {
    dispatch(ManageNotiSideBar(false));
    dispatch(ManageWalletSideBar(false));
  };

  const walletHandler = () => setShowResults(true)

  return (
    <>
      <div className="navbar-width">
        <nav className="navbarborder navbar navbar-expand-lg">
          <div
            // className="container container-fluid"
            className="container-fluid"
            style={{ backgroundColor: "white" }}
          >
            <div className="left_navbar d-flex align-items-center LeftNavBar">
              <Link className="navbrand" to="/" style={{ marginRight: "20px" }}  onClick={isOpenWallet}>
                <img
                  src={require("../../assets/images/logo.png")}
                  style={{ width: "100px" }}
                />
              </Link>
              <input
                className="form-control form-controlmob inputbox search-input-mob"
                type="search"
                name="searchByName"
                placeholder="Search"
                aria-label="Search"
                // value={searchInput}
                onChange={(e) => setSearchInput({...searchInput, [e.target.name]:e.target.value})}
                // onChange={() => setSearchInput()}
              />
              <button
                className="search-icon-mob"
                onClick={handleSearch}
                style={{
                  border: "0",
                  width: "50px",
                  height: "42px",
                  backgroundColor: "#f8f8f8",
                  marginLeft: "5px",
                }}
              >
                <i
                  className="fa fa-search"
                  style={{ fontSize: "14px" }}
                  aria-hidden="true"
                ></i>
              </button>
              {/* </form> */}
            </div>

            <div className="search_box order-2">
              <form className="p-0 m-0 ">
                <input
                  className="form-control form-controlmob "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ fontWeight: "bold" }}
                />
                <button className="screachbtn">
                  <i
                    className="fa fa-search"
                    aria-hidden="true"
                    style={{ fontSize: "14px" }}
                  ></i>
                </button>
              </form>
            </div>

            <div className="right_navbar d-flex RightNavBar order-1">
              {/* <div
            className="collapse navbar-collapse mobcollapse"
            id="navbarSupportedContent"
          > */}
              <div className="navbar-nav d-flex ">
                <ul className="left_section_nav mb-0 leftSec">
                  <li
                    className={
                      location.pathname.includes("/nfts") &&
                      !location.pathname.includes("leader-board") &&
                      !location.pathname.includes("resource") &&
                      !location.pathname.includes("create-nft") && 
                      !location.pathname.includes("help-center") && 
                      !location.pathname.includes("suggestion")
                        ? "nav-items li_underline marketplace"
                        : "nav-items marketplace"
                    }
                    onClick={closeWalletAndNoti}
                  >
                    <Link
                      className={
                        location.pathname.includes("/nfts") &&
                        !location.pathname.includes("leader-board") &&
                        !location.pathname.includes("resource") &&
                        !location.pathname.includes("create-nft")&& 
                        !location.pathname.includes("help-center") && 
                        !location.pathname.includes("suggestion") 
                          ? "nav-link navlink_active"
                          : "nav-link"
                      }
                      aria-current="page"
                      to="/nfts"
                    >
                      Marketplace
                    </Link>
                  </li>
                  <li
                    className={
                      location.pathname.includes("leader-board")
                        ? "nav-items li_underline leaderboard"
                        : "nav-items leaderboard"
                    }
                    onClick={closeWalletAndNoti}  
                  >
                    <Link
                      className={
                        location.pathname.includes("leader-board")
                          ? "nav-link navlink_active"
                          : "nav-link"
                      }
                      exact
                      to="/leader-board"
                    >
                      Leaderboard
                    </Link>
                  </li>

                  <NavDropdown
                    onClick={closeWalletAndNoti}
                    title="Resource"
                    id="navbarScrollingDropdown"
                    style={{padding:"0"}}
                    className={
                      location.pathname.includes("help-center") || 
                      location.pathname.includes("suggestion") 
                        ? "nav-items dropdown li_underline resource nav-link navlink_active resource"
                        : "nav-items dropdown resource"
                    }
                  >
                    <NavDropdown.Item onClick={()=>navigate('/help-center')}>
                      Help Center
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>navigate('/suggestion')}>
                      Suggestions
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* <li
                    className={
                      location.pathname.includes("resource")
                        ? "nav-items dropdown li_underline"
                        : "nav-items dropdown"
                    }
                    onClick={isOpenWallet}
                  >
                    <Link
                      className={
                        location.pathname.includes("resource")
                          ? "nav-link navlink_active"
                          : "nav-link"
                      }
                      to="/resource"
                     
                    >
                      Resource
                    </Link>
                   
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="/help-center">
                          Help Center
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/suggestion">
                          Suggestions
                        </Link>
                      </li>
                    </ul>
                  </li> */}
                  <li
                    style={{ marginRight: "28px" }}
                    onClick={() => manageNavigation("create")}
                  >
                    <Link
                      to={walletAddress == null ? "/add-wallet" : "/create-nft"}
                    >
                      <button
                        className="create-btn"
                        style={{ color: "#ffffff", backgroundColor: "#366EEF" }}
                      >
                        Create
                      </button>
                    </Link>
                  </li>
                  <li className="removeinmob"></li>
                </ul>

                <ul className="right_section_nav mb-0">
                  <li>
                    <img
                      onClick={handleNotiSideBar}
                      className="notification-icon"
                      src={require("../../assets/images/notification.png")}
                      alt="notification"
                    ></img>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        className="btnnav_mob1 profileimg profile-icon"
                        src={require("../../assets/images/profile.png")}
                        alt="profile"
                        style={{
                          
                        }}
                      ></img>
                    </a>
                    <ul
                      className="dropdown-menu profilemenu"
                      aria-labelledby="navbarDropdown"
                      style={{borderRadius: "0px 0px 6px 6px",
                      boxShadow: "0px 3px 6px #0000001A",
                      borderTop:"none",
                      border: "1px solid #ECECEC",
                      marginTop:"-0.5px",
                      padding:"0px",
                    }}
                    >
                      <li className="profileitem" onClick={() => manageNavigation("profile")}>
                        Profile
                      </li>
                      
                        <hr className="dropdown-divider" />
                      
                      <li className="profileitem"
                        style={{padding: "13.25px 89px 7px 13px"}}
                       onClick={() => manageNavigation("myitems")}>
                        My Items
                      </li>
                    </ul>
                  </li>
                  <li>
                    <img
                      onClick={() => {handleWalletClick(); walletHandler();}}
                      className="wallet-icon"
                      src={require("../../assets/images/wallet.png")}
                      alt="wallet"
                      style={{
                        color: "gray",
                        cursor: "pointer",
                      }}
                    ></img>
                  </li>
                  <button
                    type="button"
                    className="navbar_toggle ham_burger"
                    onClick={handleHamburger}
                  >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div className={humburger ? "scroll_off" : <></>}>
          {humburger ? <Menu /> : <></>}
        </div>
      </div>
    </>
  );
}

export default Navbar;
