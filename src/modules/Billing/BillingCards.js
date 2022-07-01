import React from 'react'

const BillingCards = ({item}) => {
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