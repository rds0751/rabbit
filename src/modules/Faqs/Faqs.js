import React from "react";
import styled from "styled-components";
import FaqItem from "./FaqItem";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  color: #191919;
  @media screen and (min-width: 426px) and (max-width: 769px) {
    width: 86%;
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

const Faqs = (props) => {
  const faqsList = [
    {
      id: 0,
      questionText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ?",
      answerText:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
    },
    {
      id: 1,
      questionText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ?",
      answerText:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
    },
    {
      id: 2,
      questionText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ?",
      answerText:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
    },
    {
      id: 3,
      questionText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ?",
      answerText:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
    },
  ];

  return (
    <MainContainer>
      <div>
        <Header>
          <Title>FAQs</Title>
          <SearchBox>
            <Input type="search" placeholder="Search" />
            <i class="fa-solid fa-magnifying-glass"></i>
          </SearchBox>
        </Header>
        <ul>
          {faqsList.map((eachFaq) => (
            <FaqItem key={eachFaq.id} faqDetails={eachFaq} />
          ))}
        </ul>
      </div>
    </MainContainer>
  );
};

export default Faqs;
