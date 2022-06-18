import React, { useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import styled from "styled-components";
import "../../assets/styles/nftReportModal.css";
import OwlCarousel from "react-owl-carousel";
import {  useNavigate } from "react-router-dom";
import { fetchPalletsColor, getParamTenantId } from "../../utility/global"

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
const Steps = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterSection = styled.div`
  display: flex;
  width: 100%;
  margin-top: 163px;
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
  align-items: center;
`;
const HeadingFooter = styled.p`
  text-align: left;
  font: normal normal bold 18px/27px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
`;
const ParaText = styled.p``;
const Link = styled.a`
  text-align: left;
  font: normal normal normal 18px/27px Poppins;
  letter-spacing: 0px;
  color: #e0e0e0;
  text-decoration: none;
`;
const SecondDiv = styled.div``;
const ThirdDiv = styled.div``;

const FooterCreateStore = styled.button`
  border: 2px solid var(--unnamed-color-ffffff);
  background: #23194200 0% 0% no-repeat padding-box;
  border: 2px solid #ffffff;
  border-radius: 6px;
  font: normal normal medium 16px/25px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  width: 173px;
  height: 40px;
`;
const SubMainDiv = styled.div``;
const NFTCardDiv = styled.div`
  width: 100%;
  position: absolute;
  overflow: hidden;
`;
const BannerImage = styled.div`
  display: flex;
  background-image: url("./images/BannerImage.svg");
  background-size: cover;
  background-color: rgb(255, 255, 255);
  background-position: center center;
  opacity: 0.3;
  filter: blur(8px);
  -webkit-mask: linear-gradient(rgb(255, 255, 255), transparent);
`;
const NFTMiddleDiv = styled.div`
  margin: 0px auto;
  display: flex;
  background-color: red;
  max-width: min(1280px, 100% - 40px);
  width: 100%;
  flex-wrap: wrap;
`;
const NFTFirstDiv = styled.div``;
const NFTSecondDiv = styled.div``;

const NFTCardViewDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const NFTCardDetails = styled.div``;
const NFTName = styled.div``;
const NFTBlockChain = styled.div``;
const NFTCurrency = styled.div``;
const NFTImages = styled.div`
  display: flex;
  flex-direction: row;
`;

const HomeCard = ({loaderState,navFooter,setNavFooter}) => {
  const [modal, setModal] = useState(false);

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
        "NFTfi is super easy for anyone as it subtracts the the complexities of",
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

  const handleRedirectLink = (url) => {
    navigate(url+getParamTenantId())
  }
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
                            onClick={() => setModal(true)}
                          >
                            <Image src="images/MetaFox.png"></Image>
                            Connect to launch
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
            <LabelText>Why use NFTfi</LabelText>

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
                  NFTfi is super easy for anyone as it subtracts the the
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
                  NFTfi is super easy for anyone as it subtracts the the
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
                  NFTfi is super easy for anyone as it subtracts the the
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

          <CommonSection>
            <HeadTitle>
              <CommonText>NFTfi Marketplace </CommonText>

              <Image></Image>
            </HeadTitle>
          </CommonSection>

          <FooterSection>
            <FooterDiv>
              <MarketPlaceDetail>
                <NameText>NFTfi</NameText>
                <AboutText>About DLT NFT marketplace</AboutText>
                <DesText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
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
                  <FooterCreateStore>Create Store</FooterCreateStore>
                </ThirdDiv>
              </OtherDetails>
            </FooterDiv>
          </FooterSection>
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
                          0x74F3ae13bE4bB88c87764211d621d32DCC7f533E
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
                        <input type="text" className="Address"></input>
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

                   onClick={() => handleRedirectLink('/')}
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
