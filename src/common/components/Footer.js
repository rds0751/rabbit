import React, { useState } from "react";
import "../../assets/styles/Notification.css";
import { addEmail } from "../../services/UserMicroService";
import discordIcon from "../../assets/images/discord.svg";
import hoverDiscord from "../../assets/images/hoverDiscord.svg";
import instaIcon from "../../assets/images/insta.svg";
import hoverInsta from "../../assets/images/hoverInsta.svg";
import { toast } from "react-toastify";
import HoverImage from "react-hover-image";
import { version } from "../../version.js"
import { useSelector } from "react-redux";
import { fetchPalletsColor } from "../../utility/global"

function Footer() {

  const customize = useSelector(state => state.customize);

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

  const handleMouseOver = (e) => {
    let tempDiv = e.target;
    tempDiv.style.color = fetchPalletsColor(customize.appearance.colorPalette)

  }

  const handleMouseOut = (e) => {
    let tempDiv = e.target;
    tempDiv.style.color = "#818181"
  }

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
              {
                customize.socailMedia.length > 0 ?
                  customize.socailMedia.map((item, index) => (
                    <a key={index} href={item.url} target="_blank" className="footerAnchor">
                      <i className={`fa-brands fa-${item.name.toLowerCase()} Icon`} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} />
                    </a>
                  ))
                  : null
              }
            </div>
            <div className="mobicon">
              {
                customize.socailMedia.length > 0 ?
                  customize.socailMedia.map((item, index) => (
                    <a key={index} href={item.url} target="_blank" className="footerAnchor">
                      <i className={`fa-brands fa-${item.name.toLowerCase()} Icon`} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} />
                    </a>
                  ))
                  : null
              }
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
                  style={{ backgroundColor: `${fetchPalletsColor(customize.appearance.colorPalette)}`, zIndex: "0", border: 'none' }}
                  id="button-addon2"
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
              <a className="aboutText" href="/about" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                {customize.about.title}
              </a>
            </h3>
            <div className="d-none d-sm-none d-md-block d-lg-block fs-16 aboutdes">
              <p style={{ marginBottom: "0", cursor: "default" }} >
                {customize.about.description}
              </p>
            </div>
            <div className="d-sm-block d-md-none d-lg-none fs-16">
              <p className=" footerdes">
                {customize.about.description}
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <div>
              <div
                className="fs-18 d-flex flex-column"
                style={{ color: "#8F8F8F" }}
              >
                <a href="/nfts" className="footertitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Marketplace
                </a>
                <a href="/nfts" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  NFT
                </a>
                <a href="/collections-tile" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Collections
                </a>
              </div>
              <div className="fs-18 d-flex flex-column">
                <a href="/leader-board" className="footertitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Leaderboard
                </a>
                <p>
                  <a href="/top-seller" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                    Top Seller
                  </a>
                </p>
                <p>
                  <a href="/top-bidder" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                    Top Buyer
                  </a>
                </p>
                <p>
                  <a href="/top-collection" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                    Top Collections
                  </a>
                </p>
              </div>
            </div>
            <div className="fs-18 d-flex flex-column">
              <a href="/help-center" className="footertitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                Community
              </a>
              <p>
                <a href="/help-center" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Help Centers
                </a>
              </p>
              <p>
                <a href="/FAQs" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  FAQs
                </a>
              </p>
              <p>
                <a href="/suggestion" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Suggestions
                </a>
              </p>
              <p>
                <a href="/blogs" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Blogs
                </a>
              </p>
            </div>
            <div className="fs-18 d-flex flex-column">
              <a href="/about" className="footertitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                Company
              </a>
              <p>
                <a href="/about" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  About
                </a>
              </p>
              <p>
                <a href="/privacy" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Privacy Policy
                </a>
              </p>
              <p>
                <a href="/Terms-Condition" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
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
                <a href="/nfts" className="footertitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Marketplace
                </a>
              </h3>
              <p>
                <a href="/nfts" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Nft
                </a>
              </p>
              <p>
                <a href="/collections-tile" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Collections
                </a>
              </p>
            </div>
            <div className="col-5">
              <h3 className="fs-18 fw-b">
                <a className="footertitle" href="/leader-board" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Leaderboard
                </a>
              </h3>
              <p>
                <a href="/top-seller" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Top Seller
                </a>
              </p>
              <p>
                <a href="/top-bidder" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Top Buyer
                </a>
              </p>
              <p>
                <a href="/top-collection" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Top Collections
                </a>
              </p>
            </div>
            <div className="col-7 mt-3">
              <h3 className="fs-18 fw-b">
                <a className="footertitle" href="/help-center" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Community
                </a>
              </h3>
              <p>
                <a href="/help-center" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Help Centers
                </a>
              </p>
              <p>
                <a href="/FAQs" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  FAQs
                </a>
              </p>
              <p>
                <a href="/suggestion" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Suggestions
                </a>
              </p>
              <p>
                <a href="/blogs" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Blogs
                </a>
              </p>
            </div>
            <div className="col-5 mt-3">
              <h3 className="fs-18 fw-b">
                <a href="/about" className="footertitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Company
                </a>
              </h3>
              <p>
                <a href="/about" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  About
                </a>
              </p>
              <p>
                <a href="/about" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
                  Privacy Policy
                </a>
              </p>
              <p>
                <a href="/about" className="footersubtitle" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
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
