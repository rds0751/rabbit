import React from "react";
import image from "../../assets/images/1.jpg";
function Wallet() {
  return (
    <div className="wallet">
      <div className="imgwallet">
        <img src={image} alt="" />
      </div>
      <div className="walleth2">
        <h3 className="fontwallet">yash@5622</h3>
        <i class="far fa-copy"></i>
      </div>
      <div className="balancewallet">
        <h3>Total Balance</h3>
        <h4>4645120 USD</h4>

        <button className="btnwallet">Add Balance</button>
      </div>
    </div>
  );
}
export default Wallet;
