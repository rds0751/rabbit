import React from "react";
import { Link } from "react-router-dom";
// import Upper_MyItems from "./Upper_MyItems";
// import { Myitem_API } from "../API/MyItemApi";

function Menu() {
  return (
    <>
      <div className="container menuphone">
        <div className="menuin">
          <h2>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
            >
              Marketplace
            </Link>
          </h2>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div className="menuin">
          <h2>
            <Link
              to="/leader-board"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
            >
              Leaderboard
            </Link>
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
              <li>
                <Link className="dropdown-item" to="/help-center">
                  Help Center
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/Suggestion">
                  Suggestions
                </Link>
              </li>
            </ul>
          </li>
          <i className="fas fa-chevron-right"></i>
        </div>

        <button className="py-2">Create</button>
      </div>
    </>
  );
}

export default Menu;
