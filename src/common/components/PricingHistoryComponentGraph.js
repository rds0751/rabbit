import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import "../../assets/styles/Leader.css";
import { pricingHistoryGraphOfNft } from "../../services/sellAndPurchaseMicroService";
import moment from "moment";

export default function PricingHistoryComponent(props) {
  const [nftPricingHistory, setNftPricingHistory] = useState([]);
  const [filter, setFilter] = useState();

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const reqObject = {
    contentId: props.id,
  };

  useEffect(() => {
    pricingHistoryGraphOfNft(reqObject).then((response) => 
      setNftPricingHistory(response)
    );
  });

  let prices = nftPricingHistory.map((each) => each.total);
  let dates = nftPricingHistory.map((each) => moment(new Date(each._id.addedOn)).format('D MMM YY'));

  if (filter === "month") {
    dates = nftPricingHistory.map((each) => moment(new Date(each._id.addedOn)).format('MMM YY'));
  } else if (filter === "year") {
    dates = nftPricingHistory.map((each) => moment(new Date(each._id.addedOn)).format('YYYY'));
  }

  let total= 0;
  let average = 0;
  nftPricingHistory.forEach((item) => {
    total = total + item.total
  })
  if (total !== 0){
    average = total/nftPricingHistory.length
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
      xaxis: {
        categories: dates,
      },
    },
  };

  return (
    <div id="chart">
      <div className="border">
        <div className="d-flex justify-content-between align-items-center p-2">
            <h5 className="font-15 text-secondary">
              Average Price: <span className="text-dark">{average}</span>
            </h5>
            <select name="filter"
              onChange={(e) => handleChange(e)}
              style={{
                width: "100px",
                height: "35px",
                borderRadius: "5px",
                fontSize:"14px",
              }}
            >
              <option className="font-15" value="all">All time</option>
              <option className="font-15" value="month">Month</option>
              <option className="font-15" value="year">Year</option>
              <option className="font-15" value="days">Days</option>
            </select>
        </div>
        <ReactApexChart
          options={object.options}
          series={object.series}
          type="area"
          height={197}
          width="100%"
        />
      </div>
    </div>
  );
}
