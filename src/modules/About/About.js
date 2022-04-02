import React, { useEffect, useState } from "react";
import { getAboutData } from "../../services/contentMicroservice";
import axios from "axios";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { BASE_URL2, WHITE_LABEL_TOKEN } from "../../reducers/Constants";
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
      {/* <div className="container">
        <div className="text-center mt-5 ml-0 mr-0">
          <p className="font-32 font-weight-700">{aboutData.title}</p>
          <p className="font-16 mt-4">
            {
              // aboutData.description
              "Anafto is an NFT Marketplace for the new age decentralised world. The Anafto tribe can create NFTs on this dedicated marketplace to showcase their Art or they can choose to sell their NFTs. NFTs of any category can be listed on this platform. So, what are you waiting for .... Go Mint,Sell, Buy and Explore... Happy NFTing."
            }
          </p>
        
          <h6 className="font-18 font-weight-700 mt-4">
            NFT marketplace in numbers
          </h6>
        </div>
      </div>
      <div className="container">
        <div className="row text-center mt-5">
          <div className="col-sm-3"></div>
          <div className="col-sm-2 col-12">
            <p className="text-primary font-weight-700 font-22 ">$274M</p>
            <p className="font-16">Trading volume</p>
          </div>
          <div className="col-sm-2 col-12">
            <p className="text-primary font-weight-700 font-22">405K</p>
            <p className="font-16">NFTs created</p>
          </div>
          <div className="col-sm-2 col-12">
            <p className="text-primary font-weight-700 font-22">1.6M</p>
            <p className="font-16">Total users</p>
          </div>
          <div className="col-sm-3"></div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div
              className="card cardmob"
              style={{ borderRadius: "7px", width: "300px" }}
            >
              <h6 className="text-center font-14 font-weight-700 mt-2">
                <MailOutlineIcon
                  style={{ fontSize: "35px" }}
                  className="text-primary"
                />
                Contact Us:{" "}
                <a href="">
                  {
                    // aboutData.contactEmail
                    "hello@anafto.com"
                  }
                </a>
              </h6>
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div> */}

<div style={{maxWidth:"100%",textAlign:"center",width:"100%",height:"auto",margin:"0 auto"}}>
        <div className="Heading Tag" style={{maxWidth:"100%",width: "49%",margin: "0 auto",marginTop:"90px"}}>
          <h2 style={{font: "normal normal bold 32px/48px Poppins"}}>About NFT marketplace</h2>
          <p style={{width:"39%%",margin:"0 auto"}}> Anafto is an NFT Marketplace for the new age decentralised world. The Anafto tribe can create NFTs on this dedicated marketplace to showcase their Art or they can choose to sell their NFTs. NFTs of any category can be listed on this platform. So, what are you waiting for .... Go Mint,Sell, Buy and Explore... Happy NFTing.</p>
        </div>
        <div className="Marketplace" >
          <h6 style={{fontWeight:"bold",fontSize:"18px",marginTop:"42px",font:"normal normal bold 18px/27px Poppins;"}}>NFT marketplace in numbers</h6>
          <div className="container">
        <div className="row text-center mt-5">
          <div className="col-sm-3"></div>
          <div className="col-sm-2 col-12">
            <p className="text-primary font-weight-700 font-22 ">$274M</p>
            <p className="font-16">Trading volume</p>
          </div>
          <div className="col-sm-2 col-12">
            <p className="text-primary font-weight-700 font-22">405K</p>
            <p className="font-16">NFTs created</p>
          </div>
          <div className="col-sm-2 col-12">
            <p className="text-primary font-weight-700 font-22">1.6M</p>
            <p className="font-16">Total users</p>
          </div>
          <div className="col-sm-3"></div>
        </div>
        <div className="row mt-5">
          {/* <div className="col-sm-4"></div> */}
          <div className="col-sm-4" style={{margin: "0 auto" ,
              border: "1px solid #D5D5D5",
              borderRadius: "7px",
              width: "27.5%",
          // paddingLeft: "5%",
          }}>
            <div
              className="card cardmob"
              style={{ borderRadius: "7px"
              // 
             }}
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
                    // aboutData.contactEmail
                    "hello@anafto.com"
                  }
                 
                </a>
                </span>
              </h6>
            </div>
          </div>
          {/* <div className="col-sm-4"></div> */}
        </div>
      </div>

         
        </div>
      </div>
    </>
  );
}

export default About;
