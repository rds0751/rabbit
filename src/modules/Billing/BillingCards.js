import React, { useEffect, useState } from "react";
import { NFTingerLogo } from "../../common/newHomeImages";
import Utils from "../../utility";
import {
  getSubscriptionPlan,
  updateSubscription,
  addTranscation,
  tenantSubscription,
} from "../../services/clientConfigMicroService";
import { useDispatch, useSelector } from "react-redux";
import { id } from "ethers/lib/utils";
import moment from "moment";
import styled from "styled-components";



const BillingCards = ({ item, plan, toogle,setPlanUpgrade,planUpgrade,key}) => {
  const customize = useSelector((state) => state.customize);
  const [currentPlan,setCurrentPlan]=useState(false);

  

  const loadRazorPay = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject();
      };
    });
  };

  const displayRazorPay = async () => {
    try {
      await loadRazorPay();
      const options = {
        key: process.env.REACT_APP_RAZOR_PAY_ID,
        amount: item.price * 100 * 78, //price pending
        currency: "INR",
        name: customize.storeName,
        description: "",
        image: customize.storeLogo,
        handler: async (response) => {
          const responseData = {
            paymentId: response?.razorpay_payment_id,
            // totalPrice: space?.price,
          };

          console.log(responseData, response);

          if (response.status_code == 200) {
       
            let transctionReqData = {
              subscriptionId: item._id,
              tenantId: customize?.id,
              addedBy: customize?.id,
              isPaymentSuccess:true
            };
            const [transcationFailure, transactionSuccess] =
              await Utils.parseResponse(addTranscation(transctionReqData)); //update subscription

            if (transactionSuccess.responseCode !== 200) {
              console.log(transactionSuccess.message);
            } else {
              let updateSubscriptionRequestData = {
                planName: item.planName,
                planId: item._id,
                billingCycle: item.billingCycle,
                price: item?.price,
                currency: item?.currency,
                walletAddress: customize.walletAddress,
                tenantId: customize.id,
                features: item.feature,
                paymentDetails: {
                  orderId: "123456", //pending
                  paymentId: response?.razorpay_payment_id,
                  price: item.price,
                  status: true,
                },
              };
          
              const [updateSubscriptionError, updateSubscriptionResult] =
                await Utils.parseResponse(
                  updateSubscription(
                    updateSubscriptionRequestData,
                    customize.id
                  )
                ); //update subscription

              if (updateSubscriptionResult.responseCode === 403) {
                console.log(updateSubscription.message);
              } else {
            
                let tenantReqData = {
                  subscriptionMeta: {
                    subscriptionId: item._id,
                    name: item.planName,
                    startDate: "123456",//pending
                    endDate: "123456",//pending 
                    numberOfNfts: 100,
                  },
                };
                const [tenantSubErr, tenantSub] = await Utils.parseResponse(
                  tenantSubscription(tenantReqData, customize.id)
                );
                if (tenantSub.responseCode !== 200)
                  console.log(tenantSub.message);
                else {
                  Utils.apiSuccessToast("Subscription Updated");
                  setPlanUpgrade(!planUpgrade);

                }
              }
            }
          }
          else {
            let transctionReqData = {
              subscriptionId: item._id,
              tenantId: customize.id,
              addedBy: customize.id,
              isPaymentSuccess:false,
            };
            const [transcationFailure, transactionSuccess] =
              await Utils.parseResponse(addTranscation(transctionReqData)); //update subscription

            if (transactionSuccess.responseCode !== 200) {
              console.log(transactionSuccess.message);
            } 

          }

          //  addSpacehandler(responseData);
          // sessionManager.setDataInCookies(
          //   response?.razorpay_payment_id,
          //   cookiesConstants.RAZORPAY_PAYMENT_ID
          // );
        },
        theme: {
          color: "#4c84ff",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      Utils.apiFailureToast("Transcation Failure");
    }
  };


  const current=item.planName === plan?.planName ? true :false;




  

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
        <div
          className={current || item.planName==="Free Forever" ? "chooseplanButtonWhite" : "chooseplanButton"}
          onClick={!current  && item.planName !=="Free Forever"  && displayRazorPay}
        >
          {current || item.planName==="Free Forever" ? "current" :"upgrade"}
        </div>

        <div className="planFeature">
          <div className="NFTCollection">{item.NFTCollection}</div>
          <div className="planTitle">{item.planTitle}</div>
          <ul className="ulDes">
            {item?.feature?.map((ele) => (
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
    </>
  );
};

export default BillingCards;
