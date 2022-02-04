import React, { useState } from "react";
import image from "../../assets/images/1.jpg";
import share from "../../assets/images/share.png";
import info from "../../assets/images/info.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import { Link } from "react-router-dom";
import { BidApi, OfferApi } from "../../constants/Nft_Info_Api";
import PricingHistory_Component_Graph from "../../common/components/PricingHistory_Component_Table";
import PricingHistory_Component_Table from "../../common/components/PricingHistory_Component_Graph";
// import BidsComponent from "./BidsComponent";

export default function Nft_Information() {
  const [activeInActive, setActiveInActive] = useState("active");
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-1"></div>
          <div className="col-lg-5 col-sm-12 col-md-6">
            <div>
              <img
                src={image}
                className="border-radius"
                style={{
                  width: "75%",
                  height: "550px",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
          <div className="col-lg-5 col-sm-12 col-md-6">
            <div className="row">
              <div className="">
                <span className="text-dark font-22 font-weight-900">
                  Jelly Fish
                </span>
                <span className="icon-img" style={{ marginLeft: "16.5em" }}>
                  <img
                    src={share}
                    data-bs-toggle="modal"
                    data-bs-target="#myModalShare"
                    style={{ width: "35px", height: "30px" }}
                  />
                  {/* <!-- The Modal --> */}
                  <div class="modal" id="myModalShare">
                    <div class="modal-dialog">
                      <div
                        class="modal-content"
                        style={{ borderRadius: "10px", paddingRight: "10px" }}
                      >
                        {/* <!-- Modal Header --> */}
                        <div class="modal-header">
                          <h4 class="modal-title font-15 font-weight-700 text-dark">
                            Make an Offer
                          </h4>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            style={{
                              width: "10px",
                              height: "10px",
                              boxShadow: "none",
                            }}
                          ></button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div class="modal-body">
                          <h5
                            className="font-14 font-weight-700 text-dark"
                            style={{ marginLeft: "-0.6em" }}
                          >
                            Price
                          </h5>
                          <div class="input-group">
                            <span
                              class="input-group-text font-15 text-primary bg-white"
                              id="basic-addon1"
                              style={{ marginLeft: "-0.6em" }}
                            >
                              ETH
                            </span>
                            <input
                              type="text"
                              class="form-control"
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
                          <div class="input-group">
                            <button
                              class="btn border dropdown-toggle font-15"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              style={{ marginLeft: "-0.6em" }}
                            >
                              A month
                            </button>
                            <ul class="dropdown-menu">
                              <li>
                                <a class="dropdown-item" href="#">
                                  Jan
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  Feb
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  Mar
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  Apr
                                </a>
                              </li>
                            </ul>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="&#xf017; 11:25 AM"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                          </div>
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div class="modal-footer mb-4">
                          <button
                            type="button"
                            class="btn btn-primary w-100"
                            data-bs-dismiss="modal"
                            style={{ marginLeft: "1.1em" }}
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
                  <div class="modal" id="myModalReport">
                    <div class="modal-dialog">
                      <div
                        class="modal-content"
                        style={{ borderRadius: "10px", paddingRight: "10px" }}
                      >
                        {/* <!-- Modal Header --> */}
                        <div class="modal-header">
                          <h4 class="modal-title font-15 font-weight-700 text-dark">
                            Report this item
                          </h4>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            style={{
                              width: "10px",
                              height: "10px",
                              boxShadow: "none",
                            }}
                          ></button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div class="modal-body">
                          <h5
                            className="font-14 font-weight-700 text-dark"
                            style={{ marginLeft: "-0.6em" }}
                          >
                            Reason
                          </h5>
                          <div
                            class="input-group mt-3"
                            style={{ marginLeft: "-0.6em" }}
                          >
                            <select class="form-select" id="inputGroupSelect02">
                              <option selected>Choose...</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div class="modal-footer mb-4">
                          <button
                            type="button"
                            class="btn btn-primary w-100"
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
                  <i class="far fa-clock" style={{ color: "#f54" }}></i>
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
                      100
                    </span>
                  </span>
                </div>
                <div className="col-lg-2 col-sm-12  mt-3">
                  <span
                    className="font-13 text-dark"
                    style={{ marginLeft: "-2em" }}
                  >
                    <FavoriteIcon
                      style={{ fontSize: "20px", color: "#EF3643" }}
                    />
                    <span
                      className="font-13 font-weight-900 text-dark"
                      style={{ marginLeft: "0.5em" }}
                    >
                      23
                    </span>
                  </span>
                </div>
              </div>
              <div className="row">
                <h4 className="font-13  font-weight-900 mt-3">Description</h4>
              </div>
              <div className="row">
                <h4 className="font-13 ">
                  Jellyfish and sea jellies are the informal common names given
                  to the <br /> medusa-phase of certain gelatinous members of
                  the <br />
                  subphylum Medusozoa, a major part of the phylum Cnidaria.
                </h4>
              </div>
              <div className="row border-bottom pb-2 mt-3">
                <div className="col-1">
                  <a
                    className="text-dark font-15 font-weight-900"
                    style={{ textDecoration: "none" }}
                    href="#pills-active_section"
                    role="tab"
                    aria-controls="pills-active_section"
                    aria-selected="true"
                    onClick={() => setActiveInActive("active")}
                  >
                    Bids
                  </a>
                </div>
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
              <button
                className="btn btn-primary mt-3"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
                style={{ height: "50px", width: "180px" }}
              >
                Place Bid
              </button>
              {/* <!-- The Modal --> */}
              <div class="modal" id="myModal">
                <div class="modal-dialog">
                  <div
                    class="modal-content"
                    style={{ borderRadius: "10px", paddingRight: "10px" }}
                  >
                    {/* <!-- Modal Header --> */}
                    <div class="modal-header">
                      <h4 class="modal-title font-15 font-weight-700">
                        Make Bid
                      </h4>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        style={{
                          width: "10px",
                          height: "10px",
                          boxShadow: "none",
                        }}
                      ></button>
                    </div>

                    {/* <!-- Modal body --> */}
                    <div class="modal-body">
                      <h5
                        className="font-14 font-weight-700"
                        style={{ marginLeft: "-0.6em" }}
                      >
                        Price*
                      </h5>
                      <div class="input-group">
                        <span
                          class="input-group-text text-primary bg-white font-15"
                          id="basic-addon1"
                          style={{ marginLeft: "-0.6em" }}
                        >
                          ETH
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="0.01($210)"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </div>

                    {/* <!-- Modal footer --> */}
                    <div class="modal-footer mb-4">
                      <button
                        type="button"
                        class="btn btn-primary w-100"
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
            <PricingHistory_Component_Table />
          </div>
          <div className="col-lg-5 col-sm-12">
            <PricingHistory_Component_Graph />
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
