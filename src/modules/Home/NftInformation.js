import React, { useState, useEffect } from "react";
import { FacebookShareButton } from "react-share";
import { TwitterShareButton } from "react-share";
import share from "../../assets/images/share.svg";
import info from "../../assets/images/report.svg";
import copyIcon from "../../assets/images/copy.png";
import Imagep from "../../assets/images/imagep.svg"
import facebookIcon from "../../assets/images/facebook.png";
import twitterIcon from "../../assets/images/Twitter.png";
import "../../assets/styles/nftReportModal.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { BidApi, OfferApi } from "../../constants/Nft_Info_Api";
import PricingHistoryComponentTable from "../../common/components/PricingHistoryComponentTable";
import PricingHistoryComponentGraph from "../../common/components/PricingHistoryComponentGraph";
// import BidsComponent from "./BidsComponent";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../assets/styles/createSingleNft.css";
import success from "../../assets/images/Check.svg";
import closeIcon from "../../assets/images/closeIcon.svg";
import { Button } from "@mui/material";
import { getNft, addNftReport } from "../../services/webappMicroservice";
import { useSelector } from "react-redux";
import {
  put_NftOpenForSale,
  RemoveNftFromSale,
} from "../../services/contentServices";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import Snackbar from "@mui/material/Snackbar";
import styled from "styled-components";
import ListingsTable from "../../common/components/ListingTable";
import DetailPage from "../../common/components/DetailPage";
import CopyToClipboard from "react-copy-to-clipboard";
import Ethereum from "../../assets/images/ether.svg";
import Polygon from "../../assets/images/ploygon.svg";
import Binance from "../../assets/images/binance.svg";
import {
  getCollection,
  getNftsByCollectionId,
} from "../../services/webappMicroservice";
import LikedNfts from "../../modules/MyPages/LikedNfts";
import NftCardsHome from "../../common/components/NftCardsHome";
import "../../assets/styles/myProfile.css"
import { fetchPalletsColor } from "../../utility/global";
toast.configure();
const CustomSnack = styled(Snackbar)`
  @media (min-width: 992px) {
    position: absolute !important;
    top: 69px !important;
    left: auto !important;
    right: auto !important;
  }

  @media only screen and (min-width: 0px) and (max-width: 991px) {
    display: none !important;
  }
`;
const CustomSnack2 = styled(Snackbar)`
  @media only screen and (min-width: 992px) and (max-width: 5000px) {
    display: none !important;
  }

  @media only screen and (min-width: 770px) and (max-width: 991px) {
    position: absolute !important;
    top: 69px !important;
    left: auto !important;
    right: 0px !important;
  }
  @media only screen and (min-width: 701px) and (max-width: 769px) {
    position: absolute !important;
    top: 69px !important;
    left: auto !important;
    right: 140px !important;
  }
  @media only screen and (min-width: 504px) and (max-width: 700px) {
    width: 86px;
    position: absolute !important;
    top: 161px !important;
    left: 402px !important;
    right: 8px !important;
  }
  @media only screen and (min-width: 0px) and (max-width: 503px) {
    width: 86px;
    position: absolute !important;
    top: 161px !important;
    left: 190px !important;
    right: 8px !important;
  }
`;
const Select = styled.select`
  border: none;
  border-radius: 4px;
  width: 108px;
  height: 40px;
  padding-left: 13px;
  font-family: "poppins-medium";
  font-size: 14px;
  line-height: 21px;
  color: #191919;
  background-color: #fff;
  cursor: pointer;
`;
const Option = styled.option`
  font-size: 14px;
`;
const queryString = require("query-string");
export default function NftInformation(props) {

  const appearance = useSelector(state => state.customize.appearance);

  const navigate = useNavigate();
  const [activeInActive, setActiveInActive] = useState("active");
  const { user } = useSelector((state) => state);
  const [isCurrUserNft, setIsCurrUserNft] = useState(null);
  const [isOpenForSell, setisOpenForSell] = useState(null);
  const { loggedInUser, walletAddress } = user;
  const { id } = useParams();


  const nft = props?.responseData;

  const defaultFilter = {
    searchByName: "",
    status: "",
    sortBy: "",
    minPrice: "",
    maxPrice: "",
  }

  const { owner, creator, salesInfo, blockchain } = nft;
  const [openReportModal, setOpenReportModal] = useState(false);
  const [saleModal, setsaleModal] = useState(false);
  const [putOnSaleModal, setPutOnSaleModal] = useState(false);
  const [removeFromSale, setRemoveFromSale] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);

  const [openRemoveSale, setOpenRemoveSale] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [tab, setTab] = useState(1);
  const [toShow, settoShow] = useState(true);
  const [makeOfferModal, setMakeOfferModal] = useState(false);
  const [filter, setFilter] = useState(defaultFilter);
  const [moreNft, setMoreNfts] = useState([]);

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const userIdLocal = localStorage.getItem('userId');

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [report, setReport] = useState({
    contentId: id,
    addedBy: loggedInUser?._id,
    reason: "",
  });
  if (!props.loaderState) {
    // setRemoveFromSale(false)
    // setOpenLoadingModal(false)
  }
  const [reason, setReason] = useState("");

  if (openReportModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (openRemoveSale) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  useEffect(() => {
    async function fetchData() {
      // setIsLoading(true);
      const reqObj = queryString.stringify(filter);
      await getNftsByCollectionId(nft?.collectionId, reqObj).then((res) => {
        setMoreNfts(res.nftContent);
        // setIsLoading(false);
      });
    }
    fetchData();
  }, [nft]);

  useEffect(() => {

  }, [nft.cdnUrl])


  // alert(`${loggedInUser?._id}, ${props?.responseData?.createdBy}`);

  // useEffect(() => {
  //   alert(`${loggedInUser?._id}`);

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

  const facebook = async () => {
    window.open("https://www.facebook.com/", "_blank");
  };
  const twitter = async () => {
    window.open("https://twitter.com/i/flow/login", "_blank");
  };
  const handleCopyToClipboard = () => {
    // alert(window.location.href);

    // const { wallet_address } = loggedInUser;
    // navigator.clipboard.writeText(window.location.href);
    // navigator.clipboard.writeText(walletAddressUnquoted);
    // setCopiedText(true);
    // toast.success("Text Copied");
    // setTimeout(() => {
    // setCopiedText(false);
    // }, 1000);
  };
  const demoHandleSell = async () => {
    setsaleModal(false);
    setPutOnSaleModal(true);

    props?.sellNowNft({
      // sellerId:loggedInUser._id,
      // buyerId:loggedInUser._id,
      // saleData:response.salesInfo,
      // tokenId:response.tokenId,
      // nftId:response._id,
      blockchain: nft?.blockchain
    });
    // setPutOnSaleModal(false)
  };

  const removeNFTFromSell = async () => {
    setRemoveFromSale(true);
    props?.removeNftFromSale({
      // sellerId:loggedInUser._id,
      // buyerId:loggedInUser._id,
      // saleData:response.salesInfo,
      // tokenId:response.tokenId,
      // nftId:response._id,
      blockchain: nft?.blockchain
    });
    // setRemoveFromSale(false)
  };
  const buyNft = async () => {
    if (user.loggedInUser != null) {
      props?.BuyNowNft({
        buyerId: loggedInUser?._id,
        newOwnerAddress: walletAddress?.address,
        blockchain: nft?.blockchain
      });
      setOpenLoadingModal(true);
    } else {
      navigate("/add-wallet");
    }

    //   const response = await put_NftOpenForSale(nft._id);
    //   if (response.success) {
    //     toast.success(response.message);
    //     window.location.reload(false);
    //   } else toast.error(response.message);
  };
  const makeOffer = async () => {
    //setMakeOfferModal(true);

  }
  const openSaleModal = async () => {
    // alert("kkkk")
    setsaleModal(true);
  };
  const handleRemoveSell = async () => {
    const response = await RemoveNftFromSale(nft._id);
    if (response.success) {
      toast.success(response.message);
      window.location.reload(false);
    } else toast.error(response.message);
  };

  const handleChange = (e) => setReason(e.target.value);

  const makeReport = () => {
    addNftReport(report);
  };
  // const makeReport = () => {
  //   addNftReport(report);
  // };

  const sendButton = () => {
    removeNFTFromSell();
    setOpenRemoveSale(false);
  };

  const difftime = (timestamp1, timestamp2) => {
    var difference = timestamp1 - timestamp2;
    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

    return daysDifference;
  };

  let showDateSection = true;

  let message = "";

  if (nft?.biddingDetails?.endDate) {
    const currDate = new Date();

    const currentDate = Date.now(currDate);

    const endDate = nft?.biddingDetails?.endDate;

    let endDateTimeStamp = Math.floor(new Date(endDate).getTime());

    const days =
      endDateTimeStamp == currentDate
        ? 1
        : difftime(endDateTimeStamp, currentDate);

    message =
      endDateTimeStamp < currentDate ? "Expired" : `End in ${days} days`;
  } else {
    showDateSection = false;
  }

  const sendReport = async () => {
    let report = {
      contentId: id,
      addedBy: loggedInUser?._id,
      reason: `${reason}`,
    };
    const reportObj = queryString.stringify(report);
    await addNftReport(reportObj, (response) => {
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error("This Nft is already reported");
      }
      setOpenReportModal(false);
    });
  };

  let ownedBy = owner?.userName ? owner?.userName : owner?.wallet_address;
  let createdBy = creator?.userName
    ? creator?.userName
    : creator?.wallet_address;
  const url = window.location.href;


  const blockchainCheck = (blockchain) => {
    switch (blockchain) {
      case 'Ethereum':
        return <img className="currency-sign-nftinformation" src={Ethereum}></img>
      case 'Polygon':
        return <img className="currency-sign-nftinformation" src={Polygon}></img>
      case 'Binance':
        return <img className="currency-sign-nftinformation" src={Binance}></img>
      default:
        return '';
    }

  }

  return (
    <>
      {/* {props?.refreshPage ? window.location.reload(true) : ""} */}
      {props?.loaderState
        ? ""
        : setTimeout(() => {
          window.location.reload(true);
        }, 1000)}

      {/* {props?.loaderState ? (
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
      )} */}
      <div className="nft-detail">
        <div className="container info-container">
          <div className="row" style={{ marginTop: "44px" }}>
            <div className="d-sm-block d-md-block d-lg-none mb-2">
              <div id="share_info">
                <div className="">
                  <div className="edit-sell-button">
                    {/* <Button
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
                    </Button> */}
                    <Button
                      // className="btn btn-primary mt-3"
                      // data-bs-toggle="modal"
                      // data-bs-target="#myModalShare"
                      style={{
                        display:
                          props?.responseData?.ownerAddress ==
                            loggedInUser?.wallet_address &&
                            !props?.responseData?.salesInfo?.isOpenForSale
                            ? "block"
                            : "none",
                        color: "white",
                        backgroundColor: "#366eff",
                        marginRight: "1rem",
                        textTransform: "none",
                      }}
                      onClick={openSaleModal}
                    >
                      sale
                    </Button>
                    <Button
                      style={{
                        display:
                          props?.responseData?.ownerAddress ==
                            loggedInUser?.wallet_address &&
                            props?.responseData?.salesInfo?.isOpenForSale
                            ? "block"
                            : "none",
                        color: "white",
                        backgroundColor: "#366eff",
                        textTransform: "none",
                      }}
                      onClick={() => setOpenRemoveSale(true)}
                    >
                      Remove From Sale
                    </Button>
                  </div>
                  <span className="nft-name">{nft.name}</span>
                </div>
                <div className=" d-flex align-items-center">
                  <a
                    className="nav-link dropdown"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      alt="share"
                      src={share}
                      style={{
                        width: "31px",
                        height: "31px",
                        marginRight: "20px",
                      }}
                    />
                  </a>
                  <ul
                    className="dropdown-menu profilemenu"
                    aria-labelledby="navbarDropdown"
                    style={{
                      width: "220px",
                      position: "absolute",
                      marginLeft: "30px",
                      boxShadow: "0px 3px 6px #00000012",
                      border: "1px solid #F4F4F4",
                      borderRadius: "6px",
                      background: "#FFFFFF",
                    }}
                  >
                    <li className="list-item" >
                      <CopyToClipboard text={url}>
                        <button
                          className="copy-url-button"
                          onClick={handleClick({
                            vertical: "top",
                            horizontal: "right",
                          })}
                        >
                          <img src={copyIcon} alt="icon" className="icon" />
                          <span className="icon-text">Copy link</span>
                        </button>
                      </CopyToClipboard>
                    </li>
                    <li className="list-item">
                      {/* <img src={facebookIcon} alt="icon" className="icon" />
                        <span className="icon-text">Share on Facebook</span> */}
                      <FacebookShareButton url={url}>
                        <img src={facebookIcon} alt="icon" className="icon" />
                        <span className="icon-text">Share on Facebook</span>
                      </FacebookShareButton>
                    </li>
                    <li className="list-item">
                      {/* <img src={twitterIcon} alt="icon" className="icon" />
                        <span className="icon-text">Share on Twitter</span> */}
                      <TwitterShareButton url={url}>
                        <img src={twitterIcon} alt="icon" className="icon" />
                        <span className="icon-text">Share on Twitter</span>{" "}
                      </TwitterShareButton>
                    </li>
                  </ul>

                  <img
                    src={info}
                    alt="info"
                    style={{ width: "31px", height: "31px", cursor: "pointer" }}
                    // data-bs-toggle="modal"
                    onClick={() => setOpenReportModal(true)}
                  />
                </div>
              </div>
            </div>
            <CustomSnack2
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              message="Copied"
              key={vertical + horizontal}
              autoHideDuration={2000}
              className="custom-snack"
            />
            <div className="col-xl-5 col-lg-5 col-md-12">
              <div className="nftdetail-img">

                {
                  nft.cdnUrl === "" ?
                    <img
                      onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
                      // src={nft.cdnUrl}
                      src={nft.ipfsUrl}
                      // src={Imagep}
                      alt="nft"
                      className="border-radius imginfo_mob"
                      style={{
                        maxWidth: "100%",
                        // height: "837px",
                        borderRadius: "8px",

                      }}
                    />
                    : nft.cdnUrl ?
                      <img
                        onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
                        // src={nft.cdnUrl}
                        src={nft.cdnUrl}
                        // src={Imagep}
                        alt="nft"
                        className="border-radius imginfo_mob"
                        style={{
                          maxWidth: "100%",
                          // height: "837px",
                          borderRadius: "8px",

                        }}
                      /> : <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 110 110">
                        <g id="image" transform="translate(-372 -618)">
                          <rect id="Rectangle_271" data-name="Rectangle 271" width="110" height="110" transform="translate(372 618)" fill="none" />
                          <g id="Icon_feather-image" data-name="Icon feather-image" transform="translate(380 626)">
                            <path id="Path_34" data-name="Path 34" d="M15.053,4.5H88.926A10.553,10.553,0,0,1,99.479,15.053V88.926A10.553,10.553,0,0,1,88.926,99.479H15.053A10.553,10.553,0,0,1,4.5,88.926V15.053A10.553,10.553,0,0,1,15.053,4.5Z" transform="translate(-4.5 -4.5)" fill="none" stroke={`${fetchPalletsColor(appearance.colorPalette)}`} stroke-linecap="round" stroke-linejoin="round" stroke-width="5" />
                            <path id="Path_35" data-name="Path 35" d="M26.33,18.415A7.915,7.915,0,1,1,18.415,10.5,7.915,7.915,0,0,1,26.33,18.415Z" transform="translate(10.607 10.607)" fill="none" stroke={`${fetchPalletsColor(appearance.colorPalette)}`} stroke-linecap="round" stroke-linejoin="round" stroke-width="5" />
                            <path id="Path_36" data-name="Path 36" d="M91.926,41.383,65.543,15,7.5,73.043" transform="translate(3.053 21.936)" fill="none" stroke={`${fetchPalletsColor(appearance.colorPalette)}`} stroke-linecap="round" stroke-linejoin="round" stroke-width="5" />
                          </g>
                        </g>
                      </svg>

                }

                {/*
                  <img
                    onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
                    // src={nft.cdnUrl}
                    src={nft.cdnUrl === "" ? nft.ipfsUrl : nft.cdnUrl ? nft.cdnUrl : Imagep}
                    // src={Imagep}
                    alt="nft"
                    className="border-radius imginfo_mob"
                    style={{
                      maxWidth: "100%",
                      // height: "837px",
                      borderRadius: "8px",

                    }}
                  />
                  */}
              </div>
              <div className="row mt-4 desktop-acti">
                <PricingHistoryComponentTable id={id} />
              </div>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-12 details-section">
              <div className="d-none d-sm-none d-md-none d-lg-block">
                <div className="row" id="share_info">
                  <div className="col-xl-10 col-lg-10 col-md-9 col-sm-9">
                    <div className="edit-sell-button">
                      {/* <Button
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
                      </Button> */}
                      {
                        nft.length !== 0 ?
                          <Button
                            // className="btn btn-primary mt-3"
                            // data-bs-toggle="modal"
                            // data-bs-target="#myModalShare"
                            style={{
                              display:
                                props?.responseData?.ownerAddress ==
                                  loggedInUser?.wallet_address &&
                                  !props?.responseData?.salesInfo?.isOpenForSale
                                  ? "block"
                                  : "none",
                              color: "white",
                              backgroundColor: "#366eff",
                              marginRight: "1rem",
                              textTransform: "none",
                            }}
                            onClick={openSaleModal}
                          >
                            Put it on sale
                          </Button>
                          : null
                      }
                      <Button
                        style={{
                          display:
                            props?.responseData?.ownerAddress ==
                              loggedInUser?.wallet_address &&
                              props?.responseData?.salesInfo?.isOpenForSale
                              ? "block"
                              : "none",
                          color: "white",
                          backgroundColor: "#366eff",
                          textTransform: "none",
                        }}
                        onClick={() => setOpenRemoveSale(true)}
                      >
                        Remove from Sale
                      </Button>
                    </div>
                    <span className="nft-name">{nft.name}</span>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 d-flex align-items-center">
                    <div>
                      <a
                        className="nav-link dropdown"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          alt="share"
                          src={share}
                          style={{
                            width: "31px",
                            height: "31px",
                            marginRight: "0px",
                          }}
                        />
                      </a>
                      <ul
                        className="dropdown-menu profilemenu"
                        aria-labelledby="navbarDropdown"
                        style={{
                          width: "220px",
                          position: "absolute",
                          marginLeft: "30px",
                          boxShadow: "0px 3px 6px #00000012",
                          border: "1px solid #F4F4F4",
                          borderRadius: "6px",
                          background: "#FFFFFF",
                        }}
                      >
                        <li
                          className="list-item"

                        >
                          {" "}
                          <CopyToClipboard text={url}>
                            <button
                              className="copy-url-button"
                              onClick={handleClick({
                                vertical: "top",
                                horizontal: "right",
                              })}
                            >
                              <img src={copyIcon} alt="icon" className="icon" />
                              <span className="icon-text">Copy link</span>
                            </button>
                          </CopyToClipboard>
                        </li>
                        <li className="list-item">
                          {/* <img src={facebookIcon} alt="icon" className="icon" />
                          <span className="icon-text">Share on Facebook</span> */}
                          <FacebookShareButton url={url}>
                            <img
                              src={facebookIcon}
                              alt="icon"
                              className="icon"
                            />
                            <span className="icon-text">Share on Facebook</span>
                          </FacebookShareButton>
                        </li>
                        <li className="list-item">
                          <TwitterShareButton url={url}>
                            <img
                              src={twitterIcon}
                              alt="icon"
                              className="icon"
                            />
                            <span className="icon-text">Share on Twitter</span>{" "}
                          </TwitterShareButton>
                        </li>
                      </ul>
                    </div>
                    <CustomSnack
                      anchorOrigin={{ vertical, horizontal }}
                      open={open}
                      onClose={handleClose}
                      message="Copied"
                      key={vertical + horizontal}
                      // autoHideDuration={2000}
                      className="custom-snack"
                    />
                    <img
                      src={info}
                      alt="info"
                      style={{
                        width: "31px",
                        height: "31px",
                        cursor: "pointer",
                      }}
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
                            // onClick={makeReport}
                            >
                              Make Offer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="second-text align-row">
                <span className="text">
                  Current Price:&nbsp;
                  <span className="nft-value">
                    {blockchainCheck(blockchain)}
                    {salesInfo?.price}&nbsp;{salesInfo?.currency}
                  </span>
                </span>
                {showDateSection ? (
                  <span className="align-row">
                    <i className="far fa-clock clock-icon"></i>
                    <span className="time">{message} </span>
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="row third-text">
                <div className="col-lg-6 col-sm-12">
                  <span className="text">
                    Owned by:&nbsp;
                    <Link
                      to={"/user-profile/" + owner?._id}
                      style={{ textDecoration: "none" }}
                    >
                      <span className="text-name fw-b">
                        {/* {ownedBy} */}
                        {owner?.wallet_address === user?.walletAddress?.address ? "You" : ownedBy}
                        {/* {(String(ownedBy).length >= 7) ? (!ownedBy ? " " : (String(ownedBy).substring(0, 8) + "...")) : (String(ownedBy) === undefined ? "" : ownedBy)}                     */}
                      </span>
                    </Link>
                  </span>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <span className="text">
                    Created by:&nbsp;
                    <Link
                      to={"/user-profile/" + owner?._id}
                      style={{ textDecoration: "none" }}
                    >
                      <span className="text-name fw-b">
                        {/* {createdBy} */}
                        {creator?.wallet_address === user?.walletAddress?.address ? "You" : createdBy}
                        {/* {(String(createdBy).length >= 7) ? (!createdBy ? " " : (String(createdBy).substring(0, 8) + "...")) : (String(createdBy) === undefined ? "" : createdBy)}                     */}
                      </span>
                    </Link>
                    <span className="text-name fw-b"></span>
                  </span>
                </div>
              </div>
              <div className="fourth-text">
                <div style={{ marginRight: "20px" }}>
                  <VisibilityIcon
                    style={{ fontSize: "21px", color: `${fetchPalletsColor(appearance.colorPalette)}` }}
                  />
                  <span className="text fw-b" style={{ marginLeft: "0.5em" }}>
                    {nft.viewsCount}
                  </span>
                </div>
                <div>
                  <FavoriteIcon
                    style={{ fontSize: "17px", color: "#EF3643" }}
                  />
                  <span className="text fw-b" style={{ marginLeft: "0.5em" }}>
                    {nft?.likes?.length}
                  </span>
                </div>
              </div>
              <div className="">
                <h4 className="title">Description</h4>
                <p className="description">{nft.description}</p>
              </div>

              {/*  IF nft is not created by logged in user these buttons will be shown */}

              <div className="buy-offer-btn">


                <Button
                  style={{
                    display:
                      props?.responseData?.ownedBy != userIdLocal &&
                        props?.responseData?.salesInfo?.isOpenForSale
                        ? "block"
                        : "none",
                    background: `${fetchPalletsColor(appearance.colorPalette)}`

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
                      props?.responseData?.createdBy != userIdLocal &&
                        props?.responseData?.salesInfo?.isOpenForSale
                        ? "block"
                        : "none",
                    color: `${fetchPalletsColor(appearance.colorPalette)}`,
                    backgroundColor: "white",
                    textTransform: "none",
                    border: `1px solid ${fetchPalletsColor(appearance.colorPalette)}`,
                  }}
                  onClick={makeOffer}
                  className="makeOfferButton"

                >
                  <span>Make Offer</span>
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
                      marginRight: "16px",
                      fontFamily: tab === 3 ? "poppins-bold" : "poppins",
                    }}
                  >
                    Offers
                  </li>
                  <li
                    onClick={() => {
                      setTab(4);
                    }}
                    style={{
                      borderBottom: tab === 4 ? "2px solid #366EEF" : "",
                      color: tab === 4 ? "#000000" : "#828282",
                      fontWeight: tab === 4 ? 600 : "",
                      marginRight: "16px",
                      fontFamily: tab === 4 ? "poppins-bold" : "poppins",
                    }}
                  >
                    Details
                  </li>
                  {/* <li
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
                  </li> */}
                </ul>
                {tab === 1 ? <PricingHistoryComponentGraph id={id} currency={nft?.salesInfo?.currency} /> : ""}
                {tab === 2 ? <ListingsTable id={id} /> : ""}
                {tab === 3 ? <ListingsTable id={id} /> : ""}
                {tab === 4 ? <DetailPage nft={nft} /> : ""}
              </div>
            </div>
          </div>

          <div className="row mt-4 activities">
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
              <PricingHistoryComponentTable id={id} />
            </div>
          </div>


          <div className="more-Collection-div" style={{ display: moreNft?.length > 0 ? "block" : "none" }}>
            <label className="MoreCollection">More from this collection</label>
            <div className="nftTileContainer ntf_row scroll-nft-card"
              style={{
                justifyContent: "start",
                overflowX: moreNft?.length > 4 ? "scroll" : "hidden"
              }}>

              {
                moreNft.map((nft) => {

                  return (
                    <>
                      <NftCardsHome nft={nft} appearance={appearance} />

                    </>
                  );



                })
              }

            </div>
          </div>


          {/* <div className="row mt-4">
                <PricingHistoryComponentTable id={id} />
              </div> */}
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
                <h3 className="report-text poppins-normal">Report this item</h3>
                <i
                  className="fa-solid fa-xmark cross-icon icrossicon"
                  onClick={() => setOpenReportModal(false)}
                ></i>
              </div>
              <div className="singlerowmodal">
                <h3 className="reason-text"> Reason</h3>
                <select
                  className="select-box"
                  onChange={(e) => handleChange(e)}
                >
                  <option>Select reason</option>
                  <option value="Fake collection or possible scam">
                    Fake collection or possible scam
                  </option>
                  <option value="Explicit and sensitive content">
                    Explicit and sensitive content
                  </option>
                  <option value="Might be stolen">Might be stolen</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button
                className="btn btn-primary report-btn"
                onClick={sendReport}
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* --------------------this modal for sale button NFT----------- */}
      <div
        className="report-outer"
        style={{ display: saleModal ? "block" : "none" }}
      >
        <div className="report-abs-modal">
          <div className="report-modal">
            <div className="report-inner" style={{ opacity: "1" }}>
              <div className="reportthisitem">
                <h3 className="report-text poppins-normal">Put it on sale</h3>
                <i
                  className="fa-solid fa-xmark cross-icon"
                  onClick={() => setsaleModal(false)}
                ></i>
              </div>
              <div className="singlerowmodal">
                <h3 className="reason-text"> Price*</h3>
                <input
                  className="form-control-1"
                  min="0"
                  type="number"
                  autoComplete="off"
                  value={salesInfo?.price}
                  readonly
                // onChange={(e) => {
                //   price.current = e.target.value;
                //   checkChanges();
                // }}
                />
                <h3 className="reason-text"> Keep it on sale until :</h3>
                <input
                  type="date"
                  className="form-control-1"
                  // min="0"
                  // type="date"
                  autoComplete="off"
                // value="23"
                // onChange={(e) => {
                //   price.current = e.target.value;
                //   checkChanges();
                // }}
                />
                <input
                  className="form-control-1"
                  // min="0"
                  type="time"
                  autoComplete="off"
                // value="23"
                // onChange={(e) => {
                //   price.current = e.target.value;
                //   checkChanges();
                // }}
                />
                {/* <select className="select-box" onChange={(e) => handleChange(e)}>
                    <option>Select reason</option>
                    <option value="Fake collection or possible scam">Fake collection or possible scam</option>
                    <option value="Explicit and sensitive content">Explicit and sensitive content</option>
                    <option value="Might be stolen">Might be stolen</option>
                    <option value="Other">Other</option>
                  </select> */}
              </div>
              <button
                className="btn btn-primary report-btn"
                onClick={demoHandleSell}
              >
                Sale
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* remove from sale modal start from here */}
      <div
        className="mint-mod-outer"
        style={{
          display: removeFromSale ? "block" : "none",
        }}
      >
        <div className="mint-abs">
          <div className="">
            <div className="mint-outer" style={{ opacity: "1" }}>
              <div className="mintbody">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="completelistin">Removing From Sale</div>
                </div>
                <div className="abstractillusion">
                  <img src={nft.cdnUrl} />
                  <div className="abstractillusioncontent">
                    <div className="abstracttitle"></div>
                    <div className="abstractposter"> {nft.name}</div>
                    <div className="ethprice">{`${salesInfo?.price}  ${salesInfo?.currency}`}</div>
                  </div>
                </div>
                <div className="checkpostcontainer">
                  <div className="checkpost">
                    <img src={success} className="checkimg" />
                    <div className="checkimg">
                      {/* <Oval
                        vertical="top"
                        horizontal="center"
                        color="#00BFFF"
                        height={30}
                        width={30} /> */}
                    </div>
                    <div className="checkposttext">
                      <div className="heading">initializing</div>
                      <div className="description"></div>
                    </div>
                  </div>
                  <div className="checkpost">
                    {/* <img src={success} className="checkimg" /> */}
                    <div className="checkimg">
                      {props?.removeSuccess ? (
                        <img src={success} className="checkimg" />
                      ) : (
                        <Oval
                          vertical="top"
                          horizontal="center"
                          color="#00BFFF"
                          height={30}
                          width={30}
                        />
                      )}
                    </div>
                    <div className="checkposttext">
                      <div className="heading">Removing From Sale</div>
                      <div className="description"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* make offer modal starts here*/}
      <div
        className="report-outer"
        style={{ display: makeOfferModal ? "block" : "none" }}
      >
        <div className="report-abs-modal">
          <div className="make-offer-modal main-model-makeoffer">
            <div className="report-inner" style={{ opacity: "1" }}>
              <div className="offerHeading">
                <p className="MainHeadingText">Make an offer</p>
                <img src={closeIcon} className="closeIcon" onClick={() => setMakeOfferModal(false)} />
              </div>
              <div className="singlerowmodal">
                <h3 className="price-heading-text">
                  {" "}
                  Price
                </h3>
                <div className="input-group-price">
                  <span className="symbolText"><p className="eth-value">ETH</p></span>
                  <span style={{ border: "0.2px ridge #C8C8C8" }}></span>
                  <input
                    className="price-input-box"
                    type="number"
                    title=" "
                    placeholder="0 ETH"
                    autoComplete="off"
                    onWheel={(e) => e.target.blur()}

                  />

                </div>
                <div className="second-row">
                  <h3 className="heading-second-row">Expiration Date</h3>
                  <div className="expiry-div">
                    <Select
                      className="selectfixing4"
                      name="type"
                      onChange={(e) => handleChange(e)}
                      placeholder="a month"
                    >
                      <Option>A month</Option>
                      <Option value="list">A year</Option>
                    </Select>
                    <span style={{ border: "0.2px ridge #C8C8C8" }}></span>

                    <input type="time" className="filter-time" />
                  </div>


                </div>

                <div className="div-offer-button">
                  <button className="offer-button" >
                    Make  Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* remove from sale modal end is here */}
      {/* Put from sale modal start from here */}
      <div
        className="mint-mod-outer"
        style={{
          display: putOnSaleModal ? "block" : "none",
        }}
      >
        <div className="mint-abs">
          <div className="">
            <div className="mint-outer" style={{ opacity: "1" }}>
              <div className="mintbody">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="completelistin">Putting your NFT on sale</div>
                </div>
                <div className="abstractillusion">
                  <img src={nft.cdnUrl} />
                  <div className="abstractillusioncontent">
                    <div className="abstracttitle"></div>
                    <div className="abstractposter"> {nft.name}</div>
                    <div className="ethprice">{`${salesInfo?.price}  ${salesInfo?.currency}`}</div>
                  </div>
                </div>
                <div className="checkpostcontainer">
                  <div className="checkpost">
                    <img src={success} className="checkimg" />
                    <div className="checkimg">
                      {/* <Oval
                        vertical="top"
                        horizontal="center"
                        color="#00BFFF"
                        height={30}
                        width={30} /> */}
                    </div>
                    <div className="checkposttext">
                      <div className="heading">initializing</div>
                      <div className="description"></div>
                    </div>
                  </div>
                  <div className="checkpost">
                    {/* <img src={success} className="checkimg" /> */}
                    <div className="checkimg">
                      {props?.saleSuccess ? (
                        <img src={success} className="checkimg" />
                      ) : (
                        <Oval
                          vertical="top"
                          horizontal="center"
                          color="#00BFFF"
                          height={30}
                          width={30}
                        />
                      )}
                    </div>
                    <div className="checkposttext">
                      <div className="heading">Going live</div>
                      <div className="description"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Put from sale modal end from here */}
      {/* Buying loading modal start */}
      <div
        className="mint-mod-outer"
        style={{
          display: openLoadingModal ? "block" : "none",
        }}
      >
        <div className="mint-abs">
          <div className="">
            <div className="mint-outer" style={{ opacity: "1" }}>
              <div className="mintbody">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="completelistin">Complete your Buying</div>
                </div>
                <div className="abstractillusion">
                  <img src={nft.cdnUrl} />
                  <div className="abstractillusioncontent">
                    <div className="abstracttitle"></div>
                    <div className="abstractposter"> {nft.name}</div>
                    <div className="ethprice">{`${salesInfo?.price}  ${salesInfo?.currency}`}</div>
                  </div>
                </div>
                <div className="checkpostcontainer">
                  <div className="checkpost">
                    <img src={success} className="checkimg" />
                    <div className="checkimg">
                      {/* <Oval
                        vertical="top"
                        horizontal="center"
                        color="#00BFFF"
                        height={30}
                        width={30} /> */}
                    </div>
                    <div className="checkposttext">
                      <div className="heading">Approve</div>
                      <div className="description"></div>
                    </div>
                  </div>
                  <div className="checkpost">
                    {/* <img src={success} className="checkimg" /> */}
                    <div className="checkimg">
                      {props?.buySuccess ? (
                        <img src={success} className="checkimg" />
                      ) : (
                        <Oval
                          vertical="top"
                          horizontal="center"
                          color="#00BFFF"
                          height={30}
                          width={30}
                        />
                      )}
                    </div>
                    <div className="checkposttext">
                      <div className="heading">Transfer</div>
                      <div className="description"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Buying loading modal end */}
      {/* --------remove sale dialog ---------------*/}

      <div
        className="report-outer"
        style={{ display: openRemoveSale ? "block" : "none" }}
      >
        <div className="report-abs-modal">
          <div className="report-modal main-model">
            <div className="report-inner" style={{ opacity: "1" }}>
              <div className="reportthisitem">
                <p className="MainHeadingText">Remove from sale</p>
              </div>
              <div className="singlerowmodal">
                <h3 className="HeadingText">
                  {" "}
                  Are you sure you want to remove this item from sale?
                </h3>

                <div className="removeSaleButton">
                  <button
                    className="CancelButton"
                    onClick={() => setOpenRemoveSale(false)}
                  >
                    Cancel
                  </button>
                  <button className="RemoveButton" onClick={sendButton}>
                    Remove
                  </button>
                </div>
              </div>
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
