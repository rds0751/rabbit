import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { ethers } from "ethers";
import styled from "styled-components";
import "../../assets/styles/nftReportModal.css";
import OwlCarousel from "react-owl-carousel";
import { useNavigate } from "react-router-dom";
import { getParamTenantId } from "../../utility/global";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getNFtsData } from "../../services/webappMicroservice";
import Spinner from "../../common/components/Spinner";
import Admin, {
  Ball,
  Bear,
  BinanceBlockchain,
  CardImg,
  Collectivables,
  CrossChain,
  Customer,
  customisable,
  Ethereum,
  ethereumIcon,
  infrastructure,
  invisible,
  marketplace,
  MetaFox,
  Music,
  NFTBuying,
  Paint,
  Polygon,
  Security,
  StepGrowth,
  StepStore,
  StepWallet,
  StoreApi,
  StoreFrontSetting,
  Utility,
  WarriorMonk,
  Water,
} from "../../common/newHomeImages";

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
  createSubsription,
} from "../../services/clientConfigMicroService";
import "../../assets/styles/homepage.css";
import { storeConstants } from "../../constants";

const MainDiv = styled.div`
  background: #031527 0% 0% no-repeat padding-box;
`;

const FirstSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CommonSection = styled.div`
  margin-top: 154px;
`;

const Image = styled.img``;

const BottomSection = styled.div`
  width: 100%;
  height: auto;
  background: #031527 0% 0% no-repeat padding-box;
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LabelText = styled.label`
  text-align: center;
  font: normal normal 600 54px/81px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
`;

const CardDiv = styled.div`
  width: 16.9vw;
  height: 381px;
  /* UI Properties */
  background: #253c54 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
  display: flex;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;
const MainCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 123%;
  margin-top: 67px;
`;
const Title = styled.label`
  text-align: center;
  font: normal normal 600 18px/27px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`;
const SubTitle = styled.label`
  text-align: center;
  font: normal normal normal 0.95vw/32px Poppins;
  letter-spacing: 0px;
  color: #f0f0f0;
  opacity: 1;
  margin-top: 1rem;
`;

const HeadTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CommonText = styled.label`
  text-align: center;
  font: normal normal 600 54px/81px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
  opacity: 1;
`;
const TitleSecond = styled.label`
  text-align: center;
  font: normal normal 600 54px/81px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
  opacity: 1;
`;
const ExperienceText = styled.label`
  text-align: left;
  margin-top:  2.65rem;
  margin-bottom: 6.42rem;
  font: normal normal normal 1.15vw/33px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
  opacity: 1;
`;

const OfferCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 118px;
`;
const OfferCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  margin-right: 6.07rem;
  height: 150px;
  background: #19293a 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
`;
const OfferName = styled.label`
  text-align: left;
  font: normal normal normal 18px/27px Poppins;
  letter-spacing: 0px;
  margin-top: 1.5rem;
  color: #e8e8e8;
  opacity: 1;
`;

const BlockchainSection = styled.div`
  background: #19293a 0% 0% no-repeat padding-box;
  margin-top: 321px;
  opacity: 1;
  width: 100%;
  height: 690px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const BlockchainsDiv = styled.div`
  margin-top: 95px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;
const Blockchain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BlockchainText = styled.div`
  text-align: left;
  margin-top: 32px;
  font: normal normal 600 22px/32px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
  opacity: 1;
`;
const StoreFrontPage = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin-top: 95px;
`;
const StoreFrontDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 20%;
`;
const StoreFrontName = styled.label`
  text-align: center;
  font: normal normal 600 18px/27px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
  opacity: 1;
`;
const DesStoreFrontDiv = styled.label`
  text-align: left;
  font: normal normal normal 0.95vw/27px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
  opacity: 1;
`;
const StoreButton = styled.button`
  margin-top: 6.8rem;
  background: #016dd9 0% 0% no-repeat padding-box;
  border-radius: 12px;
  border: none;
  opacity: 1;
  width: 216px;
  height: 54px;
  font: normal normal medium 18px/27px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  &:hover {
    background: white 0% 0% no-repeat padding-box;
    color: blue;
  }
`;
const StepDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 149px;
`;
const StepDivSecond = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  margin-top: 149px;
`;
const StepImageDiv = styled.div`
  margin-right: 150px;
`;
const StepDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 43px;
`;
const StepTitle = styled.label`
  text-align: center;
  font: normal normal 600 40px/60px Poppins;
  letter-spacing: 0px;
  color: #f0f0f0;
  opacity: 1;
`;
const StepDes = styled.label`
  text-align: left;
  font: normal normal normal 1.15vw/32px Poppins;
  letter-spacing: 0px;
  color: #f0f0f0;
  margin-top: 38px;
  opacity: 1;
`;

const StepCreateStore = styled.button`
  /* padding: 16px 53px 13px 51px; */
  border: none;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
  margin-top: 46px;
  width: 216px;
  height: 54px;

  &:hover {
    background-color: #016dd9;
    color: white;
  }
`;
const How = styled.label`
  text-align: center;
  font: normal normal 600 16px/25px Poppins;
  letter-spacing: 0px;
  color: #016dd9;
  opacity: 1;
`;

const SubMainDiv = styled.div``;
const NFTDetails = styled.div`
  background: #041628 0% 0% no-repeat padding-box;
  border-radius: 0px 6px 6px 0px;
  position: absolute;
  padding: 10px;
  top: 78.8%;
`;
const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const NamePrice = styled.label`
  text-align: center;
  font: normal normal normal 1.1rem/27px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`;

const Symbol = styled.div``;
const Currency = styled.label``;
const CurrencyPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 5px;
`;
const Number=styled.label`
color: #016DD9;
`;

const HomeCard = () => {
  const [modal, setModal] = useState(false);
  const { user, sideBar } = useSelector((state) => state);
  const customize = useSelector((state) => state.customize);
  const [nfts, setNfts] = useState([]);
  const [changeState, setChangeState] = useState(true);
  const dispatch = useDispatch();
  const { userDetails, walletAddress } = user;
  let { loggedInUser } = user;
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [tenantData, setTenant] = useState({
    storeName: "",
    wallet: "",
    blockchains: ["Polygon", "Ethereum", "Binance"],
  });


  const data = [
    {
      image: customisable,
      title: "Fully customisable",
      subtitle:
        "Our platform offers user end to end customisation opportunity where user can customise according to their business needs",
    },
    {
      image: Customer,
      title: "Customer centric approach",
      subtitle:
        "NFTinger is super easy for anyone as it subtracts the the complexities of",
    },
    {
      image: Security,
      title: "Reliable Security",
      subtitle:
        "Our platform offers user end to end customisation opportunity where user can customise according to their business needs",
    },
    {
      image: CrossChain,
      title: "Cross-chain support",
      subtitle:
        "Our platform offers user end to end customisation opportunity where user can customise according to their business needs",
    },
  ];

  const offer = [
    {
      img: Paint,
      name: "Art",
    },
    {
      img: Ball,
      name: "Sports",
    },
    {
      img: CardImg,
      name: "Trading Cards",
    },
    {
      img: CardImg,
      name: "Photography",
    },
    {
      img: Collectivables,
      name: "Collectibles",
    },
    {
      img: Utility,
      name: "Utility",
    },
    {
      img: Music,
      name: "Music",
    },
  ];

 

  useEffect(async () => {
    const [error, result] = await Utils.parseResponse(
      getTenantByWallet(tenantData.wallet)
    );
  }, [userData]);

  const checkTenant = async (address) => {
    setLoader(true);
    const [error, result] = await Utils.parseResponse(
      getTenantByWallet(address)
    );
    if (error || !result) {
      setLoader(false);
      return Utils.apiFailureToast("Store not launched.");
    }
    if (!result.success) {
      setLoader(false);
      setModal(true);
    } else if (result.success) {
      setTimeout(() => {
        setLoader(false);
        window.location.replace(result.responseData.siteUrl);
      }, 5000);
    }
  };

  const MetaMaskConnector = async () => {
    try {
      if (window.ethereum) {
        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        let Newaddress = accounts[0];
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
      } else {
        Utils.apiFailureToast("Please connect your metamask wallet");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (e) {
      setModal(false);
      Utils.apiFailureToast("Please connect your metamask wallet");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const storeValidation = (storeName) => {
    var format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;
    if (format.test(storeName)) {
      setErrorMsg("(No Special Character Allowed.)");
      return false;
    } else if (storeName.length === 0) {
      setErrorMsg("Store Name is required.");
      return false;
    } else if (storeName.length < 3) {
      setErrorMsg("Store Name should be atleast 3 characters.");
      return false;
    }else if (storeName.length > 25) {
      setErrorMsg("Store Name cannot be grater than 25 characters.");
      return false;
    } 
     else {
      setErrorMsg("");
      return true;
    }
  };

  const createStore = async () => {

    let validation=storeValidation(tenantData.storeName);
    if(validation){
      const [error, result] = await Utils.parseResponse(getTenant(tenantData));

      if (result.responseCode === 403) {
        setLoader(false);
        // Utils.apiFailureToast(storeConstants.ALREADY_EXIST_STORE_NAME );
        setErrorMsg(storeConstants.ALREADY_EXIST_STORE_NAME);
      } else if (result.success) {
        let requestData = {
          subdomain: tenantData.storeName,
          tenantId: result.responseData._id,
        };
        const [errorDomain, domainResult] = await Utils.parseResponse(
          createSubDomain(requestData)
        );
  
        if (domainResult.responseCode === 403) {
          setLoader(false);
          // Utils.apiFailureToast(storeConstants.ALREADY_EXIST_STORE_NAME);
          setErrorMsg(storeConstants.ALREADY_EXIST_STORE_NAME);
        } else if (domainResult.success) {
          let subreqData = {
            planName: "Free",
            billingCycle: "monthly",
            price: 0,
            tenantId: domainResult?.responseData?._id,
            walletAddress: domainResult?.responseData?.wallet,
            features: [
              "Admin Portal",
              "Multiple Blockchain Support",
              "Multi File Formats",
              "Filter And Ranking",
              "Lazy Minting",
              "Social Media Sharing",
            ],
          };
          const [error, result] = await Utils.parseResponse(
            createSubsription(subreqData)
          );
  
          if (error || !result) {
            Utils.apiFailureToast(error);
            setLoader(false);
            setModal(false);
            return;
          } else if (result.responseCode === 403) {
            Utils.apiFailureToast(result.message);
            setLoader(false);
            setModal(false);
            return;
          } else {
            setLoader(true);
            setModal(false);
            setUserData(domainResult.responseData);
            setTimeout(() => {
              setLoader(false);
              window.location.replace(domainResult.responseData.siteUrl);
            }, 5000);
          }
        }
      }

    }
    else {
      //scroll
    }
   
  };
  const handleInputChange = (evt) => {
    const value = evt.target.value.trim().replaceAll(" ", "");

    setTenant({
      ...tenantData,
      storeName: value,
    });
    setErrorMsg("");
  };

  return (
    <>
      <MainDiv>
        <SubMainDiv>
          <div className="homepage">
            <div className="banner newbanner">
              <div className="inner-width">
                <Container fluid>
                  <Row>
                    <Col lg={6}>
                      <div className="left-text  new-home-left-touch">
                        <h1 className="heading newHomeHeading">
                          Launch your NFT Marketplace in a minute
                        </h1>
                        <p className="mob-heading">
                          "Buy, Trade and Sell your NFTs"
                        </p>

                        <p className="text newhometext">
                          Just connect your Metamask wallet to launch your
                          store. No Coding knowledge required.
                        </p>
                        <div style={{ display: "flex" }}>
                          <Button
                            //onClick={() => createHandle(customize.appearance.buttons)}
                            variant="custom connect"
                            className={`button-hide second`}
                            onClick={() => MetaMaskConnector()}
                          >
                            {loader ? <Spinner></Spinner> : ""}
                            <Image
                              src={MetaFox}
                              style={{ marginRight: "5px" }}
                            ></Image>
                            {`${
                              localStorage.getItem("has_wallet") === "false"
                                ? "connect to Wallet"
                                : "Launch your store"
                            }`}
                          </Button>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6} className="carousel-hide">
                      <div className="right-slider">
                        <OwlCarousel
                          className="owl-theme z-carousel"
                          margin={10}
                          items={1}
                        >
                          <div className="item">
                            <div className="d-flex flex-wrap column-gap-20">
                              <Card className="NewHomeNFTCard">
                                <div className="homePageContainer">
                                  {/* <NFTDetails>
                                    <Details>
                                      <NamePrice>Holy bear</NamePrice>
                                      <CurrencyPrice>
                                        <NamePrice>0.13 ETH</NamePrice>
                                      </CurrencyPrice>
                                    </Details>
                                  </NFTDetails> */}
                                  <Card.Img
                                    variant="top"
                                    className={`newhomecard`}
                                    src={WarriorMonk}
                                  />
                                </div>
                              </Card>
                              <Card className="NewHomeNFTCard">
                                <div className="homePageContainer">
                                  <Card.Img
                                    variant="top"
                                    className={`newhomecard`}
                                    src={Bear}
                                  />
                                </div>
                              </Card>
                              <Card className="NewHomeNFTCard">
                                <div className="homePageContainer">
                                  <Card.Img
                                    variant="top"
                                    className={`newhomecard`}
                                    src={Water}
                                  />
                                </div>
                              </Card>
                              <Card className="NewHomeNFTCard">
                                <div className="homePageContainer">
                                  <Card.Img
                                    variant="top"
                                    className={`newhomecard`}
                                    src={invisible}
                                  />
                                </div>
                              </Card>
                            </div>
                          </div>
                        </OwlCarousel>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>

          {/* <NFTCardDiv>
            <BannerImage
              style={{ background: `url(images/BannerImage.svg)` }}
            ></BannerImage>
            <NFTMiddleDiv>
              <NFTFirstDiv></NFTFirstDiv>
              <NFTSecondDiv></NFTSecondDiv>
            </NFTMiddleDiv>
          </NFTCardDiv> */}
        </SubMainDiv>

        <BottomSection>
          <FirstSection>
            <LabelText>
              Why use <span style={{ color: "#016dd9" }}>NFTinger</span>
            </LabelText>

            <MainCardDiv>
              {data.map((ele) => (
                <CardDiv>
                  <Cards>
                    <Image src={ele.image}></Image>
                    <Title>{ele.title}</Title>
                    <SubTitle>{ele.subtitle}</SubTitle>
                  </Cards>
                </CardDiv>
              ))}
            </MainCardDiv>
          </FirstSection>

          <CommonSection>
            <HeadTitle>
              <How>How its Work</How>
              <CommonText>Get started in 3 simple steps </CommonText>
            </HeadTitle>

            <StepDiv>
              <StepImageDiv>
                <Image src={StepWallet}></Image>
              </StepImageDiv>

              <StepDetails>
                <StepTitle><Number>01</Number> Connect your wallet</StepTitle>
                <StepDes>
                  NFTinger is super easy for anyone as it subtracts the the
                  complexities of
                </StepDes>
                <StepCreateStore onClick={() => MetaMaskConnector()}>
                  <div className="display-loader-left">
                    {loader ? <Spinner></Spinner> : ""}
                    Connect Wallet
                  </div>
                </StepCreateStore>
              </StepDetails>
            </StepDiv>

            <StepDivSecond>
              <StepImageDiv>
                <Image src={StepStore}></Image>
              </StepImageDiv>
              <StepDetails>
                <StepTitle><Number>02</Number> Create your NFT store</StepTitle>
                <StepDes>
                  NFTinger is super easy for anyone as it subtracts the the
                  complexities of
                </StepDes>
                <StepCreateStore onClick={() => MetaMaskConnector()}>
                  <div className="display-loader-left">
                    {loader ? <Spinner></Spinner> : ""}
                    Create Store
                  </div>
                </StepCreateStore>
              </StepDetails>
            </StepDivSecond>
            <StepDiv>
              <StepImageDiv>
                <Image src={StepGrowth}></Image>
              </StepImageDiv>

              <StepDetails>
                <StepTitle><Number>03</Number> Start selling and grow</StepTitle>
                <StepDes>
                  NFTinger is super easy for anyone as it subtracts the the
                  complexities of
                </StepDes>
                <StepCreateStore onClick={() => MetaMaskConnector()}>
                  <div className="display-loader-left">
                    {loader ? <Spinner></Spinner> : ""}
                    Create Store
                  </div>
                </StepCreateStore>
              </StepDetails>
            </StepDiv>
          </CommonSection>

          <CommonSection>
            <HeadTitle>
              <CommonText>Intuitive UI & Seamless NFT Buying </CommonText>
              <TitleSecond>Experience</TitleSecond>
              <ExperienceText>
                Enable customer to buy NFT seamlessly
              </ExperienceText>
              <Image src={NFTBuying}></Image>
            </HeadTitle>
          </CommonSection>

          <CommonSection>
            <HeadTitle>
              <CommonText>Manage you marketplace </CommonText>

              <ExperienceText>
                Enable customer to buy NFT seamlessly
              </ExperienceText>
              <Image src={Admin}></Image>
            </HeadTitle>
          </CommonSection>

          <BlockchainSection>
            <HeadTitle>
              <CommonText>Major Blockchains we support </CommonText>
              <Image></Image>
            </HeadTitle>

            <BlockchainsDiv>
              <Blockchain>
                <Image src={Ethereum}></Image>
                <BlockchainText>Ethereum</BlockchainText>
              </Blockchain>
              <Blockchain>
                <Image src={Polygon}></Image>
                <BlockchainText>Polygon Matic</BlockchainText>
              </Blockchain>
              <Blockchain>
                <Image src={BinanceBlockchain}></Image>
                <BlockchainText>Binance </BlockchainText>
              </Blockchain>
            </BlockchainsDiv>
          </BlockchainSection>

          <CommonSection>
            <HeadTitle>
              <CommonText>No code storefront</CommonText>

              <StoreFrontPage>
                <StoreFrontDiv>
                  <Image src={StoreApi}></Image>
                  <StoreFrontName>NFT APIs</StoreFrontName>
                  <DesStoreFrontDiv>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </DesStoreFrontDiv>
                </StoreFrontDiv>
                <StoreFrontDiv>
                  <Image src={StoreFrontSetting}></Image>
                  <StoreFrontName>NFT Tools</StoreFrontName>
                  <DesStoreFrontDiv>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </DesStoreFrontDiv>
                </StoreFrontDiv>
                <StoreFrontDiv>
                  <Image src={infrastructure}></Image>
                  <StoreFrontName>NFT Infrastructure</StoreFrontName>
                  <DesStoreFrontDiv>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </DesStoreFrontDiv>
                </StoreFrontDiv>
              </StoreFrontPage>

              <StoreButton onClick={() => MetaMaskConnector()}>
                <div className="display-loader-left storefront-create-store">
                  {loader ? <Spinner></Spinner> : ""}
                  Create Store
                </div>
              </StoreButton>
            </HeadTitle>
          </CommonSection>

          <CommonSection>
            <HeadTitle>
              <CommonText>NFTs our whitelabel marketplace offer </CommonText>
              <OfferCardDiv>
                {offer.map((ele) => (
                  <OfferCard>
                    <Image src={ele.img}></Image>
                    <OfferName>{ele.name}</OfferName>
                  </OfferCard>
                ))}
              </OfferCardDiv>
            </HeadTitle>
          </CommonSection>

          <CommonSection style={{ marginBottom: "163px" }}>
            <HeadTitle>
              <CommonText style={{ marginBottom: "88px" }}>
                 NFTinger  Marketplace
              </CommonText>

              <Image src={marketplace}></Image>
            </HeadTitle>
          </CommonSection>
        </BottomSection>

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
                          onChange={(e) => handleInputChange(e)}
                          style={{ color: "white" }}
                        ></input>
                      </div>
                      <label className="siteurl">.NFTinger.com</label>
                    </div>
                    {errorMsg && (
                      <label className="lastLabel color-red">
                        <p>
                          {errorMsg}&nbsp;
                          <a href="https://market.nftinger.com/">
                            https://market.nftinger.com/
                          </a>
                        </p>
                      </label>
                    )}

                    <label className="lastLabel">
                      This is the url your customer will use to visit the
                      store/marketplace
                    </label>
                  </div>
                </div>
                <button
                  className="btn btn-primary report-btn NewHomeButton"
                  onClick={() => createStore()}
                  disabled={errorMsg?.length > 0  ? true :false}
                  //  style={{background: `${fetchPalletsColor(appearance?.colorPalette)}`}}
                >
                  <div className="display-loader-left">
                    {loader ? <Spinner></Spinner> : ""}
                    Create Store
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainDiv>
    </>
  );
};

export default HomeCard;
