import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Single from "../../assets/images/single.svg";
import Collection from "../../assets/images/collection.svg";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { AddWalletDetails } from "../../reducers/Action";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "../../assets/styles/createnft.css";

function CreateNFT() {
  const { user } = useSelector((state) => state);
  const { loggedInUser } = user;
  const navigate = useNavigate();
  const [humburger, setHumburger] = useState(false);
  const ethereum = window.ethereum;
  const [errorMssg, setErrorMssg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null); // defaultAccount having the wallet address
  console.log("ethereum ", ethereum && ethereum);
  const [checkClick, setcheckClick] = useState(false);

  const [getBalance, setGetBalance] = useState(null);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="container create-nft">
        <div className="row">
          <div className="col-xl-12 text-center">
            <h4 className="create-nft-font">Create NFT</h4>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-3 col-lg-3 col-sm-6 col-12">
            <Link to="/create-single-nft">
              <div className="card card-border card-width">
                <div className="card-body text-center">
                  <img src={Single} alt="Single" className="" />
                </div>
              </div>
            </Link>
            <div className="text-center">
              <h5 className="bottom-heading-font">Single</h5>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col-sm-6 col-12">
            <Link to="/create-nft-collection">
              <div className="card card-border card-width">
                <div className="card-body text-center">
                  <img src={Collection} alt="Single" className="" />
                </div>
              </div>
            </Link>
            <div className="text-center">
              <h5 className="bottom-heading-font">
                Collection
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNFT;
