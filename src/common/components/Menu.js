import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {

  RedirectTo,

} from "../../reducers/Action";
import { useNavigate } from "react-router-dom";
// import Upper_MyItems from "./Upper_MyItems";
// import { Myitem_API } from "../API/MyItemApi";

function Menu(props) {
  const { user, sideBar } = useSelector((state) => state);
  const { userDetails, loggedInUser, walletAddress } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const manageNavigation = (name) => {
    if (name == "create") {
      if (walletAddress == null) {
        dispatch(RedirectTo("create"));
        navigate("/add-wallet");
      } else {
        navigate("/create-nft");
      }
    }
    if (name == "profile") {
      if (walletAddress == null) {
        dispatch(RedirectTo("profile"));
        navigate("/add-wallet");
        // navigate("/my-profile");
      } else {
        navigate("/my-profile");
      }
    }
  };
  console.log(props.handleHamburger, "deepak")
  return (
    <>
      <div className="container new-container menuphone">

        <div className="menuin" style={{
          display: "flex", cursor: "pointer",
          justifyContent: "space-between"
        }} onClick={() => { navigate('/nfts'); props.handleHamburger(); }}>
          <h2 style={{
            textDecoration: "none",
            color: "black",
            fontSize: "1.1rem",
            fontWeight: "600",

          }}>

            Marketplace

          </h2>
          <i className="fas fa-chevron-right"></i>



        </div>
        <div className="menuin" style={{
          display: "flex", cursor: "pointer",
          justifyContent: "space-between"
        }} onClick={() => { navigate('/leader-board'); props.handleHamburger(); }}>
          <h2 style={{
            textDecoration: "none",
            color: "black",
            fontSize: "1.1rem",
            fontWeight: "600",
          }}>

            Leaderboard

          </h2>
          <i className="fas fa-chevron-right"></i>
        </div>

        <div className="menuin">
          {/* <h2>Resources</h2> */}
          <li className="nav-item dropdown list-unstyled">
            <a
              className="nav-link dropdown"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ fontSize: "1.1rem" }}
            >
              Resource
            </a>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
              style={{ width: "450%" }}
            >
              <li onClick={() => { props.handleHamburger(); }}>
                <Link className="dropdown-item" to="/help-center">
                  Help Center
                </Link>
              </li>
              <li onClick={() => { props.handleHamburger(); }}>
                <Link className="dropdown-item" to="/Suggestion" >
                  Suggestions
                </Link>
              </li>
            </ul>
          </li>
          <i className="fas fa-chevron-right"></i>
        </div>

        <button className="py-2" onClick={() => { manageNavigation("create"); props.handleHamburger(); }}>

          <Link
            to={walletAddress == null ? "/add-wallet" : "/create-nft"}
            className="btn btn-primary btnnav"
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            Create
          </Link>

        </button>
      </div>
    </>
  );
}

export default Menu;
