import React from 'react'
import styled from 'styled-components'


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
const Footer = () => {
  return (
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
  )
}

export default Footer