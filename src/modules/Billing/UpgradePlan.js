import React, { useState,useEffect } from "react";
import "../../assets/styles/nftReportModal.css";
import styled from "styled-components";
import "./styles/billing.css";
import { useDispatch, useSelector } from "react-redux";
import Utils from "../../utility";
import {
  getSubscription,
  getSubscriptionPlan
} from "../../services/clientConfigMicroService";
import { sessionManager } from "../../managers/sessionManager";
import BillingCard from "./BillingCards";

const Modal = styled.div`
  position: absolute;
  background-color: white;
  opacity: 1 !important;
  top: 37px;
  width: 90%;
  height: fit-content;
  border-radius: 13px;
  height: 95%;
  overflow-y: scroll;
`;
const ModalInner = styled.div`
  opacity: 1;
  margin: auto;
  opacity: 1;
  width: 96.8%;
`;

const UpgradePlan = (props) => {
  const [modal, setModal] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState("monthly");
   const { user, sideBar } = useSelector((state) => state);
  const { userDetails, loggedInUser, walletAddress } = user;
  const [billingMonthly,setBillingMonthly]=useState();
  const customize = useSelector(state => state.customize);
  const [currentPlan,setCurrentPlan]=useState()


  useEffect(async ()=>{
    const [error,result]=await Utils.parseResponse(
      getSubscription(billingPeriod)
    );

    if(result.responsecode===403){
      Utils.apiFailureToast("Subscription Data Not Load")
    }
    else{
      setBillingMonthly(result?.responseData);
      const [subError ,subscriptionUser]=await Utils.parseResponse(
        getSubscriptionPlan(customize.id)
      )
      if(subscriptionUser.responseCode === 403){
      Utils.apiFailureToast("Api Failure")
      }
      else {
        setCurrentPlan(subscriptionUser.responseData);
      } 
      
    }
  },[customize.id])

  

  

  const MonthlyPlan = [
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Admin Portal",
        "Multiple Blockchain Support",
        "Multi File Formats",
        "Filter And Ranking",
        "Lazy Minting",
        "Social Media Sharing"
      ],
      NFTCollection:"100 NFT | 2 Collection",
      planTitle: "Key Feature",
      planName: "Free Forever",
      planActive: "Current",
      price: 0,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Admin Portal",
        "Royalty Feature",
        "Multiple Blockchain support",
        "Multi File Formats",
        "Filter and Rankings",
        "Lazy Minting",
        "On Chain Collection",
        "Detailed Analytics",
        "Blogs Management",
        "Advanced Content Moderation",
        "Platform Fees Mangement",
        "Social Media Sharing",
        "custom URL",
        "Categories Mangement",
        "Many More",
      ],
      NFTCollection:"500 NFT | 10 Collection",
      planTitle: "Everything in Free, plus:",
      planName: "Standard",
      planActive: "Upgrade",
      price: 99,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Admin Portal",
        "Royalty Feature",
        "Multiple Blockchain support",
        "Multi File Formats",
        "Filter and Rankings",
        "Lazy Minting",
        "Metaverse Shop & Store",
        "On Chain Collection",
        "Detailed Analytics",
        "Blogs Management",
        "Advanced Visitor Mangement",
        "Training and Support",
        "Advanced Content",
        "Platform Fees Mangement",
        "Social Media Sharing",
      ],
      NFTCollection:"10000 NFT | 100 Collection",
      planTitle: "Everything in Standard ,plus:",
      planName: "Plus",
      planActive: "Upgrade",
      price: 399,
    },
    {
      billingCycle: "monthly",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Admin Portal",
        "Royality Feature",
        "Multiple Blockchain Support",
       "Multi File Formats",
        "Filter and Ranking",
        "Make Offer",
        "Lazy Minting",
        "Bulk Minting",
        "On Chain Collection",
        "Detailed Analytics",
        "Blogs Mangement",
      "Advanced Visitor Mangement",
       "Training and Support",
        "Dedicated Realtionship Manger",
       "Advanced Content Moderation",
        "Metaverse Galleries",
        "Conversion to NFT Portal",
        "Platform fess mangement",
        "Social Media Sharing",
        "Custom Url",
        "Categories Mangement "
      ],
      NFTCollection:"Unlimited NFTs | Unlimited Collections",
      planTitle: "Everything in Professional, plus:",
      planName: "Pro",
      planActive: "Upgrade",
      price: 999,
    },
  ];

  const YearlyPlan = [
    {
      billingCycle: "Annual",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Admin Portal",
        "Multiple Blockchain Support",
        "Multi File Formats",
        "Filter And Ranking",
        "Lazy Minting",
        "Social Media Sharing"
      ],
      NFTCollection:"100 NFT | 2 Collection",
      planTitle: "Key Feature",
      planName: "Free Forever",
      planActive: "Current",
      price: 0,
    },
    {
      billingCycle: "Annual",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Admin Portal",
        "Royalty Feature",
        "Multiple Blockchain support",
        "Multi File Formats",
        "Filter and Rankings",
        "Lazy Minting",
        "On Chain Collection",
        "Detailed Analytics",
        "Blogs Management",
        "Advanced Content Moderation",
        "Platform Fees Mangement",
        "Social Media Sharing",
        "custom URL",
        "Categories Mangement",
        "Many More",
      ],
      NFTCollection:"500 NFT | 10 Collection",
      planTitle: "Everything in Free, plus:",
      planName: "Standard",
      planActive: "Upgrade",
      price: 199,
    },
    {
      billingCycle: "Annual",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Admin Portal",
        "Royalty Feature",
        "Multiple Blockchain support",
        "Multi File Formats",
        "Filter and Rankings",
        "Lazy Minting",
        "Metaverse Shop & Store",
        "On Chain Collection",
        "Detailed Analytics",
        "Blogs Management",
        "Advanced Visitor Mangement",
        "Training and Support",
        "Advanced Content",
        "Platform Fees Mangement",
        "Social Media Sharing",
      ],
      NFTCollection:"10000 NFT | 100 Collection",
      planTitle: "Everything in Standard ,plus:",
      planName: "Plus",
      planActive: "Upgrade",
      price: 1399,
    },
    {
      billingCycle: "Annual",
      createdAt: "2022-04-04T12:09:35.988Z",
      currency: "US dollar",
      description: [
        "Admin Portal",
        "Royality Feature",
        "Multiple Blockchain Support",
       "Multi File Formats",
        "Filter and Ranking",
        "Make Offer",
        "Lazy Minting",
        "Bulk Minting",
        "On Chain Collection",
        "Detailed Analytics",
        "Blogs Mangement",
      "Advanced Visitor Mangement",
       "Training and Support",
        "Dedicated Realtionship Manger",
       "Advanced Content Moderation",
        "Metaverse Galleries",
        "Conversion to NFT Portal",
        "Platform fess mangement",
        "Social Media Sharing",
        "Custom Url",
        "Categories Mangement "
      ],
      NFTCollection:"Unlimited NFTs | Unlimited Collections",
      planTitle: "Everything in Professional, plus:",
      planName: "Pro",
      planActive: "Upgrade",
      price: 1999,
    },
  ];


 

  return (
    <div
      className="report-outer"
      style={{ display: `${props?.Modal ? "block" : "none"}` }}
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
                onClick={() => props?.setModal(false)}
              ></i>

            </div>
            {/* <button onClick={()=>displayRazorPay()}>Razor Pay</button> */}
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
                {billingMonthly?.map((item, key) => {
                  return (
                  <BillingCard item={item} plan={currentPlan} />
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
                      <div
                        className={
                          item.planActive == "Current"
                            ? "chooseplanButtonWhite"
                            : "chooseplanButton"
                        }
                      >
                        {" "}
                        {item.planActive}
                      </div>
                      <div className="planFeature">
                        <div className="planTitle">{item.planTitle}</div>
                        <ul className="ulDes">
                          {item?.description.map((ele) => (
                            <li className="DescriptionPlan">
                              <span class="BlueCircle"></span>
                              {ele}
                            </li>
                          ))}
                        </ul>
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
