import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import image from "../../assets/images/icon.png";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { updateUserDetail } from "../../reducers/Action";
import "react-toastify/dist/ReactToastify.css";

function Create() {
  const [humburger, setHumburger] = useState(false);
  const ethereum = window.ethereum;
  const [errorMssg, setErrorMssg] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null); // defaultAccount having the wallet address
  console.log("ethereum ", ethereum && ethereum);
  const [checkClick, setcheckClick] = useState(false);
  const [getBalance, setGetBalance] = useState(null);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // if(ethereum){
  //   //   toast.success('Conneted Metamask ');
  //   // }
  //   if (window.ethereum) {
  //     window.ethereum
  //       .request({ method: "eth_requestAccounts" })
  //       .then((result) => {
  //         accountChangeHandler(result[0]); //accounts can be a array we just wanna grab first one
  //         console.log(result[0]);

  //         dispatch(
  //           updateUserDetail({ address: defaultAccount, balance: getBalance })
  //         );
  //         window.location.pathname = "/wallet";
  //       })
  //       .catch((e) => {
  //         console.log(e, "<<< error ");
  //       });
  //   } else {
  //     alert("Install MEtamask");
  //     setErrorMssg("Install Metamask ");
  //     toast.success("Connect Wallet");
  //   }
  // }, [window.ethereum, checkClick]);
  const connectMetamask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangeHandler(result[0]); //accounts can be a array we just wanna grab first one
          console.log(result[0]);

          dispatch(
            updateUserDetail({ address: defaultAccount, balance: getBalance })
          );
          window.location.pathname = "/wallet";
        })
        .catch((e) => {
          console.log(e, "<<< error ");
        });
    } else {
      setErrorMssg("Install Metamask ");
      toast.error("Install Metamak and Connect Wallet");
    }
  };
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
