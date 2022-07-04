import React from 'react'
import {NFTinger} from "../../common/newHomeImages";
import Utils from "../../utility";

const BillingCards = ({item}) => {

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
        amount: (999) * 100 * 78, //price pending
        currency: "INR",
        name: "Make Payment",
        description: "",
        image: NFTinger, 
        handler: async (response) => {
          // const responseData = {
          //   paymentId: response?.razorpay_payment_id,
          //   totalPrice: space?.price,
          // };

        //  addSpacehandler(responseData);
          // sessionManager.setDataInCookies(
          //   response?.razorpay_payment_id,
          //   cookiesConstants.RAZORPAY_PAYMENT_ID
          // );
         // await createEventHandler(responseData); //update subscription 
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
        className={
          item.planActive == "Current"
            ? "chooseplanButtonWhite"
            : "chooseplanButton"
        }
      >
        {item.planActive}
      </div>
     
      <div className="planFeature">
      <div
        className="NFTCollection"
      >
        {item.NFTCollection}
      </div>
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
  )
}

export default BillingCards