import React, { useState } from "react";
import "../../assets/styles/Notification.css";
import { addEmail } from "../../services/UserMicroService";
import { ToastContainer } from "react-toastify";
import discordIcon from "../../assets/images/discord.svg"
import { toast } from "react-toastify";

function Footer() {

  const [formData, setFormData] = useState({
    email: "",
  });
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const AddEmail = () => {
    const { email } = formData;
    console.log(formData, "<<<formData");
    if (email == "") {
      toast.error("Fill The Field");
      return null;
    }
    const checkMail = validateEmail(email);
    if (!checkMail) {
      toast.error("Invalid Email");
      return null;
    }
    addEmail(formData, (res) => {
      console.log(res);
      toast.success("Email added successfully");
      setFormData({ email: "" });
    });
  };
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (formData.email != "" && formData.title != "" && formData.detail != "") {

    }
  };



  return (
    <>

      <div className="container-fluid footer-main-cont" style={{ color: "#8F8F8F", backgroundColor: "#FBFBFB", width: "100%", paddingLeft: "6.7%", paddingRight: "6.7%" }}>
        <div className="row footer-cont">
          <div className="footer-top">
            <p className="fs-18">Join our community</p>
            <div className="allicon">
              <a href="https://www.instagram.com/" target="_blank" className="footerAnchor">
              <i className="fa-brands fa-instagram Icon"></i>
              </a>
              <a href="https://twitter.com/" target="_blank" className="footerAnchor">
              <i className="fab fa-twitter  Icon twittericon"></i>
              </a>
              <a href="https://www.reddit.com/" target="_blank" className="footerAnchor">
              <i className="fab fa-reddit  Icon hideicon "></i>
              </a>
             <a href="https://telegram.org/" target="_blank" className="footerAnchor">
             <i className="fab fa-telegram  Icon hideicon"></i>
             </a>
             <a href="https://www.facebook.com/" target="_blank" className="footerAnchor">
             <i class="fa-brands fa-facebook-f Icon"></i>

             </a>
             <a href="https://www.linkedin.com/feed/" target="_blank" className="footerAnchor"><i className="fab fa-linkedin  Icon hideicon"></i></a>
             <a href="https://discord.com/" target="_blank" className="footerAnchor">
               <img src={discordIcon} className="Icon hideicon discordIcon"></img>
               {/* <i className="fab fa-discord  Icon hideicon"></i> */}
               </a>
             <a href="https://www.youtube.com/" target="_blank" className="footerAnchor"><i className="fab fa-youtube  Icon hideicon"></i></a>


             
              
             
              
             
              
            </div>
            <p className="subscribe">Subscribe to our newsletter for the latest NFTs</p>
            <div className="input-group-lg input-group  footerinputbox">
              <input
                type="email"
                name="email"
                className="form-control ib "
                value={formData.email}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                  onClick={AddEmail}
                  className="btn btn-primary submitbuttonfooter"
                  // type="button"
                  id="button-addon2"
                  style={{
                    zIndex: "0"
                  }}
                >
                  {" "}
                  Submit
                </button>
              </div>
            </div>
            <h3 className="about">About Anafto's Marketplace</h3>
            <div className="d-none d-sm-none d-md-block d-lg-block fs-16 aboutdes">
              <p style={{marginBottom:"0"}}>Anafto is an NFT Marketplace for the new age decentralised world. The Anafto tribe can create NFTs on this dedicated marketplace to showcase their Art or they can choose to sell their NFTs. So, what are you waiting for .... Go Mint,Sell, Buy and Explore... Happy NFTing. </p>
            </div>
            <div className="d-sm-block d-md-none d-lg-none fs-16">
              <p className=" footerdes">Anafto is an NFT Marketplace for the new age decentralised world. The Anafto tribe can create NFTs on this dedicated marketplace to showcase their Art or they can choose to sell their NFTs. So, what are you waiting for .... Go Mint,Sell, Buy and Explore... Happy NFTing.</p>
            </div>
          </div>
          <div className="footer-bottom">
            <div>
              <div className="fs-18 d-flex flex-column" style={{ color: "#8F8F8F" }}>

                <a className="footertitle">Marketplace</a>
                <a href="/nfts" className="footersubtitle">NFT</a>
                <a href="/collections-tile" style={{ textDecoration: "none", color: "#8F8F8F", paddingBottom: "19px" }}>Collections</a>
              </div>
              <div className="fs-18 d-flex flex-column">
                <a className="footertitle" >Leaderboard</a>
                <p><a href="/top-seller" className="footersubtitle">Top Seller</a></p>
                <p><a href="/top-bidder" className="footersubtitle">Top Buyer</a></p>
                <p><a href="/top-collection" style={{ textDecoration: "none", color: "#8F8F8F" }} >Top Collections</a></p>
              </div>
            </div>
            <div className="fs-18 d-flex flex-column">
              <a className="footertitle">Community</a>
              <p><a href="/help-center" className="footersubtitle">Help Centers</a></p>
              <p><a href="/FAQs" className="footersubtitle">FAQs</a></p>
              <p><a href="/suggestion" style={{ textDecoration: "none", color: "#8F8F8F" }} >Suggestions</a></p>
            </div>
            <div className="fs-18 d-flex flex-column">
              <a className="footertitle">Company</a>
              <p><a href="/about" style={{ textDecoration: "none", color: "#8F8F8F" }}>About</a></p>
            </div>
          </div>

          <div className="row footer-bottom-sm">
            <div className="col-7">
              <h3 className="fs-18 fw-b">
                <a  style={{ textDecoration: "none", color: "#8F8F8F",cursor:"default" }}>Marketplace</a></h3>
              <p><a href="/nfts" style={{ textDecoration: "none", color: "#8F8F8F" }}>Nft</a></p>
              <p><a href="/collections-tile" style={{ textDecoration: "none", color: "#8F8F8F" }}>Collections</a></p>
            </div>
            <div className="col-5">
              <h3 className="fs-18 fw-b">
                <a style={{ textDecoration: "none", color: "#8F8F8F",cursor:"default" }}>Leaderboard</a></h3>
              <p><a href="/top-seller" style={{ textDecoration: "none", color: "#8F8F8F" }}>Top Seller</a></p>
              <p><a href="/top-bidder" style={{ textDecoration: "none", color: "#8F8F8F" }}>Top Buyer</a></p>
              <p><a href="/top-collection" style={{ textDecoration: "none", color: "#8F8F8F" }}>Top Collections</a></p>
            </div>
            <div className="col-7 mt-3">
              <h3 className="fs-18 fw-b">ComImunity</h3>
              <p><a href="/help-center" style={{ textDecoration: "none", color: "#8F8F8F" }}>Help Centers</a></p>
              <p><a href="/FAQs" style={{ textDecoration: "none", color: "#8F8F8F" }}>FAQs</a></p>
              <p><a href="/suggestion" style={{ textDecoration: "none", color: "#8F8F8F" }}>Suggestions</a></p>
            </div>
            <div className="col-5 mt-3">
              <h3 className="fs-18 fw-b">
                <a style={{ textDecoration: "none", color: "#8F8F8F",cursor:"pointer" }}>Company</a></h3>
              <p><a href="/about" style={{ textDecoration: "none", color: "#8F8F8F" }}>About</a></p>
            </div>
            
          </div>
          
        </div>
        <div style={{textAlign:"center",borderTop:"1px solid #cecdce",width:"100%"}}><span style={{padding:"12px",fontSize:"12px"}}>Copyright ©2022 Anafto Marketplace</span></div>
      </div>
    </>
  );
}

export default Footer;
