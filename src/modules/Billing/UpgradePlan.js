import React, { useState } from "react";
import "../../assets/styles/nftReportModal.css";
import styled from "styled-components";
import "./styles/billing.css";
import { NavLink } from "react-router-dom";

const Modal = styled.div`
  position: absolute;
  background-color: white;
  opacity: 1 !important;
  top: 83px;
  width: 80%;
  height: fit-content;
  border-radius: 13px;
`;
const ModalInner = styled.div`
  opacity: 1;
  margin: auto;
  opacity: 1;
  width: 96.8%;
`;

const UpgradePlan = () => {
  const [modal, setModal] = useState(true);
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [Allplans, setAllplans] = useState([]);
  const [monthlyPlan, setmonthlyPlan] = useState([]);
  const [yearlyPlan, setyearlyPlan] = useState([]);
  const MonthlyPlan = [
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Gas Free Minting",
        "ERC721 & 1155 NFT Standard",
        "Multiple Blockchain Support",
        "Multiple Currency Support",
        "Intelligent Content Moderation",
        "Fiat on-ramp",
      ],
      planName: "Free",
      price: 0,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Premium Themes for store",
        "Custom URL",
        "Remove NFTICALLY Branding",
        "Use your own ERC20 Token",
        "NFT Scanner for Counterfeit",
        "Many More",
      ],
      planName: "Standard",
      price: 19,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Premium Themes for store",
        "Custom URL",
        "Remove NFTICALLY Branding",
        "Use your own ERC20 Token",
        "NFT Scanner for Counterfeit",
        "Many More",
      ],
      planName: "Professional",
      price: 249,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Custom Theme",
        "Custom NFT Smartcontract",
        "Personal Account Manager",
        "Phone Support",
        "API Access",
        "Staff Training",
      ],
      planName: "Enterprise",
      price: 833,
    },
  ];
  const YearlyPlan = [
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Gas Free Minting",
        "ERC721 & 1155 NFT Standard",
        "Multiple Blockchain Support",
        "Multiple Currency Support",
        "Intelligent Content Moderation",
        "Fiat on-ramp",
      ],
      planName: "Free",
      price: 0,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Premium Themes for store",
        "Custom URL",
        "Remove NFTICALLY Branding",
        "Use your own ERC20 Token",
        "NFT Scanner for Counterfeit",
        "Many More",
      ],
      planName: "Standard",
      price: 29,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Premium Themes for store",
        "Custom URL",
        "Remove NFTICALLY Branding",
        "Use your own ERC20 Token",
        "NFT Scanner for Counterfeit",
        "Many More",
      ],
      planName: "Professional",
      price:299,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Custom Theme",
        "Custom NFT Smartcontract",
        "Personal Account Manager",
        "Phone Support",
        "API Access",
        "Staff Training",
      ],
      planName: "Enterprise",
      price: 999,
    },
  ];

  return (
    <div
      className="report-outer"
      style={{ display: `${modal ? "block" : "none"}` }}
    >
      <div className="report-abs-modal">
        <Modal>
          <ModalInner>
            <div
              className="reportthisitem"
              style={{
                padding: "2% 1.0%",
              }}
            >
              <h3 className="report-text poppins-normal">Upgrade Your Plan</h3>
              <i
                className="fa-solid fa-xmark cross-icon"
                onClick={() => setModal(false)}
              ></i>
            </div>
            <div className="billingPeriodContainer">
              <div
                onClick={() => {
                  setBillingPeriod("monthly");
                }}
                className={`billingPeriod ${
                  billingPeriod === "monthly" && "billingPeriod--active"
                }`}
              >
                Monthly
              </div>
              <div
                // className='billingPeriod'
                onClick={() => {
                  setBillingPeriod("annual");
                }}
                className={`billingPeriod ${
                  billingPeriod === "annual" && "billingPeriod--active"
                }`}
              >
                Annual
              </div>
            </div>
            {billingPeriod === "monthly" ? (
              <div className="plansContainer">
                {MonthlyPlan?.map((item, key) => {
                  return (
                    <>
                      <div
                        //to="/"
                        className="plansEach"
                      >
                        <div className="plansEachCircle"></div>
                        <div className="plansHeading">{item.planName}</div>
                        <div className="plansHeading2">
                          ${item.price}/{item.billingCycle}
                        </div>
                        <div className="chooseplanButton">CHOOSE PLAN</div>
                        <div className="planFeature">
                         
                            {item?.description.map((ele) => (
                              <>
                              <p className="DescriptionPlan">{ele}</p>
                              </>
                            ))}
                         
                        </div>
                        {/* <div className="planFeature">Lorem ipsum dolor sit</div>
                  <div className="planFeature">Lorem ipsum dolor sit</div> */}
                      </div>
                    </>
                  );
                })}
                <div className="Nodata">
                  {MonthlyPlan?.length == 0 && (
                    <div className="Nodata"> No Data</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="plansContainer">
                {YearlyPlan?.map((item, key) => {
                  return (
                    <div to="/my-store/general-settings" className="plansEach">
                      <div className="plansEachCircle"></div>
                      <div className="plansHeading">{item.planName}</div>
                      <div className="plansHeading2">
                        ${item.price}/{item.billingCycle}
                      </div>
                      <div className="chooseplanButton">CHOOSE PLAN</div>
                      <div className="planFeature">
                        {item?.description.map((ele) => (
                          <p className="DescriptionPlan">{ele}</p>
                        ))}
                      </div>
                      {/* <div className="planFeature">Lorem ipsum dolor sit</div>
                  <div className="planFeature">Lorem ipsum dolor sit</div> */}
                    </div>
                  );
                })}

                <div className="Nodata">
                  {YearlyPlan?.length == 0 && (
                    <div className="Nodata"> No Data</div>
                  )}
                </div>
              </div>
            )}
          </ModalInner>
        </Modal>
      </div>
    </div>
  );
};

export default UpgradePlan;
