import React from "react";
import "../../assets/styles/Notification.css";

function Footer() {
  return (
    <>
      <div className="container-fluid footer-main-cont" style={{color:"#8F8F8F", backgroundColor:"#FBFBFB",width:"100%",paddingLeft:"8%",paddingRight:"8%"}}>
        <div className="row footer-cont"> 
          <div className="footer-top">
            <p className="fs-18">Join our community</p>
            <div className="allicon">
              <i className="fab fa-instagram fs-24 Icon"></i>
              <i className="fab fa-twitter fs-24 Icon"></i>
              <i className="fab fa-reddit fs-24 Icon hideicon "></i>  
              <i className="fab fa-telegram fs-24 Icon hideicon"></i>
              <i className="fab fa-facebook fs-24 Icon"></i>
              <i className="fab fa-linkedin fs-24 Icon hideicon"></i> 
              <i className="fab fa-twitter fs-24 Icon hideicon" ></i>
              <i className="fab fa-youtube fs-24 Icon hideicon"></i>               
            </div>
            <p className="subscribe">Subscribe to our newsletter for the latest NFTs</p>
            <div className="input-group-lg input-group  footerinputbox">
                  <input
                    type="text"
                    className="form-control ib "
                    placeholder="Your email"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    style={{
                      borderTopLeftRadius: "0.2em",
                      borderBottomLeftRadius: "0.2em",
                    }}
                  />
                  <div className="input-group-append inputfooter">
                    <button
                      className="btn btn-primary"
                      type="button"
                      id="button-addon2"
                      style={{
                        height: "36px",
                        fontWeight:"400",
                        width: "116px",
                        
                        borderTopLeftRadius: "0em",
                        borderBottomLeftRadius: "0em",
                      }}
                    >
                      {" "}
                      Submit
                    </button>
                  </div>
            </div>
            <h3 className="about">About DLT NFT marketplace</h3>
            <div  className="d-none d-sm-none d-md-block d-lg-block fs-16 aboutdes">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
            </div>
            <div className="d-sm-block d-md-none d-lg-none fs-16">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
          </div>
          <div className="footer-bottom">
            <div>
              <div className="fs-18" style={{color:"#8F8F8F"}}>
                <h3 className="fs-18 fw-b">
                  <a href="/" style={{textDecoration: "none", color:"#8F8F8F"}}>Marketplace</a></h3>
                <p><a href="/" style={{textDecoration: "none", color:"#8F8F8F"}}>NFT</a></p>
                <p><a href="/collections-tile" style={{textDecoration: "none", color:"#8F8F8F"}}>Collections</a></p>
              </div>
              <div className="fs-18">
                <h3 className="fs-18 fw-b">
                  <a href="/leader-board" style={{textDecoration: "none", color:"#8F8F8F"}}>Leaderboard</a></h3>
                <p><a href="/top-seller" style={{textDecoration: "none", color:"#8F8F8F"}}>Top Seller</a></p>
                <p><a href="/top-bidder" style={{textDecoration: "none", color:"#8F8F8F"}}>Top Bidder</a></p>
                <p><a href="/top-collection" style={{textDecoration: "none", color:"#8F8F8F"}}>Top Collections</a></p> 
              </div>
            </div>
            <div className="fs-18">
              <h3 className="fs-18 fw-b">Community</h3>
              <p><a href="/help-center" style={{textDecoration: "none", color:"#8F8F8F"}}>Help Centers</a></p>
              <p><a href="/#" style={{textDecoration: "none", color:"#8F8F8F"}}>FAQs</a></p>
              <p><a href="/suggestion" style={{textDecoration: "none", color:"#8F8F8F"}}>Suggestions</a></p>
            </div>
            <div className="fs-18">
              <h3 className="fs-18 fw-b">
              <a href="/about" style={{textDecoration: "none", color:"#8F8F8F"}}>Company</a></h3>
              <p><a href="/about" style={{textDecoration: "none", color:"#8F8F8F"}}>About</a></p>
            </div>
          </div>
          <div className="row footer-bottom-sm">
            <div className="col-7">
            <h3 className="fs-18 fw-b">
                <a href="/" style={{textDecoration: "none", color:"#8F8F8F"}}>Marketplace</a></h3>
                <p><a href="/" style={{textDecoration: "none", color:"#8F8F8F"}}>Nft</a></p>
                <p><a href="/collections-tile" style={{textDecoration: "none", color:"#8F8F8F"}}>Collections</a></p>
            </div>
            <div className="col-5">
            <h3 className="fs-18 fw-b">
                <a href="/leader-board" style={{textDecoration: "none", color:"#8F8F8F"}}>Leaderboard</a></h3>
                <p><a href="/top-seller" style={{textDecoration: "none", color:"#8F8F8F"}}>Top Seller</a></p>
                <p><a href="/top-bidder" style={{textDecoration: "none", color:"#8F8F8F"}}>Top Bidder</a></p>
                <p><a href="/top-collection" style={{textDecoration: "none", color:"#8F8F8F"}}>Top Collections</a></p>
            </div>
            <div className="col-7 mt-3">
              <h3 className="fs-18 fw-b">Community</h3>
              <p><a href="/help-center" style={{textDecoration: "none", color:"#8F8F8F"}}>Help Centers</a></p>
              <p><a href="/#" style={{textDecoration: "none", color:"#8F8F8F"}}>FAQs</a></p>
              <p><a href="/suggestion" style={{textDecoration: "none", color:"#8F8F8F"}}>Suggestions</a></p>
            </div>
            <div className="col-5 mt-3">
            <h3 className="fs-18 fw-b">
              <a href="/about" style={{textDecoration: "none", color:"#8F8F8F"}}>Company</a></h3>
            <p><a href="/about" style={{textDecoration: "none", color:"#8F8F8F"}}>About</a></p>
            </div>
          </div>
        </div>          
      </div>
    </>
  );
}

export default Footer;
