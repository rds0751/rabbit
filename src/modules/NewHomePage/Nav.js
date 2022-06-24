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


const MainDiv = styled.div`
  width: 100%;
  background: #031527 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 12px #0000000f;
`;

const NavDiv = styled.div`
  width: 87vw;
  margin-left: 5vw;
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
const LogoDiv = styled.div`
  text-align: left;
  font: normal normal normal 29px/33px Whiskey Girls Condensed;
  letter-spacing: 0px;
  color: #016dd9;
  cursor: pointer;
  opacity: 1;
`;
const ItemsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Item = styled.label`
  text-align: left;
  font: normal normal 600 16px/25px Poppins;
  letter-spacing: 0px;
  color: #8f9ba7;
  opacity: 1;
  margin-right: 2.3rem;
  cursor: pointer;
`;
const CreateStore = styled.button`
  padding: 9px 36px 9px 36px;
  text-align: left;
  font: normal normal medium 16px/25px Poppins;
  letter-spacing: 0px;
  color: #031527;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
  &:hover{
    background-color: #016dd9;
    color:white;
  }
`;

const Nav = () => {
  const [modal, setModal] = useState(false);
  const { user, sideBar } = useSelector((state) => state);
  const customize = useSelector((state) => state.customize);
  const [nfts, setNfts] = useState([]);
  const [changeState, setChangeState] = useState(true);
  const dispatch = useDispatch();
  const { userDetails, walletAddress } = user;
  let { loggedInUser } = user;
  const navigate = useNavigate();
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
      return Utils.apiFailureToast("Store not launched");
    if (!result.success) {
      setModal(true);
    } else if (result?.responseData?.siteUrl) {
      window.location.replace(result.responseData.siteUrl);
    }
    else {
      return Utils.apiFailureToast("Store not launched");
    }
  };


  const MetaMaskConnector = async () => {
    try{
      if (window.ethereum) {
       let accounts=await window.ethereum.request({method:"eth_requestAccounts"});
       let Newaddress = accounts[0];
       setTenant({ ...tenantData, wallet: Newaddress });
       localStorage.setItem("walletAddress", Newaddress);
       let balance= await window.ethereum.request({ method: "eth_getBalance", params: [Newaddress, "latest"] })
       console.log(balance);
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

      }else {
        Utils.apiFailureToast("Please connect with metamask");
        setTimeout(()=>{
          window.location.reload();
        },1000)
      }
    }catch(e){
      setModal(false);
      Utils.apiFailureToast("Please connect with metamask");
      setTimeout(()=>{
        window.location.reload();
      },1000)
     
    }
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
  };

  return (
    <MainDiv>
      <NavDiv>
        <LogoDiv onClick={()=>navigate("/")}>NFTinger</LogoDiv>
        <NavItem>
          <ItemsDiv>
            <Item>Pricing</Item>
            <Item>Resource</Item>
            <Item onClick={() => MetaMaskConnector()}>Login</Item>
            <CreateStore onClick={() => MetaMaskConnector()}>
              Create Store
            </CreateStore>
          </ItemsDiv>
        </NavItem>
      </NavDiv>

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
    </MainDiv>
  );
};

export default Nav;
