import React, { useState, useEffect } from "react";
import { getTopCollections } from "../../services/sellAndPurchaseMicroService";
import styled from "styled-components";
import dropdown from "../../assets/images/drop down.png";
import {
  LeaderBoardApi,
  LeaderBoardApi2,
  LeaderBoardApi3,
  LeaderBoardApi4,
  LeaderBoardApi5,
} from "../../constants/LeaderBoardApi";
import "../../assets/styles/topbidder.css"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 140px;
  margin-right: 130px;
  color: #191919;
  margin-top: 29px;
  @media only screen and (min-width:425px) and  (max-width:769px) {
    margin-left: 6%;
    margin-right: 6%;
  }
  @media only screen and (max-width:426px) {
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 52px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width:426px){
    font-size: 18px;
  }
`;
const Select = styled.select`
  width: 118px;
  height: 42px;
  padding: 11px 8px 11px 8px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #707070;
  background: #ffffff;
  border-radius: 6px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url(${dropdown});
  background-repeat: no-repeat;
  background-position: 90% center;
  @media screen and (max-width:426px){
    display: none;
    
  }
`;
const Body = styled.div`
  margin-top: 58px;
  margin-bottom: 16px;
  @media only screen and (min-width:425px) and  (max-width:769px) {
    margin-top: 39px;
  }
  @media only screen  and (max-width:769px) {
    margin-top: 22px;
  }
`;
const Column = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const Collection = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  margin-bottom: 42px;
  height: 68px;
  border: 1px solid #FCFCFC;
  border-radius: 13px;
`;
const Image = styled.img`
  width: 42px;
  height: 42px;
  /* padding-left: 31px;
  padding-right: 14px; */
  border-radius: 10px;
  margin: auto 0;
`;
const NameColumn = styled.div`
  display: flex;
  margin-left: 31px;
 
`;
const Name = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 24px 0 21px 14px;
`;
const VolumeColumn = styled.div`
  /* padding-left: 40px; */
  margin:auto 0;
  width:100%;
`;
const Span = styled.p`
  color: #366eef;
  font-size: 16px;
  font-weight: 500;
`;
const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
  @media screen and (max-width:426px){
    display: none;
    
  }
`;
const Volume=styled.span`
font:normal normal normal 16px/25px Poppins;
color: #818181;
`;

function Top_collection() {
  const [topCollections, setTopCollections] = useState([]);


  return (
    <Container>
      <Header>
        <Title>Top Buyers</Title>
        <Select>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </Select>
      </Header>
      <Body className="container-fluid">
        <div className="row">
          <Column className="col" style={{ paddingLeft: "42px" }}>
            Name
          </Column>
          <Column className="col">Volume</Column>
          <Column className="col itembought">ItemsBought</Column>
        </div>
      </Body>
      {LeaderBoardApi4.map((curElem) => {
        const { img,name, volume, itemsbought} =
          curElem;
        return (
          <div className="container-fluid">
            <Collection className="row">
              <NameColumn className="col">
                <Image src={img} alt="pic" />
                <Name>{name}</Name>
              </NameColumn>
              <VolumeColumn className="col">
                <Span>34 ETH  <Volume>{volume}</Volume> </Span>
               
              </VolumeColumn>
              <Text className="col">{itemsbought}</Text>
            </Collection>
          </div>
        );
      })}
    </Container>
  );
}

export default Top_collection;
