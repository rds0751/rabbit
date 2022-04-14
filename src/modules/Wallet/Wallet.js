import React, { useEffect, useState } from "react";
import image from "../../assets/images/profile.png";
import copy from "../../assets/images/copy.svg";
import "../../assets/styles/Notification.css";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "../../assets/styles/wallet.css";
import SplitWalletAdd from "../../common/components/SplitWalletAdd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ManageNotiSideBar, ManageWalletSideBar } from "../../reducers/Action";
import Snackbar from "@mui/material/Snackbar";
import styled from "styled-components";

const CustomSnack = styled(Snackbar)`
  @media (min-width: 969px) {
    top: 154px !important;
    right: 37px !important;
    left: auto;

    min-width: 112px !important;
  }
  @media only screen and (min-width: 0px) and (max-width: 968px) {
    top: 153px !important;
    left: auto !important;

    min-width: 112px !important;
  }
`;

function Wallet() {
  const [humburger, setHumburger] = useState(false);
  const [errorMssg, setErrorMssg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null); // defaultAccount having the wallet address
  const [checkClick, setcheckClick] = useState(false);
  const [getBalance, setGetBalance] = useState(null);
  // const [state, setState] = React.useState({
  //   open: false,
  //   Transition: Fade,
  // });

  // const ethereum = window.ethereum;
  // console.log("ethereum : ", ethereum);
  const { user, sideBar } = useSelector((state) => state);

  // console.log(data);
  const { userDetails, walletAddress } = user;
  let { loggedInUser } = user;
  const { isOpenWallet } = sideBar;
  useEffect(() => {
    // if(ethereum){
    //   toast.success('Conneted Metamask ');
    // }
    // if (window.ethereum) {
    //   window.ethereum
    //     .request({ method: "eth_requestAccounts" })
    //     .then((result) => {
    //       accountChangeHandler(result[0]); //accounts can be a array we just wanna grab first one
    //       console.log(result[0]);
    //       // window.location.pathname = "/wallet";
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // } else {
    //   alert("Install Metamask");
    //   setErrorMssg("Install Metamask");
    //   toast.success("Connect Wallet");
    // }
  }, [window.ethereum, checkClick]);
  // const accountChangeHandler = (newAccount) => {
  //   setDefaultAccount(newAccount);
  //   getUserBalance(newAccount);
  // };
  // const getUserBalance = (address) => {
  //   window.ethereum
  //     .request({ method: "eth_getBalance", params: [address, "latest"] })
  //     .then((balance) => {
  //       setGetBalance(ethers.utils.formatEther(balance));
  //       console.log(getBalance, "<<< balance");
  //     });
  // };

  // window.ethereum?.on("accountsChanged", accountChangeHandler);
  const [copiedText, setCopiedText] = useState(false);

  // const handleCopyToClipboard = () => {
  //   // const walletAddressQuoted = JSON.stringify(walletAddress);
  //   // const walletAddressUnquoted = walletAddressQuoted.replace(/\"/g, "");
  //   navigator.clipboard.writeText( walletAddress?.address);
  //   toast.success("Text Copied");
  //   // setCopiedText(true);
  //   // setTimeout(() => {
  //   //   setCopiedText(false);
  //   // }, 1000);
  // };

  const isDataCopied = () => {
    // walletTogglePopup(false);
    // toast.success("Text Copied");
  };

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(ManageWalletSideBar(!isOpenWallet));
    dispatch(ManageNotiSideBar(false));
    document.body.className = !isOpenWallet ? "overflow" : "overflow-hidden";
    // document.body.style.overflow = !isOpenWallet ? "scroll" : "hidden";
  };

  return (
    <div
      className="wallet"
      style={{
        display: isOpenWallet ? null : "none",
      }}
      id="wallet"
    >
      <div className="empty_div" onClick={() => handleChange()}></div>
      <div className="wallet_div">
        <div className="imgwallet">
          <img src={loggedInUser?.photo ? loggedInUser?.photo : image} alt="" />
        </div>
        <div className="walletAddressContainer walleth2">
          <div className="walletAddress fontwallet">
            <SplitWalletAdd address={walletAddress?.address} />
          </div>
          <CopyToClipboard text={walletAddress?.address}>
            <button
              className="copy-button"
              onClick={handleClick({
                vertical: "top",
                horizontal: "right",
              })}
            >
              <img
                style={{
                  width: "21.47px",
                  height: "21.47px",
                  cursor: "pointer",
                }}
                src={copy}
                alt=""
                onClick={isDataCopied}
                // onClick={() => { handleClick(Fade);}}
                // onClick={handleClick(Fade)}
              />
            </button>
          </CopyToClipboard>
          {/* <ToastContainer style={{marginTop:"100px" , width: "142px", marginRight: "55px"}}/> */}
          <CustomSnack
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="Copied"
            key={vertical + horizontal}
            autoHideDuration={2000}
            className="custom-snack"
          />

          {/* <img
            style={{ width: "21.47px", height: "21.47px", cursor: "pointer" }}
            src={copy}
            alt=""
            onClick={handleCopyToClipboard}
          /> */}
        </div>
        <div className="balancewallet textVerticalCenter">
          <div className="WalletContent">
            <h3>Total Balance</h3>
            <h4>{walletAddress?.balance}</h4>
          </div>
        </div>
        {/* <button className="btnwallet">Add Balance</button> */}
      </div>
    </div>
  );
}
export default Wallet;
