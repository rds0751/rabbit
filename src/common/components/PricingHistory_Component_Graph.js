import React from "react";
// import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
// import reactDom from "react-dom";
export default class PricingHistory_Component_Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "1july",
          data: [0.22, 62, 62],
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
          categories: ["30 June", "30 June", "30 June"],
        },
        yaxis: {
          categories: ["30 June", "30 June", "30 June"],
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <p className="font-15 font-weight-900">Pricing History</p>
        <div className="border">
          <div className="row">
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
                <option className="font-15">Events</option>
                <option className="font-15">Price</option>
                <option className="font-15">Date</option>
              </select>
            </div>
            <div className="col-1"></div>
          </div>
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={197}
            className=""
          />
        </div>
      </div>
    );
  }
}
