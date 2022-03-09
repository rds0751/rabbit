import React, { useState, useEffect } from "react";
import image from "../../assets/images/1.jpg";
import share from "../../assets/images/share.svg";
import info from "../../assets/images/report.svg";
import "../../assets/styles/nftReportModal.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { BidApi, OfferApi } from "../../constants/Nft_Info_Api";
import PricingHistoryComponentTable from "../../common/components/PricingHistoryComponentTable";
import PricingHistoryComponentGraph from "../../common/components/PricingHistoryComponentGraph";
// import BidsComponent from "./BidsComponent";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../assets/styles/createSingleNft.css";
import dropdowmImage from "../../assets/images/drop down.png";

import { Button } from "@mui/material";
import { getNft, addNftReport } from "../../services/webappMicroservice";
import { useSelector } from "react-redux";
import {
  put_NftOpenForSale,
  RemoveNftFromSale,
} from "../../services/contentServices";
import { toast } from "react-toastify";

import { getUser } from "../../services/UserMicroService";
import { Oval } from "react-loader-spinner";

import ListingsTable from "../../common/components/ListingTable";

export default function NftInformation(props) {
  console.log(props?.responseData, "<<<response");
  const navigate = useNavigate();
  const [activeInActive, setActiveInActive] = useState("active");
  const { user } = useSelector((state) => state);
  const [isCurrUserNft, setIsCurrUserNft] = useState(null);
  const [isOpenForSell, setisOpenForSell] = useState(null);
  const { loggedInUser, walletAddress } = user;
  const { id } = useParams();
  const [nft, setNft] = useState(props?.responseData);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [tab, setTab] = useState(1);
  const [report, setReport] = useState({
    content: id,
    // addedBy: user.addUserData._id,
    reason: "",
  });

  if (openReportModal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  console.log(
    loggedInUser?._id,
    props?.responseData,
    props?.loaderState,
    "<<<< this is data toooooooooooooooooooooooooooooooo match"
  );
  // alert(`${loggedInUser?._id}, ${props?.responseData?.createdBy}`);

  // useEffect(() => {
  //   alert(`${loggedInUser?._id}`);
  //   console.log(
  //     props.responseData,
  //     "<<<<response data at nft information << page"
  //   );
  // }, []);

  // setIsCurrUserNft(props.responseData.createdBy === loggedInUser?._id);
  // setisOpenForSell(props.responseData.salesInfo?.isOpenForSale);
  // alert(`${isCurrUserNft}, ${isOpenForSell}`);
  // useEffect(() => {
  //     // alert("data")

  //     // setNft();
  //     // setIsCurrUserNft(props.responseData.createdBy == loggedInUser._id);

  // }, []);
  // alert(`${isCurrUserNft},${loggedInUser._id},${isOpenForSell}`);
  // console.log("===",isCurrUserNft)
  // console.log("===",isOpenForSell)

  const demoHandleSell = async () => {
    props?.sellNowNft({
      // sellerId:loggedInUser._id,
      // buyerId:loggedInUser._id,
      // saleData:response.salesInfo,
      // tokenId:response.tokenId,
      // nftId:response._id,
    });
  };

  const removeNFTFromSell = async () => {
    props?.removeNftFromSale({
      // sellerId:loggedInUser._id,
      // buyerId:loggedInUser._id,
      // saleData:response.salesInfo,
      // tokenId:response.tokenId,
      // nftId:response._id,
    });
  };
  const buyNft = async () => {
    if (user.loggedInUser != null) {
      props?.BuyNowNft({
        buyerId: loggedInUser?._id,
        newOwnerAddress: walletAddress?.address,
      });
    } else {
      navigate("/add-wallet");
    }

    //   const response = await put_NftOpenForSale(nft._id);
    //   if (response.success) {
    //     toast.success(response.message);
    //     window.location.reload(false);
    //   } else toast.error(response.message);
  };

  const handleRemoveSell = async () => {
    const response = await RemoveNftFromSale(nft._id);
    if (response.success) {
      toast.success(response.message);
      window.location.reload(false);
    } else toast.error(response.message);
  };

  const handleChange = (e) =>
    setReport({
      ...report,
      reason: e.target.value,
    });

  const makeReport = () => {
    addNftReport(report);
  };

  useEffect(() => {
    getUser(props?.responseData?.ownedBy).then((response) =>
      setUserDetails(response)
    );
  });

  return (
    <>
      {props?.loaderState ? (
        <div className="center">
          {" "}
          <Oval
            vertical="top"
            horizontal="center"
            color="#00BFFF"
            height={30}
            width={30}
          />
        </div>
      ) : (
        ""
      )}
      <div className="nft-detail">
        <div className="container">
          <div className="row mt-5">
            <div className="d-sm-block d-md-block d-lg-none mb-2">
              <div className="row" id="share_info">
                <div className="col-xl-10 col-lg-10 col-md-9 col-sm-9">
                  <div className="edit-sell-button">
                    <Button
                      style={{
                        display:
                          props?.responseData?.ownerAddress == loggedInUser?.wallet_address
                            ? "block"
                            : "none",
                        color: "#366EEF",
                        backgroundColor: "white",
                        border: "1px solid #366EEF",
                        marginRight: "1rem",
                      }}
                    >
                      <Link
                        to={`/edit-items/${props?.responseData._id}`}
                        style={{
                          textDecoration: "none",
                          textTransform: "none",
                        }}
                      >
                        Edit
                      </Link>
                    </Button>
                    <Button
                      // className="btn btn-primary mt-3"
                      // data-bs-toggle="modal"
                      // data-bs-target="#myModalShare"
                      style={{
                        display:
                          props?.responseData?.ownerAddress == loggedInUser?.wallet_address &&
                          !props?.responseData?.salesInfo?.isOpenForSale
                            ? "block"
                            : "none",
                        color: "white",
                        backgroundColor: "#366eff",
                        marginRight: "1rem",
                        textTransform: "none",
                      }}
                      onClick={demoHandleSell}
                    >
                      sale
                    </Button>
                    <Button
                      style={{
                        display:
                          props?.responseData?.ownerAddress == loggedInUser?.wallet_address &&
                          props?.responseData?.salesInfo?.isOpenForSale
                            ? "block"
                            : "none",
                        color: "white",
                        backgroundColor: "#366eff",
                        textTransform: "none",
                      }}
                      onClick={removeNFTFromSell}
                    >
                      Remove From Sale
                    </Button>
                  </div>
                  <span className="nft-name">{props?.responseData?.name}</span>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3">
                  <span>
                    <img
                      alt="share"
                      src={share}
                      data-bs-toggle="modal"
                      data-bs-target="#myModalShare"
                      style={{ width: "31px", height: "31px", marginRight: "20px", }}
                    />
                    {/* <!-- The Modal --> */}
                    <div className="modal" id="myModalShare">
                      <div className="modal-dialog">
                        <div
                          className="modal-content"
                          style={{ borderRadius: "10px", paddingRight: "10px" }}
                        >
                          {/* <!-- Modal Header --> */}
                          <div className="modal-header">
                            <h4
                              className="modal-title font-15 font-weight-700 text-dark"
                              style={{ padding: "0px" }}
                            >
                              Make an Offer
                            </h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              style={{
                                width: "10px",
                                height: "10px",
                                boxShadow: "none",
                              }}
                            ></button>
                          </div>

                          {/* <!-- Modal body --> */}
                          <div className="modal-body px-4">
                            <h5 className="font-14 font-weight-700 text-dark">
                              Price
                            </h5>
                            <div className="input-group">
                              <span
                                className="input-group-text font-15 text-primary bg-white"
                                id="basic-addon1"
                                style={{ marginLeft: "-0.6em" }}
                              >
                                ETH
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="0.01($210)"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                              />
                            </div>
                            <h5
                              className="font-14 font-weight-700 mt-4 text-dark"
                              style={{ marginLeft: "-0.6em" }}
                            >
                              Expiration Date
                            </h5>
                            <div className="input-group">
                              <button
                                className="btn border dropdown-toggle font-15"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ marginLeft: "-0.6em" }}
                              >
                                A month
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Jan
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Feb
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Mar
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Apr
                                  </a>
                                </li>
                              </ul>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="&#xf017; 11:25 AM"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                              />
                            </div>
                            <h5
                              className="font-14 font-weight-700 mt-4 text-dark"
                              style={{ marginLeft: "-0.6em" }}
                            >
                              Expiration Date
                            </h5>
                            <div className="input-group">
                              <button
                                className="btn border dropdown-toggle font-15"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ marginLeft: "-0.6em" }}
                              >
                                A month
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Jan
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Feb
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Mar
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Apr
                                  </a>
                                </li>
                              </ul>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="&#xf017; 11:25 AM"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                              />
                            </div>
                          </div>

                          {/* <!-- Modal footer --> */}
                          <div className="modal-footer mb-4">
                            <button
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#myModalShare"
                              className="btn btn-primary w-100"
                              data-bs-dismiss="modal"
                              // style={{ marginLeft: "1.1em" }}
                            >
                              Make Offer
                            </button>
                          </div>

                          {/* <!-- Modal footer --> */}
                          <div className="modal-footer mb-4">
                            <button
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#myModalShare"
                              className="btn btn-primary w-100"
                              data-bs-dismiss="modal"
                              // style={{ marginLeft: "1.1em" }}
                            >
                              Make Offer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <img
                      src={info}
                      alt="info"
                      style={{ width: "31px", height: "31px" }}
                      data-bs-toggle="modal"
                      // data-bs-target="#myModalReport"
                      onClick={() => setOpenReportModal(true)}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-12">
              <div className="nftdetail-img">
                <img
                  src={props?.responseData?.ipfsUrl}
                  alt="nft"
                  className="border-radius imginfo_mob"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
              </div>
              
            </div>
            <div className="col-xl-7 col-lg-7 col-md-12 details-section">
              <div className="d-none d-sm-none d-md-none d-lg-block">
                <div className="row" id="share_info">
                  <div className="col-xl-10 col-lg-10 col-md-9 col-sm-9">
                    <div className="edit-sell-button">
                      <Button
                        style={{
                          display:
                            props?.responseData?.ownerAddress == loggedInUser?.wallet_address
                              ? "block"
                              : "none",
                          color: "#366EEF",
                          backgroundColor: "white",
                          border: "1px solid #366EEF",
                          marginRight: "1rem",
                        }}
                      >
                        <Link
                          to={`/edit-items/${props?.responseData._id}`}
                          style={{
                            textDecoration: "none",
                            textTransform: "none",
                          }}
                        >
                          Edit
                        </Link>
                      </Button>
                      <Button
                        // className="btn btn-primary mt-3"
                        // data-bs-toggle="modal"
                        // data-bs-target="#myModalShare"
                        style={{
                          display:
                            props?.responseData?.ownerAddress == loggedInUser?.wallet_address &&
                            !props?.responseData?.salesInfo?.isOpenForSale
                              ? "block"
                              : "none",
                          color: "white",
                          backgroundColor: "#366eff",
                          marginRight: "1rem",
                          textTransform: "none",
                        }}
                        onClick={demoHandleSell}
                      >
                        Sale
                      </Button>
                      <Button
                        style={{
                          display:
                            props?.responseData?.ownerAddress == loggedInUser?.wallet_address &&
                            props?.responseData?.salesInfo?.isOpenForSale
                              ? "block"
                              : "none",
                          color: "white",
                          backgroundColor: "#366eff",
                          textTransform: "none",
                        }}
                        onClick={removeNFTFromSell}
                      >
                        Remove From Sell
                      </Button>
                    </div>
                    <span className="nft-name">{props?.responseData?.name}</span>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3">
                    <span className="share-img">
                      <img
                        alt="share"
                        src={share}
                        data-bs-toggle="modal"
                        data-bs-target="#myModalShare"
                        style={{ width: "31px", height: "31px", marginRight: "20px", }}
                      />
                      {/* <!-- The Modal --> */}
                      <div className="modal" id="myModalShare">
                        <div className="modal-dialog">
                          <div
                            className="modal-content"
                            style={{ borderRadius: "10px", paddingRight: "10px" }}
                          >
                            {/* <!-- Modal Header --> */}
                            <div className="modal-header">
                              <h4
                                className="modal-title font-15 font-weight-700 text-dark"
                                style={{ padding: "0px" }}
                              >
                                Make an Offer
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  boxShadow: "none",
                                }}
                              ></button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <div className="modal-body px-4">
                              <h5 className="font-14 font-weight-700 text-dark">
                                Price
                              </h5>
                              <div className="input-group">
                                <span
                                  className="input-group-text font-15 text-primary bg-white"
                                  id="basic-addon1"
                                  style={{ marginLeft: "-0.6em" }}
                                >
                                  ETH
                                </span>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="0.01($210)"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                />
                              </div>
                              <h5
                                className="font-14 font-weight-700 mt-4 text-dark"
                                style={{ marginLeft: "-0.6em" }}
                              >
                                Expiration Date
                              </h5>
                              <div className="input-group">
                                <button
                                  className="btn border dropdown-toggle font-15"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  style={{ marginLeft: "-0.6em" }}
                                >
                                  A month
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Jan
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Feb
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Mar
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Apr
                                    </a>
                                  </li>
                                </ul>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="&#xf017; 11:25 AM"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                />
                              </div>
                            </div>

                            {/* <!-- Modal footer --> */}
                            <div className="modal-footer mb-4">
                              <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#myModalShare"
                                className="btn btn-primary w-100"
                                data-bs-dismiss="modal"
                                // style={{ marginLeft: "1.1em" }}
                                // style={{ marginLeft: "1.1em" }}
                              >
                                Make Offer
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <img
                        src={info}
                        alt="info"
                        style={{ width: "31px", height: "31px" }}
                        // data-bs-toggle="modal"
                        // data-bs-target="#myModalReport"
                        onClick={() => {
                          setOpenReportModal(true);
                        }}
                      />
                      {/* <!-- The Modal --> */}
                      <div className="modal" id="myModalReport">
                        <div className="modal-dialog">
                          <div
                            className="modal-content"
                            style={{ borderRadius: "10px", paddingRight: "10px" }}
                          >
                            {/* <!-- Modal Header --> */}
                            <div className="modal-header">
                              <h4 className="modal-title font-15 font-weight-700 text-dark">
                                Report this item
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  boxShadow: "none",
                                }}
                              ></button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <div className="modal-body">
                              <h5
                                className="font-14 font-weight-700 text-dark"
                                style={{ marginLeft: "-0.6em" }}
                              >
                                Reason
                              </h5>
                              <div
                                className="input-group mt-3"
                                style={{ marginLeft: "-0.6em" }}
                              >
                                <select
                                  className="form-select"
                                  id="inputGroupSelect02"
                                  onChange={(e) => handleChange(e)}
                                >
                                  <option
                                    value="Fake collection or possible scam"
                                    selected
                                  >
                                    Fake collection or possible scam
                                  </option>
                                  <option value="Explicit and sensitive content">
                                    Explicit and sensitive content
                                  </option>
                                  <option value="Spam">Spam</option>
                                  <option value="Might be stolen">
                                    Might be stolen
                                  </option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                            </div>

                            {/* <!-- Modal footer --> */}
                            <div className="modal-footer mb-4">
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                data-bs-dismiss="modal"
                                style={{ marginLeft: "1.1em" }}
                                onClick={makeReport}
                              >
                                Make Offer
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="second-text align-row">
                <span className="text">
                  Current Price:
                  <span className="nft-value" style={{ color: "#16AB6E" }}>
                    0.32 ETH
                  </span>
                </span>
                <span className="align-row">
                  <i className="far fa-clock clock-icon"></i>
                  <span className="time">Ends in 5 days </span>
                </span>
              </div>
              <div className="row third-text">
                <div className="col-lg-6 col-sm-12">
                  <span className="text">
                    Owned by:
                    <span className="text-name fw-b">{userDetails.firstName}</span>
                  </span>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <span className="text">
                    Created by:
                    <span className="text-name fw-b">{userDetails.firstName}</span>
                  </span>
                </div>
              </div>
              <div className="fourth-text">
                <div style={{ marginRight: "20px" }}>
                  <VisibilityIcon
                    style={{ fontSize: "21px", color: "#366EEF" }}
                  />
                  <span className="text fw-b" style={{ marginLeft: "0.5em" }}>
                    {props?.responseData?.viewsCount}
                  </span>
                </div>
                <div>
                  <FavoriteIcon style={{ fontSize: "17px", color: "#EF3643" }} />
                  <span className="text fw-b" style={{ marginLeft: "0.5em" }}>
                    {props?.responseData?.likesCount}
                  </span>
                </div>
              </div>
              <div
                className=""
              >
                <h4 className="title">Description</h4>
                <p className="description">{props?.responseData?.description}</p>
              </div>

              {/*  IF nft is not created by logged in user these buttons will be shown */}
              <div className="buy-offer-btn">
                <Button
                  style={{
                    display:
                      props?.responseData?.ownedBy != loggedInUser?._id &&
                      props?.responseData?.salesInfo?.isOpenForSale
                        ? "block"
                        : "none",
                    color: "white",
                    marginRight: "2rem",
                    backgroundColor: "#366eff",
                    textTransform: "none",
                  }}
                  onClick={buyNft}
                >
                  Buy Now
                </Button>
                <Button
                  data-bs-toggle="modal"
                  data-bs-target="#myModalShare"
                  style={{
                    display:
                      props?.responseData?.createdBy != loggedInUser?._id &&
                      props?.responseData?.salesInfo?.isOpenForSale
                        ? "block"
                        : "none",
                    color: "#366EEF",
                    backgroundColor: "white",
                    textTransform: "none",
                    border: "1px solid #366EEF",
                  }}
                  onClick={removeNFTFromSell}
                >
                  Make Offer
                </Button>
              </div>

              <div className="grap-area">
                <ul>
                  <li
                    onClick={() => {
                      setTab(1);
                    }}
                    style={{
                      borderBottom: tab === 1 ? "2px solid #366EEF" : "",
                      color: tab === 1 ? "#000000" : "#828282",
                      fontWeight: tab === 1 ? 600 : "",
                      marginRight: "16px",
                      fontFamily: tab === 1 ? "poppins-bold" : "poppins",
                    }}
                  >
                    Pricing History
                  </li>
                  <li
                    onClick={() => {
                      setTab(2);
                    }}
                    style={{
                      borderBottom: tab === 2 ? "2px solid #366EEF" : "",
                      color: tab === 2 ? "#000000" : "#828282",
                      fontWeight: tab === 2 ? 600 : "",
                      marginRight: "16px",
                      fontFamily: tab === 2 ? "poppins-bold" : "poppins",
                    }}
                  >
                    Listings
                  </li>
                  <li
                    onClick={() => {
                      setTab(3);
                    }}
                    style={{
                      borderBottom: tab === 3 ? "2px solid #366EEF" : "",
                      color: tab === 3 ? "#000000" : "#828282",
                      fontWeight: tab === 3 ? 600 : "",
                      fontFamily: tab === 3 ? "poppins-bold" : "poppins",
                    }}
                  >
                    Offers
                  </li>
                </ul>
                {tab === 1 ? <PricingHistoryComponentGraph id={id} /> : ""}
                {tab === 2 ? <ListingsTable /> : ""}
                {tab === 3 ? <ListingsTable /> : ""}
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
              <PricingHistoryComponentTable id={id} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="report-outer"
        style={{ display: openReportModal ? "block" : "none" }}
      >
        <div className="report-abs-modal">
          <div className="report-modal">
            <div className="report-inner" style={{ opacity: "1" }}>
              <div className="reportthisitem">
                <h3 className="report-text poppins-normal">
                  Report this item
                </h3>                
                <i className="fa-solid fa-xmark cross-icon"
                  onClick={() => setOpenReportModal(false)}>
                </i>
              </div>
              <div className="singlerowmodal">
                <h3 className="reason-text"> Reason</h3>
                  <select>
                    <option>Select reason</option>
                    <option value="Fake collection or possible scam">Fake collection or possible scam</option>
                    <option value="Explicit and sensitive content">Explicit and sensitive content</option>
                    <option value="Might be stolen">Might be stolen</option>
                    <option value="Other">Other</option>
                  </select>
              </div>
              <button className="report-btn" onClick={() => setOpenReportModal(false)}>Report</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const NftActiveInActiveBlock = ({ apiData }) => {
  return (
    <div className="row">
      {apiData.map((curElem) => {
        const { id, image, heading, time, btnText } = curElem;
        return (
          <div className="Bids">
            <div className="row border-bottom pt-2">
              <div className="col-1">
                <div>
                  <img src={image} width={42} />
                </div>
              </div>
              <div className="col-11">
                <p className="font-14 text-dark mt-1">{heading}</p>
                <p className="font-14 text-secondary">{time}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
