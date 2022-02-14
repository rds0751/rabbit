import React, { useState, useEffect } from "react";
import image from "../../assets/images/1.jpg";
import share from "../../assets/images/share.png";
import info from "../../assets/images/info.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import { Link } from "react-router-dom";
import { BidApi, OfferApi } from "../../constants/Nft_Info_Api";
import PricingHistoryComponentTable from "../../common/components/PricingHistoryComponentTable";
import PricingHistoryComponentGraph from "../../common/components/PricingHistoryComponentGraph";
// import BidsComponent from "./BidsComponent";
import { useParams } from 'react-router-dom';
import { getNft } from "../../services/webappMicroservice";

export default function NftInformation() {
  const [activeInActive, setActiveInActive] = useState("active");
  const nftId = useParams();
  const [nft, setNft] = useState([])
  useEffect(() => {
    getNft(nftId.id).then(response=>setNft(response))
  })
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-1"></div>
          <div className="col-lg-5 col-sm-12 col-md-6">
            <div>
              <img
                src={nft.ipfsUrl}
                className="border-radius imginfo_mob"
                style={{
                  // width: "100%",
                  width: "480px",
                  // paddingRight: "20px",
                  height: "620px",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
          <div className="col-lg-5 col-sm-12 col-md-6">
            <div className="row">
              <div className="">
                <span className="text-dark font-22 font-weight-900">
                  {nft.name}
                </span>
                <span className="icon-img" style={{ marginLeft: "16.5em" }}>
                  <img
                    src={share}
                    data-bs-toggle="modal"
                    data-bs-target="#myModalShare"
                    style={{ width: "35px", height: "30px" }}
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
                          >
                            Make Offer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    src={info}
                    style={{ width: "40px", height: "30px" }}
                    data-bs-toggle="modal"
                    data-bs-target="#myModalReport"
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
                            >
                              <option selected>Choose...</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
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
                          >
                            Make Offer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
              <div className="second-text  mt-4">
                <span className="font-13 text-dark">Minimum Bid: </span>
                <span
                  className="font-13 font-weight-700"
                  style={{ color: "#16AB6E" }}
                >
                  0.32 ETH
                </span>
                <span
                  className="font-13 text-dark"
                  style={{ marginLeft: "1em" }}
                >
                  Highest Bid:{" "}
                </span>
                <span
                  className="font-13 font-weight-700"
                  style={{ color: "#366EEF" }}
                >
                  0.49 ETH
                </span>
                <span style={{ marginLeft: "2em" }}>
                  <i className="far fa-clock" style={{ color: "#f54" }}></i>
                </span>
                <span className="font-13 text-dark"> Ends in 5 days </span>
              </div>
              <div className="row">
                <div className="col-lg-3 col-sm-12  mt-3">
                  <span className="font-13 text-dark">
                    Owned by:
                    <span className="font-13 font-weight-900 text-dark">
                      Beeple
                    </span>
                  </span>
                </div>
                <div className="col-lg-3 col-sm-12  mt-3">
                  <span className="font-13 text-dark">
                    Created by:
                    <span className="font-13 font-weight-900 text-dark">
                      Beeple
                    </span>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2 col-sm-12  mt-3">
                  <span className="font-13 text-dark">
                    <VisibilityIcon
                      style={{ fontSize: "20px", color: "#366EEF" }}
                    />
                    <span
                      className="font-13 font-weight-900 text-dark"
                      style={{ marginLeft: "0.5em" }}
                    >
                      {nft.viewsCount}
                    </span>
                  </span>
                </div>
                <div className="col-lg-2 col-sm-12  mt-3">
                  <span
                    className="font-13 text-dark img_nftinfo_mob"
                    style={{ marginLeft: "-2em" }}
                  >
                    <FavoriteIcon
                      style={{ fontSize: "20px", color: "#EF3643" }}
                    />
                    <span
                      className="font-13 font-weight-900 text-dark"
                      style={{ marginLeft: "0.5em" }}
                    >
                      {nft.likesCount}
                    </span>
                  </span>
                </div>
              </div>
              <div className="row">
                <h4 className="font-13  font-weight-900 mt-3">Description</h4>
              </div>
              <div className="row">
                <h4 className="font-13 ">
                  {nft.description}
                </h4>
              </div>
              <div className="row border-bottom pb-2 mt-3">
                {/* <div className="col-1">
                  <a
                    className="text-dark font-15 font-weight-900"
                    style={{ textDecoration: "none" }}
                    href="#pills-active_section"
                    role="tab"
                    aria-controls="pills-active_section"
                    aria-selected="true"
                    onClick={() => setActiveInActive("active")}
                  >
                    Bidsd
                  </a>
                </div> */}
                <div className="col-1">
                  <a
                    className="text-secondary font-15 font-weight-900"
                    style={{ textDecoration: "none" }}
                    href="#pills-inactive_section"
                    role="tab"
                    aria-controls="pills-inactive_section"
                    aria-selected="false"
                    onClick={() => setActiveInActive("inActive")}
                  >
                    Offers
                  </a>
                </div>
              </div>
              <div className="Data">
                {activeInActive === "active" ? (
                  <NftActiveInActiveBlock apiData={BidApi} />
                ) : (
                  <NftActiveInActiveBlock apiData={OfferApi} />
                )}
              </div>
              {activeInActive == "active" ? (
                <button
                  className="btn btn-primary mt-3"
                  style={{
                    height: "40px",
                    width: "180px",
                    padding: "0px",
                    marginLeft: "1em",
                  }}
                >
                  Place Bid
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-primary mt-3"
                    data-bs-toggle="modal"
                    data-bs-target="#myModalShare"
                    style={{
                      height: "40px",
                      width: "180px",
                      padding: "0px",
                      marginLeft: "1em",
                    }}
                  >
                    Make Offer
                  </button>
                </>
              )}

              {/* <!-- The Modal --> */}
              <div className="modal" id="myModal">
                <div className="modal-dialog">
                  <div
                    className="modal-content"
                    style={{ borderRadius: "10px", paddingRight: "10px" }}
                  >
                    {/* <!-- Modal Header --> */}
                    <div className="modal-header">
                      <h4 className="modal-title font-15 font-weight-700">
                        Make Bid
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
                        className="font-14 font-weight-700"
                        style={{ marginLeft: "-0.6em" }}
                      >
                        Price*
                      </h5>
                      <div className="input-group">
                        <span
                          className="input-group-text text-primary bg-white font-15"
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
                    </div>

                    {/* <!-- Modal footer --> */}
                    <div className="modal-footer mb-4">
                      <button
                        type="button"
                        className="btn btn-primary w-100"
                        data-bs-dismiss="modal"
                        style={{ marginLeft: "1.1em" }}
                      >
                        Make Bid
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row mt-4">
          <div className="col-1"></div>

          <div className="col-lg-5 col-sm-12">
            <PricingHistoryComponentTable />
          </div>
          <div className="col-lg-5 col-sm-12">
            <PricingHistoryComponentGraph />
          </div>
          <div className="col-1"></div>
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
