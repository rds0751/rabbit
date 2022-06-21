import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { ethers } from "ethers";
import styled from "styled-components";
import "../../assets/styles/nftReportModal.css";
import OwlCarousel from "react-owl-carousel";
import { useNavigate } from "react-router-dom";
import { fetchPalletsColor, getParamTenantId } from "../../utility/global";
import { useSelector, useDispatch } from "react-redux";
import { SetMealOutlined } from "@mui/icons-material";
import {
  AddWalletDetails,
  ManageWalletSideBar,
  addUserData,
  RedirectTo,
  ManageNotiSideBar,
} from "../../reducers/Action";
import { toast, ToastContainer } from "react-toastify";
import { CheckUserByWalletAddress } from "../../services/UserMicroService";
import Utils from "../../utility";
import { getTenantByWallet } from "../../services/clientConfigMicroService";

const MainDiv = styled.div`
  background: #031527 0% 0% no-repeat padding-box;
`;

const Div = styled.div`
  display: flex;
  height: 911px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: grey;
  padding: 207px;
`;
const FirstSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CommonSection = styled.div`
  margin-top: 154px;
  /* display: flex;
flex-direction:column;
align-items: center;
justify-content: center; */
`;
const FirstTitle = styled.label`
  text-align: left;
  font: normal normal 600 54px/81px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`;
const SecondTitle = styled.label`
  text-align: left;
  font-size: 22px;
  line-height: 33px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #ffffff;
  margin-top: 24px;
  margin-bottom: 35px;
  opacity: 1;
`;
const ThirdTitle = styled.div`
  width: 242px;
  height: 54px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 15px 14px 13px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
`;
const Image = styled.img``;
const Text = styled.label`
  font: normal normal medium 18px/27px Poppins;
  letter-spacing: 0px;
  color: #031527;
  opacity: 1;
`;

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
const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  font: normal normal medium 18px/32px Poppins;
  letter-spacing: 0px;
  color: #f0f0f0;
  opacity: 1;
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
  margin-top: 43px;
  font: normal normal medium 22px/33px Poppins;
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
  margin-right: 36px;
  height: 150px;
  background: #19293a 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
`;
const OfferName = styled.label`
  text-align: left;
  font: normal normal medium 18px/27px Poppins;
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
  width: 19%;
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
  font: normal normal medium 18px/27px Poppins;
  letter-spacing: 0px;
  color: #e8e8e8;
  opacity: 1;
`;
const StoreButton = styled.button`
  margin-top: 92px;
  background: #016dd9 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
  padding: 16px 51px 13px 51px;
  width: 216px;
  height: 54px;
  text-align: left;
  font: normal normal medium 18px/27px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
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
  font: normal normal medium 22px/32px Poppins;
  letter-spacing: 0px;
  color: #f0f0f0;
  margin-top: 38px;
  opacity: 1;
`;

const StepCreateStore = styled.button`
  padding: 16px 53px 13px 51px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
  margin-top: 46px;
  width: 216px;
  height: 54px;
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
`;

const HomeCard = () => {
  const [modal, setModal] = useState(false);
  const { user, sideBar } = useSelector((state) => state);
  const dispatch = useDispatch();
  let address = "";

  // console.log(data);
  const { userDetails, walletAddress } = user;
  let { loggedInUser } = user;

  const navigate = useNavigate();
  const data = [
    {
      image: "images/customisable.svg",
      title: "Fully customisable",
      subtitle:
        "Our platform offers user end to end customisation opportunity where user can customise according to their business needs",
    },
    {
      image: "images/Customer.svg",
      title: "Customer centric approach",
      subtitle:
        "ANAFTO is super easy for anyone as it subtracts the the complexities of",
    },
    {
      image: "images/Security.svg",
      title: "Reliable Security",
      subtitle:
        "Our platform offers user end to end customisation opportunity where user can customise according to their business needs",
    },
    {
      image: "images/CrossChain.svg",
      title: "Cross-chain support",
      subtitle:
        "Our platform offers user end to end customisation opportunity where user can customise according to their business needs",
    },
  ];

  const offer = [
    {
      img: "images/Paint.svg",
      name: "Art",
    },
    {
      img: "images/Ball.svg",
      name: "Sports",
    },
    {
      img: "images/Cards.svg",
      name: "Trading Cards",
    },
    {
      img: "images/Cards.svg",
      name: "Photography",
    },
    {
      img: "images/Collectivables.svg",
      name: "Collectibles",
    },
    {
      img: "images/Utility.svg",
      name: "Utility",
    },
    {
      img: "images/Music.svg",
      name: "Music",
    },
  ];

  useEffect(() => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((newAccount) => {
        address = newAccount[0];
        localStorage.setItem("walletAddress", address);
      });
  });
  const checkTenant = async () => {
    const [error, result] = await Utils.parseResponse(getTenantByWallet());
    if (error || !result) return toast.error("Tenant Data is not fetched");
    else if (result.responseData === null) {
      console.log(result);
      setModal(true);
    } else if (result.responseData !== null) {
      console.log(result);
      return toast.success("tenant data is fetched");
    }
  };

  const MetaMaskConnector = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccount) => {
          const address = newAccount[0];
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
        })
        .catch((e) => {
          setModal(false);
          toast.error("Install Metamask and Connect Wallet", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });

      const data = await checkTenant();
    } else {
      toast.error("Install Metamask and Connect Wallet", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    //  setModal(true);
  };

  const handleRedirectLink = (url) => {
    navigate(url + getParamTenantId());
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
                        <h1 className="heading">
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
                            <Image
                              src="images/MetaFox.png"
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
                            <div className="d-flex flex-wrap">
                              <Card>
                                <div className="homePageContainer">
                                  <NFTDetails>
                                    <Details>
                                      <NamePrice>Holy bear</NamePrice>
                                      <CurrencyPrice>
                                        <Currency></Currency>
                                        <NamePrice>0.13</NamePrice>
                                        <Symbol>ETH</Symbol>
                                      </CurrencyPrice>
                                    </Details>
                                  </NFTDetails>
                                  <Card.Img
                                    variant="top"
                                    className={`newhomecard`}
                                    src="images/WarriorMonk.png"
                                  />
                                </div>
                              </Card>
                              <Card>
                                <div className="homePageContainer">
                                  <Card.Img
                                    variant="top"
                                    className={`newhomecard`}
                                    src="images/Bear.png"
                                  />
                                </div>
                              </Card>
                              <Card>
                                <div className="homePageContainer">
                                  <Card.Img
                                    variant="top"
                                    className={`newhomecard`}
                                    src="images/Water.png"
                                  />
                                </div>
                              </Card>
                              <Card>
                                <div className="homePageContainer">
                                  <Card.Img
                                    variant="top"
                                    className={`newhomecard`}
                                    src="images/invisible.png"
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
            <LabelText>Why use ANAFTO</LabelText>

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
                <Image src="images/StepWallet.svg"></Image>
              </StepImageDiv>

              <StepDetails>
                <StepTitle>01 Connect your wallet</StepTitle>
                <StepDes>
                  ANAFTO is super easy for anyone as it subtracts the the
                  complexities of
                </StepDes>
                <StepCreateStore>Create Store</StepCreateStore>
              </StepDetails>
            </StepDiv>

            <StepDivSecond>
              <StepImageDiv>
                <Image src="images/StepStore.png"></Image>
              </StepImageDiv>

              <StepDetails>
                <StepTitle>02 Create your NFT store</StepTitle>
                <StepDes>
                  ANAFTO is super easy for anyone as it subtracts the the
                  complexities of
                </StepDes>
                <StepCreateStore>Create Store</StepCreateStore>
              </StepDetails>
            </StepDivSecond>
            <StepDiv>
              <StepImageDiv>
                <Image src="images/StepGrowth.svg"></Image>
              </StepImageDiv>

              <StepDetails>
                <StepTitle>03 Start selling and growth</StepTitle>
                <StepDes>
                  ANAFTO is super easy for anyone as it subtracts the the
                  complexities of
                </StepDes>
                <StepCreateStore>Create Store</StepCreateStore>
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
              <Image src="images/NFTBuying.png"></Image>
            </HeadTitle>
          </CommonSection>

          <CommonSection>
            <HeadTitle>
              <CommonText>Manage you marketplace </CommonText>

              <ExperienceText>
                Enable customer to buy NFT seamlessly
              </ExperienceText>
              <Image src="images/Admin.png"></Image>
            </HeadTitle>
          </CommonSection>

          <BlockchainSection>
            <HeadTitle>
              <CommonText>Major Blockchains we support </CommonText>
              <Image></Image>
            </HeadTitle>

            <BlockchainsDiv>
              <Blockchain>
                <Image src="images/Ethereum.png"></Image>
                <BlockchainText>Ethereum</BlockchainText>
              </Blockchain>
              <Blockchain>
                <Image src="images/Polygon.svg"></Image>
                <BlockchainText>Polygon Matic</BlockchainText>
              </Blockchain>
              <Blockchain>
                <Image src="images/BinanceBlockchain.svg"></Image>
                <BlockchainText>Binance </BlockchainText>
              </Blockchain>
            </BlockchainsDiv>
          </BlockchainSection>

          <CommonSection>
            <HeadTitle>
              <CommonText>No code storefront</CommonText>

              <StoreFrontPage>
                <StoreFrontDiv>
                  <Image src="images/StoreApi.svg"></Image>
                  <StoreFrontName>NFT APIs</StoreFrontName>
                  <DesStoreFrontDiv>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </DesStoreFrontDiv>
                </StoreFrontDiv>
                <StoreFrontDiv>
                  <Image src="images/StoreFrontSetting.svg"></Image>
                  <StoreFrontName>NFT Tools</StoreFrontName>
                  <DesStoreFrontDiv>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </DesStoreFrontDiv>
                </StoreFrontDiv>
                <StoreFrontDiv>
                  <Image src="images/infrastructure.svg"></Image>
                  <StoreFrontName>NFT Infrastructure</StoreFrontName>
                  <DesStoreFrontDiv>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </DesStoreFrontDiv>
                </StoreFrontDiv>
              </StoreFrontPage>

              <StoreButton>Create Store</StoreButton>
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

          <CommonSection style={{marginBottom:"163px"}}>
            <HeadTitle>
              <CommonText style={{marginBottom:"88px"}}>ANAFTO Marketplace </CommonText>

              <Image src="./images/marketplace.png"></Image>
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
                          style={{ color: "white" }}
                        ></input>
                      </div>
                      <label className="siteurl">.anafto.com</label>
                    </div>

                    <label className="lastLabel">
                      This is the url your customer will use to visit the
                      store/marketplace
                    </label>
                  </div>
                </div>
                <button
                  className="btn btn-primary report-btn NewHomeButton"
                  onClick={() => handleRedirectLink("/Home")}
                  //  style={{background: `${fetchPalletsColor(appearance?.colorPalette)}`}}
                >
                  Create Store
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
