import React from "react";
import image from "../../assets/images/Abstraction.png";
import share from "../../assets/images/share.png";
import backward from "../../assets/images/backward.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PricingHistory_Component_Table from "../../common/components/PricingHistory_Component_Table";
import PricingHistory_Component_Graph from "../../common/components/PricingHistory_Component_Graph";

function NftInformation_FixedPrice() {
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-1"></div>
          <div className="col-lg-4 col-sm-12 col-md-6">
            <div>
              <img
                src={image}
                className="border-radius img_nftinfo_mob"
                style={{
                  width: "98%",
                  height: "595px",
                  borderRadius: "8px",
                  marginLeft: "-2em",
                }}
              />
            </div>
          </div>
          <div className="col-lg-5 col-sm-12 col-md-6">
            <div className="row">
              <div className="">
                <span className="text-dark font-22 font-weight-900">
                  Abstract Art Poster
                </span>
                <span className="icon-img" style={{ marginLeft: "11em" }}>
                  <img
                    src={share}
                    data-bs-toggle="modal"
                    data-bs-target="#myModalShare"
                    style={{ width: "35px", height: "33px" }}
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
                    src={backward}
                    style={{
                      width: "36px",
                      height: "33px",
                      marginLeft: "1em",
                      marginTop: "-0.3em",
                    }}
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
              <div className="row  mt-3">
                <div className="col-lg-4 col-sm-12 col-md-6">
                  <span className="font-13 text-dark">Current Price: </span>
                  <span
                    className="font-13 font-weight-700"
                    style={{ color: "#16AB6E" }}
                  >
                    0.32 ETH
                  </span>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-6"></div>
                <div className="col-lg-4 col-sm-12 col-md-6">
                  <span>
                    <i class="far fa-clock" style={{ color: "#f54" }}></i>
                  </span>
                  <span className="font-13 text-dark"> Ends in 5 days </span>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-12  mt-2">
                  <span className="font-13 text-dark">
                    Owned by:
                    <span className="font-13 font-weight-900 text-dark">
                      Beeple
                    </span>
                  </span>
                </div>
                <div className="col-lg-4 col-sm-12  mt-2">
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
                  Abstract art is art that does not attempt to represent an
                  accurate depiction <br /> of a visual reality but instead use
                  shapes, colours, forms and gestural <br /> marks to achieve
                  its effect.
                </h4>
              </div>
            </div>
            <PricingHistory_Component_Graph />
            <button
              className="btn btn-primary mt-2 p-2"
              style={{ width: "160px" }}
            >
              Buy Now
            </button>
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
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-5 col-sm-12 col-md-4">
            <PricingHistory_Component_Table />
          </div>
        </div>
      </div>
    </>
  );
}

export default NftInformation_FixedPrice;
