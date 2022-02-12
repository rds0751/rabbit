import React,{useState} from "react";
import { useLocation } from "react-router-dom";
// import './Navbar.css'
import { Link } from "react-router-dom";
import "../../assets/styles/Notification.css";
import Menu from "./Menu";
// import "../../assets/st.css";
function Navbar() {
  
  const [humburger, setHumburger] = useState(false)

  let location = useLocation();

  const handleHamburger = () => {
    if(!humburger){
      setHumburger(true)
    }else{
      setHumburger(false)
    }
  }
  return (
    <>
    <div className="navbar-width">
      <nav className="navbarborder navbar navbar-expand-lg">
        <div className="container container-fluid" style={{ backgroundColor: "white" }}>
          <div className="left_navbar d-flex align-items-center">
            <Link className="navbar-brand" to="/">
              <img
                src={require("../../assets/images/logo.png")}
                style={{ width: "40px" }}
              />
            </Link>
            <form className=" w-100 p-0 m-0 " >
              <input
                className="form-control form-controlmob "
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{
                  backgroundColor: "#f8f8f8",
                  width: "75%",
                  // height: "35px",
                  border: "0",
                }}
              />
              <button
                className="screachbtn"
                style={{
                  border: "0",
                  width: "35px",
                  height: "35px",
                  backgroundColor: "#f8f8f8",
                  marginLeft: "5px",
                }}
              >
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
                <li className={location.pathname.includes('marketplace') ? "nav-item li_underline" : "nav-item"}>
                  <Link
                    className={location.pathname.includes('marketplace') ? "nav-link navlink_active" : "nav-link"}
                    aria-current="page"
                    to="/"
                  >
                    Marketplace
                  </Link>
                </li>
                <li className={location.pathname.includes('leader-board') ? "nav-item li_underline" : "nav-item"}>
                  <Link
                    className={location.pathname.includes('leader-board') ? "nav-link navlink_active" : "nav-link"}
                    exact
                    to="/leader-board"
                  >
                    Leaderboard
                  </Link>
                </li>

                <li className={location.pathname.includes('resource') ? "nav-item dropdown li_underline" : "nav-item dropdown"}>
                  <Link
                    className={location.pathname.includes('resource') ? "nav-link navlink_active" : "nav-link"}
                    to="/resource"
                    // id="navbarDropdown"
                    // role="button"
                    // data-bs-toggle="dropdown"
                    // aria-expanded="false"
                    // style={{ fontSize: "16px" }}
                  >
                  Resource
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
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
                <Link to="/create-nft" className="btn btn-primary btnnav" >
                    Create
                </Link>
              </li>
              <li
                className="removeinmob"
              >
                |
              </li>
              </ul>

              <ul className="right_section_nav mb-0">
              
              
              <li>
                <Link to="/notification">
                  <img
                    className="noti"
                    src={require("../../assets/images/notification.png")}
                  ></img>
                </Link>
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
                    style={{ color: "gray", cursor: "pointer" }}
                  ></img>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/edit-profile">
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
                <Link to="/Create">
                  <img
                    className="btnnav_mob2"
                    src={require("../../assets/images/wallet.png")}
                    style={{
                      color: "gray",
                      cursor: "pointer",
                    }}
                  ></img>
                </Link>
              </li>
              {/* <li className="ham_burger"> */}
                <button type="button" class="navbar_toggle ham_burger" onClick={handleHamburger}>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
              {/* </li> */}
            </ul>
            
          </div>
          </div>
          <div className="search_box">
            <form className="p-0 m-0 " >
                <input
                  className="form-control form-controlmob "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="screachbtn"
                >
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
          </div>
        </div>
      </nav>
      <div className={humburger ? "scroll_off":<></>}>
        {humburger ? <Menu /> : <></>}
      </div>
    </div>
      </>
  );
}

export default Navbar;