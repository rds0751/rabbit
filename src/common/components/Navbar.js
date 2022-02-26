import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import './Navbar.css'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/styles/Notification.css";
import {
  addUserData,
  ManageNotiSideBar,
  ManageWalletSideBar,
} from "../../reducers/Action";
import { ethers } from "ethers";
import "../../assets/styles/topNavBar.css";

import Menu from "./Menu";
import { CheckUserByWalletAddress } from "../../services/UserMicroService";
// import "../../assets/st.css";
function Navbar() {
  const navigate = useNavigate();
  const [humburger, setHumburger] = useState(false);
  const ethereum = window.ethereum;
  const [errorMssg, setErrorMssg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null); // defaultAccount having the wallet address
  console.log("ethereum ", ethereum && ethereum);
  const [checkClick, setcheckClick] = useState(false);

  const [getBalance, setGetBalance] = useState(null);
  const dispatch = useDispatch();
  const { user, sideBar } = useSelector((state) => state);
  const { userDetails, loggedInUser, walletAddress } = user;
  const { isOpenNoti, isOpenWallet } = sideBar;
  console.log(walletAddress,"<<<<this is wallet address")
  // useEffect(() => {
  //   if (window.ethereum) {
  //     // window.ethereum
  //     //   .request({ method: "eth_requestAccounts" })
  //     //   .then((result) => {
  //     //     accountChangeHandler(result[0]); //accounts can be a array we just wanna grab first one
  //     //     console.log(result[0], "<<<result console");
  //     //     dispatch(
  //     //       updateUserDetail({ address: defaultAccount, balance: getBalance })
  //     //     );

  //     //     // window.location.pathname = "/wallet";
  //     //   })
  //     //   .catch((e) => {
  //     //     // window.location.pathname = "/add-wallet";
  //     //     console.log(e, "<<< error ");
  //     //   });
  //   } else {
  //     alert("Wallet not added");
  //     setErrorMssg("Install Metamask ");
  //     toast.error("Install Metamak and Connect Wallet");
  //   }
  // }, []);
  // const accountChangeHandler = (newAccount) => {
  //   setDefaultAccount(newAccount);
  //   CheckUserByWalletAddress(newAccount, (res) => {
  //     console.log(res, "<<<<response of user");
  //     dispatch(addUserData(res));
  //   });
  //   getUserBalance(newAccount);
  //   // console.log(data, "<<<<response dta");
  // };
  // const getUserBalance = (address) => {
  //   window.ethereum
  //     .request({ method: "eth_getBalance", params: [address, "latest"] })
  //     .then((balance) => {
  //       setGetBalance(ethers.utils.formatEther(balance));
  //       console.log(getBalance, "<<< balance");
  //     });
  // };
  let location = useLocation();

  const handleHamburger = () => {
    if (!humburger) {
      setHumburger(true);
    } else {
      setHumburger(false);
    }
  };
  const handleWalletClick = () => {
    // alert("handleWallet called");
    if (walletAddress == null) {
      // alert("hanlde wallet null");
      navigate("/add-wallet");
    } else {
      // alert("else part");
      dispatch(ManageWalletSideBar(!isOpenWallet));
    }
  };
  const handleNotiSideBar = () => {
    // alert("noti open");
    // alert(loggedInUser);
    if (loggedInUser == null) {
      // alert("nulll");
      navigate("/add-wallet");
    } else {
      dispatch(ManageNotiSideBar(true));
    }
  };
  console.log("logged in user >>> lllll", loggedInUser);
  return (
    <>
      <div className="navbar-width">
        <nav className="navbarborder navbar navbar-expand-lg">
          <div
            className="container container-fluid"
            style={{ backgroundColor: "white" }}
          >
            <div className="left_navbar d-flex align-items-center">
              <Link className="navbrand" to="/" style={{ marginRight: "21px" }}>
                <img
                  src={require("../../assets/images/logo.png")}
                  style={{ width: "50px" }}
                />
              </Link>
              <form className=" w-100 p-0 m-0" action="/" method="get">
                <input
                  className="form-control form-controlmob "
                  type="search"
                  name="searchByName"
                  placeholder="Search"
                  aria-label="Search"
                  style={{
                    backgroundColor: "#f8f8f8",
                    width: "75%",
                    height:"42px",
                    padding: "0px",
                    paddingLeft: "10px",
                    border: "0",
                  }}
                />
                <button
                  className="screachbtn"
                  style={{
                    border: "0",
                    width: "50px",
                    height:"42px",
                    backgroundColor: "#f8f8f8",
                    marginLeft: "5px",
                  }}
                >
                  <i
                    className="fa fa-search"
                    style={{
                      width: "42px",
                      height: "50",
                    }}
                    aria-hidden="true"
                  ></i>
                </button>
              </form>
            </div>

            

            <div className="search_box">
              <form className="p-0 m-0 ">
                <input
                  className="form-control form-controlmob "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="screachbtn">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
            </div>
          
          
          <div className="right_navbar d-flex ">
              {/* <div
            className="collapse navbar-collapse mobcollapse"
            id="navbarSupportedContent"
          > */}
              <div className="navbar-nav d-flex">
                <ul className="left_section_nav mb-0">
                  <li
                    className={
                      location.pathname.includes("marketplace")
                        ? "nav-item li_underline"
                        : "nav-item"
                    }
                  >
                    <Link
                      className={
                        location.pathname.includes("marketplace")
                          ? "nav-link navlink_active"
                          : "nav-link"
                      }
                      aria-current="page"
                      to="/"
                    >
                      Marketplace
                    </Link>
                  </li>
                  <li
                    className={
                      location.pathname.includes("leader-board")
                        ? "nav-item li_underline"
                        : "nav-item"
                    }
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

                  <li
                    className={
                      location.pathname.includes("resource")
                        ? "nav-item dropdown li_underline"
                        : "nav-item dropdown"
                    }
                  >
                    <Link
                      className={
                        location.pathname.includes("resource")
                          ? "nav-link navlink_active"
                          : "nav-link"
                      }
                      to="/resource"
                      // id="navbarDropdown"
                      // role="button"
                      // data-bs-toggle="dropdown"
                      // aria-expanded="false"
                      // style={{ fontSize: "16px" }}
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
                  </li>
                  <li>
                    <Link
                      to={walletAddress == null ? "/add-wallet" : "/create-nft"}
                      className="btn btn-primary btnnav"
                    >
                      Create
                    </Link>
                  </li>
                  <li className="removeinmob">|</li>
                </ul>

                <ul className="right_section_nav mb-0">
                  <li>
                    {/* <Link
                      to={
                        loggedInUser == null
                          ? "/add-wallet"
                          : dispatch(ManageNotiSideBar(true))
                      }
                    > */}
                    <img
                      onClick={handleNotiSideBar}
                      className="noti"
                      src={require("../../assets/images/notification.png")}
                      width="19px"
                      height="21px"
                    ></img>
                    {/* </Link> */}
                    {/* </Link> */}
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
                        className="btnnav_mob1"
                        src={require("../../assets/images/profile.png")}
                        style={{ color: "gray", cursor: "pointer",marginLeft:"31.22px" ,marginRight:"22.43px"
                       }}
                      ></img>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to={
                            walletAddress == null
                              ? "/add-wallet"
                              : "/my-profile"
                          }
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/MyItems">
                          My Items
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    {/* <Link
                      to={
                        !userDetails
                          ? "/add-wallet"
                          : dispatch(ManageNotiSideBar(true))
                      }
                    > */}
                    <img
                      onClick={handleWalletClick}
                      className="btnnav_mob2"
                      src={require("../../assets/images/wallet.png")}
                      width="21px"
                      height="21.21px"
                      style={{
                        color: "gray",
                        cursor: "pointer",
                      }}
                    ></img>
                    {/* </Link> */}
                  </li>
                  {/* <li className="ham_burger"> */}
                  <button
                    type="button"
                    className="navbar_toggle ham_burger"
                    onClick={handleHamburger}
                  >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  {/* </li> */}
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
