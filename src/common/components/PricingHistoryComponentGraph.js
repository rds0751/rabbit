import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import "../../assets/styles/Leader.css";
// import reactDom from "react-dom";
import { pricingHistoryGraphOfNft } from "../../services/sellAndPurchaseMicroService";

export default function PricingHistoryComponent(props) {
  const [nftPricingHistory, setNftPricingHistory] = useState([]);

  const data = {
    contentId: props.id,
  };

  useEffect(() => {
    pricingHistoryGraphOfNft(data).then((response) =>
      setNftPricingHistory(response)
    );
  });

  const object = {
    series: [
      {
        name: "1july",
        data: nftPricingHistory.map((each) => each.total),
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
      // title: {
      //   text: "Pricing History",
      //   align: "left",
      // },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: nftPricingHistory.map(
          (each) =>
            `${new Date(each._id.addedOn).getDate()}` +
            `${new Date(each._id.addedOn).toLocaleString("default", {
              month: "short",
            })}`
        ),
      },
      yaxis: {
        categories: nftPricingHistory.map(
          (each) =>
            `${new Date(each._id.addedOn).getDate()}` +
            `${new Date(each._id.addedOn).toLocaleString("default", {
              month: "short",
            })}`
        ),
      },
    },
  };

  return (
    <div id="chart">
      {/* <p className="font-15 font-weight-900">Pricing History</p> */}
      <div className="border">
        <div className="row no-gutters">
          <div className="col-1"></div>
          <div className="col-4">
            <h5 className="font-15 text-secondary mt-4">
              Average Price: <span className="text-dark">0.23</span>
            </h5>
          </div>
          <div className="col-3"></div>
          <div className="col-3">
            <select
              style={{
                width: "100px",
                height: "35px",
                borderRadius: "5px",
                marginTop: "1em",
              }}
            >
              <option className="font-15">All time</option>
              <option className="font-15">Month</option>
              <option className="font-15">Year</option>
              <option className="font-15">Days</option>
            </select>
          </div>
          <div className="col-1"></div>
        </div>
        <ReactApexChart
          options={object.options}
          series={object.series}
          type="line"
          height={197}
          className=""
        />
      </div>
    </div>
  );
}
