import React from "react";
import styled from "styled-components";
import {  useNavigate } from "react-router-dom";

const MainDiv = styled.div`
width: 100%;
background: #031527 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 12px #0000000F;`;

const NavDiv=styled.div`
width: 95%;
height: 70px;
padding: 34px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

`;

const NavItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const LogoDiv=styled.div`
font: var(--unnamed-font-style-normal) normal normal 29px/var(--unnamed-line-spacing-33) Whiskey Girls Condensed;
letter-spacing: var(--unnamed-character-spacing-0);
color: var(--unnamed-color-016dd9);
text-align: left;
font: normal normal normal 29px/33px Whiskey Girls Condensed;
letter-spacing: 0px;
color: #016DD9;
opacity: 1;
`;
const ItemsDiv=styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;
const Item=styled.label`
font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-600) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-25) var(--unnamed-font-family-poppins);
letter-spacing: var(--unnamed-character-spacing-0);
text-align: left;
font: normal normal 600 16px/25px Poppins;
letter-spacing: 0px;
color: #8F9BA7;
opacity: 1;
margin-right: 2.3rem;
`;
const CreateStore=styled.button`
padding: 9px 36px 9px 36px;

font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-25) var(--unnamed-font-family-poppins);
letter-spacing: var(--unnamed-character-spacing-0);
text-align: left;
font: normal normal medium 16px/25px Poppins;
letter-spacing: 0px;
color: #031527;
background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
background: #FFFFFF 0% 0% no-repeat padding-box;
border-radius: 6px;
opacity: 1;
`;

const Nav = () => {
  const navigate = useNavigate();
  return (
    <MainDiv>
      <NavDiv>
      <LogoDiv>NFTFI</LogoDiv>
        <NavItem>   
          <ItemsDiv>
            <Item>Pricing</Item>
            <Item>Resource</Item>
            <Item>Login</Item>
            <CreateStore   onClick={() => navigate('/')}>Create Store</CreateStore>
          </ItemsDiv>


        </NavItem>
      </NavDiv>
    </MainDiv>
  );
};

export default Nav;
