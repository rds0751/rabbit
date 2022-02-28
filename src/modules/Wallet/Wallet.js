import React, { useEffect, useState } from "react";
import image from "../../assets/images/1.jpg";
import copy from "../../assets/images/copy.svg";
import "../../assets/styles/Notification.css";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import "../../assets/styles/wallet.css";
import { ToastContainer } from "react-toastify";

function Wallet() {
  const [humburger, setHumburger] = useState(false);
  const [errorMssg, setErrorMssg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null); // defaultAccount having the wallet address
  const [checkClick, setcheckClick] = useState(false);
  const [getBalance, setGetBalance] = useState(null);

  // const ethereum = window.ethereum;
  // console.log("ethereum : ", ethereum);
  const { user, sideBar } = useSelector((state) => state);
  // console.log(data);
  const { userDetails, walletAddress } = user;
  console.log(sideBar, "<<<<sidebar");
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

  const handleCopyToClipboard = () => {
    // const temp = walletAddress?.walletAddress;
    // const walletAddressQuoted = JSON.stringify(walletAddress);
    // const walletAddressUnquoted = walletAddressQuoted.replace(/\"/g, "");
    const { address } = walletAddress;
    navigator.clipboard.writeText(`${address}`);
    // navigator.clipboard.writeText(walletAddressUnquoted);
    setCopiedText(true);
    toast.success("Text Copied");
    setTimeout(() => {
      setCopiedText(false);
    }, 1000);
  };
  return (
    <div
      className="walletAddressContainer"
      style={{
        display: isOpenWallet ? null : "none",
      }}
      id="wallet"
    >
      {/* <div className="walle"> */}
      <div className="">
        <img src={image} alt="" width="75px" height="75px" />
      </div>
      <div className="wallet-add-container">
        <div className="walletAddress fontwallet">
          {/* {ethereum && ethereum.chainId
              ? ethereum && ethereum.chainId
              : "Install extension to connect wallet"} */}
          {/* {userDetails?.address} */}
          {walletAddress?.address}
        </div>
        <img
          style={{ height: "30px" }}
          src={copy}
          alt=""
          onClick={handleCopyToClipboard}
        />
      </div>
      <div className="balance-out">
        <div className="balance-text">
          <div>Total Balance</div>
          <div className="balance-value">{walletAddress?.balance}</div>
        </div>
      </div>
      <button className="balance-button">Add Balance</button>
      {/* </div> */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
export default Wallet;
