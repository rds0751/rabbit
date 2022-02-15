import React from "react";
import image from "../../assets/images/1.jpg";
import "../../assets/styles/Notification.css"

function Wallet() {

  const ethereum = window.ethereum
  console.log("ethereum : ",ethereum);

  if(ethereum){
    ethereum.on('accountsChanged',function(accounts) {

    })
  }

  return (
    <div className="wallet">
      <div className="empty_div"></div>
      <div className="wallet_div">
      <div className="imgwallet">
        <img src={image} alt="" />
      </div>
      <div className="walleth2">
        <h3 className="fontwallet">{ethereum && ethereum.chainId ? ethereum && ethereum.chainId : "Install extension to connect wallet" }</h3>
        <i className="far fa-copy"></i>
      </div>
      <div className="balancewallet">
        <h3>Total Balance</h3>
        <h4>4645120 USD</h4>

      </div>
        <button className="btnwallet">Add Balance</button>
      </div>
    </div>
  );
}
export default Wallet;
