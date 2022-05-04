import React, { useEffect, useState } from "react";
import { getAboutData } from "../../services/contentMicroservice";
import axios from "axios";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { BASE_URL2, WHITE_LABEL_TOKEN } from "../../reducers/Constants";
import "../../assets/styles/about.css";
const dev_url = "https://goi4mbj86f.execute-api.us-east-1.amazonaws.com/dev/"; // need to store it in .env file

function About() {
  const [aboutData, setAboutData] = useState([]);
  useEffect(() => {
    (async () => {
      const url = `${dev_url}api/v1/about/61f7b7a4c017de6244c51144`;
      const { data } = await axios.get(url);
      console.log(data, "<<<in about page");
      setAboutData(data.responseData.about);
    })();
    console.log(localStorage.getItem(WHITE_LABEL_TOKEN), "<<<this is token");
    // return () => {};
  }, []);
  return (
    <>
      <div className="mainDiv" >
        <div className="HeadingTag">
          <h2>About NFT marketplace</h2>
        </div>
        <p className="titleAbout"> Anafto is an NFT Marketplace for the new age decentralised world. The Anafto tribe can create NFTs on this dedicated marketplace to showcase their Art or they can choose to sell their NFTs. NFTs of any category can be listed on this platform. So, what are you waiting for .... Go Mint,Sell, Buy and Explore... Happy NFTing.</p>
        <div className="Marketplace" >
          <h6  className="marketplaceText">NFT marketplace in numbers</h6>
          <div className="container">
        <div className="descriptionTag">
          {/* <div clasName="col-sm-3"></div> */}
          <div className="first-div ">
            <p className="valueText">$274M</p>
            <p className="TitleText">Trading volume</p>
          </div>
          <div className="second-div ">
            <p className="valueText">405K</p>
            <p className="TitleText">NFTs created</p>
          </div>
          <div className="third-div ">
            <p className="valueText">1.6M</p>
            <p className="TitleText">Total users</p>
          </div>
          {/* <div className="col-sm-3"></div> */}
        </div>
        <div className="row mt-5">
          {/* <div className="col-sm-4"></div> */}
          <div className="col-sm-4 maincard">
            <div
              className="card cardmob"
            >
              <h6 className="text-center font-14 font-weight-700 mt-2">
                <MailOutlineIcon
                  style={{ fontSize: "35px" }}
                  className="text-primary"
                />
                Contact Us:{" "}
                <span>
                <a href="">
                  {
                    "hello@anafto.com"
                  }
                </a>
                </span>
              </h6>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </>
  );
}

export default About;
