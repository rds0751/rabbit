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
import { CheckUserByWalletAddress } from "../../services/UserMicroService";
import Utils from "../../utility";
import {
  getTenantByWallet,
  createSubDomain,
  getTenant,
} from "../../services/clientConfigMicroService";
import "../../assets/styles/homepage.css";

const FooterSection = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  background: #172738 0% 0% no-repeat padding-box;
  opacity: 1;
  padding: 74px 73px;
`;

const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const MarketPlaceDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
`;
const NameText = styled.label`
  text-align: left;
  font: normal normal normal 42px/48px Whiskey Girls Condensed;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  cursor: pointer;
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
`;
const OtherDetails = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-around;
`;
const FirstDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;
const HeadingFooter = styled.p`
  text-align: left;
  cursor: pointer;
  font: normal normal bold 18px/27px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
`;
const ParaText = styled.p``;
const Link = styled.a`
  text-align: left;
  font: normal normal normal 18px/27px Poppins;
  letter-spacing: 0px;
  cursor: pointer;
  color: #e0e0e0;
  text-decoration: none;
`;
const SecondDiv = styled.div``;
const ThirdDiv = styled.div``;

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
`;
const Footer = () => {
  const navigate = useNavigate();

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

  

  const checkTenant = async (address) => {
    const [error, result] = await Utils.parseResponse(
      getTenantByWallet(address)
    );
    if (error || !result)
      return Utils.apiFailureToast("Tenant Data is not fetched");
    if (!result.success) {
      console.log(result);
      setModal(true);
    } else if (result.success) {
      console.log(result);
      window.open(result.responseData.siteUrl,'_blank');
     // return Utils.apiSuccessToast("");
    }
  };


  const MetaMaskConnector = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccount) => {
          const address = newAccount[0];
          setTenant({ ...tenantData, wallet: address });
          Newaddress = newAccount[0];
          console.log(address, "<<<address");
          localStorage.setItem("walletAddress", address);

          window.ethereum
            .request({ method: "eth_getBalance", params: [address, "latest"] })
            .then((wallet_balance) => {
              const balance = ethers.utils.formatEther(wallet_balance);

              dispatch(
                AddWalletDetails({
                  address,
                  balance,
                })
              );
              CheckUserByWalletAddress(address, (res) => {
                dispatch(addUserData(res));
                localStorage.setItem("WHITE_LABEL_TOKEN", res.token);
              });
            });
          if (address) {
            const data = checkTenant(address);
          }
        })
        .catch((e) => {
          setModal(false);
          Utils.apiFailureToast("Please connect with metamask");
        });
    } else {
      Utils.apiFailureToast("Please connect with metamask");
    }

    //  setModal(true);
  };

  const createStore = async () => {
    const [error, result] = await Utils.parseResponse(getTenant(tenantData));
    console.log(error, result, "error result");

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

      if (domainResult.responseCode === 403)
        Utils.apiFailureToast(domainResult.message);
      else if (domainResult.success) {
        setModal(false);
        window.open(domainResult.responseData.siteUrl,'_blank');
      }
    }

    // navigate(url + getParamTenantId());
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
              <Link>About Us</Link>
            </ParaText>
            <ParaText>
              <Link>Pricing</Link>
            </ParaText>
          </FirstDiv>
          <SecondDiv>
            <HeadingFooter>Resource</HeadingFooter>
            <ParaText>
              <Link>Help Center</Link>
            </ParaText>
            <ParaText>
              <Link>FAQs</Link>
            </ParaText>
            <ParaText>
              <Link>Suggestions</Link>
            </ParaText>
          </SecondDiv>
          <ThirdDiv>
            <FooterCreateStore onClick={()=>MetaMaskConnector()}>Create Store</FooterCreateStore>
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
                          {walletAddress?.address}
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
    <hr style={{color:"red",background:"grey",position:"absolute",width:"100%"}}></hr>
    <div className="copyrightDiv newHomeCopyright" style={{ background: " #172738 ",paddingLeft:"4.4rem"}}>
      <span className="textCopyright newHome" style={{ color: " #e0e0e0 " }}>
        &copy;2022 NFTinger All Rights Reserved.
      </span>
    </div>
    </>
    
  );
};

export default Footer;
