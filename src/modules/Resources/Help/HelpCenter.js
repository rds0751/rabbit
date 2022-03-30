import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/styles/helpcenter.css";
import buying from "../../../assets/images/buying.png";
import selling from "../../../assets/images/selling.png";
import creating from "../../../assets/images/creation.png";
import adding from "../../../assets/images/adding.png";
function HelpCenter() {
  const data = [
    {
      link:"/buying",
      image: buying,
      title: "Buying",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      link:"/selling",
      image: selling,
      title: "Selling",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      link:"/buying",
      image: creating,
      title: "Creating Collection",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      link:"/buying",
      image: adding,
      title: "Adding Nfts",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
  ];

  return (
    <div>
      <div className="help-outer">
        <div className="help-center">Helpcenter</div>
        <div className="card-outer-body">
          {data.map((item, key) => {
            return (
              <>
                <Link to={item.link} className="link">
                  <div className="single-card">
                    <div className="">
                      <div className="">
                        <img src={item.image} />
                        <div className="title-help">{item.title}</div>
                        <div style={{width:"101.4%"}}>
                        <p className="content">{item.description}</p>

                        </div>
                     
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
