import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { ethers } from "ethers";
import styled from "styled-components";
import "../../assets/styles/nftReportModal.css";
import OwlCarousel from "react-owl-carousel";
import { useNavigate } from "react-router-dom";
import { getParamTenantId } from "../../utility/global";
import { useSelector, useDispatch } from "react-redux";
import {
  AddWalletDetails,
  ManageWalletSideBar,
  addUserData,
  RedirectTo,
  ManageNotiSideBar,
} from "../../reducers/Action";
import Spinner from "../../common/components/Spinner";
import { CheckUserByWalletAddress } from "../../services/UserMicroService";
import Utils from "../../utility";
import {
  getTenantByWallet,
  createSubDomain,
  getTenant,
} from "../../services/clientConfigMicroService";
import "../../assets/styles/homepage.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

const FooterSection = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  background: #172738 0% 0% no-repeat padding-box;
  opacity: 1;
  padding: 74px 73px;
  @media only screen and (min-width: 320px) and (max-width: 767px) {
  padding: 16px 11px 93px 16px;

  }
`;

const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    flex-direction: column;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
  }
`;
const MarketPlaceDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 106%;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 66.6%;
  }
`;
const NameText = styled.label`
  text-align: left;
  font: normal normal normal 42px/48px Whiskey Girls Condensed;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  cursor: pointer;
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font: normal normal normal 32px/36px Whiskey Girls Condensed;
  }
`;
const AboutText = styled.label`
  text-align: left;
  font: normal normal normal 18px/27px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`;
const DesText = styled.label`
  text-align: left;
  margin-top: 30px;
  font: normal normal normal 16px/25px Poppins;
  letter-spacing: 0px;
  color: #e0e0e0;
  opacity: 1;
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font: normal normal normal 16px/25px Poppins;
  }
`;
const OtherDetails = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-around;
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    justify-content: flex-start;
    column-gap: 65px;
    margin-top: 19px;
    flex-wrap: wrap;

  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    justify-content: flex-start;
    column-gap: 58px;
    margin-top: 25px;

  }
`;
const FirstDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    flex-basis: 50%;
  }
`;
const HeadingFooter = styled.p`
  text-align: left;
  cursor: pointer;
  font: normal normal bold 18px/27px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
`;
const ParaText = styled.p``;
const LinkText = styled.a`
  text-align: left;
  font: normal normal normal 18px/27px Poppins;
  letter-spacing: 0px;
  cursor: pointer;
  color: #e0e0e0;
  text-decoration: none;
`;
const SecondDiv = styled.div``;
const ThirdDiv = styled.div`
@media only screen and (min-width: 320px) and (max-width: 767px) {
  /* display: none; */
  width: 100%;
}
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    margin-left: 74px;
    flex-basis: 50%;
  }
`;

const FooterCreateStore = styled.button`
  background: #23194200 0% 0% no-repeat padding-box;
  border: 2px solid #ffffff;
  border-radius: 6px;
  font: normal normal medium 16px/25px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  width: 173px;
  height: 40px;
  &:hover{
    background-color: #016dd9;
    color:white;

  }
  @media only screen and (min-width: 320px) and (max-width: 767px) {
  /* display: none; */
  width: 100%;
  font: normal normal medium 16px/25px Poppins;
}
`;
const Hr=styled.div`
    background: grey;
    /* position: absolute; */
    width: 100%;
    height: 1px;
`;
const Footer = () => {
  const navigate = useNavigate();
  const [userData,setUserData]=useState();
  const [modal, setModal] = useState(false);
  const { user, sideBar } = useSelector((state) => state);
  const customize = useSelector((state) => state.customize);
  const [nfts, setNfts] = useState([]);
  const [changeState, setChangeState] = useState(true);
  const dispatch = useDispatch();
  const { userDetails, walletAddress } = user;
  let { loggedInUser } = user;
  let Newaddress;
  const [tenantData, setTenant] = useState({
    storeName: "",
    wallet: "",
  });
  const [loader,setLoader]=useState(true);

   
  useEffect(async ()=>{
    const [error, result] = await Utils.parseResponse(
      getTenantByWallet(tenantData.wallet)
    );
  

  },[userData]);

  const checkTenant = async (address) => {
    const [error, result] = await Utils.parseResponse(
      getTenantByWallet(address)
    );
    if (error || !result)
      return Utils.apiFailureToast("Store not launched");
    if (!result.success) {
      setModal(true);
    } else if (result.success) {
        window.location.replace(result.responseData.siteUrl);
    }
  };

  const MetaMaskConnector = async () => {
  
    if (typeof window.ethereum !== 'undefined') {
    
      try {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      let Newaddress = accounts[0];
      if(!Newaddress || !Newaddress.length){
        Utils.apiFailureToast("Please Login to metamask")
        return ;
      }
      setTenant({ ...tenantData, wallet: Newaddress });

      localStorage.setItem("walletAddress", Newaddress);
      let balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [Newaddress, "latest"],
      });
      const PriceEther = ethers.utils.formatEther(balance);
      dispatch(
        AddWalletDetails({
          Newaddress,
          PriceEther,
        })
      );
      CheckUserByWalletAddress(Newaddress, (res) => {
        dispatch(addUserData(res));
        localStorage.setItem("WHITE_LABEL_TOKEN", res.token);
      });
      if (Newaddress) {
        const data = checkTenant(Newaddress);
      }
    } catch (e) {
       Utils.apiFailureToast("Please login to metamask extension");
      setModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  } 
    else {
      Utils.apiFailureToast("Please login to metamask extension");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  
};

  const createStore = async () => {
    const [error, result] = await Utils.parseResponse(getTenant(tenantData));

    if (result.responseCode === 403) {
      Utils.apiFailureToast(result.message);
    } else if (result.success) {
      let requestData = {
        subdomain: tenantData.storeName,
        tenantId: result.responseData._id,
      };
      const [errorDomain, domainResult] = await Utils.parseResponse(
        createSubDomain(requestData)
      );

      if (errorDomain ||domainResult.responseCode === 403)
        Utils.apiFailureToast(domainResult.message);
      else if (domainResult.success) {
        setUserData(domainResult.responseData);
        setModal(false);
        window.location.replace(domainResult.responseData.siteUrl);
      }
    }
  };
  return (
    <>
    <FooterSection>
      <FooterDiv>
        <MarketPlaceDetail>
          <NameText onClick={()=>navigate("/")}>NFTinger</NameText>
          {/* <AboutText>About DLT NFT marketplace</AboutText> */}
          <DesText>
            NFTinger is a B2B Saas to launch their own white-label NFT store or
            NFT marketplace without any technical knowledge.
          </DesText>
        </MarketPlaceDetail>
        <OtherDetails>
          <FirstDiv>
            <HeadingFooter>Company</HeadingFooter>
            <ParaText>
            <Link className="link-footer"to="about">About Us</Link>
            </ParaText>
            <ParaText>
              <LinkText>Pricing</LinkText>
            </ParaText>
          </FirstDiv>
          <SecondDiv>
            <HeadingFooter>Resource</HeadingFooter>
            <ParaText>
             <Link className="link-footer"to="help-center">Help Center</Link>
            </ParaText>
            <ParaText>
            <Link className="link-footer"to="FAQs">FAQs</Link>
            </ParaText>
            <ParaText>
            <Link className="link-footer"to="suggestion">Suggestions</Link>
            </ParaText>
          </SecondDiv>
          <ThirdDiv>
            <FooterCreateStore onClick={()=>MetaMaskConnector()}>
              Create Store
            </FooterCreateStore>
          </ThirdDiv>

        </OtherDetails>
      </FooterDiv>
      <div
          className="report-outer"
          style={{ display: `${modal ? "block" : "none"}` }}
        >
          <div className="report-abs-modal new-abs-modal">
            <div className="report-modal NewHomeCard">
              <div className="report-inner" style={{ opacity: "1" }}>
                <div className="reportthisitem">
                  <h3 className="report-text poppins-normal newhometext">
                    Launch Store for free
                  </h3>
                  <i
                    className="fa-solid fa-xmark cross-icon"
                    onClick={() => setModal(false)}
                  ></i>
                </div>
                <div className="singlerowmodal">
                  <div className="input-price">
                    <label
                      htmlFor="price"
                      className=" input-label newhomelabel"
                    >
                      Your Address
                    </label>

                    <div className="input-group">
                      <div className="Address">
                        <label className="WalletAddress">
                        {tenantData.wallet}
                        </label>
                      </div>
                    </div>
                    <label
                      htmlFor="price"
                      className=" input-label newhomelabel"
                    >
                      Your Store/Marketplace name
                    </label>

                    <div className="input-group sitediv">
                      <div className="">
                        <input
                          type="text"
                          className="Address"
                          onChange={(e) =>
                            setTenant({
                              ...tenantData,
                              storeName: e.target.value,
                            })
                          }
                          style={{ color: "white" }}
                        ></input>
                      </div>
                      <label className="siteurl">.NFTinger.com</label>
                    </div>

                    <label className="lastLabel">
                      This is the url your customer will use to visit the
                      store/marketplace
                    </label>
                  </div>
                </div>
                <button
                  className="btn btn-primary report-btn NewHomeButton"
                  onClick={() => createStore()}
                  //  style={{background: `${fetchPalletsColor(appearance?.colorPalette)}`}}
                >
                  Create Store
                </button>
              </div>
            </div>
          </div>
        </div>
    </FooterSection>
    <Hr></Hr>
    {/* <hr style={{color:"red",background:"grey",position:"absolute",width:"100%"}}></hr> */}
    <div className="copyrightDiv newHomeCopyright" style={{ background: " #172738 "}}>
      <span className="textCopyright newHome" style={{ color: " #e0e0e0 " }}>
        &copy; 2022 NFTinger.All Rights Reserved.
      </span>
    </div>
    </>
    
  );
};

export default Footer;
