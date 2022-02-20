import React, { useEffect, useState } from "react";
import image from "../../assets/images/1.jpg";
import "../../assets/styles/Notification.css";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import { toast } from "react-toastify";

function Wallet() {
  const [humburger, setHumburger] = useState(false);
  const [errorMssg, setErrorMssg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null); // defaultAccount having the wallet address
  const [checkClick, setcheckClick] = useState(false);
  const [getBalance, setGetBalance] = useState(null);

  const ethereum = window.ethereum;
  console.log("ethereum : ", ethereum);
  const { user, sideBar } = useSelector((state) => state);
  // console.log(data);
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
  const accountChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
  };
  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setGetBalance(ethers.utils.formatEther(balance));
        console.log(getBalance, "<<< balance");
      });
  };

  window.ethereum?.on("accountsChanged", accountChangeHandler);

  return (
    <div
      className="wallet"
      style={{
        display: isOpenWallet ? null : "none",
      
      }}
    >
      <div className="empty_div"></div>
      <div className="wallet_div">
        <div className="imgwallet">
          <img src={image} alt="" />
        </div>
        <div className="walleth2">
          <h3 className="fontwallet">
            {/* {ethereum && ethereum.chainId
              ? ethereum && ethereum.chainId
              : "Install extension to connect wallet"} */}
            {/* {userDetails?.address} */}
            {defaultAccount}
          </h3>
          <i className="far fa-copy"></i>
        </div>
        <div className="balancewallet textVerticalCenter">
          <div className="WalletContent">
            <h3>Total Balance</h3>
            <h4>{getBalance}</h4>
          </div>
        </div>
        <button className="btnwallet">Add Balance</button>
      </div>
    </div>
  );
}
export default Wallet;
