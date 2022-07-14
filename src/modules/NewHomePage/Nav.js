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
import { Link } from "react-router-dom";
import Spinner from "../../common/components/Spinner";
import { storeConstants } from "../../constants";
import  {NFTinger} from "../../common/newHomeImages";
const MainDiv = styled.div`
  width: 100%;
  background: #031527 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 12px #0000000f;
`;
const Image = styled.img``;
const NavDiv = styled.div`
  width: 100%;
  margin-left: 0.6rem;
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
  margin-right: 4.5rem;
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
  padding: 0 30px;
  text-align: left;
  font: normal normal medium 16px/25px Poppins;
  letter-spacing: 0px;
  color: #031527;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
  width: 173px;
height: 40px;
  &:hover{
    background-color: #016dd9;
    color:white;
  }
`;

const Nav = (props) => {
  const [modal, setModal] = useState(false);
  const { user, sideBar } = useSelector((state) => state);
  const customize = useSelector((state) => state.customize);
  const [nfts, setNfts] = useState([]);
  const [changeState, setChangeState] = useState(true);
  const dispatch = useDispatch();
  const { userDetails, walletAddress } = user;
  const [loader, setLoader] = useState(false);
  let { loggedInUser } = user;
  const navigate = useNavigate();
  let Newaddress;
  const [tenantData, setTenant] = useState({
    storeName: "",
    wallet: "",
  });
  const [userData,setUserData]=useState();
 
  useEffect(async ()=>{
    const [error, result] = await Utils.parseResponse(
      getTenantByWallet(tenantData.wallet)
    );
  

  },[userData]);

  const checkTenant = async (address) => {
    setLoader(true);
    const [error, result] = await Utils.parseResponse(
      getTenantByWallet(address)
    );
    if (error || !result){
    setLoader(false)
      return Utils.apiFailureToast("Store not launched");}
    if (!result.success) {
      setModal(true);
      setLoader(false);
    } else if (result?.success) {
      setTimeout(() => {
        setLoader(false);
        window.location.replace(result.responseData.siteUrl);
      }, 5000)
    }
    else {
      return Utils.apiFailureToast("Store not launched");
    }
  };


  const MetaMaskConnector = async () => {
  
    if (typeof window.ethereum !== 'undefined') {
    
      try {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      let Newaddress = accounts[0];
      alert(Newaddress)
      if(!Newaddress || !Newaddress.length){
        Utils.apiFailureToast("Please Login to metamask")
        return ;
      }
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
    } catch (e) {
       Utils.apiFailureToast("Please login to metamask extension");
      setModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  } 
    else {
      Utils.apiFailureToast("Please login to metamask extension");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  
};

  const createStore = async () => {
    const [error, result] = await Utils.parseResponse(getTenant(tenantData));

    if (result.responseCode === 403) {
      Utils.apiFailureToast(storeConstants.ALREADY_EXIST_STORE_NAME);
      setLoader(false)
    } else if (result.success) {
      let requestData = {
        subdomain: tenantData.storeName,
        tenantId: result.responseData._id,
      };
      const [errorDomain, domainResult] = await Utils.parseResponse(
        createSubDomain(requestData)
      );

      if (domainResult.responseCode === 403){
        Utils.apiFailureToast(domainResult.message);
        setLoader(false)
      }
      else if (domainResult.success) {
        setModal(false);
        setUserData(domainResult.responseData);
        setLoader(true)
        setTimeout(() => {
          setLoader(false)
          window.location.replace(domainResult.responseData.siteUrl);
        }, 5000)
      }
    }
  };

  return (
    <MainDiv>
      <NavDiv>
        <LogoDiv onClick={()=>navigate("/")}>
          <Image src={NFTinger}></Image>
          </LogoDiv>
        <NavItem>
          <ItemsDiv>
            <Item>Pricing</Item>
            <Item><div className="menuin">
          {/* <h2>Resources</h2> */}
          <li className="nav-item dropdown list-unstyled">
            <a
              className="nav-link c-8f9ba7 font-16 dropdown"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Resource
            </a>
            <ul
              className="dropdown-menu bg-031527"
              aria-labelledby="navbarDropdown"
            >
              <li onClick={() => { props.handleHamburger(); }}>
                <Link className="dropdown-item bg-031527" to="/help-center">
                  Help Center
                </Link>
              </li>
              <li onClick={() => { props.handleHamburger(); }}>
                <Link className="dropdown-item bg-031527" to="/Suggestion" >
                  Suggestions
                </Link>
              </li>
            </ul>
          </li>
        </div></Item>
            <Item onClick={() => MetaMaskConnector()}>Login</Item>
            <CreateStore onClick={() => MetaMaskConnector()}>
            <div className="display-loader-left m-t-2">
                  {loader ? <Spinner></Spinner> : ""}
                  Create Store
                  </div>
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
                          {tenantData?.wallet}
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
  );
};

export default Nav;
