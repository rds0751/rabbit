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
      <div className="create-nft-outer">
        <div className="">
          <h4 className="poppins-normal bold-bold font-32 blackish">
            Create NFT
          </h4>
        </div>
        <div className="create-box-container">
          <div className="single-create-type">
            <div
              className="single-box bord-rad-4"
              style={{ cursor: "pointer" }}
            >
              <Link to="/create-single-nft">
                <div className="img-set-center">
                  <img src={Single} alt="Single" className="" />
                </div>
              </Link>
            </div>
            <div className="create-type-text">
              <h5 className="poppins-normal bold-600 font-18 blackish">
                Single
              </h5>
            </div>
          </div>
          {/* ---------------collection--- */}
          <div className="single-create-type">
            <div
              className="single-box bord-rad-4"
              style={{ cursor: "pointer" }}
            >
              <Link to="/create-nft-collection">
                <div className="img-set-center">
                  <img src={Collection} alt="Single" className="" />
                </div>
              </Link>
            </div>
            <div className="create-type-text">
              <h5 className="poppins-normal bold-600 font-18 blackish">
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
