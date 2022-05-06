import React, { useState } from "react";
import "../../assets/styles/Notification.css";
import { addEmail } from "../../services/UserMicroService";
import discordIcon from "../../assets/images/discord.svg";
import hoverDiscord from "../../assets/images/hoverDiscord.svg";
import instaIcon from "../../assets/images/insta.svg";
import hoverInsta from "../../assets/images/hoverInsta.svg";
import { toast } from "react-toastify";
import HoverImage from "react-hover-image";
import {version} from "../../version.js"

function Footer() {
  let [email, setEmailError] = useState("");
  let [displayTimeout, setDisplayTimeout] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const AddEmail = () => {
    const { email } = formData;

    if (email == "") {
      setEmailError("( Please Enter E-mail )");
      setDisplayTimeout(true);
      setTimeout(() => {
        setDisplayTimeout(false);
      }, 4000);

      // toast.error("Fill The Field");
      return null;
    }
    const checkMail = validateEmail(email);
    if (!checkMail) {
      setEmailError(" ( Invalid Email please check)");
      setDisplayTimeout(true);
      setTimeout(() => {
        setDisplayTimeout(false);
      }, 4000);

      //toast.error("Invalid Email");
      return null;
    }
    addEmail(formData, (res) => {
      toast.success("Email added successfully");
      setFormData({ email: "" });
    });
  };
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div
        className="container-fluid footer-main-cont"
        style={{
          color: "#8F8F8F",
          backgroundColor: "#FBFBFB",
          width: "100%",
          paddingLeft: "6.7%",
          paddingRight: "6.7%",
        }}
      >
        <div className="row footer-cont">
          <div className="footer-top">
            <p className="fs-18">Join our community</p>
            <div className="allicon">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="footerAnchor"
              >
                <HoverImage
                  src={instaIcon}
                  hoverSrc={hoverInsta}
                  className="Icon"
                />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                className="footerAnchor"
              >
                <i className="fab fa-twitter  Icon twittericon"></i>
              </a>
              <a
                href="https://www.reddit.com/"
                target="_blank"
                className="footerAnchor"
              >
                <i className="fab fa-reddit  Icon hideicon "></i>
              </a>
              <a
                href="https://telegram.org/"
                target="_blank"
                className="footerAnchor"
              >
                <i className="fab fa-telegram  Icon hideicon"></i>
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="footerAnchor"
              >
                <i class="fa-brands fa-facebook-f Icon"></i>
              </a>
              <a
                href="https://www.linkedin.com/feed/"
                target="_blank"
                className="footerAnchor"
              >
                <i className="fab fa-linkedin  Icon hideicon"></i>
              </a>
              <a
                href="https://discord.com/"
                target="_blank"
                className="footerAnchor"
              >
                <HoverImage
                  src={discordIcon}
                  hoverSrc={hoverDiscord}
                  className="Icon hideicon discordIcon"
                />
                {/* <i className="fab fa-discord  Icon hideicon"></i> */}
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                className="footerAnchor"
              >
                <i className="fab fa-youtube  Icon hideicon"></i>
              </a>
            </div>
            <div className="mobicon">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="footerAnchor"
              >
                <i class="fa-brands fa-facebook-f Icon"></i>
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                className="footerAnchor"
              >
                <i className="fab fa-twitter  Icon twittericon"></i>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="footerAnchor"
              >
                <i className="fa-brands fa-instagram Icon"></i>
              </a>
            </div>
            <p className="subscribe">
              Subscribe to our newsletter for the latest NFTs
            </p>
            <div
              className="input-group-lg input-group  footerinputbox"
              style={{ marginBottom: displayTimeout ? "15px" : "37px" }}
            >
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
                    zIndex: "0",
                  }}
                >
                  {" "}
                  Submit
                </button>
              </div>
            </div>
            <div
              style={{
                fontsize: "10px",
                color: "red",
                display: displayTimeout ? "block" : "none",
                marginBottom: "15px",
              }}
            >
              {email}
            </div>
            <h3 className="about">
              <a className="aboutText" href="/about">
                About Anafto's Marketplace
              </a>
            </h3>
            <div className="d-none d-sm-none d-md-block d-lg-block fs-16 aboutdes">
              <p style={{ marginBottom: "0", cursor: "default" }}>
              Anafto is a decentralized NFT marketplace for new-age NFT enthusiasts. Users can easily create, buy, sell, store, and manage their NFTs on Anafto. Explore the marketplace and start trading your valuable digital assets.{" "}
              </p>
            </div>
            <div className="d-sm-block d-md-none d-lg-none fs-16">
              <p className=" footerdes">
              Anafto is a decentralized NFT marketplace for new-age NFT enthusiasts. Users can easily create, buy, sell, store, and manage their NFTs on Anafto. Explore the marketplace and start trading your valuable digital assets.
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <div>
              <div
                className="fs-18 d-flex flex-column"
                style={{ color: "#8F8F8F" }}
              >
                <a href="/nfts" className="footertitle">
                  Marketplace
                </a>
                <a href="/nfts" className="footersubtitle">
                  NFT
                </a>
                <a href="/collections-tile" className="footersubtitle">
                  Collections
                </a>
              </div>
              <div className="fs-18 d-flex flex-column">
                <a href="/leader-board" className="footertitle">
                  Leaderboard
                </a>
                <p>
                  <a href="/top-seller" className="footersubtitle">
                    Top Seller
                  </a>
                </p>
                <p>
                  <a href="/top-bidder" className="footersubtitle">
                    Top Buyer
                  </a>
                </p>
                <p>
                  <a href="/top-collection" className="footersubtitle">
                    Top Collections
                  </a>
                </p>
              </div>
            </div>
            <div className="fs-18 d-flex flex-column">
              <a href="/help-center" className="footertitle">
                Community
              </a>
              <p>
                <a href="/help-center" className="footersubtitle">
                  Help Centers
                </a>
              </p>
              <p>
                <a href="/FAQs" className="footersubtitle">
                  FAQs
                </a>
              </p>
              <p>
                <a href="/suggestion" className="footersubtitle">
                  Suggestions
                </a>
              </p>
              <p>
                <a href="/blogs" className="footersubtitle">
                  Blogs
                </a>
              </p>
            </div>
            <div className="fs-18 d-flex flex-column">
              <a href="/about" className="footertitle">
                Company
              </a>
              <p>
                <a href="/about" className="footersubtitle">
                  About
                </a>
              </p>
              <p>
                <a href="/privacy" className="footersubtitle">
                  Privacy Policy
                </a>
              </p>
              <p>
                <a href="/Terms-Condition" className="footersubtitle">
                  Terms and Conditons
                </a>
              </p>
            </div>
          </div>
          <div className="copyrightDiv">
            <span className="textCopyright">
              &copy;2022 Anafto Marketplace. All Rights Reserved.
            </span>
          </div>
          <div className="version">
            <span className="textversion">
             {version}
            </span>
          </div>
          <div className="row footer-bottom-sm">
            <div className="col-7">
              <h3 className="fs-18 fw-b">
                <a href="/nfts" className="footertitle">
                  Marketplace
                </a>
              </h3>
              <p>
                <a href="/nfts" className="footersubtitle">
                  Nft
                </a>
              </p>
              <p>
                <a href="/collections-tile" className="footersubtitle">
                  Collections
                </a>
              </p>
            </div>
            <div className="col-5">
              <h3 className="fs-18 fw-b">
                <a className="footertitle" href="/leader-board">
                  Leaderboard
                </a>
              </h3>
              <p>
                <a href="/top-seller" className="footersubtitle">
                  Top Seller
                </a>
              </p>
              <p>
                <a href="/top-bidder" className="footersubtitle">
                  Top Buyer
                </a>
              </p>
              <p>
                <a href="/top-collection" className="footersubtitle">
                  Top Collections
                </a>
              </p>
            </div>
            <div className="col-7 mt-3">
              <h3 className="fs-18 fw-b">
                <a className="footertitle" href="/help-center">
                  Community
                </a>
              </h3>
              <p>
                <a href="/help-center" className="footersubtitle">
                  Help Centers
                </a>
              </p>
              <p>
                <a href="/FAQs" className="footersubtitle">
                  FAQs
                </a>
              </p>
              <p>
                <a href="/suggestion" className="footersubtitle">
                  Suggestions
                </a>
              </p>
              <p>
                <a href="/blogs" className="footersubtitle">
                  Blogs
                </a>
              </p>
            </div>
            <div className="col-5 mt-3">
              <h3 className="fs-18 fw-b">
                <a href="/about" className="footertitle">
                  Company
                </a>
              </h3>
              <p>
                <a href="/about" className="footersubtitle">
                  About
                </a>
              </p>
              <p>
                <a href="/about" className="footersubtitle">
                  Privacy Policy
                </a>
              </p>
              <p>
                <a href="/about" className="footersubtitle">
                  Terms and Conditon
                </a>
              </p>
            </div>
            <div className="copyrightDivMob">
              <span className="textCopyrightMob">
                &copy;2022 Anafto Marketplace. All Rights Reserved.
              </span>{" "}
            </div>
            <div className="versionmob">
            <span className="textversionmob">
              {version}
            </span>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
