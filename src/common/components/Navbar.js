import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getNfts, getCollections } from "../../services/webappMicroservice";
import { NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
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
import searchIcon from "../../assets/images/search.svg";

import Menu from "./Menu";
import { CheckUserByWalletAddress } from "../../services/UserMicroService";
import NoItem from "../../assets/images/Noitems.svg";
import Spinner from "../../common/components/Spinner";
import Form from 'react-bootstrap/Form'
import bellicon from '../../assets/images/bellicon.svg'
import profileImg from '../../assets/images/profile.svg'
import wallet from '../../assets/images/wallet.svg'
import Anafto from '../../assets/images/ANAFTO.svg'
const queryString = require("query-string");
function Navbar() {
  const navigate = useNavigate();
  const [humburger, setHumburger] = useState(false);
  const [toggleEffect, setToggleEffect] = useState(false);
  const [errorMssg, setErrorMssg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null); // defaultAccount having the wallet address
  const [checkClick, setcheckClick] = useState(false);
  const [getBalance, setGetBalance] = useState(null);
  const dispatch = useDispatch();
  const { user, sideBar } = useSelector((state) => state);
  const { userDetails, loggedInUser, walletAddress } = user;
  const { isOpenNoti, isOpenWallet } = sideBar;
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchNft, setSearchNft] = useState({
    searchByName: "",
    limit:4,
  });
  const [searchCollection, setSearchCollection] = useState({
    searchByName: "",
    limit:4,
  });
  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState([]);
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
    setDisplay(true);
    if (name == "myitems") {
      dispatch(ManageNotiSideBar(false));
      dispatch(ManageWalletSideBar(false));
      if (walletAddress == null) {
        dispatch(RedirectTo("myitems"));
        navigate("/add-wallet");
        toast.error("Connect your wallet", {
          position: toast.POSITION.TOP_RIGHT
        });
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
        toast.error("Connect your wallet", {
          position: toast.POSITION.TOP_RIGHT
        });
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
        toast.error("Connect your wallet", {
          position: toast.POSITION.TOP_RIGHT
        });
        // toast.error("Connect your wallet");
        // navigate("/my-profile");
      } else {
        navigate("/my-profile");
      }
    }
  };
  const handleHamburger = () => {
    setDisplay(true);
    if (!humburger) {
      setHumburger(true);
    } else {
      setHumburger(false);
    }
  };
  const handleDisplay = () => {
   
      setDisplay(!display);
    
  };
  const handleWalletClick = () => {
    setDisplay(true);
    if (walletAddress == null) {
      navigate("/add-wallet");
      toast.error("Connect your wallet", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      dispatch(ManageWalletSideBar(!isOpenWallet));
      dispatch(ManageNotiSideBar(false));
      document.body.className = !isOpenWallet ? "overflow" : "overflow-hidden";
    }
  };
  const handleNotiSideBar = () => {
    setDisplay(true);
    console.log(isOpenNoti, "<<<isopen noti");
    if (loggedInUser == null) {
      navigate("/add-wallet");
      toast.error("Connect your wallet", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      dispatch(ManageNotiSideBar(!isOpenNoti));
      dispatch(ManageWalletSideBar(false));
      document.body.className = !isOpenNoti ? "overflow" : "overflow-hidden";
    }
  };
  console.log(isOpenNoti, "<<<isopen noti");
 
  // document.body.overflow = !isOpenWallet === false ?  "auto": "hidden";
  //------------------------------------------------------------
  const reqObj = queryString.stringify(searchNft)
  const reqObj1 = queryString.stringify(searchCollection)
  useEffect(() => {
    setIsLoading(true)
    setNfts([])
    setCollections([])
    async function fetchData() {
      if (searchCollection.searchByName.length > 0){        
        await getNfts(reqObj).then((res) => setNfts(res.nftContent))
        await getCollections(reqObj1).then((res) => setCollections(res))
      }
      setIsLoading(false)
    }
    fetchData();
  }, [searchNft, searchCollection]);

  //-----------------------------------------------------------------
  const [display,setDisplay]=useState(false);
 
  // if (display) {
  //   document.body.style.position = '';
  //   document.body.style.top = '';
  
  // } else if(showModal){
  //   document.body.style.position = 'fixed';
  //   document.body.style.top = `-${window.scrollY}px`
  // }
  // else{
  //   document.body.style.position = '';
  //   document.body.style.top = '';

  // }
  const handleSearch = async (e) => {
    if (searchNft.searchByName.length > 0) {
      setShowModal(true)
      setDisplay(false);
    } else {
      setShowModal(false)
      setDisplay(true);
    }
    // showModal? setDisplay(false):setDisplay(true);
    setSearchNft({...searchNft, [e.target.name] : e.target.value})
    setSearchCollection({...searchCollection, [e.target.name] : e.target.value})
  };

  const closeWalletAndNoti = () => {
    setDisplay(true);
    dispatch(ManageNotiSideBar(false));
    dispatch(ManageWalletSideBar(false));
    // document.body.overflow = !isOpenNoti === false ?  "auto": "hidden";
  };

  const walletHandler = () => {
    setDisplay(true);
    setShowResults(true)};

  return (
    <>
      <div className="navbar-width">
        <nav className="navbarborder navbar navbar-expand-lg">
          <div
            className="container-fluid mainContainer"
            style={{ backgroundColor: "white" }}
          >
            <div className="left_navbar d-flex align-items-center LeftNavBar">
              <Link
                className="navbrand"
                to="/"
                style={{ marginRight: "20px" }}
                onClick={() => {closeWalletAndNoti();}}
              >
                <img
                  src={Anafto}
                  style={{ width: "100px" }}
                  alt=""
                />
              </Link>
              <div>
                <div className="search-div" style={{display:"flex"}}>
                  <div>
                    <img src={searchIcon} alt="" className="search-icon" />
                  </div>
                  <div>
                    <input
                      type="search"
                      name="searchByName"
                      placeholder="Search items and collections"
                      onChange={(e) => handleSearch(e)}
                      autoComplete="off"
                      className="search-input"
                    />
                  </div>
                </div>
                {(searchNft.searchByName.length > 0) && (
                  <>
                    {(nfts.length === 0 && collections.length === 0) ? (
                      <>
                        <div className="search-results-background" onClick={(e)=>setDisplay(true)} style={{display:display?"none":"block"}}>    
                          <div className="search-results-box" style={{display:display?"none":"block"}}>
                            {isLoading ? (
                              <div className="d-flex justify-content-center mt-3 mb-3">
                                <Spinner />
                              </div>
                            ):(
                              <div className="Noitemdiv"  style={{display:display?"none":"flex"}}>
                                <img className="no-image" src={NoItem} alt="" />
                                <p className="textitem">No items available</p>
                              </div>
                            )}                            
                          </div>
                        </div>
                      </>
                    ):(
                      <>
                        <div className="search-results-background" onClick={(e)=>setDisplay(true)} style={{display:display?"none":"block"}}>    
                          <div className="search-results-box" style={{display:display?"none":"block"}}>
                          {collections.length > 0 && (
                            <div>
                            <p className="coll-title">Collections</p>
                            {collections.map((collection) => {
                              const route = "/collection-details/" + collection._id;
                              return(
                                <Link to={route} style={{ textDecoration: "none" }}>
                                  <div className="item-div d-flex" >
                                    <img src={collection.imageUrl} alt="" className="coll-img"/>
                                    <p className="coll-name">
                                      {collection.name}
                                      <span className="item-count">{collection.nftCount} items</span>                         
                                    </p>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                          )}
                          {nfts.length > 0 && (
                            <div>
                            <p className="coll-title">NFTs</p>
                            {nfts.map((nft) => {
                              const route = "/nft-information/" + nft._id;
                              return(
                                <Link to={route} style={{ textDecoration: "none" }}>
                                  <div className="item-div d-flex">
                                    <img src={nft.cdnUrl} alt="" className="coll-img"/>
                                    <p className="coll-name">{nft.name}</p>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                          )}              
                          <div className="btn-div d-flex">
                            <Link to='/search-results'
                              state= {{
                                value: searchNft.searchByName
                              }}
                            >
                            <button className="show-more-btn">show more</button>
                            </Link>
                          </div>
                          </div>                
                        </div>                  
                      </>
                    )}
                  </>                  
                )}
              </div>
            </div>
            
            <div className="search_box order-2">
              
            <Form.Control
    type="search"
    name="searchByName"
   
    onChange={(e) => handleSearch(e)}
    autoComplete="off"
    className="search-input"
    placeholder="Search items and collections"
  />
                {/* <div>
                  <input
                    type="search"
                    name="searchByName"
                    placeholder="Search items and collections"
                    onChange={(e) => handleSearch(e)}
                    autoComplete="off"
                    className="search-input"
                  />
                </div> */}
                <div className="searchimg">
                  <img src={searchIcon} alt="" className="search-icon" />
                </div>
              
              {(searchNft.searchByName.length > 0) && (
                  <>
                    {(nfts.length === 0 && collections.length === 0) ? (
                      <>
                          <div className="search-results-box-small" onClick={(e)=>setDisplay(true)} style={{display:display?"none":"block"}}>
                            <div className="small-search-result" style={{display:display?"none":"block"}}>
                            {isLoading ? (
                              <div className="d-flex justify-content-center mt-3 mb-3">
                                <Spinner />
                              </div>
                            ):(
                              <div className="Noitemdiv">
                                <img src={NoItem} alt="" />
                                <p className="textitem">No items available</p>
                              </div>
                            )}   
                            </div>                         
                          </div>
                      </>
                    ):(
                      <>
                      <div className="search-results-box-small"  onClick={(e)=>setDisplay(true)} style={{display:display?"none":"block"}}>
                          <div className="small-search-result" style={{display:display?"none":"block"}}>
                          {collections.length > 0 && (
                            <div>
                            <p className="coll-title">Collections</p>
                            {collections.map((collection) => {
                              const route = "/collection-details/" + collection._id;
                              return(
                                <Link to={route} style={{ textDecoration: "none" }}>
                                  <div className="item-div d-flex" >
                                    <img src={collection.imageUrl} alt="" className="coll-img"/>
                                    <p className="coll-name">
                                      {collection.name}
                                      <span className="item-count">{collection.nftCount} items</span>                         
                                    </p>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                          )}
                          {nfts.length > 0 && (
                            <div>
                            <p className="coll-title">NFTs</p>
                            {nfts.map((nft) => {
                              const route = "/nft-information/" + nft._id;
                              return(
                                <Link to={route} style={{ textDecoration: "none" }}>
                                  <div className="item-div d-flex">
                                    <img src={nft.cdnUrl} alt="" className="coll-img"/>
                                    <p className="coll-name">{nft.name}</p>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                          )}              
                          <div className="btn-div d-flex">
                            <Link to='/search-results'
                              state= {{
                                value: searchNft.searchByName
                              }}
                            >
                            <button className="show-more-btn">show more</button>
                            </Link>
                          </div>
                          </div>   
                          </div>            
                      </>
                    )}
                  </>                  
              )}
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
                          !location.pathname.includes("create-nft") &&
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
                    style={{ padding: "0" }}
                    className={
                      location.pathname.includes("help-center") ||
                        location.pathname.includes("suggestion")
                        ? "nav-items dropdown li_underline resource nav-link navlink_active resource"
                        : "nav-items dropdown resource"
                    }
                  >
                    <NavDropdown.Item onClick={() => navigate("/help-center")}>
                      Help Center
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate("/suggestion")}>
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
                    {/* <Link
                      to={walletAddress == null ? "/add-wallet" : "/create-nft"}
                    > */}
                    <button
                      className="create-btn"
                     
                    >
                      Create
                    </button>
                    {/* </Link> */}
                  </li>
                  <li className="removeinmob"></li>
                </ul>

                <ul className="right_section_nav mb-0">
                  <li>
                    <img
                      onClick={handleNotiSideBar}
                      className={!isOpenNoti ?  "notification-icon" :   "hover-icon"}
                      src={bellicon}
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
                       onClick={closeWalletAndNoti}
                        className="btnnav_mob1 profileimg profile-icon"
                        src={profileImg}
                        alt="profile"
                        style={{}}
                      ></img>
                    </a>
                    <ul
                      className="dropdown-menu profilemenu"
                      aria-labelledby="navbarDropdown"
                      style={{
                        borderRadius: "0px 0px 6px 6px",
                        boxShadow: "0px 3px 6px #0000001A",
                        borderTop: "none",
                        border: "1px solid #ECECEC",
                        marginTop: "-0.5px",
                        padding: "0px",
                      }}
                    >
                      <li
                        className="profileitem"
                        onClick={() => manageNavigation("profile")}
                      >
                        Profile
                      </li>

                      <hr className="dropdown-divider" />

                      <li
                        className="profileitem"
                        style={{ padding: "13.25px 75px 7px 13px" }}
                        onClick={() => manageNavigation("myitems")}
                      >
                        My Items
                      </li>
                    </ul>
                  </li>
                  <li>
                    <img
                      onClick={() => {
                        handleWalletClick();
                        walletHandler();
                      }}
                      className={!isOpenWallet ?  "wallet-icon" :   "hover-icon"}
                      src={wallet}
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
                    onClick={() =>{handleHamburger();  closeWalletAndNoti();}}
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

        <div className="hamburger" onClick={handleHamburger} style={{display:!humburger?"none":"block"}}>
        <div  className={humburger ? "scroll_off" : <></>} style={{display:!humburger?"none":"block",background:"white"}}  >
          {humburger ? <Menu handleHamburger={handleHamburger} /> : <></>}
        </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
