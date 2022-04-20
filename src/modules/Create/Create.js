import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import image from "../../assets/images/icon.png";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/createWallet.css";
import {
  AddWalletDetails,
  ManageWalletSideBar,
  addUserData,
  RedirectTo,
  ManageNotiSideBar,
} from "../../reducers/Action";
import "react-toastify/dist/ReactToastify.css";
import { CheckUserByWalletAddress } from "../../services/UserMicroService";
import { WEB_APP_USER_WALLET_ADDRESS } from "../../reducers/Constants";
import Metamask from "../../assets/images/Metamask.svg"
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
  const { userDetails, loggedInUser, redirectUrl } = user;
  const { isOpenWallet } = sideBar;
  const [toggleEffect, setToggleEffect] = useState(false);
  console.log("ttttttttttttttttttttttttttttt",toggleEffect)
  console.log("redireurl-----",redirectUrl)
  useEffect(() => {
    if (loggedInUser != null) {
      toast.success("Wallet connected");
      // dispatch(ManageWalletSideBar(!isOpenWallet));
      if (redirectUrl != "") {
        history("/my-profile");
        // history(redirectUrl);
        if (redirectUrl == "myitems") {
          history("/my-items");
        }
        if (redirectUrl == "profile") {
          history("/my-profile");
        }
        if (redirectUrl == "create") {
          console.log("s")
          history("/create-nft");
        }
        if (redirectUrl == "wallet") {
          document.body.style.overflow = "hidden";
          dispatch(ManageWalletSideBar(!isOpenWallet));
        }
        if (redirectUrl == "notification") {
          dispatch(ManageNotiSideBar(true));
        }
        // alert(`${redirectUrl}`);
      } else {
        history("/my-profile");
      }
    } else {
      // toast.error("Choose the wallet");
    }
  }, [toggleEffect]);
  const connectMetamask = () => {
    if (window.ethereum) {
      // address;
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccount) => {
          const address = newAccount[0];
          // alert("connecting");
          window.ethereum
            .request({ method: "eth_getBalance", params: [address, "latest"] })
            .then((wallet_balance) => {
              // setGetBalance(ethers.utils.formatEther(balance));
              const balance = ethers.utils.formatEther(wallet_balance);
              console.log(getBalance, "<<< balance");
              // -----------------
              dispatch(
                AddWalletDetails({
                  address,
                  balance,
                })
              );
              CheckUserByWalletAddress(address, (res) => {
                console.log(res, "<<<< Account changed");
                dispatch(addUserData(res));
                localStorage.setItem("WHITE_LABEL_TOKEN", res.token);
                // console.log("dmmmmmmmmmmmmmmm")
                setToggleEffect(!toggleEffect);

              });
              // -------------
              // console.log("mffffffmmmmmsmmmmmffffffff",toggleEffect)

            });
               })
        .catch((e) => {
          toast.error("Install Metamask and Connect Wallet", {
            position: toast.POSITION.TOP_RIGHT
          });
        });
    } else {
      
      toast.error("Install Metamask and Connect Wallet", {
        position: toast.POSITION.TOP_RIGHT
      });
      // toast.error("Install Metamask and Connect Wallet");
    }
  };
  const accountChangeHandler = (newAccount) => {
    // setDefaultAccount(newAccount[0]);
    const address = newAccount[0];
    // console.log(, "<<<< defaultaccount");
    // getUserBalance(newAccount[0]);
    // balance
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((wallet_balalnce) => {
        // setGetBalance(ethers.utils.formatEther(wallet_balalnce));
        const balance = ethers.utils.formatEther(wallet_balalnce); //balance
        console.log(getBalance, "<<< balance");
        // --------------------------------------------------------setting it to reducer
        dispatch(AddWalletDetails({ address, balance }));
        CheckUserByWalletAddress(address, (res) => {
          console.log(res, "<<<< Account changed");
          dispatch(addUserData(res));
          localStorage.setItem("WHITE_LABEL_TOKEN", res.token);

          setToggleEffect(!toggleEffect);
        });
      });
    // ---
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
  console.log("mffffffmmmmmsmmmmmffffffff",toggleEffect)

  return (
    <>
      <div className="d-flex justify-content-between">
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

      <div className="container-fluid connect-wallet">
        <div className="row">
          <div className="col-xl-12">
            <h1 className="title">Connect your wallet</h1>
            <p className="text">
              Connect with one of our most popular{" "}
              <span>
                {" "}
                wallets
              </span>{" "}
              providers
              <br />
              or create a new one
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="eachWalletTypeBox d-flex justify-content-start flex-wrap">
              <div
                onClick={connectMetamask}
                className="card card-effect1"
                style={{ cursor: "pointer" }}
              >
                <img
                  id="create_logo"
                  src={Metamask}
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

              {/* <div className="card">
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

              <div className="card">
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
              </div> */}
            </div>
         
            {/* <button
              type="button"
              className="btn btn-outline-primary btn-size"
            >
              Show more
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
