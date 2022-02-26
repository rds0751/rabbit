import React from "react";
import "../../assets/styles/Notification.css";

// import './Footer.css'

function Footer() {
  return (
    <>
      <div
        className="mobfooter"
        style={{ backgroundColor: "#FBFBFB", marginTop: "10px" }}
      >
        <footer className="container">
        {/* <footer className="container footermob"> */}
          <div className="row mb-0 mt-5">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 pt-4">
              <ul className="list-unstyled   mt-0 " style={{ textAlign: "left" }}>
              <li>
                <p
                  className="mb-0 pb-0 mt-4 mb-2"
                  style={{ fontSize: "18px", color: "#8F8F8F" }}
                >
                  Join our Community
                </p>
              </li>
              <li>
                <i className="fab fa-facebook"  style={{marginRight:"34px" ,fontSize:"24px"}}></i>
                <i className="fab fa-twitter"  style={{marginRight:"34px",fontSize:"24px"}}></i>
                <i className="fab fa-instagram " style={{fontSize:"24px"}}  ></i>
              </li>
              <li
                style={{ fontSize: "18px", color: "#8F8F8F", 
                marginTop: "20px",marginBottom:"8px"
                // marginTop: "17.49px",
                 }}
              >
                Subscribe to our newsletter for the latest NFTs{" "}
              </li>
            </ul>
              <div className="input-group-lg input-group mb-3 mt-md-0 mt-4 ml-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your email"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  style={{
                    borderTopLeftRadius: "0.2em",
                    borderBottomLeftRadius: "0.2em",
                  }}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    type="button"
                    id="button-addon2"
                    style={{
                      height: "36px",
                      fontWeight:"400px",
                      borderTopLeftRadius: "0em",
                      borderBottomLeftRadius: "0em",
                    }}
                  >
                    {" "}
                    <b>Submit</b>
                  </button>
                </div>
              </div>

              <h3
                style={{
                  fontSize: "18px",
                  color: "#8F8F8F",
                  textAlign: "left",
                   marginTop:"37px",
                   fontWeight:"400"
                }}
              >
                About DLT NFT marketplace
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#8F8F8F",
                  fontWeight: "400",
                  textAlign: "left",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing
                <br /> elit, sed do eiusmod tempor incididunt ut labore et
                <br /> dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 pt-4 footerfix1 footer">
              <ul className="list-unstyled" style={{ textAlign: "left" }}>
                <a href="/">
                  {" "}
                  <li
                    className="mt-md-0 mt-0"
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "bold",
                    }}
                  >
                    Marketplace
                  </li>
                </a>
                <a href="/">
                  <li
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "normal",
                      marginTop: "16px",marginBottom:"8px",
                       // marginTop: "8px"
                    }}
                  >
                    NFT
                  </li>
                </a>
                <a href="/collections-tile">
                  <li
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "normal",
                      marginTop: "16px",marginBottom:"8px",
                       // marginTop: "8px"
                    }}
                  >
                    Collections
                  </li>
                </a>
              </ul>

              <ul
                className="list-unstyled mobfooter1"
                style={{ textAlign: "left",marginTop:"19px" }}
              >
                <a href="LeaderBoard">
                  <li
                    className="mt-md-0 mt-4"
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "bold",
                    }}
                  >
                    Leaderboard
                  </li>
                </a>
                <a href="/top-seller">
                  <li
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "normal",
                      marginTop: "16px",marginBottom:"8px",
                      // marginTop: "8px"
                    }}
                  >
                    Top Seller
                  </li>
                </a>
                <a href="/top-bidder">
                  <li
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "normal",
                      marginTop: "16px",marginBottom:"8px",
                       // marginTop: "8px"
                    }}
                  >
                    Top Buyer
                  </li>
                </a>
                <a href="/top-collection">
                  <li
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "normal",
                      marginTop: "16px",marginBottom:"8px",
                       // marginTop: "8px"
                    }}
                  >
                    Top Collections
                  </li>
                </a>
              </ul>
              <ul
                className="list-unstyled mobfooter3 footer"
                style={{ textAlign: "left" }}
              >
                <a href="/about">
                  <li
                    className="mt-md-0 mt-0"
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "bold",
                    }}
                  >
                    Company
                  </li>
                </a>
                <a href="/about">
                  <li
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "normal",
                      marginTop: "16px",marginBottom:"8px",
                       // marginTop: "8px"
                    }}
                  >
                    About{" "}
                  </li>
                </a>
              </ul>
              <ul
                className="list-unstyled mobfooter2 footer"
                style={{ textAlign: "left" }}
              >
                <li
                  className="mt-md-0 mt-0"
                  style={{
                    fontSize: "18px",
                    color: "#8F8F8F",
                    fontWeight: "bold",
                  }}
                >
                  Community
                </li>
                <a href="/help-center">
                  <li
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "normal",
                      marginTop: "16px",marginBottom:"8px",
                       // marginTop: "8px"
                    }}
                  >
                    Help Centers
                  </li>
                </a>
                <a href="#">
                  <li
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "normal",
                      marginTop: "16px",marginBottom:"8px",
                       // marginTop: "8px"
                    }}
                  >
                    FAQs
                  </li>
                </a>
                <a href="Suggestions">
                  <li
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "normal",
                      marginTop: "16px",marginBottom:"8px",
                       // marginTop: "8px"
                    }}
                  >
                    Suggestions
                  </li>
                </a>
              </ul>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 pt-4 footerfix mobview footer">
              <ul className="list-unstyled" style={{ textAlign: "left" }}>
                <li
                  className="mt-md-0 mt-0"
                  style={{
                    fontSize: "18px",
                    color: "#8F8F8F",
                    fontWeight: "bold",
                  }}
                >
                  Community
                </li>
                <a href="/help-center">
                  <li
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "normal",
                      marginTop: "16px",marginBottom:"8px",
                       // marginTop: "8px"
                    }}
                  >
                    Help Centers
                  </li>
                </a>
                <a href="#">
                  <li
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "normal",
                      marginTop: "16px",marginBottom:"8px",
                       // marginTop: "8px"
                    }}
                  >
                    FAQs
                  </li>
                </a>
                <a href="/suggestion">
                  <li
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "normal",
                      marginTop: "16px",marginBottom:"8px",
                       // marginTop: "8px"
                    }}
                  >
                    Suggestions
                  </li>
                </a>
              </ul>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 pt-4 col-sm-6 mobview footer">
              <ul
                className="list-unstyled"
                style={{ textAlign: "left" }}
              >
                <li
                  className="mt-md-0 mt-0"
                  style={{
                    fontSize: "18px",
                    color: "#8F8F8F",
                    fontWeight: "bold",
                  }}
                >
                  Company
                </li>
                <a href="/about">
                  <li
                    style={{
                      fontSize: "18px",
                      color: "#8F8F8F",
                      fontWeight: "normal",
                      marginTop: "16px",marginBottom:"8px",
                       // marginTop: "8px"
                    }}
                  >
                    About{" "}
                  </li>
                </a>
              </ul>
            </div>

            

            
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;