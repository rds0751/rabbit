import { Link } from "react-router-dom";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Buying() {
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mt-4 offset-1">
          <li className="breadcrumb-item">
            <Link
              to="/help-center"
              style={{ textDecoration: "none" }}
              className="text-dark"
            >
              Help Center
            </Link>
          </li>
          <li
            className="breadcrumb-item active text-primary"
            aria-current="page"
          >
            Buying
          </li>
        </ol>
      </nav>
      <div
        style={{ display: "flex", flexDirection: "row" }}
        className="offset-2 offset-2mob"
      >
        <h4 className="font-22 font-weight-700" style={{ marginLeft: "3.6em" }}>
          Buying
        </h4>
        <div className="input-group mb-3 buying-search-btn">
          <input
            type="text"
            className="form-control border-input input-box-border"
            style={{ marginLeft: "1em", borderRight: "0" }}
            placeholder="Search"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <div className="input-group-append w-25">
            <button
              className="btn btn-search-secondary border border-search"
              type="button"
              id="button-addon2"
              style={{ borderRadius: "0px 5px 5px 0px" }}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row buyingmob">
          <div className="col-12 col-sm-9  offset-2">
            <div className="accordion">
              <div
                className="accordion-item p-4 shadow"
                style={{ borderRadius: "10px" }}
              >
                <div
                  className="accordion-title"
                  onClick={() => setIsActive(!isActive)}
                >
                  <div className="font-15 font-weight-bold">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore ?
                    <span className="text-dark" style={{ marginLeft: "7em" }}>
                      {isActive ? <RemoveIcon /> : <AddIcon />}
                    </span>
                  </div>
                </div>
                {isActive && (
                  <div className="accordion-content font-14 mt-4">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo
                  </div>
                )}
              </div>
            </div>
            <div className="accordion mt-4">
              <div
                className="accordion-item p-4 shadow"
                style={{ borderRadius: "10px" }}
              >
                <div
                  className="accordion-title"
                  onClick={() => setIsActive1(!isActive1)}
                >
                  <div className="font-15 font-weight-bold">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore ?
                    <span className="text-dark" style={{ marginLeft: "7em" }}>
                      {isActive1 ? <RemoveIcon /> : <AddIcon />}
                    </span>
                  </div>
                </div>
                {isActive1 && (
                  <div className="accordion-content font-14 mt-4">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo
                  </div>
                )}
              </div>
            </div>
            <div className="accordion mt-4">
              <div
                className="accordion-item p-4 shadow"
                style={{ borderRadius: "10px" }}
              >
                <div
                  className="accordion-title"
                  onClick={() => setIsActive2(!isActive2)}
                >
                  <div className="font-15 font-weight-bold">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore ?
                    <span className="text-dark" style={{ marginLeft: "7em" }}>
                      {isActive2 ? <RemoveIcon /> : <AddIcon />}
                    </span>
                  </div>
                </div>
                {isActive2 && (
                  <div className="accordion-content font-14 mt-4">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo
                  </div>
                )}
              </div>
            </div>
            <div className="accordion mt-4">
              <div
                className="accordion-item p-4 shadow"
                style={{ borderRadius: "10px" }}
              >
                <div
                  className="accordion-title"
                  onClick={() => setIsActive3(!isActive3)}
                >
                  <div className="font-15 font-weight-bold">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore ?
                    <span className="text-dark" style={{ marginLeft: "7em" }}>
                      {isActive3 ? <RemoveIcon /> : <AddIcon />}
                    </span>
                  </div>
                </div>
                {isActive3 && (
                  <div className="accordion-content font-14 mt-4">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo
                  </div>
                )}
              </div>
            </div>
            {/* <Accordion className="mt-3 shadow accordion-border p-3">
              <AccordionSummary
                expandIcon={<AddIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore ?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo
                </Typography>
              </AccordionDetails>
            </Accordion> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Buying;
