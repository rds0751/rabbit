import React, { useState } from "react";
import "../../assets/styles/nftReportModal.css";
import styled from "styled-components";
import "./styles/billing.css";
import { NavLink } from "react-router-dom";

const Modal = styled.div`
  position: absolute;
  background-color: white;
  opacity: 1 !important;
  top: 100px;
  width: 80%;
  height:auto;
  min-height: 561px;
  border-radius: 13px;
`;
const ModalInner = styled.div`
  opacity: 1;
  margin: auto;
  opacity: 1;
  width: 91.8%;
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
      description: "description about the plan",
      planName: "Standard",
      price: 129,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: "description about the plan",
      planName: "Standard",
      price: 129,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: "description about the plan",
      planName: "Standard",
      price: 129,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: "description about the plan",
      planName: "Standard",
      price: 129,
    },
  ];
  const YearlyPlan = [
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: "description about the plan",
      planName: "Standard",
      price: 129,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: "description about the plan",
      planName: "Standard",
      price: 129,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: "description about the plan",
      planName: "Standard",
      price: 129,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: "description about the plan",
      planName: "Standard",
      price: 129,
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
                    <NavLink
                      to="/my-store/general-settings"
                      className="plansEach"
                    >
                      <div className="plansEachCircle"></div>
                      <div className="plansHeading">{item.planName}</div>
                      <div className="plansHeading2">
                        ${item.price}/{item.billingCycle}
                      </div>
                      <div className="chooseplanButton">CHOOSE PLAN</div>
                      <div className="planFeature">{item.description}</div>
                      {/* <div className="planFeature">Lorem ipsum dolor sit</div>
                  <div className="planFeature">Lorem ipsum dolor sit</div> */}
                    </NavLink>
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
                    <NavLink
                      to="/my-store/general-settings"
                      className="plansEach"
                    >
                      <div className="plansEachCircle"></div>
                      <div className="plansHeading">{item.planName}</div>
                      <div className="plansHeading2">
                        ${item.price}/{item.billingCycle}
                      </div>
                      <div className="chooseplanButton">CHOOSE PLAN</div>
                      <div className="planFeature">{item.description}</div>
                      {/* <div className="planFeature">Lorem ipsum dolor sit</div>
                  <div className="planFeature">Lorem ipsum dolor sit</div> */}
                    </NavLink>
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
