import React, { useEffect, useState } from "react";
import { NFTingerLogo } from "../../common/newHomeImages";
import Utils from "../../utility";
import {
  getSubscriptionPlan,
  updateSubscription,
} from "../../services/clientConfigMicroService";
import { useDispatch, useSelector } from "react-redux";
const BillingCards = ({ item, plan }) => {
  const customize = useSelector((state) => state.customize);
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
           console.log(responseData,response);

           if(response.status_code==200){
            const [updateSubscriptionError, updateSubscriptionResult] =
            await Utils.parseResponse(updateSubscription(requestData,customize.id)); //update subscription
            
           }

          //  addSpacehandler(responseData);
          // sessionManager.setDataInCookies(
          //   response?.razorpay_payment_id,
          //   cookiesConstants.RAZORPAY_PAYMENT_ID
          // );
          let requestData = {
            planName: item.planName,
            planId: item._id,
            billingCycle: item.billingCycle,
            price: item?.price,
            currency: item?.currency,
            walletAddress: customize.walletAddress,
            tenantId: customize.id,
            features: item.feature,
            paymentDetails: {
              orderId: "123456",
              paymentId: "123456",
              price: item.price,
              status: true,
            },
          };

       
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

  const currentplan =
    item.planName === "Free Forever" && plan === null ? true : false;

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
          className={currentplan ? "chooseplanButtonWhite" : "chooseplanButton"}
          onClick={!currentplan && displayRazorPay}
        >
          {currentplan ? "Current" : "Upgrade"}
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
