import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import image from "../../assets/images/icon.png";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddWalletDetails,
  ManageWalletSideBar,
  addUserData,
} from "../../reducers/Action";
import "react-toastify/dist/ReactToastify.css";
import { CheckUserByWalletAddress } from "../../services/UserMicroService";
import { WEB_APP_USER_WALLET_ADDRESS } from "../../reducers/Constants";
function Create() {
  const history = useNavigate();
  const [humburger, setHumburger] = useState(false);
  const ethereum = window.ethereum;
  const [errorMssg, setErrorMssg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null); // defaultAccount having the wallet address
  console.log("ethereum ", ethereum && ethereum);
  const { user, sideBar } = useSelector((state) => state);
  const [checkClick, setcheckClick] = useState(false);
  const [getBalance, setGetBalance] = useState(null);
  const dispatch = useDispatch();
  const { userDetails, loggedInUser } = user;
  const { isOpenWallet } = sideBar;
  const [toggleEffect, setToggleEffect] = useState(false);
  useEffect(() => {
    if (loggedInUser != null) {
      alert("toggle called");
      toast.success("Wallet connected");
      dispatch(ManageWalletSideBar(!isOpenWallet));
      history("/");
    } else {
      toast.error("Choose the wallet");
    }
  }, [toggleEffect]);

  const connectMetamask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangeHandler(result[0]); //accounts can be a array we just wanna grab first one
          console.log(result[0]);

        //   dispatch(
        //     AddWalletDetails({ address: defaultAccount, balance: getBalance })
        //   );
        //   CheckUserByWalletAddress(defaultAccount, (res) => {
        //     dispatch(addUserData(res));
        //     setToggleEffect(!toggleEffect);
        //   });
        //   // localStorage.setItem(
        //   //   WEB_APP_USER_WALLET_ADDRESS,
        //   //   `${defaultAccount}`
        //   // );

        //   // window.location.pathname = "/wallet";
        })
        .catch((e) => {
          // alert("Connect Your Wallet");
          toast.error(" Connect Your Metamask Wallet");
          console.log(e, "<<< error ");
        });
    } else {
      // setErrorMssg("Install Metamask ");
      // alert("Install Metamask ");

      toast.error("Install Metamak and Connect Wallet");
    }
  };
  const accountChangeHandler = (newAccount) => {
    // alert("account changes");
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
    dispatch(AddWalletDetails({ address: newAccount, balance: getBalance }));
    CheckUserByWalletAddress(newAccount, (res) => {
      console.log(res, "<<<< Account changed");
      dispatch(addUserData(res));
      setToggleEffect(!toggleEffect);
    });
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
  console.log(loggedInUser, "<<<<<this iser user detail");
  return (
    <>
      <div className="d-flex justify-content-between">
        <ToastContainer
          position="Install Metamask Extension And Connect Wallet"
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

      <div className="container">
        <div className="mt-5">
          <h1 style={{ fontSize: "20px", fontWeight: "bolder" }}>
            Connect your wallet
          </h1>

          <p
            style={{ fontSize: "18px", color: "#8B8B8B", fontWeight: "normal" }}
          >
            Connect with one of our most popular{" "}
            <span style={{ color: "#8B8B8B", fontWeight: "bold" }}>
              {" "}
              wallets
            </span>{" "}
            providers
            <br />
            or create a new one
          </p>
        </div>
        <div className="row createmob">
          <div
            onClick={connectMetamask}
            className="card col-md-3 col-lg-3 col-sm-6 col-12 my-5 card-border"
            style={{ cursor: "pointer" }}
          >
            <img
              id="create_logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title"> Metamask</h5>
              <p className="card-text">
                One of the most secure wallets
                <br /> with great flexibility
              </p>
            </div>
          </div>

          <div className="card col-md-3 col-lg-3 col-sm-6 col-12 mx-4 my-5 card-border createmob2">
            <img
              id="create_logo"
              src={image}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Torus</h5>
              <p className="card-text">
                Connect with your Google,
                <br /> Facebook, Twitter or Discord
              </p>
            </div>
          </div>

          <div className="card col-md-3 col-lg-3 col-sm-6 col-12 my-5 card-border">
            <img
              id="create_logo"
              src="https://api.nuget.org/v3-flatcontainer/walletconnect.core/1.6.5/icon"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Wallet Connect</h5>
              <p className="card-text">
                Open protocol for connecting <br />
                Wallets to Dapps
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline-primary btn-size createmobbtn"
        >
          Show more
        </button>
      </div>
    </>
  );
}

export default Create;
