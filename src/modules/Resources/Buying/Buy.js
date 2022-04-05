import React, { useState } from "react";
import styled from "styled-components";
import BuyItem from "./BuyItem";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/styles/buying.css";


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  color: #191919;
  @media screen and (min-width: 426px) and (max-width: 769px) {
    width: 88.8%;
    margin: auto;
    padding-top: 34px;
  }
  @media screen and (min-width: 770px) and (max-width: 1024px) {
    width: 88.8%;
    margin: auto;
    padding-top: 34px;
  }
  @media screen and (max-width: 426px) {
    width: 90%;
    margin: auto;
    padding-top: 44px;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 42px;
  @media screen and (min-width: 426px) and (max-width: 769px) {
    padding-bottom: 32px;
  }
  @media screen and (max-width: 426px) {
    padding-bottom: 13px;
  }
`;
const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  padding-right: 14px;
  @media screen and (min-width: 426px) and (max-width: 769px) {
    font-size: 20px;
  }
  @media screen and (max-width: 426px) {
    font-size: 18px;
  }
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #dedede;
  border-radius: 4px;
  width: 217px;
  height: 42px;
  padding: 8px 11px 8px 11px;
  @media screen and (max-width: 426px) {
    width: 100%;
  }
`;
const Input = styled.input`
  border: none;
  width: 80%;
  font-size: 16px;
`;











const ListItem = styled.li`
  width: 941px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0px 3px 12px #0000000f;
  border: 1px solid #d5d5d5;
  border-radius: 12px;
  padding: 30px 24px 13px 16px;
  margin-bottom: 32px;
  @media screen and (min-width: 426px) and (max-width: 769px) {
    padding: 30px 14px 13px 16px;
    width: 100%;
    
  }
  @media screen and (min-width: 770px) and (max-width: 955px) {
    padding: 30px 14px 13px 16px;
    width: 100%;
    
  }
  @media screen and (max-width: 426px) {
    padding: 32px 8px 24px 16px;
    width: 100%;
    
  }
`;
const Question = styled.h1`
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 28px;
  padding-right: 60px;
  margin-bottom: 0px;
  @media screen and (min-width: 426px) and (max-width: 769px) {
    font-size: 12px;
    padding-right: 16px;
  }
 
  @media screen and (max-width: 426px) {
    font-size: 14px;
    padding-bottom: 12px;
    padding-right:0px;
  }
`;



const Buy = (props) => {
  const [query ,setQuery]=useState("")
  const navigate=useNavigate();
  const BuyList = [
    {
      id: 0,
      questionText:
        "How do I purchase NFT?",
      answerText:
        "To buy an NFT, you must be a registered marketplace user, and your digital wallet balance must be positive. Click on the NFT that you want to buy and then click on Buy now button. It will navigate you to your wallet through which you can make your purchase.",
    },
    {
      id: 1,
      questionText:
        "How do I make an offer on NFT?",
      answerText:
        "Select \"Make Offer\" on the item page. If the item is part of an unsafelisted collection, you'll be prompted to review collection details and confirm that this collection is the correct one. Select the currency you'd like to make your offer in.",
    },
    {
      id: 2,
      questionText:
        "Is there a minimum bid requirement?",
      answerText:
        "Bids must be at least 5% higher than the previous bid. Only bids in the same payment token as the auction will be counted towards the winning bid.",
    },
  ];
const match=BuyList.filter(val => val.questionText.toLocaleLowerCase().includes(query));

  return (
    <>
    <nav aria-label="breadcrumb" className="headerbuying">
        <ol className="breadcrumb mt-4 offset-1">
          <li className="breadcrumb-item">
            <Link
              to="/help-center"
              style={{ textDecoration: "none" }}
              className="text-dark"
            >
              Help Center
            </Link>
          </li>
          <li
            className="breadcrumb-item active text-primary"
            aria-current="page"
          >
            Buying
          </li>
        </ol>
      </nav>
    <MainContainer>
      <div>
        
        <Header>
        <img src={require("../../../assets/images/leftarrowbuying.png")} onClick={()=>navigate(-1)} style={{marginRight:"16px",width:"26px",height:"23px"}} className="backbuying" />
          <Title>Buying</Title>
          <SearchBox>
            <Input type="search" placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)} />
            <i class="fa-solid fa-magnifying-glass"></i>
          </SearchBox>
        </Header>
        <ul>
          {match.length==0 ? (
         
         <ListItem>
         
           <Question className="question">"No Data Found"</Question>
         
       </ListItem>
            
        ):(
          match.map((eachBuy) => {
            return(
            <BuyItem key={eachBuy.id} faqDetails={eachBuy} />
            )
        })
          
        )
      }
        </ul>
      </div>
    </MainContainer>
    </>
  );
};

export default Buy;
