//import { style } from "@mui/system";
import React, { Component, useState, useEffect } from "react";
import "../../assets/styles/Leader.css";
import styled from "styled-components";
import dropdown from "../../assets/images/drop down.png";
import NoItem from "../../assets/images/Noitems.svg";

import Spinner from "../../common/components/Spinner";

import profileImage from "../../assets/images/NoProfile.svg";
// import './Top_collection.css'
import {
  LeaderBoardApi,
  LeaderBoardApi2,
  LeaderBoardApi3,
  LeaderBoardApi4,
  LeaderBoardApi5,
} from "../../constants/LeaderBoardApi";
import { getTopSellers } from "../../services/sellAndPurchaseMicroService";
import { Link } from "react-router-dom";

const queryString = require("query-string");


const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 7%;
  margin-right: 7%;
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
    overflow-y: scroll;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  @media screen and (max-width:426px) {
    overflow: scroll;
    width: 557px;
  }
`;
const Title = styled.h3`
  font-size: 20px;
  line-height:30px;
  font-family: 'poppins-bold';
  margin-bottom: 0px;
  @media screen and (max-width:426px){
    font-size: 18px;
    margin: auto 0;
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
  color: #000000;
  font-family: 'poppins-medium';
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
  @media only screen  and (max-width:426px) {
    overflow: scroll;
    width: 557px;
  }
`;
const Column = styled.div`
  font-size: 16px;
  line-height:25px;
  font-family:'poppins-semibold';
  color:#191919;
`;
const Collection = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  margin-bottom: 42px;
  height: 68px;
  border: 1px solid #FCFCFC;
  border-radius: 13px;
  @media screen and (max-width:426px){
    overflow: scroll;
    width: 557px;
  }
`;
const Image = styled.img`
  width: 42px;
  height: 42px;
  /* padding-left: 31px;
  padding-right: 14px; */
  border-radius: 22px;
  margin: auto 0;
`;
const NameColumn = styled.div`
  display: flex;
  margin-left: 31px;
  align-items: center;
`;
const Name = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 24px 0 21px 14px;
`;
const VolumeColumn = styled.div`
  width:100%;
`;
const Span = styled.p`
  color: #366eef;
  font-size: 16px;
  line-height: 25px;
  font-family: poppins-medium;
  margin-bottom:0px;
`;
const Text = styled.div`
  font-size: 16px;
  line-height: 25px;
  font-family: 'poppins-medium';
  color: #191919;
`;
const Volume = styled.span`
  font-family: 'poppins';
  font-size: 16px;
  line-height: 25px;
  color: #818181;
`;
function TopSeller() {

  const [topSellers, setTopSellers] = useState([]);
  const [sellerDuration, setSellerDuration] = useState({

    duration: "weekly",

  });
  const [isloading, setIsloading] = useState(false);

  const sellerReqObj = queryString.stringify(sellerDuration);


  useEffect(async () => {
    setIsloading(true)
    setTopSellers([])


    await getTopSellers(sellerReqObj).then((response) => {
      console.log("responsessssss",response)
      setTopSellers(response);
      setIsloading(false)
    }
    )
   

  }, [sellerReqObj]);
  console.log("topSellers", topSellers);

  const ChangeSellerDuration = (e) => {

    setSellerDuration(

      { ...sellerDuration, [e.target.name]: e.target.value }

    );

  }

  return (
    <Container className="leader-viewmore">
      <Header>
        <Title>Top Sellers</Title>
        <Select name="duration" onChange={(e) => ChangeSellerDuration(e)}>
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
          <Column className="col">Items sold</Column>
        </div>
      </Body>
      {topSellers.map((curElem) => {
        const { image, sellerFirstName, sellerLastName, itemsSold, totalPurchasedValue, topSellers, volume } = curElem;
        // console.log("fffffff",curElem.topSellers)
        var precise = volume.toPrecision(4);
        var result = parseFloat(precise);
        return (
          <div className="container-fluid">
            <Collection className="row">
              <NameColumn className="col">

                {topSellers.photo == "" || !topSellers.photo ? (
                  <Image src={profileImage} alt="pic" />


                ) : (
                  <Image src={topSellers.photo} alt="pic" />

                )}

                {topSellers.userName == "" ? (
                  <h2 className="seller-name"> <Link style={{ textDecoration: "null" }} to={"/user-profile/" + topSellers._id}>{topSellers.wallet_address.substring(0, 4)}...{topSellers.wallet_address.slice(topSellers.wallet_address.length - 4)}</Link></h2>

                ) : (
                  <h2 className="seller-name"><Link style={{ textDecoration: "null" }} to={"/user-profile/" + topSellers._id}>{topSellers.userName}</Link></h2>

                )}



              </NameColumn>
              <VolumeColumn className="col">
                <Span>{result} ETH
                  {/* <Volume>({"$"})</Volume> */}
                </Span>

              </VolumeColumn>
              <Text className="col">{itemsSold}</Text>
            </Collection>
          </div>
        );
      })}
      <div className="spinnerloader">
        {isloading ? <Spinner /> :
          (topSellers.length === 0 && (
            <div className="Noitemdiv">
              <img src={NoItem} />
              <p className="textitem">No items available</p>
            </div>
          ))}
      </div>

      {/* {topSellers.length === 0 && (

        <div className="spinnerloader">{<Spinner />}


        </div>)} */}
    </Container>
  );
}
export default TopSeller;
