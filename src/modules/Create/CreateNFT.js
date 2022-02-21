import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Single from "../../assets/images/single.png";
import Collection from "../../assets/images/collection.png";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { updateUserDetail } from "../../reducers/Action";
import { toast, ToastContainer } from "react-toastify";


function CreateNFT() {
  const [humburger, setHumburger] = useState(false);
  const ethereum = window.ethereum;
  const [errorMssg, setErrorMssg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null); // defaultAccount having the wallet address
  console.log("ethereum ", ethereum && ethereum);
  const [checkClick, setcheckClick] = useState(false);

  const [getBalance, setGetBalance] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangeHandler(result[0]); //accounts can be a array we just wanna grab first one
          console.log(result[0],"<<<result console");
          dispatch(
            updateUserDetail({ address: defaultAccount, balance: getBalance })
          );
          // window.location.pathname = "/wallet";
        })
        .catch((e) => {
          window.location.pathname = "/add-wallet";
          console.log(e, "<<< error ");
        });
    } else {
      // alert("Wallet not added")
      setErrorMssg("Install Metamask ");
      toast.error("Install Metamak and Connect Wallet");
    }
  }, []);
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

  return (
    <div>
      <div className="container">
        <div className="text-center mt-4">
          <h4 className="create-nft-font">Create NFT</h4>
        </div>
        <div className="row">
          <div
            className="col-md-3 col-lg-3 col-sm-6 col-12 my-5 offset-sm-3"
            style={{ cursor: "pointer" }}
          >
            <div className="card card-border card-height card-width create_card_mob">
              <div className="card-body text-center mt-5">
                <Link to="/create-single-nft">
                  <img src={Single} alt="Single" className="create_imgmob" />
                </Link>
              </div>
            </div>
            <div className="text-center mt-4">
              <h5 className="bottom-heading-font">Single</h5>
            </div>
          </div>
          <div
            className="col-md-3 col-lg-3 col-sm-6 col-12 my-5 "
            style={{ cursor: "pointer" }}
          >
            <div className="card card-border card-height card-width mx-3 create_card_mob ">
              <div className="card-body text-center mt-5">
                <Link to="/create-nft-collection">
                  <img
                    src={Collection}
                    alt="Single"
                    className="create_imgmob"
                  />
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h5 className="bottom-heading-font mt-4">Collection</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNFT;
