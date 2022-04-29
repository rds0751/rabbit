import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import "../../assets/styles/Leader.css";
import Information from "../../assets/images/No-Info-Icon.svg";
import { pricingHistoryGraphOfNft } from "../../services/sellAndPurchaseMicroService";
import moment from "moment";
import { data, each } from "jquery";
const queryString = require("query-string");
export default function PricingHistoryComponent(props) {
  const [nftPricingHistory, setNftPricingHistory] = useState([]);
  const [filter, setFilter] = useState({ duration: "" });

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const reqId = {
    contentId: props.id,
  };
  const reqObj = queryString.stringify(filter);
  // const reqObj = {
  //   duration: ""
  // }
  console.log(nftPricingHistory, "sachin");
  useEffect(() => {
    pricingHistoryGraphOfNft(reqId, reqObj).then((response) =>
      setNftPricingHistory(response)
    );
  }, [reqObj]);

  let prices = nftPricingHistory.map((each) => each.totalVolume);
 let number = prices

if (number == Math.floor(number)) {
let integer = number + 1
console.log(integer, "iteger")
} else {
  let decimal = number + 0.01
  console.log(decimal, "decimal")

}
  // let prices = [20];
  let dates = nftPricingHistory.map((each) => each?.addedOn);
    // let dates = nftPricingHistory.map((each) => each?.addedOn);
  console.log(nftPricingHistory.addedOn,"addedon")
  //   let dates = nftPricingHistory.map((each) =>
  //     moment(new Date(each?.addedOn)).format("D MMM YY")
  //   );
  // console.log(prices,"price")
  //   if (filter === "month") {
  //     dates = nftPricingHistory.map((each) =>
  //       moment(new Date(each?.addedOn)).format("MMM YY")
  //     );
  //   } else if (filter === "year") {
  //     dates = nftPricingHistory.map((each) =>
  //       moment(new Date(each?.addedOn)).format("YYYY")
  //     );
  //   }
  //   let dates = nftPricingHistory.map((each) =>
  //     moment(new Date(each?.addedOn)).format("D MMM YY")
  //   );
  // console.log(prices,"price")
  //   if (filter === "month") {
  //     dates = nftPricingHistory.map((each) =>
  //       moment(new Date(each?.addedOn)).format("MMM YY")
  //     );
  //   } else if (filter === "year") {
  //     dates = nftPricingHistory.map((each) =>
  //       moment(new Date(each?.addedOn)).format("YYYY")
  //     );
  //   }
  let total = 0;
  let average = 0;
  nftPricingHistory.forEach((item) => {
    total = total + item.totalVolume;
  });
  if (total !== 0) {
    average = total / nftPricingHistory.length;
  }

  const object = {
    series: [
      {
        name: "pricingHistory",
        data: prices,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      yaxis: {
        tickAmount: 4,
        // max: prices[0] + 0.01,
        max: prices[0] + 1,
      },
      xaxis: {
      

        categories: dates,

      },
    },
  };

  return (
    <div id="chart">
      <div className="">
        <div className="d-flex justify-content-around align-items-center py-4">
          <h5 className="avg-price">
            Average Price: <span>{average}</span>
          </h5>
          <select
            name="duration"
            onChange={(e) => handleChange(e)}
            className="chart-filter selectfixing4"
          >
            <option className="font-15" value="all">
              All time
            </option>
            <option className="font-15" value="7 days">
              7 Days
            </option>
            <option className="font-15" value="month">
              Month
            </option>
            <option className="font-15" value="year">
              Year
            </option>
          </select>
        </div>
        {object.series && nftPricingHistory.length > 0 ? (
          <ReactApexChart
            options={object.options}
            series={object.series}
            type="area"
            height={197}
            width="100%"
          />
        ) : (
          <div className="no-data no-data-found ">
            <img src={Information}></img>
            <p>No information available</p>
          </div>
        )}
      </div>
    </div>
  );
}
